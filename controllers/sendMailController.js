// controllers/sendMailController.js
const { sendBulkEmails } = require("../controllers/emailControllers");
const { savePayload } = require("../controllers/TrackingControllers"); 

const handleSendBulkEmails = async (req, res) => {
  const { recipients, subject, body, title } = req.body; 

  
  if (!recipients || !subject || !body || !title) {

    return res.status(400).json({ message: "All fields are required" });
  }

  let recipientsArray;
  try {
    recipientsArray = JSON.parse(recipients);
  } catch (error) {
    return res.status(400).json({ message: "Invalid recipients format" });
  }

 const attachment = req.file;

  try {
    await sendBulkEmails(recipientsArray.join(", "), subject, body, attachment);

    
    const payload = {
      event: "sent",
      recipient: recipientsArray.join(", "),
      timestamp: Date.now(),
      "message-id": "unique-message-id",
      signature: {
        timestamp: Date.now().toString(),
        token: "your-token",
        signature: "your-signature",
      },
      "delivery-status": {
        message: "Emails sent successfully",
        code: 200,
        description: "OK",
      },
      title: title, 
    };

    await savePayload(payload);
    res.status(200).json({ message: "Bulk emails sent successfully" });
  } catch (error) {
    console.error("Error sending bulk emails:", error);
    res.status(500).json({ message: "Error sending bulk emails" });
  }
};


module.exports = { handleSendBulkEmails };
