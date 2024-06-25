import { NextResponse } from "next/server";
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

    const llm = getLLM();

    const combineDocs = (docs) => {
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
      (prevResult) => prevResult.standalone_question,
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
        question: ({ original_input }) => original_input.question,
        convHistory: ({ original_input }) => original_input.conv_history,
        cropName: ({ original_input }) => original_input.cropName,
      },
      answerChain,
    ]);

    const response = await chain.invoke({
      question,
      conv_history: [],
      cropName: crop,
    });
    // convHistory.push(question);
    // convHistory.push(response);

    // console.log("HISTORY", convHistory);

    // const jsonStructure = convertToStructuredJSON3(response);
    // const jsonResponse = JSON.parse(response);
    // console.log("MAIN_RESPONSE:", { response });
    // const res=await retriever.invoke(question)
    // console.log(JSON.stringify(jsonStructure, null, 2));

    // console.log({ response });

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
    return NextResponse.json(resp);

    // const res = response.lc_kwargs.content;
  } catch (error) {
    console.log("[CONVERSATION_ERROR]", error);
    return new NextResponse("Internal server error");
  }
}
