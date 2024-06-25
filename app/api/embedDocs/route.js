import { prepareDocs } from "@/utils/prepareDocs";
import { saveToSupabase } from "@/utils/save-to-supabase";
import { NextResponse } from "next/server";

export async function POST(req) {
  console.log("HITTTTTTTTMAN");

  try {
    // const body = await req.json();
    // const { messages, input } = body;

    // if (!messages) {
    //   return new NextResponse("Messages are required");
    // }
    // if (!input) {
    //   return new NextResponse("Input are required");
    // }

    // const pdfUrl =
    //   "/BYTES/AI/farm-assistant-ai/public/coffee/Coffee-Manual-L.pdf";

    const chunkedDocs = await prepareDocs(pdfUrl);
    const supabaseTableName = "coffee_documents";
    // console.log(chunkedDocs);
    await saveToSupabase(chunkedDocs, supabaseTableName);
    return new NextResponse(
      "Haa congrats 🥤🥂🍻already chunked and saved to supabase again 😂😂"
    );
  } catch (error) {
    console.log("[EMBEDDING_DOCS_ERROR]", error);
    return new NextResponse("Internal server error");
  }
}
