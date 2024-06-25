import { NextResponse } from "next/server";
import { PromptTemplate } from "@langchain/core/prompts";
import { ChatGoogleGenerativeAI } from "@langchain/google-genai";
import { StringOutputParser } from "@langchain/core/output_parsers";

import {
  RunnableSequence,
  RunnablePassthrough,
} from "@langchain/core/runnables";
// import { getLLM } from "@/utils/getLLM";
import {
  cropSpecificPromptTemplate,
  graderPromptTemplate,
  temp3,
} from "@/utils/templates";
import { generateStandAloneQnChain } from "@/utils/gen-stand-alone-qn";
import { vectorRetriever } from "@/utils/vectorRetriever";

export async function POST(req) {
  try {
    const body = await req.json();
    const { messages, question, crop } = body;
    console.log("CROP_CHOSEN 🌳🌳", crop);

    if (!messages) {
      return new NextResponse("Messages are required");
    }
    if (!question) {
      return new NextResponse("Question is required");
    }

    if (!crop) {
      return new NextResponse("No crop chosen");
    }

    // const llm = getLLM();
    const gemini = new ChatGoogleGenerativeAI({
      apiKey: process.env.GOOGLE_API_KEY,
      model: "gemini-pro",
      maxOutputTokens: 2048,
    });

    const combineDocs = (docs) => {
      return docs.map((doc) => doc.pageContent).join("\n\n");
    };

    // ANSWER TEMPLATE
    const answerTemplate = temp3;
    const answerPrompt = PromptTemplate.fromTemplate(answerTemplate);
    const graderPrompt = PromptTemplate.fromTemplate(graderPromptTemplate);

    const standaloneQnchain = await generateStandAloneQnChain();
    const tableName = "coffee_documents";
    const queryName = "match_coffee_documents";
    const retriever = await vectorRetriever(tableName, queryName);
    // console.log("COFFEE DOCUMENTS RETRIEBER",retriever)
    const retrieverChain = RunnableSequence.from([
      (prevResult) => prevResult.standalone_question,
      retriever,
      combineDocs,
    ]);
    const graderChain = graderPrompt.pipe(gemini).pipe(new StringOutputParser());
    const answerChain = answerPrompt.pipe(gemini).pipe(new StringOutputParser());

    const chain = RunnableSequence.from([
      {
        standalone_question: standaloneQnchain,
        original_input: new RunnablePassthrough(),
      },
      {
        documents: retrieverChain,
        question: ({ original_input }) => original_input.question,
        convHistory: ({ original_input }) => original_input.conv_history,
        cropName: ({ original_input }) => original_input.cropName,
      },
      async (inputs) => {
        const { documents, question, convHistory, cropName } = inputs;
        const graderResponse = await graderChain.invoke({
          question,
          documents,
        });
        console.log(graderResponse)
        if (graderResponse.trim().toLowerCase() === "no") {
          return {
            shouldContinue: false,
            message: "Hmmm. please 1. Try rephrasing your question to be more specific or 2. Provide additional details about your situation. "
          };
        } else {
          return { documents, question, convHistory, cropName };
        }
      },
      answerChain,
    ]);
    const response = await chain.invoke({
      question,
      conv_history: [],
      cropName: crop,
    });

    const resp = [
      {
        role: "user",
        content: question,
      },
      {
        role: "ai",
        content: response,
      },
    ];
    console.log(response);
    return NextResponse.json(resp);
  } catch (error) {
    console.log("[CONVERSATION_ERROR]", error);
    return new NextResponse("Internal server error");
  }
}
