"use client";

import { cn } from "@/lib/utils";
import { 
  DownloadCloud,
  LayoutDashboard,
  MessagesSquare,
  Microscope,
  SearchCheckIcon,
  Settings,
  Stethoscope,
  FileJson,
  FileBarChart,
} from "lucide-react";
import { Montserrat } from "next/font/google";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";
import { Logo } from "./logo";

const monsterat = Montserrat({
  weight: "600",
  subsets: ["latin"],
});

const routes = [
  {
    label: "Dashboard",
    icon: LayoutDashboard,
    href: "/dashboard",
    color: "text-violet-700",
  },
  {
    label: "Chat with an expert",
    icon: MessagesSquare,
    href: "/conversation",
    color: "text-orange-700",
  },
  {
    label: "Soil Analysis",
    icon: SearchCheckIcon,
    href: "/analysis",
    color: "text-pink-700",
  },
  {
    label: "Analysis Report",
    icon: FileBarChart,
    href: "/report",
    color: "text-yellow-600",
  },
  {
    label: "Plant Disease detection",
    icon: Microscope,
    href: "/plants",
    color: "text-emerald-700",
  },
  {
    label: "Animal Disease detection",
    icon: Stethoscope,
    href: "/animals",
    color: "text-sky-700",
  },
  {
    label: "Downloads",
    icon: DownloadCloud,
    href: "/downloads",
    color: "text-green-600",
  },
  {
    label: "Settings",
    icon: Settings,
    href: "/settings",
    color: "text-gray-500",
  },
  {
    label: "API Documentation",
    icon: FileJson,
    href: "/api-docs",
    color: "text-indigo-600",
  },
];

export const Sidebar = () => {
  const pathname = usePathname();

  return (
    <div className="flex flex-col space-y-4 h-full py-4 bg-[#071b12] text-white">
      <div className="p-3 py-2 flex-1">
        <Logo />
        <div className="space-y-1">
          {routes.map((route) => (
            <Link
              href={route.href}
              key={route.href}
              className={cn(
                "text-sm group flex p-3 w-full font-medium cursor-pointer hover:text-white hover:bg-white/10 rounded-lg transition",
                route.href === pathname
                  ? "text-white bg-white/10"
                  : "text-zinc-400"
              )}
            >
              <div className="flex items-center flex-1">
                <route.icon className={cn("h-5 w-5 mr-3", route.color)} />
                {route.label}
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};