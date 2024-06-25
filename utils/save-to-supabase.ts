import { SupabaseVectorStore } from "@langchain/community/vectorstores/supabase";
import { createClient } from "@supabase/supabase-js";
import { GoogleGenerativeAIEmbeddings } from "@langchain/google-genai";
import { TaskType } from "@google/generative-ai";
export const saveToSupabase = async (docs:any, table_name:string) => {
  const embeddings = new GoogleGenerativeAIEmbeddings({
    model: "embedding-001", // 768 dimensions
    taskType: TaskType.RETRIEVAL_DOCUMENT,
  });
  const supabaseAPIKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  const supabaseURL = process.env.SUPABASE_URL;

  const client = createClient(supabaseURL, supabaseAPIKey);

  try {
    await SupabaseVectorStore.fromDocuments(docs, embeddings, {
      client,
      tableName: table_name,
    });
    console.log("🤗😍🤑 WOOOOOHOOOO!!!!SUCCESSFULLY SAVED TO SUPABASE");
  } catch (error) {
    console.log("SAVE_TO_SUPABASE_ERROR", error.message);
    throw error;
  }
};
