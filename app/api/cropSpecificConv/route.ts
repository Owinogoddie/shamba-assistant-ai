import { NextRequest, NextResponse } from "next/server";
import { PromptTemplate } from "@langchain/core/prompts";
import { StringOutputParser } from "@langchain/core/output_parsers";
import {
  RunnableSequence,
  RunnablePassthrough,
} from "@langchain/core/runnables";
import { getLLM } from "@/utils/getLLM";
import { cropSpecificPromptTemplate } from "@/utils/templates";
import { generateStandAloneQnChain } from "@/utils/gen-stand-alone-qn";
import { vectorRetriever } from "@/utils/vectorRetriever";
import { corsResponse } from "../cors";

interface RequestBody {
  messages: any[];
  question: string;
  crop: string;
}

export async function POST(req: NextRequest) {
  try {
    const body: RequestBody = await req.json();
    const { messages, question, crop } = body;
    console.log("CROP_CHOSEN 🌳🌳", crop);

    if (!messages) {
      return corsResponse({ error: "Messages are required" }, 400);
    }
    if (!question) {
      return corsResponse({ error: "Question is required" }, 400);
    }
    if (!crop) {
      return corsResponse({ error: "No crop chosen" }, 400);
    }

    const llm = getLLM();

    if (!llm) {
      return corsResponse({ error: "Messages are required" }, 400);
    }

    const combineDocs = (docs: any[]) => {
      return docs.map((doc) => doc.pageContent).join("\n\n");
    };

    // ANSWER TEMPLATE
    const answerTemplate = cropSpecificPromptTemplate;
    const answerPrompt = PromptTemplate.fromTemplate(answerTemplate);

    const standaloneQnchain = await generateStandAloneQnChain();
    const tableName = "coffee_documents";
    const queryName = "match_coffee_documents";
    const retriever = await vectorRetriever(tableName, queryName);
    const retrieverChain = RunnableSequence.from([
      (prevResult: any) => prevResult.standalone_question,
      retriever,
      combineDocs,
    ]);
    const answerChain = answerPrompt.pipe(llm).pipe(new StringOutputParser());

    const chain = RunnableSequence.from([
      {
        standalone_question: standaloneQnchain,
        original_input: new RunnablePassthrough(),
      },
      {
        documents: retrieverChain,
        question: ({ original_input }: any) => original_input.question,
        convHistory: ({ original_input }: any) => original_input.conv_history,
        cropName: ({ original_input }: any) => original_input.cropName,
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
    return corsResponse(resp);
  } catch (error) {
    console.log("[CONVERSATION_ERROR]", error);
    return corsResponse({ error: "Internal server error" }, 500);
  }
}

export async function OPTIONS(req: NextRequest) {
  return corsResponse({});
}
