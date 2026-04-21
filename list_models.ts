import { GoogleGenerativeAI } from "@google/generative-ai";
import dotenv from "dotenv";

dotenv.config();

async function listModels() {
  const apiKey = process.env.NEXT_PUBLIC_GEMINI_API_KEY;
  if (!apiKey) {
    console.error("API key missing");
    return;
  }
  try {
    const response = await fetch(`https://generativelanguage.googleapis.com/v1/models?key=${apiKey}`);
    const data = await response.json();
    if (data.models) {
      console.log("AVAILABLE_MODELS_START");
      data.models.forEach((m: any) => console.log(m.name));
      console.log("AVAILABLE_MODELS_END");
    } else {
      console.log("ERROR_RESPONSE:", JSON.stringify(data));
    }
  } catch (error) {
    console.error("FETCH_ERROR:", error);
  }
}

listModels();
