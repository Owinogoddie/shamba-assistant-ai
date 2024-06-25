import { PromptTemplate } from "@langchain/core/prompts";
import { StringOutputParser } from "@langchain/core/output_parsers";
import { getLLM } from "./getLLM";
export const generateStandAloneQnChain = async (question:string) => {
  try {
    const llm = getLLM();
    const stansAloneQnTemplate = `Given conversation history (if any) and a question, convert it to a standalone question. 
    question:{question}
    conversation history:{conv_history}    
    standalone question:`;
    const standaloneQnPropt = PromptTemplate.fromTemplate(stansAloneQnTemplate);
    const standaloneQnchain = standaloneQnPropt
      .pipe(llm)
      .pipe(new StringOutputParser());
    return standaloneQnchain;
  } catch (error) {
    console.log("GENERATE_STANDALONE_QN_CHAIN_ERROR", error.message);
    throw error;
  }
};
