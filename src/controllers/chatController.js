const Message = require("../models/Message");
const buildPrompt = require("../utils/promptBuilder");
const { generateResponse } = require("../services/llmService");

exports.chat = async (req, res) => {

    try {

        const { brand_id, message } = req.body;

        // 1. Save user message
        await Message.create({
            brandId: brand_id,
            role: "user",
            content: message
        });

        // 2. Get full chat history for this brand
        const history = await Message.find({
            brandId: brand_id
        }).sort({ createdAt: 1 });

        // 3. Build proper LLM prompt using promptBuilder
        const messages = buildPrompt(history, message);

        // 4. Get AI response from Groq
        const aiReply = await generateResponse(messages);

        // 5. Save AI response in DB
        await Message.create({
            brandId: brand_id,
            role: "assistant",
            content: aiReply
        });

        // 6. Send response back to client
        res.json({
            response: aiReply
        });

    } catch (error) {

        res.status(500).json({
            error: error.message
        });

    }
};