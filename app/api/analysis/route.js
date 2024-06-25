import { NextResponse } from "next/server";
import { PromptTemplate } from "@langchain/core/prompts";
import { StringOutputParser } from "@langchain/core/output_parsers";

import {
  RunnableSequence,
  RunnablePassthrough,
} from "@langchain/core/runnables";
import { getLLM } from "@/utils/getLLM";
import { soilAnalysisTemplate2 } from "@/utils/templates";
import { generateStandAloneQnChain } from "@/utils/gen-stand-alone-qn";
import { vectorRetriever } from "@/utils/vectorRetriever";

export async function POST(req) {
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

    if (
      !ph_level ||
      !nitrogen ||
      !phosphorus ||
      !potassium ||
      !organic_matter ||
      !texture ||
      convHistory ||
      !crop_planned
    ) {
      return new NextResponse("All fields are required");
    }

    // const json=convertToJSON(stringResponse)
    // const json=convertToStructuredJSON3(stringResponse)

    // console.log(response)
    // const chunkedDocs=await prepareDocs()
    // console.log(chunkedDocs)
    // await saveToSupabase(chunkedDocs)

    const llm = getLLM();

    const combineDocs = (docs) => {
      return docs.map((doc) => doc.pageContent).join("\n\n");
    };

    // ANSWER TEMPLATE
    const answerTemplate = soilAnalysisTemplate2;
    const answerPrompt = PromptTemplate.fromTemplate(answerTemplate);

    const standaloneQnchain = await generateStandAloneQnChain();
    const tableName="documents" ;
    const queryName="match_documents";

    const retriever = await vectorRetriever(tableName,queryName);
    const retrieverChain = RunnableSequence.from([
      (prevResult) => prevResult.standalone_question,
      retriever,
      combineDocs,
    ]);
    const answerChain = answerPrompt.pipe(llm).pipe(new StringOutputParser());
    // const answerChain2 = answerPrompt.pipe(llm)

    const chain = RunnableSequence.from([
      {
        standalone_question: standaloneQnchain,
        original_input: new RunnablePassthrough(),
      },
      {
        context: retrieverChain,
        question: ({ original_input }) => original_input.question,
        conv_history: ({ original_input }) => original_input.conv_history,
      },
      answerChain,
    ]);

    const question = `Generate a comprehensive recommendation  for pH Level: ${ph_level}, Nitrogen (N): ${nitrogen} ppm, Phosphorus (P): ${phosphorus} ppm, Potassium (K): ${potassium} ppm, Organic Matter: ${organic_matter}%, Soil Texture: ${texture}, Crop Planned: ${crop_planned}, mentioning the planned crop in the report, severally and producing the required format`;
    const question2 =
      "Regenerate, mentioning the planned crop in the report, severally and producing the required format";
    // const standaloneqn = await standaloneQnchain.invoke({ question });
    // console.log("STANDALONEQN",standaloneqn);

    const response = await chain.invoke({
      question: question,
      conv_history: [],
    });
    // convHistory.push(question);
    // convHistory.push(response);

    // console.log("HISTORY", convHistory);

    // const jsonStructure = convertToStructuredJSON3(response);
    // const jsonResponse = JSON.parse(response);
    // console.log("MAIN_RESPONSE:", { response });
    // const res=await retriever.invoke(question)
    // console.log(JSON.stringify(jsonStructure, null, 2));

    console.log({ response });
    return NextResponse.json(response);

    // const res = response.lc_kwargs.content;
  } catch (error) {
    console.log("[CONVERSATION_ERROR]", error);
    return new NextResponse("Internal server error");
  }
}
