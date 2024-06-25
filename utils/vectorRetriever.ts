import { SupabaseVectorStore } from "@langchain/community/vectorstores/supabase";
import { createClient } from "@supabase/supabase-js";
import { GoogleGenerativeAIEmbeddings } from "@langchain/google-genai";
import { TaskType } from "@google/generative-ai";

export const vectorRetriever = async ( tableName, queryName ) => {
  try {
    const embeddings = new GoogleGenerativeAIEmbeddings({
      model: "embedding-001", // 768 dimensions
      taskType: TaskType.RETRIEVAL_DOCUMENT,
    });
    const supabaseAPIKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
    const supabaseURL = process.env.SUPABASE_URL;

    const client = createClient(supabaseURL, supabaseAPIKey);

    const vectorStore = new SupabaseVectorStore(embeddings, {
      client,
      tableName,
      queryName,
    });

    const retriever = vectorStore.asRetriever();
    return retriever;
  } catch (error) {
    console.log("RETRIEVER_ERROR", error.message);
    throw error;
    F;
  }
};
