// server/routes/aiChat.js
import express from "express";
import OpenAI from "openai";

const router = express.Router();

// Initialize OpenAI
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY, // put your key in .env
});

// POST /api/ai-chat
router.post("/", async (req, res) => {
  try {
    const { message } = req.body;
    if (!message) return res.status(400).json({ error: "Message is required" });

    // Call OpenAI GPT
    const response = await openai.chat.completions.create({
      model: "gpt-4o-mini", // lightweight GPT-4
      messages: [
        { role: "system", content: "You are a professional gym nutrition AI assistant." },
        { role: "user", content: message },
      ],
    });

    const aiReply = response.choices[0].message.content;
    res.json({ reply: aiReply });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "AI service error" });
  }
});

export default router;
