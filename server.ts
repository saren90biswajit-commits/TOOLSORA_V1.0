import express from "express";
import path from "path";
import fs from "fs";
import { GoogleGenAI } from "@google/genai";
import { createServer as createViteServer } from "vite";
import * as dotenv from "dotenv";
import { getRouteSEO } from "./src/seo/routeSeo";

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

    let response;
    let retries = 3;
    let delay = 1500;
    
    while (retries > 0) {
      try {
        response = await aiClient.models.generateContent({
          model: "gemini-3.7-flash",
          contents: prompt,
          config: {
            responseMimeType: "application/json"
          }
        });
        break;
      } catch (err: any) {
        retries--;
        if (retries === 0) throw err;
        const errorMessage = err.message || "";
        if (errorMessage.includes("503") || errorMessage.includes("429") || errorMessage.includes("High demand") || errorMessage.includes("UNAVAILABLE")) {
          console.warn(`AI API overload detected. Retrying in ${delay}ms... (${retries} retries left)`);
          await new Promise(resolve => setTimeout(resolve, delay));
          delay *= 2;
        } else {
          throw err;
        }
      }
    }

    if (!response || !response.text) {
      throw new Error("Empty response from AI");
    }

    const jsonResult = JSON.parse(response.text);
    res.json(jsonResult);
  } catch (error: any) {
    console.error("AI Generation Error:", error);
    res.status(500).json({ error: error.message || "Failed to generate content" });
  }
});

function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/\"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function renderRouteSEO(html: string, pathname: string) {
  const seo = getRouteSEO(pathname);
  const title = escapeHtml(seo.title);
  const description = escapeHtml(seo.description);
  const canonical = escapeHtml(seo.canonical);

  return html
    .replace(/<title>[\s\S]*?<\/title>/i, `<title>${title}</title>`)
    .replace(/<meta name="description" content="[^"]*"\s*\/>/i, `<meta name="description" content="${description}" />`)
    .replace(/<meta property="og:title" content="[^"]*"\s*\/>/i, `<meta property="og:title" content="${title}" />`)
    .replace(/<meta property="og:description" content="[^"]*"\s*\/>/i, `<meta property="og:description" content="${description}" />`)
    .replace(/<meta property="og:url" content="[^"]*"\s*\/>/i, `<meta property="og:url" content="${canonical}" />`)
    .replace(/<meta name="twitter:title" content="[^"]*"\s*\/>/i, `<meta name="twitter:title" content="${title}" />`)
    .replace(/<meta name="twitter:description" content="[^"]*"\s*\/>/i, `<meta name="twitter:description" content="${description}" />`)
    .replace(/<link rel="canonical" href="[^"]*"\s*\/>/i, `<link rel="canonical" href="${canonical}" />`);
}

async function startServer() {
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    const indexPath = path.join(distPath, "index.html");
    const indexHtml = fs.readFileSync(indexPath, "utf-8");

    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.type("html").send(renderRouteSEO(indexHtml, req.path));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
