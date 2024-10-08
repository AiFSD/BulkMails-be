const express = require("express");
const { handleSendBulkEmails } = require("../controllers/sendMailController");
const mailgun = require("mailgun-js");
const { MAILGUN_API_KEY, MAILGUN_DOMAIN } = require("../utils/config");
const EmailEvent = require("../models/EmailEvent");
const multer = require("multer");
const router = express.Router();
const mg = mailgun({ apiKey: MAILGUN_API_KEY, domain: MAILGUN_DOMAIN });
const { register, deleteUser } = require("../controllers/userControllers");
const Tracking = require("../models/Tracking");


const upload = multer().fields([
  { name: "recipients", maxCount: 1 },
  { name: "subject", maxCount: 1 },
  { name: "body", maxCount: 1 },
  { name: "attachment", maxCount: 1 },
]);

// Route for sending bulk emails
router.post("/send-bulk-emails", upload, handleSendBulkEmails);



// Route for fetching and logging email events
router.get("/email-events", async (req, res) => {
  try {
    const events = await mg.get("/events", { limit: 100 });

    const emailEvents = [];

    for (const event of events.items) {
      if (event.sender) {
        const existingEvent = await EmailEvent.findOne({
          recipient: event.recipient,
          timestamp: event.timestamp,
        });
        if (!existingEvent) {
          const emailEvent = new EmailEvent({
            eventType: event.event,
            sender: event.sender,
            recipient: event.recipient,
            deliveryStatus: event.delivery_status,
            timestamp: event.timestamp,
            subject: event.subject,
            body: event.body || "",
          });
          const savedEvent = await emailEvent.save();
          emailEvents.push(savedEvent);
        }
      }
    }

    const allEmailEvents = await EmailEvent.find().sort({ timestamp: -1 });
    res.status(200).json(allEmailEvents);
  } catch (error) {
    console.error("Error fetching and logging email events:", error);
    res
      .status(500)
      .json({ message: "Error fetching and logging email events" });
  }
});

// Route for fetching a single email event by ID
router.get("/email-events/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const emailEvent = await EmailEvent.findById(id);
    if (!emailEvent) {
      return res.status(404).json({ message: "Email event not found" });
    }
    res.status(200).json(emailEvent);
  } catch (error) {
    console.error("Error fetching email event:", error);
    res.status(500).json({ message: "Error fetching email event" });
  }
});

router.post("/register", register); //  registration route



// Route to get all track logs
router.get("/track-logs", async (req, res) => {
  console.log("Track logs request received"); // Debug log
  try {
    const trackLogs = await Tracking.find();
    res.json(trackLogs);
  } catch (error) {
    console.error("Error fetching track logs:", error);
    res.status(500).json({ message: "Error fetching track logs" });
  }
});


router.delete("/delete-account", deleteUser);

module.exports = router;
