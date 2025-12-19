// server/index.js
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import util from "util";
import { GoogleGenerativeAI } from "@google/generative-ai";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json({ limit: "1mb" }));

const PORT = process.env.PORT || 5001;

// ✅ FIX: support both env variable names
const GEMINI_API_KEY =
  process.env.GEMINI_API_KEY || process.env.VITE_GEMINI_API_KEY;

// Initialize Gemini model
let model;
if (GEMINI_API_KEY) {
  try {
    const genAI = new GoogleGenerativeAI(GEMINI_API_KEY);
    model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

    console.log("✅ Gemini model initialized");
  } catch (err) {
    console.error("❌ Error initializing Gemini SDK:", err?.message || err);
    model = null;
  }
} else {
  console.error("❌ Gemini API key missing (GEMINI_API_KEY or VITE_GEMINI_API_KEY)");
}

// Health endpoint
app.get("/api/health", (_req, res) => {
  res.json({ status: "OK", modelInitialized: !!model });
});

// Utility: try to extract JSON portion from text
function extractJSONFromText(text) {
  if (!text || typeof text !== "string") return null;

  const cleaned = text
    .replace(/```(?:json)?/gi, "")
    .replace(/```/g, "")
    .trim();

  try {
    return JSON.parse(cleaned);
  } catch {
    const match = cleaned.match(/(\[[\s\S]*\]|\{[\s\S]*\})/);
    if (match?.[0]) {
      try {
        return JSON.parse(match[0]);
      } catch {
        return null;
      }
    }
  }
  return null;
}

app.post("/api/generate-quiz", async (req, res) => {
  try {
    const { topic, difficulty, numQuestions } = req.body || {};

    if (!topic || !difficulty || !numQuestions) {
      return res.status(400).json({
        error: "Missing required fields: topic, difficulty, or numQuestions",
      });
    }

    if (!model) {
      return res.status(500).json({
        error: "Gemini model not initialized. Check API key.",
      });
    }

    const prompt = `
You are an AI Quiz Builder. Produce exactly ${numQuestions} multiple-choice questions on the topic "${topic}" with difficulty "${difficulty}".

Rules:
- Output JSON only
- Each question must have:
  - question
  - options (4)
  - answer
  - optional explanation
`;

    let result;
    try {
      result = await model.generateContent(prompt);
    } catch (err) {
      console.error("❌ Gemini API error:", err?.message || err);
      return res.status(502).json({ error: "Gemini API error" });
    }

    console.log(
      "🔹 Gemini raw result:",
      util.inspect(result, { depth: 3 })
    );

    let responseText = "";
    try {
      responseText =
        typeof result.response.text === "function"
          ? result.response.text()
          : String(result.response.text);
    } catch {
      responseText = JSON.stringify(result);
    }

    const parsed = extractJSONFromText(responseText);

    if (parsed) {
      return res.json({ quiz: JSON.stringify(parsed, null, 2) });
    }

    return res.json({ quiz: responseText.slice(0, 8000) });
  } catch (err) {
    console.error("❌ Server error:", err);
    res.status(500).json({ error: "Internal server error" });
  }
});

app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
