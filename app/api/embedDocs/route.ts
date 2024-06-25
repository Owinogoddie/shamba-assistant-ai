import { NextRequest, NextResponse } from 'next/server';
import { prepareDocs } from "@/utils/prepareDocs";
import { saveToSupabase } from "@/utils/save-to-supabase";

export const runtime = 'nodejs'; // Use Node.js runtime

export async function POST(req: NextRequest) {
  console.log("Processing document upload");

  try {
    const formData = await req.formData();
    const files = formData.getAll('documents') as File[];

    if (files.length === 0) {
      return NextResponse.json({ error: "No files uploaded" }, { status: 400 });
    }

    const supabaseTableName = "coffee_documents";

    for (const file of files) {
      const bytes = await file.arrayBuffer();
      const buffer = Buffer.from(bytes);

      const chunkedDocs = await prepareDocs(buffer);
      await saveToSupabase(chunkedDocs, supabaseTableName);
    }

    return NextResponse.json({ message: "Documents successfully processed and saved to Supabase" }, { status: 200 });
  } catch (error:any) {
    console.error("[PROCESSING_ERROR]", error);
    return NextResponse.json({ error: "Error processing documents", details: error.message }, { status: 500 });
  }
}