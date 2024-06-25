import Image from "next/image";
import React from "react";

export const Loader = () => {
  return (
    <div className="flex flex-col h-full items-center justify-center">
      <div className="relative h-10 w-10 animate-spin">
        <Image src="/logo.svg" fill alt="logo" />
      </div>
      <p className="text-sm text-muted-foreground">Just a minute.......</p>
    </div>
  );
};
