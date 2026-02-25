const express = require("express");
const router = express.Router();
const {
  register,
  login,
  getProfile,
} = require("./loginController");

const protect = require("../middleware/authMiddleware");
const authorizeRoles = require("../middleware/roleMiddleware");

router.post("/register", register);
router.post("/login", login);

router.get("/profile", protect, getProfile);

router.get("/admin", protect, authorizeRoles("admin"), (req, res) => {
  res.json({ message: "Welcome Admin" });
});

module.exports = router;