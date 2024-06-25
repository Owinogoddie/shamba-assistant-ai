"use client";
import React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
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

export const analysisSchema = z.object({
  ph_level: z.coerce.number().min(1, { message: "Required." }),
  nitrogen: z.coerce.number().min(1, { message: "Required." }),
  phosphorus: z.coerce.number().min(1, { message: "Required." }),
  potassium: z.coerce.number().min(1, { message: "Required." }),
  organic_matter: z.string().min(1, { message: "Required." }),
  texture: z.string().min(1, { message: "Required." }),
  crop_planned: z.string().min(1, { message: "Required." }),
});

const AnalysisForm = ({ onSubmit, loading, defaultValues }: any) => {
  const form = useForm({
    resolver: zodResolver(analysisSchema),
    defaultValues: defaultValues,
  });

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="rounded-lg border w-full p-4 px-3 md:px-6"
      >
        <div className="pb-3">
          <div className="flex gap-2 pb-3">
            <FormField
              control={form.control}
              name="ph_level"
              render={({ field }) => (
                <FormItem className="w-1/2">
                  <FormLabel className="font-bold">PH level</FormLabel>
                  <FormControl className="m-0 p-0">
                    <Input
                      className="border-0 outline-none focus-visible:ring-0 focus-visible:ring-transparent border-b-2"
                      placeholder="pH Level: 5.5"
                      {...field}
                      disabled={loading}
                      type="number"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="nitrogen"
              render={({ field }) => (
                <FormItem className="w-1/2">
                  <FormLabel className="font-bold">Nitrogen (N)</FormLabel>
                  <FormControl className="m-0 p-0">
                    <Input
                      className="border-0 outline-none focus-visible:ring-0 focus-visible:ring-transparent border-b-2"
                      placeholder="Nitrogen (N): 15"
                      {...field}
                      disabled={loading}
                      type="number"
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
              name="phosphorus"
              render={({ field }) => (
                <FormItem className="w-1/2">
                  <FormLabel className="font-bold">Phosphorus (P)</FormLabel>
                  <FormControl className="m-0 p-0">
                    <Input
                      className="border-0 outline-none focus-visible:ring-0 focus-visible:ring-transparent border-b-2"
                      placeholder="Phosphorus (P): 40 ppm"
                      {...field}
                      disabled={loading}
                      type="number"
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
                  <FormLabel className="font-bold">Potassium (K) (ppm)</FormLabel>
                  <FormControl className="m-0 p-0">
                    <Input
                      className="border-0 outline-none focus-visible:ring-0 focus-visible:ring-transparent border-b-2"
                      placeholder="Potassium (K): 120 ppm"
                      {...field}
                      disabled={loading}
                      type="number"
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
                  <FormLabel className="font-bold">Organic Matter (%)</FormLabel>
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
        <Button type="submit" className="w-full" disabled={loading}>
          Generate analysis
        </Button>
      </form>
    </Form>
  );
};

export default AnalysisForm;
