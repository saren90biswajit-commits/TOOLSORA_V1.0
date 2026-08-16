import express from "express";
import path from "path";
import { GoogleGenAI } from "@google/genai";
import { createServer as createViteServer } from "vite";
import * as dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json());

// Initialize Gemini SDK
let ai: GoogleGenAI | null = null;
function getAI() {
  if (!ai) {
    const key = process.env.GEMINI_API_KEY;
    if (!key) {
      throw new Error("GEMINI_API_KEY environment variable is missing.");
    }
    ai = new GoogleGenAI({ apiKey: key });
  }
  return ai;
}

// API Routes
app.post("/api/generate", async (req, res) => {
  try {
    const { toolType, payload } = req.body;
    const aiClient = getAI();
    let prompt = "";
    
    // Construct prompt based on toolType
    switch (toolType) {
      case "youtube-titles":
        prompt = `Generate ${payload.count || 5} catchy YouTube titles for a video about "${payload.topic}". Target audience: ${payload.audience}. Category: ${payload.category}. Tone: ${payload.tone}. Include keyword: "${payload.keyword}". Respond with ONLY a valid JSON array of objects, where each object has a "title" string field, a "curiosity" score (1-10), an "emotionalAppeal" score (1-10), and a brief "improvement" suggestion. No markdown formatting, just raw JSON.`;
        break;
      case "hashtags":
        prompt = `Generate hashtags for ${payload.platform} about "${payload.topic}" in the "${payload.niche}" niche. Include keyword: "${payload.keyword}". Give me ${payload.count || 15} hashtags. Respond with ONLY a valid JSON object with arrays for "relevant", "niche", "broad", and "longTail". No markdown formatting, just raw JSON.`;
        break;
      case "captions":
        prompt = `Write ${payload.count || 3} ${payload.platform} captions about "${payload.topic}". Type: ${payload.captionType}. Tone: ${payload.tone}. Length: ${payload.length}. CTA: ${payload.cta}. Respond with ONLY a valid JSON array of strings containing the captions. No markdown formatting, just raw JSON.`;
        break;
      case "bio":
        prompt = `Write 3 bio options for ${payload.platform}. Name: ${payload.name}, Profession: ${payload.profession}, Niche: ${payload.niche}, Interests: ${payload.interests}, Personality: ${payload.personality}, CTA: ${payload.cta}. Respond with ONLY a valid JSON array of strings containing the bios. No markdown formatting, just raw JSON.`;
        break;
      case "video-script":
        prompt = `Write a video script for ${payload.platform}. Topic: ${payload.topic}, Type: ${payload.videoType}, Audience: ${payload.audience}, Duration: ${payload.duration}, Tone: ${payload.tone}, CTA: ${payload.cta}. Output a JSON object with properties: "hook", "introduction", "mainContent", "patternInterrupt", "keyTakeaway", "callToAction". No markdown formatting, just raw JSON.`;
        break;
      case "hook":
        prompt = `Write 5 hooks for ${payload.platform} about "${payload.topic}". Content type: ${payload.contentType}. Tone: ${payload.tone}. Target audience: ${payload.audience}. Output a JSON array of objects, each containing: "style" (e.g., Curiosity, Question, Problem, Bold Statement), "hook" (the text), and "score" (a number 1-10 estimating its strength). No markdown formatting, just raw JSON.`;
        break;
      case "content-ideas":
        prompt = `Generate ${payload.count || 5} content ideas for ${payload.platform} about "${payload.topic}" in the "${payload.niche}" niche. Target audience: ${payload.audience}. Style: ${payload.style}. Output a JSON array of objects, each containing: "concept" (the video concept), "hook" (suggested opening), "format" (suggested format), "description" (short description), and "cta" (call to action suggestion). No markdown formatting, just raw JSON.`;
        break;
      case "facebook-group-hooks":
        prompt = `Generate 5 engaging Facebook Group discussion hooks. Group topic: "${payload.groupTopic}". Post topic: "${payload.postTopic}". Target audience: ${payload.audience}. Tone: ${payload.tone}. Output a JSON array of objects, each containing: "category" (e.g., Question, Discussion, Story, Poll-style), "hook" (the text), and "rationale" (why it works). No markdown formatting, just raw JSON.`;
        break;
      case "facebook-page-bio":
        prompt = `Write 3 professional Facebook Page bios. Page name: ${payload.pageName}, Niche/Business: ${payload.niche}, Description: ${payload.description}, Target audience: ${payload.audience}, Tone: ${payload.tone}, CTA: ${payload.cta}. Output a JSON array of strings containing the bios. No markdown formatting, just raw JSON.`;
        break;
      default:
        return res.status(400).json({ error: "Invalid toolType" });
    }

    const response = await aiClient.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
      config: {
        responseMimeType: "application/json"
      }
    });

    if (!response.text) {
      throw new Error("Empty response from AI");
    }

    const jsonResult = JSON.parse(response.text);
    res.json(jsonResult);
  } catch (error: any) {
    console.error("AI Generation Error:", error);
    res.status(500).json({ error: error.message || "Failed to generate content" });
  }
});

async function startServer() {
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
