"use client";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { useChat } from "ai/react";
import { useRef, useState, ReactElement } from "react";
import type { FormEvent } from "react";

import { ChatMessageBubble } from "@/components/ChatMessageBubble";
import { IntermediateStep } from "./IntermediateStep";
import type { AgentStep } from "langchain/agents";
import { SVGLoader } from "./loader-svg";
import { Button } from "./ui/button";
import { Heading } from "@/app/(dashboard)/_components/heading";
import { LucideIcon, MessageSquare } from "lucide-react";

interface ChatWindowProps {
  endpoint: string;
  emptyStateComponent: ReactElement;
  placeholder?: string;
  titleText: string;
  emoji?: string;
  icon: LucideIcon; // Specify the type correctly
  showIngestForm?: boolean;
  showIntermediateStepsToggle?: boolean;
}

export function ChatWindow({
  endpoint,
  emptyStateComponent,
  placeholder,
  icon,
  titleText,
  emoji,
  showIngestForm,
  showIntermediateStepsToggle,
}: ChatWindowProps) {
  const messageContainerRef = useRef<HTMLDivElement | null>(null);

  const [showIntermediateSteps, setShowIntermediateSteps] = useState(false);
  const [intermediateStepsLoading, setIntermediateStepsLoading] =
    useState(false);

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
    <div
      className={`flex flex-col items-center p-4 md:p-8 rounded grow overflow-hidden ${
        messages.length > 0 ? "" : ""
      } border-gray-700 shadow-lg`}
    >
      <Heading
        bgColor="bg-emerald-500/10"
        iconColor="text-emerald-500"
        description="Chat with the an expert to get what your farm needs"
        icon={icon}
        title={titleText}
      />
      {messages.length === 0 ? emptyStateComponent : ""}

      <div
        className="flex flex-col-reverse w-full mb-4 overflow-auto transition-[flex-grow] ease-in-out bg-background p-4 rounded-lg shadow-inner"
        ref={messageContainerRef}
      >
        {messages.length > 0
          ? [...messages].reverse().map((m, i) => {
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
      </div>

      <form
        onSubmit={sendMessage}
        className="flex w-full flex-col items-center justify-center"
      >
        <div className="flex w-full mt-4">
          <input
            className="grow mr-4 p-2 rounded text-black shadow-lg focus:outline-none focus:ring-2 "
            value={input}
            placeholder={placeholder ?? "What's it like to be a pirate?"}
            onChange={handleInputChange}
          />
          <Button type="submit">
            <div
              role="status"
              className={`${
                chatEndpointIsLoading || intermediateStepsLoading
                  ? ""
                  : "hidden"
              } flex justify-center`}
            >
              <SVGLoader />
              <span className="sr-only">Loading...</span>
            </div>
            <span
              className={
                chatEndpointIsLoading || intermediateStepsLoading
                  ? "hidden"
                  : ""
              }
            >
              Send
            </span>
          </Button>
        </div>
      </form>
      <ToastContainer />
    </div>
  );
}
