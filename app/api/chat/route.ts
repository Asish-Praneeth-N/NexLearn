import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextResponse } from "next/server";

const apiKey = process.env.NEXT_PUBLIC_GEMINI_API_KEY;

if (!apiKey) {
  throw new Error("NEXT_PUBLIC_GEMINI_API_KEY is not defined");
}

const genAI = new GoogleGenerativeAI(apiKey);

const model = genAI.getGenerativeModel({
  model: "gemini-2.0-flash",
});

const generationConfig = {
  temperature: 0.7,
  topP: 0.95,
  topK: 40,
  maxOutputTokens: 2048,
  responseMimeType: "text/plain",
};

export async function POST(req: Request) {
  try {
    const { message, context } = await req.json();

    if (!message) {
      return NextResponse.json(
        { error: "Message is required" },
        { status: 400 }
      );
    }

    const chat = model.startChat({
      generationConfig,
      history: [],
    });

    // Create a comprehensive prompt that includes context and instructions
    const prompt = `
You are a helpful AI study assistant. A student is asking about their course material. Here's the context from their current chapter:

CHAPTER CONTENT:
${context ? context.replace(/<[^>]*>/g, '').substring(0, 3000) : 'No context available'}

STUDENT QUESTION:
${message}

Please provide a helpful, accurate, and concise response based on the chapter content. If the question is not related to the provided content, politely redirect the student to ask about the current chapter material. Keep your response focused and educational.
    `;

    const result = await chat.sendMessage(prompt);
    const response = result.response;
    const text = response.text();

    return NextResponse.json({ message: text });
  } catch (error) {
    console.error("Chat API error:", error);
    return NextResponse.json(
      { error: "Failed to process chat message" },
      { status: 500 }
    );
  }
}