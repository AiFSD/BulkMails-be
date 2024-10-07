// index.js ( entry point)
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const path = require("path");
require("dotenv").config();
const { MONGODB_URL } = require("./utils/config");
const { register } = require("./controllers/userControllers.js");
const { login } = require("./controllers/userControllers.js");
const { requestPasswordReset } = require("./controllers/userControllers.js");
const { resetPassword } = require("./controllers/userControllers.js");
const morgan = require("morgan");
const router = require("./routes/emailRoutes");





const app = express();


app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

// Set up the registration and login routes
app.post("/register", register);
app.post("/login", login);

// Use the routes
app.use("/api", router);
app.post("/api/auth/forgot-password", requestPasswordReset);
app.post("/api/auth/reset-password", resetPassword);


// Catch-all route for SPA (if using React or similar)
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "index.html"));
});

mongoose
  .connect(MONGODB_URL)
  .then(() => {
    console.log("Connected to MongoDB");
    app.listen(5000, () => {
      console.log("Server is running on http://localhost:5000");
    });
  })
  .catch((error) => {
    console.error("Error connecting to MongoDB:", error);
  });




