"use client";

import React, { useState } from "react";
import { Groq } from "groq-sdk";
import axios from 'axios';
import { FarmInput, NPKRecommendation, Report } from "@/types";
import FarmReportForm from "./farm-report-form";
import ReportDisplay from "./report-display";
import PDFPreviewModal from "./pdf-preview-modal";
import { generatePDF } from "../utils/generate-pdf";

const groq = new Groq({
  apiKey: process.env.NEXT_PUBLIC_GROQ_API_KEY,
  dangerouslyAllowBrowser: true,
});

const LoadingOverlay = () => (
  <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
    <div className="bg-white rounded-lg p-8 flex flex-col items-center">
      <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-green-500 mb-4"></div>
      <p className="text-lg font-semibold text-gray-700">Generating Report...</p>
    </div>
  </div>
);

export const FarmReport = () => {
  const [report, setReport] = useState<Report | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [pdfUrl, setPdfUrl] = useState<string | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [showForm, setShowForm] = useState(true);

  const toggleForm = () => setShowForm(!showForm);

  const handleSubmit = async (input: FarmInput) => {
    setIsLoading(true);
    setError(null);

    try {
      // Calling the NPK prediction API
      const response = await axios.post('https://godfreyowino-npk-predictor.hf.space/predict', {
        crop_name: input.crop_name,
        target_yield: input.target_yield,
        field_size: input.field_size,
        ph: input.ph,
        organic_carbon: input.organic_carbon,
        nitrogen: input.nitrogen,
        phosphorus: input.phosphorus,
        potassium: input.potassium,
        soil_moisture: input.soil_moisture
      });

      const npkResult: NPKRecommendation = {
        n: response.data.nitrogen_need,
        p: response.data.phosphorus_need,
        k: response.data.potassium_need,
        organic_matter: response.data.organic_matter_need,
        lime: response.data.lime_need,
      };

      // Generate report using Groq
      const reportPrompt = `Generate a comprehensive farm report for ${input.farmer_name}'s ${input.farm_name} at ${input.location} based on the following data:
      
      Crop: ${input.crop_name}
      Target Yield: ${input.target_yield} kg/acre
      Field Size: ${input.field_size} acres
      pH: ${input.ph}
      Organic Carbon: ${input.organic_carbon}%
      Nitrogen: ${input.nitrogen} kg/acre
      Phosphorus: ${input.phosphorus} kg/acre
      Potassium: ${input.potassium} kg/acre
      Soil Moisture: ${input.soil_moisture}%
      
      NPK Recommendation:
      Nitrogen Need: ${npkResult.n.toFixed(2)} kg/acre
      Phosphorus Need: ${npkResult.p.toFixed(2)} kg/acre
      Potassium Need: ${npkResult.k.toFixed(2)} kg/acre
      Organic Matter Need: ${npkResult.organic_matter.toFixed(2)} kg/acre
      Lime Need: ${npkResult.lime.toFixed(2)} kg/acre
      
      Please provide a detailed analysis including:
      1. Soil health assessment
      2. Nutrient deficiencies or excesses
      3. Recommendations for improving soil fertility
      4. Suggested fertilizer application rates and timing
      5. Additional crop-specific recommendations
      6. Sustainable farming practices to consider
      7. Economic analysis of recommended interventions
      8. Long-term soil management strategies
      
      Format the report in clear sections with headings. Provide specific, actionable advice tailored to the crop and local conditions. Include scientific explanations where relevant, and suggest environmentally friendly alternatives when possible.
      NOTE: EVERYTHING IS IN kgs tons
      `;

      const reportResult = await groq.chat.completions.create({
        messages: [{ role: "user", content: reportPrompt }],
        model: "mixtral-8x7b-32768",
      });

      const reportContent = reportResult.choices[0]?.message?.content;
      if (reportContent) {
        const newReport: Report = {
          content: reportContent,
          recommendation: npkResult,
          date: new Date().toLocaleDateString(),
          consultant: "AI Agronomist",
        };
        setReport(newReport);
        const pdfBlob = generatePDF(input, newReport);
        setPdfUrl(URL.createObjectURL(pdfBlob));
      }
      setShowForm(!showForm);
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setIsLoading(false);
    }
  };

  const downloadPDF = () => {
    if (pdfUrl) {
      const link = document.createElement("a");
      link.href = pdfUrl;
      link.download = "farm_report.pdf";
      link.click();
    }
  };

  const openModal = () => setShowModal(true);
  const closeModal = () => setShowModal(false);
  return (
    <>
      {isLoading && <LoadingOverlay />}
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-yellow-50 p-4 sm:p-8">
        <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-lg p-4 sm:p-8">
          <h1 className="text-3xl sm:text-4xl font-bold text-green-800 mb-6 sm:mb-8">
            Shamba Solutions Farm Report
          </h1>

          {report && (
            <button
              onClick={toggleForm}
              className="mb-4 bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded"
            >
              {!showForm ? "Hide Form" : "Show Form"}
            </button>
          )}

          {(!showForm || !report) && (
            <FarmReportForm onSubmit={handleSubmit} isLoading={isLoading} />
          )}

          {error && <p className="text-red-600 mt-4">Error: {error}</p>}

          {report && (
            <ReportDisplay
              report={report}
              onPreview={openModal}
              onDownload={downloadPDF}
            />
          )}
        </div>

        {showModal && pdfUrl && (
          <PDFPreviewModal
            pdfUrl={pdfUrl}
            onClose={closeModal}
            onDownload={downloadPDF}
          />
        )}
      </div>
    </>
  );
};