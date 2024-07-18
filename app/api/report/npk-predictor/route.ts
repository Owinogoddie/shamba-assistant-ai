import { NextResponse } from "next/server";
import axios from "axios";
import { corsResponse } from "../../cors";
import { FarmData } from "@/app/(dashboard)/report/lib/types";

export async function POST(request: Request) {
  const farmData:FarmData = await request.json();

  try {
    const response = await axios.post(
      "https://godfreyowino-npk-predictor-cc214d6.hf.space/predict",
      {
        crop_name: farmData.cropName,
        target_yield: farmData.targetYield,
        field_size: farmData.fieldSize,
        ph: farmData.ph,
        organic_carbon: farmData.soilConductivity,
        nitrogen: farmData.nitrogen,
        phosphorus: farmData.phosphorus,
        potassium: farmData.potassium,
        soil_moisture: farmData.soilMoisture,
      }
    );
    // console.log(response.data)
    return corsResponse(response.data);
  } catch (error) {
    console.error("Error in NPK prediction:", error);
    return corsResponse({ error: "Failed to predict NPK needs" }, 500);
  }
}
export async function OPTIONS(request: Request) {
  return corsResponse({});
}
