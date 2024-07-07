"use client";

import { Report } from "@/types";
import React from "react";
import ReactMarkdown from "react-markdown";

interface Props {
  report: Report;
  onPreview: () => void;
  onDownload: () => void;
}

export default function ReportDisplay({
  report,
  onPreview,
  onDownload,
}: Props) {
  return (
    <div className="mt-8 text-black">
      <h2 className="text-2xl font-semibold text-green-700 mb-4">
        Farm Report
      </h2>

      <div className="mb-6 flex flex-wrap gap-4">
        <button
          onClick={() => {
            console.log("Preview button clicked");
            onPreview();
          }}
          className="flex-grow sm:flex-grow-0 bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 px-6 rounded-lg shadow-lg transition duration-300 ease-in-out transform hover:scale-105 active:scale-95"
        >
          Preview PDF
        </button>
        <button
          onClick={() => {
            console.log("Download button clicked");
            onDownload();
          }}
          className="flex-grow sm:flex-grow-0 bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-3 px-6 rounded-lg shadow-lg transition duration-300 ease-in-out transform hover:scale-105 active:scale-95"
        >
          Download PDF Report
        </button>
      </div>

      <div className="bg-green-50 p-4 sm:p-6 rounded-lg shadow">
        <ReactMarkdown>{report.content}</ReactMarkdown>
      </div>

      <div className="mt-6">
        <h3 className="text-xl font-semibold text-green-700 mb-3">
          Nutrient and Soil Amendment Recommendations
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <p>Nitrogen (N): {report.recommendation.n.toFixed(2)} kg/acre</p>
          <p>Phosphorus (P): {report.recommendation.p.toFixed(2)} kg/acre</p>
          <p>Potassium (K): {report.recommendation.k.toFixed(2)} kg/acre</p>
          <p>Organic Matter: {report.recommendation.organic_matter.toFixed(2)} kg/acre</p>
          <p>Lime: {report.recommendation.lime.toFixed(2)} kg/acre</p>
        </div>
      </div>
    </div>
  );
}