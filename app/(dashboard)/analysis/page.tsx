"use client";
import React, { useState, useEffect } from "react";
import { Heading } from "../_components/heading";
import { MessageSquare } from "lucide-react";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import axios from "axios";

import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { Empty } from "../_components/empty";
import { Loader } from "../_components/loader";
import { useRouter } from "next/navigation";
import { Markdown } from "../_components/markdown";
import { ReportModal } from "../_components/report-modal";

const analysisSchema = z.object({
  ph_level: z.coerce.number().min(1, {
    message: "Required.",
  }),
  nitrogen: z.coerce.number().min(1, {
    message: "Required.",
  }),
  phosphorus: z.coerce.number().min(1, {
    message: "Required.",
  }),
  potassium: z.coerce.number().min(1, {
    message: "Required.",
  }),
  organic_matter: z.string().min(1, {
    message: "Required.",
  }),
  texture: z.string().min(1, {
    message: "Required.",
  }),
  crop_planned: z.string().min(1, {
    message: "Required.",
  }),
});
const AnalysisPage = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [history, setHistory] = useState([]);
  const [messages, setMessages] = useState();
  const [openModal, setOpenModal] = useState(true);

  const form = useForm({
    resolver: zodResolver(analysisSchema),
    defaultValues: {
      prompt: "",
      ph_level: "",
      nitrogen: "",
      phosphorus: "",
      potassium: "",
      organic_matter: "",
      texture: "",
      crop_planned: "",
    },
  });
  const isloading = form.formState.isSubmitting;

  async function onSubmit(values) {
    try {
      setLoading(true);
      // const newMessages = [...history, userMessage];
      const response = await axios.post("/api/analysis", {
        ...values,
        history,
      });
      console.log(response.data);
      setHistory((prev) => [...response.data, ...prev]);
      setMessages(response.data);
    } catch (error) {
      console.log("error generating", error.message);
      setLoading(false);
    } finally {
      setLoading(false);
      router.refresh();
    }
  }
  const handleClick = () => {
    setHistory([]);
  };

  return (
    <div>
      <Heading
        bgColor="bg-emerald-500/10"
        iconColor="text-emerald-500"
        description="Chat wit the an expert to get what your farm needs"
        icon={MessageSquare}
        title="Something to do with analysis"
      />
      <div>
        {messages && <ReportModal />}
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="roumded-lg border w-full p-4 px-3 md:px-6 focus-within:sm "
          >
            <div className=" pb-3">
              <div className="flex gap-2 pb-3">
                <FormField
                  control={form.control}
                  name="ph_level"
                  type="number"
                  render={({ field }) => (
                    <FormItem className="w-1/2">
                      <FormLabel className="font-bold">PH level</FormLabel>
                      <FormControl className="m-0 p-0">
                        <Input
                          className="border-0 outline-none focus-visible:ring-0 focus-visible:ring-transparent border-b-2"
                          placeholder="pH Level: 5.5"
                          {...field}
                          disabled={loading}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="nitrogen"
                  type="number"
                  render={({ field }) => (
                    <FormItem className="w-1/2">
                      <FormLabel className="font-bold">
                        Nitrogen (N) (ppm){" "}
                      </FormLabel>
                      <FormControl className="m-0 p-0">
                        <Input
                          className="border-0 outline-none focus-visible:ring-0 focus-visible:ring-transparent border-b-2"
                          placeholder="Nitrogen (N): 15 "
                          {...field}
                          disabled={loading}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="flex gap-2 pb-3">
                <FormField
                  control={form.control}
                  type="number"
                  name="phosphorus"
                  render={({ field }) => (
                    <FormItem className="w-1/2">
                      <FormLabel className="font-bold">
                        Phosphorus (P)
                      </FormLabel>
                      <FormControl className="m-0 p-0">
                        <Input
                          className="border-0 outline-none focus-visible:ring-0 focus-visible:ring-transparent border-b-2"
                          placeholder="Phosphorus (P): 40 ppm"
                          {...field}
                          disabled={loading}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="potassium"
                  render={({ field }) => (
                    <FormItem className="w-1/2">
                      <FormLabel className="font-bold">
                        Potassium (K) (ppm)
                      </FormLabel>
                      <FormControl className="m-0 p-0">
                        <Input
                          className="border-0 outline-none focus-visible:ring-0 focus-visible:ring-transparent border-b-2"
                          placeholder="Potassium (K): 120 ppm"
                          {...field}
                          disabled={loading}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="flex gap-2 pb-3">
                <FormField
                  control={form.control}
                  name="organic_matter"
                  render={({ field }) => (
                    <FormItem className="w-1/2">
                      <FormLabel className="font-bold">
                        Organic Matter: (%)
                      </FormLabel>
                      <FormControl className="m-0 p-0">
                        <Input
                          className="border-0 outline-none focus-visible:ring-0 focus-visible:ring-transparent border-b-2"
                          placeholder="Organic Matter: 5%"
                          {...field}
                          disabled={loading}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="texture"
                  render={({ field }) => (
                    <FormItem className="w-1/2">
                      <FormLabel className="font-bold">Soil Texture</FormLabel>
                      <FormControl className="m-0 p-0">
                        <Input
                          className="border-0 outline-none focus-visible:ring-0 focus-visible:ring-transparent border-b-2"
                          placeholder="Soil Texture: Loamy"
                          {...field}
                          disabled={loading}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="flex gap-2 pb-3">
                <FormField
                  control={form.control}
                  name="crop_planned"
                  render={({ field }) => (
                    <FormItem className="w-1/2">
                      <FormLabel className="font-bold">Crop Planned</FormLabel>
                      <FormControl className="m-0 p-0">
                        <Input
                          className="border-0 outline-none focus-visible:ring-0 focus-visible:ring-transparent border-b-2"
                          placeholder="Crop Planned: Tomatoes"
                          {...field}
                          disabled={loading}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>
            <Button type="submit" className=" w-full" disabled={loading}>
              Generate analysis
            </Button>
          </form>
        </Form>
      </div>
      <div className="space-y-4 mt-4">
        {loading && <div>{<Loader />}</div>}
        {!messages && !isloading && !loading && (
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
                {/* <pre className="text-sm">{item.content.replace(/\n'\s*\+\s*'\n/g, "\n")}</pre> */}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AnalysisPage;
