// utils / config.js 
const MONGODB_URL = process.env.MONGO_URI;
const PORT = process.env.PORT || 5000;
const MAILGUN_API_KEY = process.env.MAILGUN_API_KEY;
const MAILGUN_DOMAIN = process.env.MAILGUN_DOMAIN;

module.exports = { MONGODB_URL, PORT, MAILGUN_API_KEY, MAILGUN_DOMAIN };