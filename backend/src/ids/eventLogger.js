import IDS_Event from '../models/idsEvent.model.js';
import { getIO } from "../lib/socket.js";
import crypto from "crypto";

// LOG EVENT TO DATABASE
export async function logEvent(eventData) {
  try {
    const event = new IDS_Event({
      eventId: eventData.eventId || crypto.randomUUID(),
      timestamp: new Date(),
      eventType: eventData.type,
      severity: eventData.severity,
      relayNode: eventData.relayNode || "unknown",
      packetId: eventData.packetId,
      ruleTriggered: eventData.ruleTriggered || [],
      details: eventData.details || {},
      resolved: false
    });

    await event.save();

    // Emit to frontend dashboard
    emitToFrontend(event);

    console.log("IDS Event Logged:", event.eventType);
    return event;
  } catch (err) {
    console.error("Failed to log IDS event:", err);
  }
}

// EMIT LIVE EVENTS TO FRONTEND
export function emitToFrontend(event) {
  try {
    const io = getIO();
    io.emit("ids-event", event);
    console.log("IDS Event emitted to dashboard");
  } catch (err) {
    console.error("Failed to emit event:", err);
  }
}

// QUERY EVENTS BY TIME RANGE
export async function getEventsByTimeRange(startTime, endTime) {
  try {
    const events = await IDS_Event.find({
      timestamp: { $gte: startTime, $lte: endTime }
    }).sort({ timestamp: -1 });

    return events;
  } catch (err) {
    console.error("Failed to fetch events by range:", err);
    return [];
  }
}

// GET IDS STATISTICS (for dashboard)
export async function getEventStatistics() {
  try {
    const totalEvents = await IDS_Event.countDocuments();
    const blocked = await IDS_Event.countDocuments({ eventType: 'packet_blocked' });
    const flagged = await IDS_Event.countDocuments({ eventType: 'packet_flagged' });
    const suspicious = await IDS_Event.countDocuments({ severity: 'high' });
    
    return {
      totalEvents,
      blocked,
      flagged,
      suspicious
    };
  } catch (err) {
    console.error("Failed to fetch IDS statistics:", err);
    return {};
  }
}

export default {
  logEvent,
  emitToFrontend,
  getEventsByTimeRange,
  getEventStatistics
};
