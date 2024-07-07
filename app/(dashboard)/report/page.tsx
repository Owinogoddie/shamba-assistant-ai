"use client";

import dynamic from "next/dynamic";
import { useState, useEffect } from "react";

// Explicitly type the dynamic import
const FarmReportClientOnly = dynamic<{}>(
  () => import("./_components/farm-report").then((mod) => mod.FarmReport),
  { ssr: false }
);

const Page = () => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
        <div className="bg-white rounded-lg p-8 flex flex-col items-center">
          <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-green-500 mb-4"></div>
          <p className="text-lg font-semibold text-gray-700">
            Just a second...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div>
      <FarmReportClientOnly />
    </div>
  );
};

export default Page;
