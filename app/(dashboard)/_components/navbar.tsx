import React from "react";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar"
 
import { MobileSidebar } from "./mobile-sidebar";

export const Navbar = () => {
  return (
    <div className="flex items-center justify-between bg-slate-700/04 p-2 md:p-3 w-full">
      <MobileSidebar />
      <div className="flex justify-end w-full">
      <Avatar>
      <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
      <AvatarFallback>CN</AvatarFallback>
    </Avatar>
      </div>
    </div>
  );
};
