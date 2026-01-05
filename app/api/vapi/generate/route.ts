import { generateText } from "ai";
import { createOpenAI } from "@ai-sdk/openai";

const openai = createOpenAI({
  apiKey: process.env.OPENAI_API_KEY!,
  baseURL: process.env.OPENAI_BASE_URL!,
});

const model = openai("openai/gpt-4o-mini");

console.log(
  "🔥 OPENMOUTHED KEY:",
  process.env.OPENAI_API_KEY ? "FOUND" : "MISSING"
);

export async function GET() {
  return Response.json({ success: true, data: "API ALIVE" });
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { role = "Frontend Developer" } = body;

    const { text } = await generateText({
      model,
      temperature: 0,
      prompt: `
Return ONLY a JSON array.
Do NOT use markdown.
Do NOT use backticks.

Format exactly like this:
["Question 1", "Question 2", "Question 3"]

Role: ${role}
`,
    });

    // 🔥 CRITICAL FIX — STRIP MARKDOWN SAFELY
    const cleanText = text
      .replace(/```json/gi, "")
      .replace(/```/g, "")
      .trim();

    const questions = JSON.parse(cleanText);

    return Response.json({
      success: true,
      questions,
    });
  } catch (err) {
    console.error("❌ API ERROR:", err);
    return Response.json(
      { success: false, error: String(err) },
      { status: 500 }
    );
  }
}
