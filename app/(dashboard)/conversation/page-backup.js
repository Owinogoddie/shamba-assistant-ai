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

const formSchema = z.object({
  prompt: z.string().min(2, {
    message: "Prompt must be at least 2 characters.",
  }),
});
const ConversationPage = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [history, setHistory] = useState([]);

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      prompt: "",
    },
  });
  const isloading = form.formState.isSubmitting;

  async function onSubmit(values) {
    try {
      setLoading(true);
      const userMessage = {
        role: "user",
        content: values.prompt,
      };

      const newMessages = [...history, userMessage];
      const response = await axios.post("/api/conversation", {
        messages: newMessages,
        input: values.prompt,
      });
      console.log(response.data);
      setHistory((prev) => [...response.data, ...prev]);

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
        title="Chat with a farm expert"
      />
      <div>
        <div>
          <Button
            type="button"
            onClick={handleClick}
            siz="sm"
            variant="secondary"
            className="m-3"
          >
            clear history
          </Button>
        </div>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="roumded-lg border w-full p-4 px-3 md:px-6 focus-within:sm grid grid-cols-12 gap-2"
          >
            <FormField
              control={form.control}
              name="prompt"
              render={({ field }) => (
                <FormItem className="col-span-12 lg:col-span-10">
                  <FormLabel>Prompt</FormLabel>
                  <FormControl className="m-0 p-0">
                    <Input
                      className="border-0 outline-none focus-visible:ring-0 focus-visible:ring-transparent border-b-2"
                      placeholder="Start chatting"
                      {...field}
                      disabled={loading}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button
              type="submit"
              className="col-span-12 lg:col-span-2 w-full"
              disabled={loading}
            >
              Submit
            </Button>
          </form>
        </Form>
      </div>
      <div className="space-y-4 mt-4">
        {loading && <div>{<Loader />}</div>}
        {history.length === 0 && !isloading && !loading && (
          <div>
            <Empty />
          </div>
        )}
        <div className="flex flex-col gap-y-4">
          <div>
            {history &&
              history.map((item, i) => (
                <div
                  key={i}
                  className={cn(
                    "w-full p-8 flex items-start gap-x-8 rounded-lg",
                    item.role === "user"
                      ? "bg-white border border-black/10"
                      : "bg-muted"
                  )}
                >
                  <Markdown content={item.content} />
                  {/* <pre className="text-sm">{item.content.replace(/\n'\s*\+\s*'\n/g, "\n")}</pre> */}
                </div>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConversationPage;
