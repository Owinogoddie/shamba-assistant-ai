"use client";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { useChat } from "ai/react";
import { useRef, useState, useEffect, ReactElement } from "react";
import type { FormEvent } from "react";

import { ChatMessageBubble } from "@/components/ChatMessageBubble";
import { IntermediateStep } from "./IntermediateStep";
import type { AgentStep } from "langchain/agents";
import { SVGLoader } from "./loader-svg";
import { Button } from "./ui/button";
import { Heading } from "@/app/(dashboard)/_components/heading";
import TextareaAutosize from 'react-textarea-autosize';
import { ArrowDownIcon, PlusIcon } from "lucide-react";
import { ChatScrollAnchor } from "./chat-scroll-anchor";

export function ChatWindow(props: {
  endpoint: string;
  emptyStateComponent: ReactElement;
  placeholder?: string;
  titleText?: string;
  emoji?: string;
  icon: React.ElementType; // Specify the type correctly
  showIngestForm?: boolean;
  showIntermediateStepsToggle?: boolean;
}) {
  const messageContainerRef = useRef<HTMLDivElement | null>(null);

  const {
    endpoint,
    emptyStateComponent,
    placeholder,
    titleText = "An LLM",
    showIngestForm,
    showIntermediateStepsToggle,
    emoji,
    icon: Icon // Use the icon as a component
  } = props;

  const [showIntermediateSteps, setShowIntermediateSteps] = useState(false);
  const [intermediateStepsLoading, setIntermediateStepsLoading] = useState(false);

  const {
    messages,
    input,
    setInput,
    handleInputChange,
    handleSubmit,
    isLoading: chatEndpointIsLoading,
    setMessages,
  } = useChat({
    api: endpoint,
    onResponse(response) {
      // No need to handle sources
    },
    streamMode: "text",
    onError: (e) => {
      toast(e.message, {
        theme: "dark",
      });
    },
  });

  useEffect(() => {
    if (messageContainerRef.current) {
      messageContainerRef.current.scrollTop = messageContainerRef.current.scrollHeight;
    }
  }, [messages]);

  async function sendMessage(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (messageContainerRef.current) {
      messageContainerRef.current.classList.add("grow");
    }
    if (!messages.length) {
      await new Promise((resolve) => setTimeout(resolve, 300));
    }
    if (chatEndpointIsLoading ?? intermediateStepsLoading) {
      return;
    }
    if (!showIntermediateSteps) {
      handleSubmit(e);
      // Some extra work to show intermediate steps properly
    } else {
      setIntermediateStepsLoading(true);
      setInput("");
      const messagesWithUserReply = messages.concat({
        id: messages.length.toString(),
        content: input,
        role: "user",
      });
      setMessages(messagesWithUserReply);
      const response = await fetch(endpoint, {
        method: "POST",
        body: JSON.stringify({
          messages: messagesWithUserReply,
          show_intermediate_steps: true,
        }),
      });
      const json = await response.json();
      setIntermediateStepsLoading(false);
      if (response.status === 200) {
        // Represent intermediate steps as system messages for display purposes
        const intermediateStepMessages = (json.intermediate_steps ?? []).map(
          (intermediateStep: AgentStep, i: number) => {
            return {
              id: (messagesWithUserReply.length + i).toString(),
              content: JSON.stringify(intermediateStep),
              role: "system",
            };
          }
        );
        const newMessages = messagesWithUserReply;
        for (const message of intermediateStepMessages) {
          newMessages.push(message);
          setMessages([...newMessages]);
          await new Promise((resolve) =>
            setTimeout(resolve, 1000 + Math.random() * 1000)
          );
        }
        setMessages([
          ...newMessages,
          {
            id: (
              newMessages.length + intermediateStepMessages.length
            ).toString(),
            content: json.output,
            role: "assistant",
          },
        ]);
      } else {
        if (json.error) {
          toast(json.error, {
            theme: "dark",
          });
          throw new Error(json.error);
        }
      }
    }
  }

  return (
    <div className="flex flex-col items-center p-4 md:p-8 rounded grow overflow-hidden min-h-full">
      <Heading
        bgColor="bg-emerald-500/10"
        iconColor="text-emerald-500"
        description="Chat with an expert to get what your farm needs"
        icon={Icon} // Render the icon component
        title={titleText}
      />
      {messages.length === 0 ? emptyStateComponent : ""}
      <div
        className="flex flex-col w-full overflow-auto transition-[flex-grow] ease-in-out bg-gray-900 p-4 rounded-lg shadow-inner flex-grow"
        ref={messageContainerRef}
      >
        {messages.length > 0
          ? messages.map((m, i) => {
              return m.role === "system" ? (
                <IntermediateStep key={m.id} message={m}></IntermediateStep>
              ) : (
                <ChatMessageBubble
                  key={m.id}
                  message={m}
                  aiEmoji={emoji}
                ></ChatMessageBubble>
              );
            })
          : ""}
        <ChatScrollAnchor trackVisibility={true} />
      </div>

      <div className="fixed inset-x-0 bottom-0 w-full bg-gradient-to-b from-muted/30 from-0% to-muted/30 to-50% duration-300 ease-in-out dark:from-background/10 dark:from-10% dark:to-background/80">
        <div className="mx-auto sm:max-w-2xl sm:px-4">
          <div className="px-4 flex justify-center flex-col py-2 space-y-4 border-t shadow-lg bg-background sm:rounded-t-xl sm:border md:py-4 bg-white">
            <form onSubmit={sendMessage} className="flex w-full flex-col items-center justify-center mt-auto">
              <div className="relative flex flex-col w-full overflow-hidden max-h-60 grow bg-background sm:rounded-md sm:border">
                <TextareaAutosize
                  tabIndex={0}
                  placeholder={placeholder ?? "What's it like to be a pirate?"}
                  className="min-h-[60px] w-full resize-none bg-transparent pl-4 pr-16 py-[1.3rem] focus-within:outline-none sm:text-sm"
                  autoFocus
                  spellCheck={false}
                  autoComplete="off"
                  autoCorrect="off"
                  rows={1}
                  value={input}
                  onChange={handleInputChange}
                />
                <div className="absolute right-0 top-4 sm:right-4">
                  <Button
                    type="submit"
                    size="icon"
                    disabled={input === ''}
                  >
                    <ArrowDownIcon className="w-5 h-5" />
                    <span className="sr-only">Send message</span>
                  </Button>
                </div>
              </div>
            </form>
            <Button
              variant="outline"
              size="lg"
              className="p-4 mt-4 rounded-full bg-background"
              onClick={e => {
                e.preventDefault();
                window.location.reload();
              }}
            >
              <PlusIcon className="w-5 h-5" />
              <span>New Chat</span>
            </Button>
          </div>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
}
