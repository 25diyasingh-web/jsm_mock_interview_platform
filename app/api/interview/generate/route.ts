import { generateText } from "ai";
import { createOpenAI } from "@ai-sdk/openai";
import { NextResponse } from "next/server";
import connectDB from "@/lib/db";
import Interview from "@/lib/models/Interview";
import { getRandomInterviewCover } from "@/lib/utils";

const openai = createOpenAI({
  apiKey: process.env.OPENAI_API_KEY!,
});

const model = openai("gpt-4o-mini");

export async function POST(req: Request) {
  try {
    await connectDB();

    const {
      role,
      type,
      level,
      techstack,
      amount,
      userId,
    } = await req.json();

    if (!role || !type || !level || !techstack || !amount || !userId) {
      return NextResponse.json(
        { message: "Missing required fields" },
        { status: 400 }
      );
    }

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

    const interview = await Interview.create({
      role,
      type,
      level,
      techstack: techstack.split(",").map((t: string) => t.trim()),
      questions,
      userId,
      finalized: true,
      coverImage: getRandomInterviewCover(),
      createdAt: new Date(),
    });

    return NextResponse.json(
      {
        success: true,
        interviewId: interview._id.toString(),
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("❌ INTERVIEW GENERATION ERROR:", error);
    return NextResponse.json(
      { message: "Failed to generate interview" },
      { status: 500 }
    );
  }
}
