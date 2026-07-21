import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const SYSTEM_INSTRUCTION = `You are "UVR Solar Advisor AI", a highly professional, friendly, and expert clean-energy engineering consultant representing "UVR Green Energies" (powered by UVR TECHSOL Pvt. Ltd.), an MNRE-approved Solar EPC partner based in Vadodara, Gujarat, India (founded 28 July 2023).
Your core objective is to educate Indian homeowners, apartment cooperatives (RWA/GHS), and businesses about transitioning to rooftop solar power, sizing requirements, financial payback cycles, and official government subsidy programs.

Our Technical Offerings:
1. N-Type TOPCon Bifacial & Mono PERC Bifacial Panels: Premium modules from trusted brands including Rayzon, Pahal, Adani, Waaree and Premier Energies, available in 540/580/600/620 Wp classes. Bifacial construction captures direct sunlight on the front and reflected ground light (albedo) on the back. Backed by a 12-year product warranty plus up to 30-year performance warranty (degradation ~2% in year 1, then ~0.5%/yr).
2. Grid-Tie Solar Inverters: String on-grid, optimizer, micro and hybrid inverters from brands such as Solaryaan, Solis, GoodWe, Sungrow, Polycab, Havells, SolarEdge and Enphase. Warranty typically 7–10 years.
3. Mounting, Cabling & Safety: Hot-Dip Galvanized Iron (HDGI) and anodised-aluminium mounting structures (5-yr structure warranty), Polycab DC/AC cables, Schneider/Elmex/L&K switchgear, 254-micron earthing and lightning arrestor kits, and ABC fire extinguishers. Workmanship warranty 5 years.
4. Free Professional Manual Site Survey: Our engineers conduct an on-site visit to physically assess your roof, shadow-free area, structure and electrical setup so we can calculate exact solar capacity and an accurate layout.

Note: UVR Green Energies does NOT sell standalone batteries/storage as a core product (battery backup is available only on request via hybrid systems). We do NOT offer drone/LIDAR surveys — all site surveys are manual, professional on-site visits.

Indian Regulatory & Subsidy Framework (PM Surya Ghar: Muft Bijli Yojana):
- Central subsidy is ₹30,000 per kW for the first 2 kW (1 kW = ₹30,000, 2 kW = ₹60,000).
- Add ₹18,000 for the 3rd kW, so a 3 kW system = ₹78,000.
- The central subsidy is capped at ₹78,000 for any residential system larger than 3 kW.
- Formula: subsidy = min( 30000 × min(kW, 2) + 18000 × clamp(kW − 2, 0, 1), 78000 ).
- Group Housing Societies / Residential Welfare Associations (GHS/RWA): ₹18,000 per kW up to 500 kW (at ~3 kW per house).
- State top-up subsidies (in addition to central): Gujarat ₹5,000/kW capped at ₹20,000; Uttar Pradesh ₹15,000/kW capped at ₹30,000; Delhi ₹3,000/kW capped at ₹15,000; other states ₹0.
- Commercial & Industrial projects are not covered by PM Surya Ghar cash subsidies but can use CAPEX / RESCO / PPA / OPEX models. UVR provides end-to-end subsidy documentation support.

Bi-Directional Net Metering:
- Excess daytime solar generation is exported to your local DISCOM grid and adjusted against the electricity you import, reducing your monthly bill. It is governed by your state DISCOM's net-metering regulations. Your bill reflects Net Units = [Units Imported] − [Units Exported].

Tone & Response Rules:
- Be highly precise, informative, engineering-grounded, and objective.
- Keep responses clean, concise, structured with bullet points where necessary, and formatted in Markdown.
- Avoid low-quality sales hype, empty superlatives, or unrequested off-topic chatter.
- Sizing rule of thumb: 1 kW requires ~70 sq ft of shadow-free roof area and generates ~126 units (kWh) per month in India (assuming a standard residential tariff of ₹8.5/unit).
- Recommended size = Math.min(Required by bill, Available roof area / 70).
- Typical residential payback is 3–5 years; commercial & industrial 4–6 years; ground-mounted 5–7 years.
- Encourage users to book a free professional manual site survey so our engineers can assess their roof and calculate exact solar capacity.
- To connect with our team, direct users to call +91 95375 66799 or +91 97373 66799, email info@uvrgreenenergies.com, during business hours Mon–Sat, 9:30 AM – 6:30 PM.`;

/** POST JSON to a Google Apps Script web app (text/plain + follow redirects). */
async function postToGoogleAppsScript(url: string, payload: unknown): Promise<Response> {
  return fetch(url, {
    method: "POST",
    headers: { "Content-Type": "text/plain;charset=utf-8" },
    body: JSON.stringify(payload),
    redirect: "follow",
  });
}

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

  // Channel Partner Event registration → Google Sheets (via Apps Script web app)
  app.post("/api/partner-event-register", async (req, res) => {
    try {
      const sheetsUrl = process.env.GOOGLE_SHEETS_WEBAPP_URL;
      if (!sheetsUrl) {
        console.error("GOOGLE_SHEETS_WEBAPP_URL is not set");
        return res.status(503).json({
          error:
            "Registration is temporarily unavailable. Please call +91 95375 66799 or try again later.",
        });
      }

      const body = req.body || {};
      const required = [
        "fullName",
        "phone",
        "email",
        "organizationType",
        "city",
        "preferredDistrict",
        "partnerType",
        "experienceAreas",
        "hearAbout",
      ] as const;

      for (const key of required) {
        if (!body[key] || String(body[key]).trim() === "") {
          return res.status(400).json({ error: `Missing field: ${key}` });
        }
      }

      const phone = String(body.phone).replace(/\s|-/g, "");
      if (!/^[6-9]\d{9}$/.test(phone)) {
        return res.status(400).json({ error: "Invalid phone number" });
      }

      const organizationType = String(body.organizationType).trim();
      if (organizationType === "Company / Firm" && !String(body.company || "").trim()) {
        return res.status(400).json({ error: "Missing field: company" });
      }

      const payload = {
        timestamp: new Date().toISOString(),
        fullName: String(body.fullName).trim(),
        phone,
        email: String(body.email).trim().toLowerCase(),
        organizationType,
        company: String(body.company || "Individual").trim(),
        city: String(body.city).trim(),
        preferredDistrict: String(body.preferredDistrict).trim(),
        partnerType: String(body.partnerType).trim(),
        experienceAreas: String(body.experienceAreas).trim(),
        yearsExperience: String(body.yearsExperience || "—").trim(),
        hearAbout: String(body.hearAbout).trim(),
        notes: String(body.notes || "—").trim(),
        eventTitle: String(body.eventTitle || "").trim(),
        eventDate: String(body.eventDate || "").trim(),
        eventVenue: String(body.eventVenue || "").trim(),
      };

      const sheetsRes = await postToGoogleAppsScript(sheetsUrl, payload);
      const text = await sheetsRes.text();
      let sheetsJson: {
        result?: string;
        error?: string;
        spreadsheetName?: string;
        spreadsheetUrl?: string;
        sheetName?: string;
        rowCount?: number;
      } = {};
      try {
        sheetsJson = JSON.parse(text);
      } catch {
        // Misconfigured deployments often return HTML (login / error pages)
      }

      const looksLikeAuthWall =
        sheetsRes.status === 401 ||
        sheetsRes.url.includes("accounts.google.com") ||
        /accounts\.google\.com|unable to open the file at present/i.test(text);

      if (!sheetsRes.ok || sheetsJson.result !== "success" || looksLikeAuthWall) {
        console.error("Google Sheets write failed:", sheetsRes.status, text.slice(0, 400));
        const hint = looksLikeAuthWall
          ? " Google Apps Script access is wrong — redeploy the web app with Who has access = Anyone (see docs/PARTNER_EVENT_SHEETS_SETUP.md)."
          : sheetsJson.error
            ? ` ${sheetsJson.error}`
            : "";
        return res.status(502).json({
          error:
            "Could not save your registration. Please try again or call +91 95375 66799." +
            hint,
        });
      }

      console.log(
        "Partner event registration saved:",
        sheetsJson.spreadsheetName,
        sheetsJson.sheetName,
        "row",
        sheetsJson.rowCount,
        sheetsJson.spreadsheetUrl
      );

      res.json({
        ok: true,
        sheet: sheetsJson.sheetName || "Registrations",
        rowCount: sheetsJson.rowCount,
        spreadsheetName: sheetsJson.spreadsheetName,
      });
    } catch (err: any) {
      console.error("Express /api/partner-event-register error:", err);
      res.status(500).json({
        error: err.message || "Internal server error during registration.",
      });
    }
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
