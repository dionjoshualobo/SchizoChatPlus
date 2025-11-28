import User from "../models/user.model.js";
import Message from "../models/message.model.js";

import cloudinary from "../lib/cloudinary.js";
import { getReceiverSocketId, io } from "../lib/socket.js";

import { createTorPacket, routeTorPacketThroughPython, encryptLayer, decryptLayer, generateEncryptionKey } from "../lib/utils.js";

// Mock Tor nodes with encryption keys
const torNodes = [
  { id: "Node1", type: "entry", key: generateEncryptionKey() },
  { id: "Node2", type: "middle", key: generateEncryptionKey() },
  { id: "Node3", type: "exit", key: generateEncryptionKey() },
];

export const getUsersForSidebar = async (req, res) => {
  try {
    const loggedInUserId = req.user._id;
    const filteredUsers = await User.find({ _id: { $ne: loggedInUserId } }).select("-password");

    res.status(200).json(filteredUsers);
  } catch (error) {
    console.error("Error in getUsersForSidebar: ", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const getMessages = async (req, res) => {
  try {
    const { id: userToChatId } = req.params;
    const myId = req.user._id;

    const messages = await Message.find({
      $or: [
        { senderId: myId, receiverId: userToChatId },
        { senderId: userToChatId, receiverId: myId },
      ],
    });

    res.status(200).json(messages);
  } catch (error) {
    console.log("Error in getMessages controller: ", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const sendMessage = async (req, res) => {
  try {
    const { senderId, receiverId, text, image } = req.body;

    // Debug log to inspect request body
    console.log("Request body:", req.body);

    // Step 1: Create a Tor packet
    const torPacket = createTorPacket({ text }, senderId, receiverId, "entry");
    torPacket.source = senderId; // Set the source to the sender ID
    torPacket.destination = receiverId; // Set the destination to the receiver ID
    console.log("Tor packet before routing:", torPacket);

    // Step 2: Route the packet through the Python-based Tor network
    let routedPacket;
    try {
      routedPacket = await routeTorPacketThroughPython(torPacket);
      console.log("Routed packet:", routedPacket);
      if (!routedPacket || !routedPacket.payload) {
        throw new Error("Invalid routed packet or missing payload");
      }
    } catch (routingError) {
      console.error("Error during packet routing:", routingError.message);
      return res.status(500).json({ success: false, error: "Packet routing failed" });
    }

    // Step 3: Store the message in MongoDB with timestamps
    let parsedPayload;
    try {
      console.log("Routed packet payload:", routedPacket.payload);
      if (typeof routedPacket.payload === "string") {
        parsedPayload = JSON.parse(routedPacket.payload); // Parse the payload JSON string if it's a string
      } else if (typeof routedPacket.payload === "object") {
        parsedPayload = routedPacket.payload; // Use the object directly if it's already parsed
      } else {
        throw new Error("Invalid payload type");
      }
    } catch (parseError) {
      console.error("Failed to parse routed packet payload:", parseError.message);
      return res.status(500).json({ success: false, error: "Invalid packet payload format" });
    }

    const messagePayload = {
      senderId,
      receiverId,
      text: parsedPayload.text, // Extract text from parsed payload
    };

    if (image) {
      messagePayload.image = image;
    }

    console.log("Message payload to save:", messagePayload);

    try {
      const createdMessage = await Message.create(messagePayload);
      const responseMessage = createdMessage.toObject();
      responseMessage.text = parsedPayload.text; // Ensure text is included in the emitted message

      // Step 4: Emit the message (with timestamps) to relevant clients
      console.log("Emitting responseMessage:", responseMessage);
      req.io.emit("newMessage", responseMessage);

      res.status(200).json({ success: true, message: responseMessage });
    } catch (dbError) {
      console.error("Error saving message to database:", dbError.message);
      res.status(500).json({ success: false, error: "Failed to save message" });
    }
  } catch (error) {
    console.error("Unexpected error in sendMessage controller:", error.message);
    res.status(500).json({ success: false, error: "Internal server error" });
  }
};
