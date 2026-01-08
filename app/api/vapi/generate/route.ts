import { generateText } from "ai";
import { createOpenAI } from "@ai-sdk/openai";
import { getRandomInterviewCover } from "@/lib/utils";
import { cookies } from "next/headers";
import { verifyJWT } from "@/lib/auth";
import connectDB from "@/lib/db";
import Interview from "@/lib/models/Interview";


const openai = createOpenAI({
  apiKey: process.env.OPENAI_API_KEY!,
});

const model = openai("gpt-4o-mini");

export async function POST(req: Request) {
  try {
    await connectDB();

    const {
      type,
      role,
      level,
      techstack,
      amount,
      userId,
    } = await req.json();

    const { text } = await generateText({
      model,
      temperature: 0.2,
      prompt: `
Return ONLY a JSON array.
No markdown. No backticks.

Role: ${role}
Level: ${level}
Tech stack: ${techstack}
Focus: ${type}
Count: ${amount}

Format:
["Question 1", "Question 2"]
`,
    });

    const questions = JSON.parse(
      text.replace(/```json|```/gi, "").trim()
    );

    const interview = {
      role,
      type,
      level,
      techstack: techstack.split(",").map((t: string) => t.trim()),
      questions,
      userId,
      finalized: true,
      coverImage: getRandomInterviewCover(),
      createdAt: new Date(),
    };

await Interview.create(interview);


    return Response.json({ success: true }, { status: 200 });
  } catch (error) {
    console.error("❌ ERROR:", error);
    return Response.json(
      { success: false, error: String(error) },
      { status: 500 }
    );
  }
}
