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
    const routedPacket = await routeTorPacketThroughPython(torPacket);
    console.log("Routed packet:", routedPacket);

    // Step 3: Store the message in MongoDB with timestamps
    const parsedPayload = JSON.parse(routedPacket.payload); // Parse the payload JSON string

    const messagePayload = {
      senderId,
      receiverId,
      text: parsedPayload.text, // Extract text from parsed payload
    };

    if (image) {
      messagePayload.image = image;
    }

    const createdMessage = await Message.create(messagePayload);
    const responseMessage = createdMessage.toObject();
    responseMessage.text = parsedPayload.text; // Ensure text is included in the emitted message

    // Step 4: Emit the message (with timestamps) to relevant clients
    console.log("Emitting responseMessage:", responseMessage);
    req.io.emit("newMessage", responseMessage);

    res.status(200).json({ success: true, message: responseMessage });
  } catch (error) {
    console.error("Error in sendMessage controller:", error.message);
    res.status(500).json({ success: false, error: error.message });
  }
};
