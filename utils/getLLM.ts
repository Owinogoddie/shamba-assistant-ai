import { ChatGroq } from "@langchain/groq";
// import { ChatGoogleGenerativeAI } from "@langchain/google-genai";
// import { HarmBlockThreshold, HarmCategory } from "@google/generative-ai";

export const getLLM = () => {
  try {
    const llm = new ChatGroq({
      apiKey: process.env.GROQ_API_KEY,
    });
    return llm
    // const model = new ChatGoogleGenerativeAI({
    //   model: "gemini-pro",
    //   maxOutputTokens: 2048,
    //   safetySettings: [
    //     {
    //       category: HarmCategory.HARM_CATEGORY_HARASSMENT,
    //       threshold: HarmBlockThreshold.BLOCK_LOW_AND_ABOVE,
    //     },
    //   ],
    // });
    // return model;
  } catch (error:any) {
    console.log("GET_LLM_ERROR", error.message);
  }
};
