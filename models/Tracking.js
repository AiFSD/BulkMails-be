// models/Tracking.js

const mongoose = require("mongoose");

const TrackingSchema = new mongoose.Schema({
  event: { type: String, required: true },
  recipient: { type: String, required: true },
  timestamp: { type: Number, required: true },
  "message-id": { type: String, required: true },
  title: { type: String, required: true },
  signature: {
    timestamp: { type: String, required: true },
    token: { type: String, required: true },
    signature: { type: String, required: true },
  },
  "delivery-status": {
    message: { type: String, required: true },
    code: { type: Number, required: true },
    description: { type: String, required: true },
  },
});

module.exports = mongoose.model("Tracking", TrackingSchema);
