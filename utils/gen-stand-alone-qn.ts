import { PromptTemplate } from "@langchain/core/prompts";
import { StringOutputParser } from "@langchain/core/output_parsers";
import { getLLM } from "./getLLM";
import { ChatGroq } from "@langchain/groq";

export const generateStandAloneQnChain = async (question: string) => {
  try {
    const llm: ChatGroq | undefined = getLLM();
    
    if (!llm) {
      throw new Error("LLM is undefined. Ensure getLLM() returns a valid instance.");
    }
    
    const stansAloneQnTemplate = `Given conversation history (if any) and a question, convert it to a standalone question. 
    question: {question}
    conversation history: {conv_history}    
    standalone question:`;
    
    const standaloneQnPrompt = PromptTemplate.fromTemplate(stansAloneQnTemplate);
    const standaloneQnChain = standaloneQnPrompt
      .pipe(llm)
      .pipe(new StringOutputParser());
      
    return standaloneQnChain;
  } catch (error:any) {
    console.log("GENERATE_STANDALONE_QN_CHAIN_ERROR", error.message);
    throw error;
  }
};
