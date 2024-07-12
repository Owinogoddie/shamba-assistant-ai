import { NextRequest, NextResponse } from "next/server";
import { ChatPromptTemplate } from "@langchain/core/prompts";
import { ChatGroq } from "@langchain/groq";
import { conversationPrompt } from "@/utils/conversation-prompt";
import { corsResponse } from "../cors";

interface RequestBody {
  messages: any[];
  input: string;
}

export async function POST(req: NextRequest) {
  try {
    const body: RequestBody = await req.json();
    const { messages, input } = body;

    if (!messages) {
      return corsResponse({ error: "Messages are required" }, 400);
    }
    if (!input) {
      return corsResponse({ error: "Input is required" }, 400);
    }

    const model = new ChatGroq({
      apiKey: process.env.GROQ_API_KEY,
      streaming: true,
    });
    const prompt = ChatPromptTemplate.fromMessages([
      ["system", conversationPrompt],
      ["human", "{input}"],
    ]);

    const chain = prompt.pipe(model);
    const response = await chain.invoke({
      input,
      convHistory: messages,
    });

    const resp = [
      {
        role: "user",
        content: input,
      },
      {
        role: "ai",
        content: response.lc_kwargs.content,
      },
    ];
    console.log("RESPONSE", resp);

    return corsResponse(resp);
  } catch (error) {
    console.log("[CONVERSATION_ERROR]", error);
    return corsResponse({ error: "Internal server error" }, 500);
  }
}

export async function OPTIONS(req: NextRequest) {
  return corsResponse({});
}
