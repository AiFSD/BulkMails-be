const mailgun = require("mailgun-js");
const EmailEvent = require("../models/EmailEvent");
const User = require("../models/user");
const { MAILGUN_API_KEY, MAILGUN_DOMAIN } = require("../utils/config");



const mg = mailgun({ apiKey: MAILGUN_API_KEY, domain: MAILGUN_DOMAIN });

//  sendBulkEmails function
const sendBulkEmails = async (recipients, subject, text, attachment) => {
  const data = {
    from: "no-reply@mg.mybulky.com",
    to: recipients,
    subject: subject,
    text: text,
  };

  if (attachment) {
    data.attachment = {
      filename: attachment.originalname,
      content: attachment.buffer,
    };
  }

  try {
    await mg.messages().send(data);

    const emailEvent = new EmailEvent({
      eventType: "sent",
      sender: "no-reply@mg.mybulky.com",
      recipient: recipients,
      subject: subject,
      body: text,
      timestamp: new Date(),
    });
    await emailEvent.save();
  } catch (error) {
    console.error("Error sending emails:", error);
  }
};

//  fetchMailgunLogs function
const fetchMailgunLogs = async () => {
  try {
    const logs = await mg.events().list({ limit: 100 });
    return logs.items;
  } catch (error) {
    console.error("Error fetching Mailgun logs:", error);
    throw error;
  }
};



module.exports = {
  sendBulkEmails,
  fetchMailgunLogs,

};
