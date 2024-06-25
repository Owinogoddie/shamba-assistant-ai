import { PDFLoader } from "@langchain/community/document_loaders/fs/pdf";
import { RecursiveCharacterTextSplitter } from "langchain/text_splitter";
import { TextLoader } from "langchain/document_loaders/fs/text";

export const prepareDocs = async (buffer: Buffer) => {
  // Create a blob from the buffer
  const blob = new Blob([buffer], { type: 'application/pdf' });

  // Use PDFLoader with the blob
  const loader = new PDFLoader(blob);
  
  const docs = await loader.load();

  // Split the docs
  const textSplitter = new RecursiveCharacterTextSplitter({
    chunkSize: 1000,
    chunkOverlap: 200,
  });

  const chunkedDocs = await textSplitter.splitDocuments(docs);

  return chunkedDocs;
};