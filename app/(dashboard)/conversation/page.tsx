"use client";
import React, { useEffect, useState } from "react";
import { ChatWindow } from "@/components/ChatWindow";
import { MessageSquare } from "lucide-react";
import { Empty } from "../_components/empty";

import { SelectModal } from "./_components/select-modal";
import { useDialogStore } from "@/hooks/useDialog";

export default function ConversationPage() {
  const { value, setValue } = useDialogStore();
  const [endpoint, setEndpoint] = useState("");
  const [title, setTitle] = useState("");
  const [placehold, setPlaceholder] = useState("");
  useEffect(() => {
    if (value === "general") {
      setEndpoint("/api/general-crops");
      setPlaceholder("Ask me anything in agriculture")
      setTitle("Your Agriculture assistant at hand")
    } else {
      setEndpoint("/api/chat");
      setPlaceholder('Ask me anything concerning coffee, "....."')
      setTitle("Your cofee farming assistant at hand")
    }
  }, [value, setValue]);
  // let apiEndpoint;

  return (
    <>
      <SelectModal />
      <div className="bg-gray-100 min-h-full">
        <div className="w-full md:max-w-5xl mx-auto">
          <ChatWindow
            endpoint={endpoint}
            emptyStateComponent={<Empty />}
            showIngestForm={true}
            placeholder={placehold}
            emoji="👮‍♂️"
            titleText={title}
            icon={MessageSquare}
          />
        </div>
      </div>
    </>
  );
}
