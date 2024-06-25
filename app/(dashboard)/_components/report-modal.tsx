import React from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import Image from "next/image";

export const ReportModal = () => {
  return (
    <Dialog className="bg-[#fdf8e3]">
      <DialogTrigger asChild>
        <Button type="button" onClick={() => {}} siz="sm" className="m-3">
          Download report
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <center>
          <Image src="/catoon.jpg" alt="catoon-img" width="300" height="300" />
          <h2>Stay tuned, op progress</h2>
        </center>
      </DialogContent>
    </Dialog>
  );
};
