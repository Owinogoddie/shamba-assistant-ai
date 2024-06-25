import { NextResponse } from "next/server";
import { ChatGoogleGenerativeAI } from "@langchain/google-genai";
import { HumanMessage } from "@langchain/core/messages";

export async function POST(req) {
  const body = await req.json();
  const { imageBuffer, text } = body;

  try {
    const vision = new ChatGoogleGenerativeAI({
      apiKey: process.env.GOOGLE_API_KEY,
      model: "gemini-pro-vision",
      maxOutputTokens: 2048,
    });

    const input = [
      new HumanMessage({
        content: [
          {
            type: "text",
            text: "You are an expertise in plant diseases, detection, prevention and cure.Given an image, analyze it carefully. If it is a plant image analyze any diseases on it, name the disease, describe it, its causes, prevention and cure. if it doesnt have any infection, tell the user in a polite manner and when it is infected, your result should have: disease name, description,causes, and cure, each in a separate paragraph. in a new line, each paragraph with a heading, e.g introduction,description,causes,prevention,cure, etc in bold. please, use numbering whenever possible If not a plant, reply accordingly in a polite manner saying you are only an expert in plant diseases.",
          },
          {
            type: "image_url",
            image_url: `data:image/png;base64,${imageBuffer}`,
          },
        ],
      }),
    ];
    const response = await vision.invoke(input);

    console.log(response.content);

    return new NextResponse(response.content, { status: 200 });
  } catch (error) {
    console.log("ERROR_ON_MULTIMODAL", error.message);
    return new NextResponse("Internal server error", { status: 500 });
  }
}
