const mongoose = require("mongoose");
require("dotenv").config();

// Login Database
const connectDB = mongoose.createConnection(process.env.MONGO_URI);

// ChatBot Database
const chatBotDB = mongoose.createConnection(process.env.MONGO_AIBOT_URI);

// loginform
const loginFormDB = mongoose.createConnection(process.env.MONGO_URI_LOGIN)

// Login DB Events
connectDB.on("connected", () => {
  console.log("User DB Connected ✅");
});

connectDB.on("error", (err) => {
  console.error("User DB Error ❌", err.message);
});

// Chat DB Events
chatBotDB.on("connected", () => {
  console.log("ChatBot DB Connected ✅");
});

chatBotDB.on("error", (err) => {
  console.error("ChatBot DB Error ❌", err.message);
});

// Login DB Events
loginFormDB.on("connected", () => {
  console.log("Login DB Connected ✅");
});

loginFormDB.on("error", (err) => {
  console.error("Login DB Error ❌", err.message);
});

module.exports = { connectDB, chatBotDB, loginFormDB };
