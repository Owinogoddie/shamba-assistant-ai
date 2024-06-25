import { ChatGroq } from "@langchain/groq";
import { ChatPromptTemplate } from "@langchain/core/prompts";
import { conversationPrompt } from "./conversation-prompt";

export const generateConversation=async({input}:{input:any})=>{
    let res
    try {
      console.log(process.env.GROQ_API_KEY)
      const model = new ChatGroq({
        apiKey: process.env.GROQ_API_KEYy,
      });
     
      const prompt = ChatPromptTemplate.fromMessages([
        ["system", conversationPrompt],
        ["human", "{input}"],
      ]);
      const chain = prompt.pipe(model);
      const response = await chain.invoke({
        input
      });
      const res=response.lc_kwargs.content
      // console.log("response", res);
      return res
      
    } catch (error) {
      console.log(error.message)
      
    }
}