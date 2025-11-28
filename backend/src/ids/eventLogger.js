import { io } from "../lib/socket.js";
import crypto from "crypto";

// EMIT LIVE EVENTS TO FRONTEND
export function emitToFrontend(event) {
  try {
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
  emitToFrontend,
  getEventsByTimeRange,
  getEventStatistics
};
