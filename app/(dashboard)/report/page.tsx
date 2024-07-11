"use client";
import { useEffect, useState } from "react";
import ClientSideDownloadableReport from "./ClientSideDownloadableReport";
import { Toaster } from "@/components/ui/toaster";
import { useToast } from "@/components/ui/use-toast";
import { FarmForm } from "./_components/farm-form";
import { FarmData, SoilAnalysisReportData } from "./lib/types";

const LoadingOverlay = () => (
  <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
    <div className="bg-white rounded-lg p-8 flex flex-col items-center">
      <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-green-500 mb-4"></div>
      <p className="text-lg font-semibold text-gray-700">
        Generating Report...
      </p>
    </div>
  </div>
);

const SoilAnalysisPage: React.FC = () => {
  const { toast } = useToast();
  const [report, setReport] = useState<SoilAnalysisReportData | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isClientReportReady, setIsClientReportReady] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (report) {
      setIsClientReportReady(true);
    }
  }, [report]);

  const handleSubmit = async (farmData: FarmData) => {
    setIsLoading(true);
    setError(null);

    try {
      console.log("Starting report generation...");

      // First, call the NPK predictor API
      console.log("Calling NPK predictor API...");
      const npkResponse = await fetch("/api/report/npk-predictor", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(farmData),
      });
      if (!npkResponse.ok) {
        throw new Error(`NPK predictor API error: ${npkResponse.statusText}`);
      }
      const npkResult = await npkResponse.json();
      console.log("NPK predictor API response:", npkResult);

      // Then, call the other APIs in parallel
      console.log(
        "Calling pests, diseases, soil correction, and final report APIs..."
      );
      const [
        pestsResponse,
        diseasesResponse,
        soilCorrectionResponse,
        finalReportResponse,
      ] = await Promise.all([
        fetch("/api/report/pests", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ cropPlanned: farmData.cropName }),
        }),
        fetch("/api/report/diseases", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ cropPlanned: farmData.cropName }),
        }),
        fetch("/api/report/soil-correction-plan", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ farmData, npkResult }),
        }),
        fetch("/api/report/final-report", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ farmData, npkResult }),
        }),
      ]);

      if (
        !pestsResponse.ok ||
        !diseasesResponse.ok ||
        !soilCorrectionResponse.ok ||
        !finalReportResponse.ok
      ) {
        throw new Error("One or more API calls failed");
      }

      const [pestsData, diseasesData, soilCorrectionData, finalReportData] =
        await Promise.all([
          pestsResponse.json(),
          diseasesResponse.json(),
          soilCorrectionResponse.json(),
          finalReportResponse.json(),
        ]);

      console.log("API responses received:", {
        pestsData,
        diseasesData,
        soilCorrectionData,
        finalReportData,
      });

      const newReport: SoilAnalysisReportData = {
        farmInfo: {
          name: farmData.farmName,
          owner: farmData.farmerName,
          location: farmData.location.label,
        },
        Nutrientrecommendation: npkResult,
        soilData: {
          nitrogen: farmData.nitrogen,
          phosphorus: farmData.phosphorus,
          potassium: farmData.potassium,
          moisture: farmData.soilMoisture,
          carbon: farmData.organicCarbon,
          temperature: 25, // You might want to get this from somewhere else
          ph: farmData.ph,
        },
        soilCorrectionPlan: soilCorrectionData.soilCorrectionPlan,
        diseaseControl: diseasesData.diseases,
        pestControl: pestsData.pests,
        recommendations: finalReportData.reportContent,
      };
      setReport(newReport);
      console.log("Report set in state");

      toast({
        title: "Report Generated",
        description: "Your farm report has been successfully generated.",
      });
    } catch (err) {
      console.error("Error in report generation:", err);
      setError((err as Error).message);
      toast({
        title: "Error",
        description: `An error occurred while generating the report: ${
          (err as Error).message
        }`,
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
      console.log("Report generation process completed");
    }
  };
  if (!isMounted) {
    return <div>Loading report...</div>;
  }
  return (
    <div>
      {isLoading && <LoadingOverlay />}
      {!report && (
        <div className="container mx-auto p-4 bg-green-50 min-h-screen">
          <h1 className="text-3xl text-center font-bold mb-6 text-green-800">
            Farm Report Generator
          </h1>
          <div className="max-w-2xl mx-auto bg-white p-6 rounded-lg shadow-md">
            <FarmForm onSubmit={handleSubmit} />
          </div>
          <Toaster />
        </div>
      )}

      {report && (
        <div className="container mx-auto py-8">
          <h1 className="text-4xl font-bold text-green-800 mb-8">
            Soil Analysis Report
          </h1>
          {isClientReportReady ? (
            <ClientSideDownloadableReport reportData={report} />
          ) : (
            <p>Loading report...</p>
          )}
          <Toaster />
        </div>
      )}
    </div>
  );
};

export default SoilAnalysisPage;
