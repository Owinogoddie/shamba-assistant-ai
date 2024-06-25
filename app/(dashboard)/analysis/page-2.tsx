"use client";

import React, { useState } from "react";
import { Heading } from "../_components/heading";
import { MessageSquare } from "lucide-react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import { Empty } from "../_components/empty";
import { Loader } from "../_components/loader";
import { Markdown } from "../_components/markdown";
import { ReportModal } from "../_components/report-modal";
import AnalysisForm from "./_components/analysis-form";

type MessageType = {
  content: string;
};

const AnalysisPage: React.FC = () => {
  const [history, setHistory] = useState<MessageType[]>([]);
  const [messages, setMessages] = useState<MessageType[] | undefined>();
  const [loading, setLoading] = useState<boolean>(false);
  const [formValues, setFormValues] = useState({
    ph_level: 0,
    nitrogen: 0,
    phosphorus: 0,
    potassium: 0,
    organic_matter: "",
    texture: "",
    crop_planned: "",
  });

  const router = useRouter();

 

  const onSubmit = async (values: typeof formValues) => {
    try {
      setLoading(true);
      setFormValues(values)
      // const response = await axios.post("/api/analysis", {
      //   ...values,
      //   history,
      // });
      // setHistory((prev) => [...response.data, ...prev]);
      // setMessages(response.data);
      console.log({values})
    } catch (error:any) {
      console.log("error generating", error.message);
      setLoading(false);
    } finally {
      setLoading(false);
      router.refresh();
    }
  };

  return (
    <div>
      <Heading
        bgColor="bg-emerald-500/10"
        iconColor="text-emerald-500"
        description="Chat with an expert to get what your farm needs"
        icon={MessageSquare}
        title="Something to do with analysis"
      />
      <div>
        {messages && <ReportModal />}
        <AnalysisForm
          onSubmit={onSubmit}
          loading={loading}
        />
      </div>
      <div className="space-y-4 mt-4">
        {loading && <div>{<Loader />}</div>}
        {!messages && !loading && (
          <div>
            <Empty />
          </div>
        )}
        <div className="flex flex-col gap-y-4">
          <div>
            {messages && (
              <div
                className={cn(
                  "w-full p-8 flex items-start gap-x-8 rounded-lg bg-muted"
                )}
              >
                <Markdown content={messages} />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AnalysisPage;
