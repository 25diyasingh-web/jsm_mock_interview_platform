import { NextResponse } from "next/server";
import connectDB from "@/lib/db";
import Interview from "@/lib/models/Interview";

export async function GET() {
  try {
    await connectDB();

    // TEMP: until auth is wired
    const userId = "656a9f8b9c1e8a0012a3b456";

    const interviews = await Interview.find({ userId })
      .sort({ createdAt: -1 });

    return NextResponse.json(interviews);
  } catch (err) {
    return NextResponse.json(
      { error: "Failed to fetch interviews" },
      { status: 500 }
    );
  }
}
