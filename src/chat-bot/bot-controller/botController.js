const chatService = require("../botServices/botService");
const asyncHandler = require("../../utils/asyncHandler");

exports.sendMessage = asyncHandler(async (req, res) => {
  const { userId, text } = req.body;

  if (!userId || !text) {
    return res.status(400).json({
      message: "userId and text are required",
    });
  }

  const conversation = await chatService.sendMessage(userId, text);

  res.status(200).json({
    success: true,
    data: conversation,
  });
});