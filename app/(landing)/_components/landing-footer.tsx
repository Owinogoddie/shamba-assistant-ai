import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import React from "react";

export const LandingFooter = () => {
  return (
    <footer className="p-4 bg-transparent flex items-center justify-between pb-8">
      <Link href="/" className="flex items-center">
        <div className="relative h-8 w-8 mr-4">
          <Image src="/logo.svg" alt="logo" fill />
        </div>
        <h2 className={cn("text-2xl font-bold text-white")}>Shamba assistant</h2>
      </Link>
      <div className="flex items-center gap-x-2">
        <Link href="/dashboard">
          <Button variant="ghost" className="rounded-md text-white">
            &copy; 2024 - <span className="ml-2"> All rights reserved</span>
          </Button>
        </Link>
      </div>
    </footer>
  );
};
