import { createClient } from "@supabase/supabase-js";
import { NextResponse } from "next/server";

export const runtime = "edge";

export async function GET() {
  const client = createClient(
    process.env.SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  );

  try {
    const { data, error } = await client
      .from("coffee_documents")
      .select("id")
      .limit(1);

    if (error) throw error;
    return NextResponse.json(
      { message: "Supabase pinged successfully" },
      { 
        status: 200,
        headers: corsHeaders()
      }
    );
  } catch (error) {
    console.error("Error pinging Supabase:", error);
    return NextResponse.json(
      { error: "Failed to ping Supabase" },
      { 
        status: 500,
        headers: corsHeaders()
      }
    );
  }
}

export async function OPTIONS(request: Request) {
  return new Response(null, { headers: corsHeaders() });
}

// Import this from your existing cors.ts file
import { corsHeaders } from "../cors";