import { NextRequest, NextResponse } from "next/server";
import { FarmData } from "@/types";
import axios from "axios";
import { corsResponse } from "../cors";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";

export async function POST(req: NextRequest) {
  try {
    const farmData: FarmData = await req.json();

    // NPK prediction
    const npkResult = await predictNPK(farmData);

    // Parallel calls for other data
    const [pestsData, diseasesData, soilCorrectionData, finalReportData] =
      await Promise.all([
        fetchPests(farmData.cropName),
        fetchDiseases(farmData.cropName),
        generateSoilCorrectionPlan(farmData, npkResult),
        generateFinalReport(farmData, npkResult),
      ]);

    const report = {
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
        temperature: farmData.temperature || 0,
        ph: farmData.ph,
        conductivity: farmData.soilConductivity,
      },
      soilCorrectionPlan: soilCorrectionData.soilCorrectionPlan,
      diseaseControl: diseasesData.diseases,
      pestControl: pestsData.pests,
      recommendations: finalReportData.reportContent,
    };

    return corsResponse(report);
  } catch (error) {
    console.error("Error generating farm report:", error);
    return corsResponse({ error: "Failed to generate farm report" }, 500);
  }
}

export async function OPTIONS(req: NextRequest) {
  return corsResponse({});
}

async function predictNPK(farmData: FarmData) {
  try {
    const response = await axios.post(
      `${BASE_URL}/api/report/npk-predictor`,
      farmData
    );
    return response.data;
  } catch (error) {
    console.error("Error predicting NPK:", error);
    throw new Error("Failed to predict NPK");
  }
}

async function fetchPests(cropName: string) {
  try {
    const response = await axios.post(`${BASE_URL}/api/report/pests`, {
      cropPlanned: cropName,
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching pests:", error);
    throw new Error("Failed to fetch pests");
  }
}

async function fetchDiseases(cropName: string) {
  try {
    const response = await axios.post(`${BASE_URL}/api/report/diseases`, {
      cropPlanned: cropName,
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching diseases:", error);
    throw new Error("Failed to fetch diseases");
  }
}

async function generateSoilCorrectionPlan(farmData: FarmData, npkResult: any) {
  try {
    const response = await axios.post(
      `${BASE_URL}/api/report/soil-correction-plan`,
      { farmData, npkResult }
    );
    return response.data;
  } catch (error) {
    console.error("Error generating soil correction plan:", error);
    throw new Error("Failed to generate soil correction plan");
  }
}

async function generateFinalReport(farmData: FarmData, npkResult: any) {
  try {
    const response = await axios.post(`${BASE_URL}/api/report/final-report`, {
      farmData,
      npkResult,
    });
    return response.data;
  } catch (error) {
    console.error("Error generating final report:", error);
    throw new Error("Failed to generate final report");
  }
}
