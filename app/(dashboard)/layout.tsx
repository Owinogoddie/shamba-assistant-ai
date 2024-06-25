import React from "react";
import { Navbar } from "./_components/navbar";
import { Sidebar } from "./_components/sidebar";
import { Montserrat, } from "next/font/google";
import { cn } from "@/lib/utils";

const font = Montserrat({
  weight: "400",
  subsets: ["latin"],
});

const MainLayout = ({ children }:{children:React.ReactNode}) => {
  return (
    <div className={cn("h-full relative", font.className)}>
      <div className="h-full hidden  md:flex md:flex-col md:inset-y-0 md:fixed bg-gray-900 md:w-72 ">
        <Sidebar />
      </div>
      <main className="md:pl-72">
        <Navbar />
        {children}
      </main>
    </div>
  );
};

export default MainLayout;
