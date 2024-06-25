"use client";

import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import {
  ArrowRight,
  MessagesSquare,
  Microscope,
  SearchCheckIcon,
  Stethoscope,
} from "lucide-react";
import { useRouter } from "next/navigation";

const tools = [
  {
    label: "Ask Ai",
    icon: MessagesSquare,
    href: "/conversation",
    bgColor: "text-violet-500/10",
    color: "text-violet-500",
  },
  {
    label: "Soil Analysis",
    icon: SearchCheckIcon,
    href: "/analysis",
    color: "text-emerald-500",
    bgColor: "text-emerald-500/10",
  },
  {
    label: "Plant Disease detection",
    icon: Microscope,
    href: "/plants",
    color: "text-pink-500",
    bgColor: "text-pink-500/10",
  },
  {
    label: "Animal Disease detection",
    icon: Stethoscope,
    href: "/animals",
    color: "text-orange-500",
    bgColor: "text-violet-500/10",
  },
];
export default function DashboardPage() {
  const router=useRouter();
  return (
    <div>
      <div className="mb-8 space-y-4">
        <h2 className="text-2xl md:text-4xl font-bold text-center">
          Your farm assistant you will ever need
        </h2>
        <p className="text-muted-foreground text-sm md:text-lg font-light text-center">
          Explore the power of AI to your farm
        </p>
      </div>
      <div className="px-4 md:px-20 lg:px-32 space-y-4">
        {tools.map((tool) => (
          <Card
          onClick={()=>router.push(tool.href)}
            key={tool.href}
            className="p-4 border-black/5 flex items-center justify-between hover:shadow-md transition cursor-pointer hover:bg-white/10"
          >
            <div className="flex items-center gap-x-4">
              <div className={cn("p-2 w-fit rounded-md", tool.bgColor)}>
                <tool.icon className={cn("w-8 h-8", tool.color)} />
              </div>
              <div className="font-semi-bold">{tool.label}</div>
            </div>
            <ArrowRight className="h-5 w-5" />
          </Card>
        ))}
      </div>
    </div>
  );
}
