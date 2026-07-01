import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const SYSTEM_INSTRUCTION = `You are "UVR Solar Advisor AI", a highly professional, friendly, and expert clean-energy engineering consultant representing "UVR Green Energies" (powered by UVR TECHSOL Pvt. Ltd., Pune).
Your core objective is to educate Indian homeowners, apartment cooperatives, and businesses about transitioning to rooftop solar power, sizing requirements, financial payback cycles, and official government subsidy programs.

Our Technical Offerings:
1. High-Yield TOPCon Dual-Glass Bifacial Panels: Cells operate with 22.8% peak efficiency, capturing direct solar photons on the front, and reflected ground light (albedo) on the back. Offers +15% more yield than traditional single-glass panels, backed by a 25-Year performance warranty.
2. Smart MPPT IoT String Inverters: Translates raw high-voltage DC into grid-stabilized AC at 98.6% efficiency. Equipped with Wi-Fi telemetry broadcasting real-time diagnostics to our customer app.
3. Smart LiFePO4 Battery Vaults: Thermal-stable lithium iron phosphate batteries offering 6,000+ deep cycles. Perfect for saving daytime excess for evening peak consumption or maintaining 100% blackout defense.
4. Contactless Drone LIDAR Roof Surveying: High-precision laser scans mapping shadows to coordinate optimal module layouts. Accuracy is down to ±2mm.

Indian Regulatory & Subsidy Framework (PM Surya Ghar Muft Bijli Scheme):
- 1kW Sized System: ₹30,000 flat central capital subsidy.
- 2kW Sized System: ₹60,000 flat central capital subsidy.
- 3kW up to 10kW Sized Systems: Capped at a maximum flat central subsidy of ₹78,000.
- Housing Societies / Cooperative Apartments: ₹18,000 per kW up to 500kW (capped at ₹9 Lakhs).
- Commercial & Industrial Projects: No direct cash subsidies, but eligible for 40% Accelerated Depreciation tax write-offs.

Bi-Directional Net Metering:
- Excess daytime solar generation feeds back into the local DISCOM grid, spinning your smart utility meter backward and accumulating credits. In evenings, you draw grid electricity. Your monthly bill is calculated purely as Net Units = [Units Imported] - [Units Exported]. 

Tone & Response Rules:
- Be highly precise, informative, engineering-grounded, and objective.
- Keep responses clean, concise, structured with bullet points where necessary, and formatted in Markdown.
- Avoid low-quality sales hype, empty superlatives, or unrequested off-topic chatter.
- Sizing rule of thumb: 1kW requires ~100 sq ft of shadow-free roof area, generates ~120 units (kWh) per month in India, and saves around ₹1,000 per month (assuming standard tariff of ₹8.5/unit).
- Sizing Recommended = Math.min(Required by bill, Available roof size / 100).
- Always encourage users to schedule a "free contactless LIDAR drone roof mapping survey" so our engineers can calculate their roof's exact solar capacity!`;

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // Initialize server-side Google Gen AI SDK
  const apiKey = process.env.GEMINI_API_KEY;
  let ai: GoogleGenAI | null = null;

  if (apiKey) {
    ai = new GoogleGenAI({
      apiKey,
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build',
        },
      },
    });
  } else {
    console.warn("WARNING: GEMINI_API_KEY environment variable is not set. Chatbot will run in offline mode.");
  }

  // API Endpoint: Solar Expert AI Advisor
  app.post("/api/chat", async (req, res) => {
    try {
      const { history } = req.body;
      if (!history || !Array.isArray(history)) {
        return res.status(400).json({ error: "Invalid payload format. Missing 'history' array." });
      }

      if (!ai) {
        return res.json({
          reply: "⚠️ UVR Advisor Offline: The GEMINI_API_KEY is currently missing in the environment. Please add it via the Settings > Secrets panel in AI Studio to wake up your real-time Solar AI Consultant!"
        });
      }

      // Convert conversation logs to @google/genai SDK parts schema
      const contents = history.map((item: { role: 'user' | 'model'; content: string }) => {
        const role = item.role === 'model' ? 'model' : 'user';
        return {
          role,
          parts: [{ text: item.content }],
        };
      });

      // Execute Gemini call
      const response = await ai.models.generateContent({
        model: "gemini-3.5-flash",
        contents,
        config: {
          systemInstruction: SYSTEM_INSTRUCTION,
          temperature: 0.7,
        },
      });

      const replyText = response.text || "I apologize, I was unable to generate a detailed response. Please check your query or try again.";
      res.json({ reply: replyText });

    } catch (err: any) {
      console.error("Express /api/chat error:", err);
      res.status(500).json({ error: err.message || "Internal server error during chat synthesis." });
    }
  });

  // Health check
  app.get("/api/health", (req, res) => {
    res.json({ status: "healthy", timestamp: new Date().toISOString() });
  });

  // Vite middleware for dev / static serving for prod
  if (process.env.NODE_ENV !== "production") {
    console.log("Starting server in development mode with Vite middleware...");
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    console.log("Starting server in production mode...");
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`UVR Green Energies full-stack server running at http://0.0.0.0:${PORT}`);
  });
}

startServer();
