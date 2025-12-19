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
const GEMINI_API_KEY = process.env.GEMINI_API_KEY;

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
  console.error("❌ GEMINI_API_KEY missing in .env");
}

// Health endpoint
app.get("/api/health", (_req, res) => {
  res.json({ status: "OK", modelInitialized: !!model });
});

// Utility: try to extract JSON portion from text
function extractJSONFromText(text) {
  if (!text || typeof text !== "string") return null;

  // remove common fenced blocks
  const cleaned1 = text.replace(/```(?:json)?/gi, "").replace(/```/g, "").trim();

  // try full parse
  try {
    return JSON.parse(cleaned1);
  } catch (e) {
    // try to find a JSON object/array within text using regex
    const match = cleaned1.match(/(\[[\s\S]*\]|\{[\s\S]*\})/);
    if (match && match[0]) {
      try {
        return JSON.parse(match[0]);
      } catch (err) {
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
      return res.status(400).json({ error: "Missing required fields: topic, difficulty, or numQuestions" });
    }

    if (!model) {
      return res.status(500).json({ error: "Gemini model not initialized. Check server logs and your API key." });
    }

    // Build the prompt: explicit and JSON-only request
    const prompt = `
You are an AI Quiz Builder. Produce exactly ${numQuestions} multiple-choice questions on the topic: "${topic}" with difficulty: "${difficulty}".
Requirements:
- Return output in JSON only (no extra commentary).
- The JSON should be an array of objects. Each object must contain:
  - "question": string,
  - "options": [string, string, string, string],
  - "answer": string (exact text of the correct option),
  - optional: "explanation": string
Example output:
[
  {
    "question": "What is ...?",
    "options": ["A", "B", "C", "D"],
    "answer": "B",
    "explanation": "Short reason"
  }
]
If you cannot generate the requested count, return as many as you can and include a top-level "issues" field (array) describing limitations.
`;

    // Call Gemini (SDK)
    let result;
    try {
      result = await model.generateContent(prompt);
    } catch (err) {
      console.error("❌ Gemini API call error:", err?.message || err);
      // attempt to include useful detail if available
      const errDetail = err?.response?.data || err?.message || String(err);
      return res.status(502).json({ error: "Gemini API error", detail: errDetail });
    }

    // Log the raw result for debugging (safe inspect)
    try {
      console.log("🔹 Gemini raw result (inspected):\n", util.inspect(result, { depth: 4, colors: false }));
    } catch (logErr) {
      console.log("🔹 Gemini raw result (string):", String(result).slice(0, 2000));
    }

    // Try to get text output from SDK result
    let responseText = "";
    try {
      // result.response.text() may be a function depending on SDK
      if (result?.response?.text) {
        responseText = typeof result.response.text === "function" ? result.response.text() : String(result.response.text);
      } else {
        // fallback: stringify SDK object to examine content
        responseText = JSON.stringify(result);
      }
    } catch (err) {
      responseText = JSON.stringify(result);
    }
    
    if (!responseText) {
      return res.status(500).json({ error: "Empty response from Gemini API" });
    }

    console.log("🔹 Response text (first 2000 chars):", String(responseText).slice(0, 2000));

    // Attempt robust JSON extraction
    const parsed = extractJSONFromText(responseText);

    if (parsed) {
      // Convert the parsed JSON to a formatted string for display in the frontend
      const formattedQuiz = JSON.stringify(parsed, null, 2);
      return res.json({ quiz: formattedQuiz });
    }

    // If parsing failed, return raw response as the quiz content
    console.warn("⚠️ Could not parse JSON from Gemini response. Returning raw text as quiz content.");
    return res.json({ quiz: responseText.slice(0, 8000) });

  } catch (serverErr) {
    console.error("❌ Unexpected server error in /api/generate-quiz:", serverErr?.stack || serverErr);
    return res.status(500).json({ error: "Internal server error", detail: String(serverErr).slice(0, 1000) });
  }
});

app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});

