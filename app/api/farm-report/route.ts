import { NextRequest, NextResponse } from "next/server";
import { FarmData } from "@/types";
import axios from "axios";
import { corsResponse } from "../cors";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";

export async function POST(req: NextRequest) {
  try {
    const farmData: FarmData = await req.json();

    // First, calling the predictNPK and generateFertilizerPlan in parallel
    const [npkResult, fertilizerPlanData] = await Promise.all([
      predictNPK(farmData),
      generateFertilizerPlan(farmData),
    ]);

      // 2nd, calling the the rest of the functions in parallel
      const [pestsData, diseasesData, finalReportData] = await Promise.all([
        fetchPests(farmData.cropName),
        fetchDiseases(farmData.cropName),
        generateFinalReport(farmData, npkResult, fertilizerPlanData),
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
        temperature: farmData.temperature || 0,
        ph: farmData.ph,
        conductivity: farmData.soilConductivity,
      },
      diseaseControl: diseasesData.diseases,
      pestControl: pestsData.pests,
      recommendations: finalReportData.reportContent,
      fertilizerApplicationPlan: fertilizerPlanData,
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

async function generateFinalReport(farmData: FarmData, npkResult: any, fertilizerPlanData: any) {
  try {
    const response = await axios.post(`${BASE_URL}/api/report/recommendations`, {
      farmData,
      npkResult,
      fertilizerPlanData,
    });
    return response.data;
  } catch (error) {
    console.error("Error generating final report:", error);
    throw new Error("Failed to generate final report");
  }
}

async function generateFertilizerPlan(farmData: FarmData) {
  try {
    const payload = {
      crop_name: farmData.cropName,
      target_yield: farmData.targetYield,
      field_size: farmData.fieldSize,
      ph_water: farmData.ph,
      organic_carbon: farmData.soilConductivity,
      total_nitrogen: farmData.nitrogen,
      phosphorus_m3: farmData.phosphorus,
      potassium_exch: farmData.potassium,
    };

    const response = await axios.post(
      `${BASE_URL}/api/fertilizer-plan`,
      payload
    );
    return response.data;
  } catch (error) {
    console.error("Error generating fertilizer plan:", error);
    throw new Error("Failed to generate fertilizer plan");
  }
}
