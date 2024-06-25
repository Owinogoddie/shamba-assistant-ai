import { BotAvatar } from "@/app/(dashboard)/_components/bot-avatar";
import type { Message } from "ai/react";

export function ChatMessageBubble(props: { message: Message, aiEmoji?: string, sources?: any[] }) {
  const colorClassName =
    props.message.role === "user" ? "bg-gray-200 text-black border border-black/10" : "bg-muted";
  const alignmentClassName =
    props.message.role === "user" ? "ml-auto" : "mr-auto";
  const prefix = props.message.role === "user" ? "🧑" : <BotAvatar/>;

  return (
    <div
      className={`${alignmentClassName} ${colorClassName} rounded-lg p-2 my-2 flex items-start gap-x-8`}
    >
      <div className="mr-2">
        {prefix}
      </div>
      <div className="whitespace-pre-wrap flex flex-col">
        <span>{props.message.content}</span>
        {props.sources && props.sources.length ? (
          <>
            <code className="mt-4 mr-auto bg-gray-700 px-2 py-1 rounded shadow-md">
              <h2>
                🔍 Sources:
              </h2>
            </code>
            <code className="mt-1 mr-2 bg-gray-700 px-2 py-1 rounded text-xs shadow-md">
              {props.sources?.map((source, i) => (
                <div className="mt-2" key={"source:" + i}>
                  {i + 1}. &quot;{source.pageContent}&quot;{
                    source.metadata?.loc?.lines !== undefined
                      ? <div><br/>Lines {source.metadata?.loc?.lines?.from} to {source.metadata?.loc?.lines?.to}</div>
                      : ""
                    }
                </div>
              ))}
            </code>
          </>
        ) : ""}
      </div>
    </div>
  );
}
