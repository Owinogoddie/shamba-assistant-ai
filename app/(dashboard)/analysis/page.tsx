"use client";

import React, { useState } from "react";
import { Heading } from "../_components/heading";
import { MessageSquare } from "lucide-react";
import { useRouter } from "next/navigation";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Button } from "@/components/ui/button";
import AnalysisForm from "./_components/analysis-form";
import { ChatWindow } from "./_components/chat-window";
import { ReportModal } from "../_components/report-modal";
import { Empty } from "../_components/empty";

type MessageType = {
  content: string;
};

const AnalysisPage: React.FC = () => {
  const [messages, setMessages] = useState<MessageType[] | undefined>();
  const [loading, setLoading] = useState<boolean>(false);
  const [generatedMessage, setGeneratedMessage] = useState("");
  const [formValues, setFormValues] = useState({
    ph_level: 0,
    nitrogen: 0,
    phosphorus: 0,
    potassium: 0,
    organic_matter: "",
    texture: "",
    crop_planned: "",
  });
  const [showForm, setShowForm] = useState(true);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const router = useRouter();

  const onSubmit = async (data: typeof formValues) => {
    try {
      setLoading(true);
      setFormValues(data);
      const message = `Given the pH level of ${data.ph_level}, nitrogen value of ${data.nitrogen}, phosphorus value of ${data.phosphorus}, potassium value of ${data.potassium}, organic matter of ${data.organic_matter}, soil texture of ${data.texture}, and the planned crop ${data.crop_planned}, generate detailed recommendations.`;
      setGeneratedMessage(message);
      setFormSubmitted(true);
      setShowForm(false);
    } catch (error: any) {
      console.log("error generating", error.message);
      setLoading(false);
    } finally {
      setLoading(false);
      router.refresh();
    }
  };

  const clearChat = () => {
    setMessages([]);
    setGeneratedMessage("");
    setFormValues({
      ph_level: 0,
      nitrogen: 0,
      phosphorus: 0,
      potassium: 0,
      organic_matter: "",
      texture: "",
      crop_planned: "",
    });
    setFormSubmitted(false);
    setShowForm(true);
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
        {showForm ? (
          <AnalysisForm onSubmit={onSubmit} loading={loading} defaultValues={formValues} />
        ) : (
          <center>
            <Button onClick={() => setShowForm(true)}>
              Re-enter your values
            </Button>
          </center>
        )}
        {formValues.ph_level !== 0 || formValues.nitrogen !== 0 || formValues.phosphorus !== 0 || formValues.potassium !== 0 || formValues.organic_matter !== "" || formValues.texture !== "" || formValues.crop_planned !== "" ? (
          <center>
            <Button onClick={clearChat} className="mt-4">
              Refresh
            </Button>
          </center>
        ) : null}
        {formValues.ph_level !== 0 || formValues.nitrogen !== 0 || formValues.phosphorus !== 0 || formValues.potassium !== 0 || formValues.organic_matter !== "" || formValues.texture !== "" || formValues.crop_planned !== "" ? (
          <ChatWindow
            endpoint="/api/analysis"
            emptyStateComponent={<Empty text="No converstions. click submit to start 🤩"/>}
            showIngestForm={true}
            placeholder={"ask me about your analysis"}
            emoji="👮‍♂️"
            titleText={"Your Soil analysis assistant at hand"}
            icon={MessageSquare}
            generatedMessage={generatedMessage}
            analysisData={formValues}
            formSubmitted={formSubmitted}
            setFormSubmitted={setFormSubmitted}
          />
        ) : null}
        {/* {messages && <ReportModal />} */}
      </div>
    </div>
  );
};

export default AnalysisPage;
