const express = require("express");
const router = express.Router();
const userController = require('../get-post-apis/controllers/userController');
const chatController = require("../chat-bot/bot-controller/botController");

router.post("/users", userController.createUser);
router.get("/users", userController.getAllUsers);
router.get("/users/:id", userController.getUserById);
router.put("/users/:id", userController.updateUser);
router.delete("/users/:id", userController.deleteUser);

// chat bot routes
router.post("/chat/send", chatController.sendMessage);

module.exports = router;
