import { courseOutline } from "@/configs/AIModel";
import { db } from "@/configs/db";
import { STUDY_MATERIAL_TABLE } from "@/configs/schema";
import { inngest } from "@/inngest/client";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { courseId, topic, courseType, difficultyLevel, createdBy } = await req.json();

    if (!process.env.NEXT_PUBLIC_GEMINI_API_KEY) {
      console.error("Missing NEXT_PUBLIC_GEMINI_API_KEY");
      return NextResponse.json(
        { error: "Internal Server Error: Missing AI API Key" },
        { status: 500 }
      );
    }

    const PROMPT =
      "Generate a study material for " +
      topic +
      " for " +
      courseType +
      " and level of difficulty will be " +
      difficultyLevel +
      " with summary of course, List of Chapters along with summary for each chapter, Topic list in each chapter in JSON format";

    let aiRes;
    let retries = 0;
    const maxRetries = 2;

    while (retries <= maxRetries) {
      try {
        aiRes = await courseOutline.sendMessage(PROMPT);
        break; // Success!
      } catch (error) {
        if (error instanceof Error && error.message.includes("429") && retries < maxRetries) {
          retries++;
          console.log(`Rate limit hit. Retrying in 2 seconds... (Attempt ${retries}/${maxRetries})`);
          await new Promise(resolve => setTimeout(resolve, 2000));
        } else {
          throw error; // Re-throw if not a 429 or max retries reached
        }
      }
    }

    if (!aiRes) throw new Error("Failed to get response from AI model");

    const aiResult = JSON.parse(aiRes.response.text());

    const dbResult = await db
      .insert(STUDY_MATERIAL_TABLE)
      .values({
        courseId: courseId,
        courseType: courseType,
        createdBy: createdBy,
        topic: topic,
        courseLayout: aiResult,
      })
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      .returning({ res: STUDY_MATERIAL_TABLE } as any);

    //Triggering the Inngest function
    await inngest.send({
      name: "notes.generate",
      data: {
        course: dbResult[0].res
      }
    });

    return NextResponse.json({ result: dbResult[0] });
  } catch (error) {
    console.error("Error in generate-course-outline:", error);
    return NextResponse.json(
      { error: "Failed to generate course outline", details: error instanceof Error ? error.message : String(error) },
      { status: 500 }
    );
  }
}