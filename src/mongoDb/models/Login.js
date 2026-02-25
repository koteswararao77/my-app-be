const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const { loginFormDB } = require("../config-db/db");

const loginSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, default: "user" },
  },
  { timestamps: true }
);

// Hash password
loginSchema.pre("save", async function () {
  if (!this.isModified("password")) return;
  this.password = await bcrypt.hash(this.password, 10);
});

// Compare password
loginSchema.methods.matchPassword = function (enteredPassword) {
  return bcrypt.compare(enteredPassword, this.password);
};

// module.exports = mongoose.model("Login", loginSchema);
module.exports = loginFormDB.model("Login", loginSchema);
