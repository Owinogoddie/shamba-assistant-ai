import { cn } from "@/lib/utils";
import { Montserrat } from "next/font/google";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const monsterat = Montserrat({
  weight: "600",
  subsets: ["latin"],
});
export const Logo = () => {
  return (
    <div>
      <Link href="/" className="flex items-center pl-3 mb-14">
        <div className=" relative h-8 w-8 mr-4">
          <Image fill alt="logo" src="/logo.svg" />
        </div>
        <h2 className={cn("text-2xl font-bold text-white")}>Farm <span className="text-capitalize text-emerald-400 font-extrabold">assistant</span></h2>
      </Link>
    </div>
  );
};
