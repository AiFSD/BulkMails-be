//model / EmailEvent.js
const mongoose = require("mongoose");

const emailEventSchema = new mongoose.Schema({
  eventType: { type: String, required: true },
  sender: { type: String, required: true },
  recipient: { type: String, required: true },
  deliveryStatus: { type: String },
  timestamp: { type: Date, required: true },
  subject: { type: String, required: true },
  body: { type: String, required: true }, 
});

const EmailEvent = mongoose.model("EmailEvent", emailEventSchema);

module.exports = EmailEvent;
