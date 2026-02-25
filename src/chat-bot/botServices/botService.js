const Conversation = require("../../mongoDb/models/Chat");
const OpenAI = require("openai");

const openai = new OpenAI({
    apiKey: process.env.GROQ_API_KEY,
    baseURL: "https://api.groq.com/openai/v1",
});

exports.sendMessage = async (userId, text) => {
    let conversation = await Conversation.findOne({ userId });

    if (!conversation) {
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

    // Format full chat history
    const formattedMessages = conversation.messages.map((msg) => ({
        role: msg.sender === "user" ? "user" : "assistant",
        content: msg.text,
    }));

    // Call Groq AI
    const completion = await openai.chat.completions.create({
        model: "llama-3.1-8b-instant",
        messages: [
            { role: "system", content: "You are a helpful customer support assistant." },
            ...formattedMessages,
        ],
    });

    const aiReply = completion.choices[0].message.content;

    // Save AI reply
    conversation.messages.push({
        sender: "support",
        text: aiReply,
    });

    await conversation.save();

    return conversation;
};
