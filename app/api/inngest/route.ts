import { serve } from "inngest/next";
import { inngest } from "../../../inngest/client";
import { CreateNewUser, GenerateNotes, GenerateStudyContent, helloWorld } from "@/inngest/functions";

export const { GET, POST, PUT } = serve({
  client: inngest,
  baseUrl: "https://nex-lrn.vercel.app",
  functions: [
    helloWorld,
    CreateNewUser,
    GenerateNotes,
    GenerateStudyContent
  ],
});