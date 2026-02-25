const mongoose = require("mongoose");
const { connectDB } = require("../../mongoDb/config-db/db");

const roleSchema = new mongoose.Schema({
  companyName: String,
  role: String,
  salary: Number
});

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    mobile: String,
    email: String,
    address: String,
    roleDetails: [roleSchema]
  },
  { timestamps: true }
);

// module.exports = mongoose.model("User", userSchema);
module.exports = connectDB.model("User", userSchema);

