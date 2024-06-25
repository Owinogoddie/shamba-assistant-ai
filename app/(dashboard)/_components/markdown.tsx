import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

export const Markdown = ({ content }:{content:any}) => (
  <ReactMarkdown
    className="prose mt-1 w-full break-words prose-p:leading-relaxed  py-3 px-3 mark-down"
    remarkPlugins={[remarkGfm]}
    components={{
      a: ({ node, ...props }) => (
        <a {...props} style={{ color: "#27afcf", fontWeight: "bold" }} />
      ),
      h1: ({ node, ...props }) => (
        <h1 style={{ fontWeight: "bold" }} {...props} />
      ),
      h2: ({ node, ...props }) => (
        <h2 style={{ fontWeight: "bold" }} {...props} />
      ),
      strong: ({ node, ...props }) => (
        <strong style={{ fontWeight: "bold" }} {...props} />
      ),

    //   li: ({ node, ordered, index, ...props }) => {
    //     const number = typeof index === 'number' ? index + 1 : 0;
    //       return (
    //         <li>
    //           {!ordered ? `${number}. ` : `*`}
    //           {props.children}
    //         </li>
    //       );
    //     }
    }}
  >
    {content}
  </ReactMarkdown>
);
