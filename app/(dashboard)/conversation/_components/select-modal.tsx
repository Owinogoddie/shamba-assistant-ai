"use client";
import { useState, useEffect } from "react";
import { CaretSortIcon, CheckIcon } from "@radix-ui/react-icons";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import { useDialogStore } from "@/hooks/useDialog";
import { CropsDropDown } from "./crops-dropdown";

export function SelectModal() {
  const { value, setValue } = useDialogStore();
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    // This will run only on the client side
    setIsClient(typeof window !== "undefined");
  }, []);

  const isDialogOpen = value === "";

  // Only render the Dialog on the client side
  if (!isClient) return null;

  return (
    <>
      {isDialogOpen && (
        <Dialog open={isDialogOpen}>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle className="text-center">
                Please select a crop <span className="text-green-700">☘</span>{" "}
              </DialogTitle>
              <DialogDescription className="text-center text-muted-foreground">
                By selecting a crop, you get information conerning only that
                crop or select general for general queries 🤩.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <CropsDropDown />
            </div>
          </DialogContent>
        </Dialog>
      )}
    </>
  );
}
