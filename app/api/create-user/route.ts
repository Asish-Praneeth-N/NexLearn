import { inngest } from "@/inngest/client";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { user } = await req.json();

  if (!process.env.INNGEST_EVENT_KEY) {
    console.error("Missing INNGEST_EVENT_KEY environment variable");
    return NextResponse.json(
      { error: "Internal Server Error: Missing Event Key" },
      { status: 500 }
    );
  }

  try {
    const result = await inngest.send({
      name: "user.create",
      data: {
        user: user,
      },
    });
    return NextResponse.json({ result });
  } catch (error) {
    console.error("Inngest Error:", error);
    return NextResponse.json(
      { error: "Failed to send event to Inngest" },
      { status: 500 }
    );
  }
}
