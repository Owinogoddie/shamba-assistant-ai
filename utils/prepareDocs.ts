import { PDFLoader } from "langchain/document_loaders/fs/pdf";
import { RecursiveCharacterTextSplitter } from "langchain/text_splitter";
export const prepareDocs = async (pdfUrl:string) => {
  const loader = new PDFLoader(pdfUrl);
  const docs = await loader.load();
  // const text_splitter = new RecursiveCharacterTextSplitter({
  //   chunkSize: 1000,
  //   // separators: ["\n\n", "\n", "."],
  //   chunkOverlap: 50,
  // });
  const text_splitter = new RecursiveCharacterTextSplitter();
  const chunkedDocs = await text_splitter.splitDocuments(docs);
  // console.log("loader",docs);
  return chunkedDocs;
};
