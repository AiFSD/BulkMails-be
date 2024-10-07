// controllers/TrackingControllers.js

const TrackingModel = require("../models/Tracking");

const savePayload = async (payload) => {
  try {
    const newPayload = new TrackingModel(payload);
    await newPayload.save();
    console.log("Payload saved successfully:", newPayload);
  } catch (error) {
    console.error("Error saving payload:", error);
  }
};

module.exports = {
  savePayload
};
