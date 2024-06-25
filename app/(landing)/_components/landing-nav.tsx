import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import React from "react";

export const LandingNavbar = () => {
  return (
    <nav className="p-4 bg-transparent flex items-center justify-between">
      <Link href="/" className="flex items-center">
        <div className="relative h-12 w-8 mr-4">
          <Image src="/logo.svg" alt="logo" fill />
        </div>
        <h2 className={cn("text-2xl font-bold text-white")}>Shamba <span className="text-capitalize text-emerald-700 font-extrabold">assistant</span></h2>
      </Link>
      <div className="flex items-center gap-x-2">
        <Link href="/dashboard">
          <Button variant="premium" className="rounded-full">
            Get started
          </Button>
        </Link>
      </div>
    </nav>
  );
};

