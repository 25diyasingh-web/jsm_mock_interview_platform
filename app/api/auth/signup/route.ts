import { NextResponse } from "next/server";
import { signIn } from "@/lib/controllers/auth.controller";
import connectDB from "@/lib/db";

export async function POST(req: Request) {
  await connectDB();

  const body = await req.json();

  let response: NextResponse | null = null;

  const mockReq = { body };

  const mockRes = {
    status(code: number) {
      return {
        json(data: unknown) {
          response = NextResponse.json(data, { status: code });
        },
      };
    },
  };

  await signIn(mockReq as unknown, mockRes as unknown);

  return (
    response ??
    NextResponse.json(
      { message: "Controller did not return a response" },
      { status: 500 }
    )
  );
}
