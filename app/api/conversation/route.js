import { NextResponse } from "next/server";
import { ChatPromptTemplate } from "@langchain/core/prompts";
import { ChatGroq } from "@langchain/groq";
import { conversationPrompt } from "@/utils/conversation-prompt";


export async function POST(req) {
  try {
    const body = await req.json();
    const { messages, input } = body;

    if (!messages) {
      return new NextResponse("Messages are required");
    }
    if (!input) {
      return new NextResponse("Input are required");
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
  
    const resp=[
        {
            role:"user",
            content:input
        },
        {
            role:"ai",
            content:response.lc_kwargs.content
        }
    ]
    // console.log("RESPONSE",response)
    console.log("RESPONSE",resp);

    return NextResponse.json(resp)

    // const res = response.lc_kwargs.content;
  } catch (error) {
    console.log("[CONVERSATION_ERROR]", error);
    return new NextResponse("Internal server error");
  }
}
