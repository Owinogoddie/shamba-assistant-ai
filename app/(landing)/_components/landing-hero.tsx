"use client";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import TypewriterComponent from "typewriter-effect";

export const LandingHero = () => {
  return (
    <div className="text-white font-bold py-36 text-center space-y-5">
      <div className="text-4x sm:text-5xl md:text-6xl lg:text-7xl space-y-5 font-extrabold">
        <h1>Your expert in</h1>
        <div className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-lime-600">
          {/* Typewriter */}
          <TypewriterComponent
            options={{
              strings: [
                "Expert Consultations",
                "Soil Intelligence Analysis",
                "Crop Health Analysis",
                "Animal Health Monitoring",
              ],
              autoStart: true,
              loop: true,
            }}
          />
        </div>
      </div>
      <div className="text-sm md:text-xl font-light text-zinc-400">
        Step into the Era of Smart, Sustainable Agriculture 
      </div>
      <div>
        <Link href="/dashboard">
          <Button
            variant="premium"
            className="md:text-lg p-4 md:p-6 rounded-full font-semibold"
          >
            Start for free!!!
            <ArrowRight className="h-5 w-5 ml-2" />
          </Button>
        </Link>
      </div>
      <div className="text-zinc-400 text-xs md:text-sm font-normal">
      No Hidden Fees, Just Pure Growth
      </div>
      <div className="w-[400px] h-[200px] sm:w-[400px] sm:h-[400px] md:h-[500px] md:w-[800px] relative mt-8 mx-auto border border-sm-muted shadow-lg shadow-emerald-400 border-lime-600 rounded-md">
        <Image
          src="/landing.png"
          fill
          alt="landing-img "
          className="rounded-md"
        />
      </div>
    </div>
  );
};
