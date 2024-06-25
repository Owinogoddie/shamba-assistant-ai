import { NextRequest, NextResponse } from "next/server";
import { Message as VercelChatMessage, StreamingTextResponse } from "ai";

import { createClient } from "@supabase/supabase-js";

import { ChatGroq } from "@langchain/groq";
import { PromptTemplate } from "@langchain/core/prompts";
import { SupabaseVectorStore } from "@langchain/community/vectorstores/supabase";
import { Document } from "@langchain/core/documents";
import { RunnableSequence } from "@langchain/core/runnables";
import { ChatGoogleGenerativeAI, GoogleGenerativeAIEmbeddings } from "@langchain/google-genai";
import { TaskType } from "@google/generative-ai";
import {
  BytesOutputParser,
  StringOutputParser,
} from "@langchain/core/output_parsers";

export const runtime = "edge";

const combineDocumentsFn = (docs: Document[]) => {
  const serializedDocs = docs.map((doc) => doc.pageContent);
  return serializedDocs.join("\n\n");
};

const formatVercelMessages = (chatHistory: VercelChatMessage[]) => {
  const formattedDialogueTurns = chatHistory.map((message) => {
    if (message.role === "user") {
      return `Human: ${message.content}`;
    } else if (message.role === "assistant") {
      return `Assistant: ${message.content}`;
    } else {
      return `${message.role}: ${message.content}`;
    }
  });
  return formattedDialogueTurns.join("\n");
};

const CONDENSE_QUESTION_TEMPLATE = `Given the following conversation and a follow up question, rephrase the follow up question to be a standalone question, in its original language.

<chat_history>
  {chat_history}
</chat_history>

Follow Up Input: {question}
Standalone question:`;
const condenseQuestionPrompt = PromptTemplate.fromTemplate(
  CONDENSE_QUESTION_TEMPLATE,
);

const ANSWER_TEMPLATE = `
You are a knowledgeable and helpful agricultural support bot. Your role is to provide a comprehensive analysis of soil test results. When presented with soil data, you will interpret the results and offer tailored recommendations for enhancing soil health and crop yield. If the data is incomplete or unclear, politely request additional information. If the answer is not given in the context, find it in the conversation history if possible. Avoid making up answers. Always provide guidance that aligns with sustainable farming practices and the latest agronomic research.
Answer the question based only on the following information and chat history:
<information>
  {information}
</information>

<chat_history>
  {chat_history}
</chat_history>

Question: {question}
Guidelines:
1. **Interpret Data Keenly**: When presented with crop data, analyze it thoroughly and provide necessary insights. If the question is incomplete or unclear, politely request additional information from the user. and avoid giving answers like 'according to the context i have been given,...'

2. If the answer isn't explicitly given in the information, refer to the conversation history if possible. Avoid making up answers and if no answer, reply to the user in kindness that you are not familiar with the concept.
what to avoid
PLEASE avoid stating statements like: Based on the context provided and the instructions you've given, or 'according to the context i have been given,...' 
include Nutrient Analysis,Soil pH Assessment,Soil Health Enhancements,Crop-Specific Insights,Ongoing Monitoring
`;
const answerPrompt = PromptTemplate.fromTemplate(ANSWER_TEMPLATE);

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const {
        ph_level,
        nitrogen,
        phosphorus,
        potassium,
        organic_matter,
        texture,
        crop_planned,
        convHistory,
      } = body;
  
    //   if (
    //     !ph_level ||
    //     !nitrogen ||
    //     !phosphorus ||
    //     !potassium ||
    //     !organic_matter ||
    //     !texture ||
    //     convHistory ||
    //     !crop_planned
    //   ) {
    //     return new NextResponse("All fields are required");
    //   }
    // console.log(body)
    const messages = body.messages ?? [];
    const previousMessages = messages.slice(0, -1);
    const currentMessageContent = messages[messages.length - 1].content;

    const model = new ChatGroq({
      apiKey: process.env.GROQ_API_KEY,
    });
    // const model = new ChatGoogleGenerativeAI({
    //   apiKey: process.env.GOOGLE_API_KEY,
    //   model: "gemini-1.5-flash",
    //   maxOutputTokens: 2048,
    // });
    const client = createClient(
      process.env.SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!,
    );
    const embeddings = new GoogleGenerativeAIEmbeddings({
      model: "embedding-001", // 768 dimensions
      taskType: TaskType.RETRIEVAL_DOCUMENT,
    });
    const vectorstore = new SupabaseVectorStore(embeddings, {
      client,
      tableName: "documents",
      queryName: "match_documents",
    });

   
    const standaloneQuestionChain = RunnableSequence.from([
      condenseQuestionPrompt,
      model,
      new StringOutputParser(),
    ]);

    let resolveWithDocuments: (value: Document[]) => void;
    const documentPromise = new Promise<Document[]>((resolve) => {
      resolveWithDocuments = resolve;
    });

    const retriever = vectorstore.asRetriever({
      callbacks: [
        {
          handleRetrieverEnd(documents) {
            resolveWithDocuments(documents);
          },
        },
      ],
    });

    const retrievalChain = retriever.pipe(combineDocumentsFn);

    const answerChain = RunnableSequence.from([
      {
        information: RunnableSequence.from([
          (input) => input.question,
          retrievalChain,
        ]),
        chat_history: (input) => input.chat_history,
        question: (input) => input.question,
      },
      answerPrompt,
      model,
    ]);

    const conversationalRetrievalQAChain = RunnableSequence.from([
      {
        question: standaloneQuestionChain,
        chat_history: (input) => input.chat_history,
      },
      answerChain,
      new BytesOutputParser(),
    ]);

    const stream = await conversationalRetrievalQAChain.stream({
      question: currentMessageContent,
      chat_history: formatVercelMessages(previousMessages),
    });

    // const documents = await documentPromise;
    // const serializedSources = Buffer.from(
    //   JSON.stringify(
    //     documents.map((doc) => {
    //       return {
    //         pageContent: doc.pageContent.slice(0, 50) + "...",
    //         metadata: doc.metadata,
    //       };
    //     }),
    //   ),
    // ).toString("base64");

    return new StreamingTextResponse(stream, {
      headers: {
        "x-message-index": (previousMessages.length + 1).toString(),
        // "x-sources": serializedSources,
      },
    });
  } catch (e: any) {
    return NextResponse.json({ error: e.message }, { status: e.status ?? 500 });
  }
}
