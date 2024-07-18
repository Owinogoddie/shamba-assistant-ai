import { NextResponse } from 'next/server';
import { Groq } from "groq-sdk";
import { corsResponse } from '../../cors';

export async function POST(request: Request) {
  const { farmData, npkResult, fertilizerPlanData } = await request.json();

  const reportPrompt = `
    Generate a comprehensive farm report for ${farmData.farmName}'s ${farmData.cropName} based on the following data:
    
    Farm Data:
    - Farm Name: ${farmData.farmName}
    - Farmer Name: ${farmData.farmerName}
    - Location: ${farmData.location.label}
    - Crop Name: ${farmData.cropName}
    - Soil Nitrogen: ${farmData.nitrogen} kg/ha
    - Soil Phosphorus: ${farmData.phosphorus} kg/ha
    - Soil Potassium: ${farmData.potassium} kg/ha
    - Soil Moisture: ${farmData.soilMoisture}%
    - Organic Carbon: ${farmData.soilConductivity}%
    - pH: ${farmData.ph}
    
    NPK Need:
    ${JSON.stringify(npkResult, null, 2)}
    
    Fertilizer Plan:
    ${JSON.stringify(fertilizerPlanData, null, 2)}
    
    Please provide a detailed analysis including:
    1. Soil health assessment
    2. Nutrient deficiencies or excesses
    3. Recommendations for improving soil fertility
    4. Suggested fertilizer application rates and timing (based on the provided fertilizer plan)
    5. Additional crop-specific recommendations
    6. Sustainable farming practices to consider
    7. Economic analysis of recommended interventions
    8. Long-term soil management strategies
    
    Format the report in clear sections with headings. Provide specific, actionable advice tailored to the crop and local conditions. Include scientific explanations where relevant, and suggest environmentally friendly alternatives when possible.
    NOTE: All measurements are in kg/ha unless otherwise specified.
  `;

  try {
    const groq = new Groq({
      apiKey: process.env.GROQ_API_KEY,
    });

    const reportResult = await groq.chat.completions.create({
      messages: [{ role: "user", content: reportPrompt }],
      model: "mixtral-8x7b-32768",
    });

    const reportContent = reportResult.choices[0]?.message?.content;

    if (reportContent) {
      // console.log({reportContent})
      return corsResponse({ reportContent });
    } else {
      return NextResponse.json({ error: "Failed to generate report content" }, { status: 500 });
    }
  } catch (error) {
    console.error("Error generating final report:", error);
    return corsResponse({ error: "Internal server error" }, 500);
  }
}

export async function OPTIONS(request: Request) {
  return corsResponse({});
}