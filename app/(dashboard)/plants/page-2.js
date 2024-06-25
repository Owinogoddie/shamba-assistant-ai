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
  file: z.instanceof(FileList).optional(),
});
const PlantDetectionPage = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [history, setHistory] = useState([]);
  const [image, setImage] = useState(null);
  const [blob, setBlob] = useState(null);

  const form = useForm({
    resolver: zodResolver(formSchema),
  });
  const fileRef = form.register("file");
  const isloading = form.formState.isSubmitting;

  async function onSubmit(values) {
    try {
      setLoading(true);
      console.log(values.file[0]);

      const reader = new FileReader();

      // Set up what happens when the reading is complete
      reader.onloadend = function () {
        // The result attribute contains the data as a blob
        const blob = new Blob([reader.result], { type: file.type });

        // Now you can use the blob as needed
        setBlob(blob)
      };
      reader.readAsArrayBuffer(values.file);

      async function query(filename) {
        const data = fs.readFileSync(filename);
        const response = await fetch(
          "https://api-inference.huggingface.co/models/Salesforce/blip-image-captioning-base",
          {
            headers: { Authorization: "Bearer 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" },
            method: "POST",
            body: data,
          }
        );
        const result = await response.json();
        return result;
      }
      
      query(blob).then((response) => {
        console.log(JSON.stringify(response));
      });





    } catch (error) {
      console.log("error generating", error.message);
      setLoading(false);
    } finally {
      setLoading(false);
      router.refresh();
    }
  }
  const handleSubmit = (e) => {
   e.preventDefault()
   try {
    setLoading(true);
    // console.log(image.type);

    const reader = new FileReader();

    // Set up what happens when the reading is complete
    reader.onloadend = function () {
      // The result attribute contains the data as a blob
      const blob = new Blob([reader.result], { type: image.type });

      // Now you can use the blob as needed
      setBlob(blob);
    };
    reader.readAsArrayBuffer(image);
    async function query(filename) {
      // const data = fs.readFileSync(filename);
      const response = await fetch(
        // "https://api-inference.huggingface.co/models/Salesforce/blip-image-captioning-base",
        "https://api-inference.huggingface.co/models/Malikali73/ModelsViT_PlantDisease",
        {
          headers: { Authorization: "Bearer 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" },
          method: "POST",
          body: image,
        }
      );
      const result = await response.json();
      return result;
    }
    
    query(blob).then((response) => {
      console.log(JSON.stringify(response));
    }).catch((e)=>console.log(e));
  } catch (error) {
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
        description="Chat wit the an expert to get what your farm needs"
        icon={MessageSquare}
        title="Chat with a farm expert"
      />
      <div>
        <div>
          <Button
            type="button"
            onClick={()=>{}}
            siz="sm"
            variant="secondary"
            className="m-3"
          >
            clear history
          </Button>
        </div>
        <form method="post" onSubmit={handleSubmit}>
       <input type="file" name="file" onChange={(e)=>setImage(e.target.files[0])}/>
       <Button type="submit">SUBMIT</Button>
        </form>
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

export default PlantDetectionPage;
