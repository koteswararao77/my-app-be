const Conversation = require("../../mongoDb/models/Chat");
const OpenAI = require("openai");

const openai = new OpenAI({
    apiKey: process.env.GROQ_API_KEY,
    baseURL: "https://api.groq.com/openai/v1",
});

console.log("GROQ KEY EXISTS:", !!process.env.GROQ_API_KEY);

exports.sendMessage = async (userId, text) => {
    try {
        console.log("🚀 sendMessage started");
        console.log("UserId:", userId);
        console.log("Text:", text);

        let conversation = await Conversation.findOne({ userId });
        console.log("🔎 Conversation found:", !!conversation);

        if (!conversation) {
            console.log("🆕 Creating new conversation...");
            conversation = await Conversation.create({
                userId,
                messages: [],
            });
        }

        // Save user message
        conversation.messages.push({
            sender: "user",
            text,
        });

        console.log("💾 User message added");

        // Format full chat history
        const formattedMessages = conversation.messages.map((msg) => ({
            role: msg.sender === "user" ? "user" : "assistant",
            content: msg.text,
        }));

        console.log("📤 Sending request to GROQ...");
        console.log("Formatted messages length:", formattedMessages.length);

        // Call Groq AI
        let completion;

        try {
            completion = await openai.chat.completions.create({
                model: "llama-3.1-8b-instant",
                messages: [
                    { role: "system", content: "You are a helpful customer support assistant." },
                    ...formattedMessages,
                ],
            });

            console.log("✅ GROQ response received");

        } catch (groqError) {
            console.error("🔥 GROQ API ERROR:");
            console.error("Message:", groqError.message);
            console.error("Response Data:", groqError.response?.data);
            throw groqError;
        }

        const aiReply = completion.choices[0].message.content;
        console.log("🤖 AI Reply:", aiReply);

        // Save AI reply
        conversation.messages.push({
            sender: "support",
            text: aiReply,
        });

        await conversation.save();
        console.log("💾 Conversation saved successfully");

        return conversation;

    } catch (error) {
        console.error("🔥 sendMessage FINAL ERROR:");
        console.error(error);
        throw error; // important so asyncHandler catches it
    }
};