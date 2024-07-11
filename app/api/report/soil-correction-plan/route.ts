import { NextResponse } from 'next/server';
import { Groq } from 'groq-sdk';

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});

export async function POST(request: Request) {
  const { farmData, npkResult } = await request.json();

  const prompt = `
    You are an expert in soil management and crop nutrition. Based on the following data:
    
    Farm Data:
    - Crop: ${farmData.cropName}
    - Target Yield: ${farmData.targetYield} kg/acre
    - Field Size: ${farmData.fieldSize} acres
    - pH: ${farmData.ph}
    - Organic Carbon: ${farmData.organicCarbon}%
    - Nitrogen: ${farmData.nitrogen} kg/acre
    - Phosphorus: ${farmData.phosphorus} kg/acre
    - Potassium: ${farmData.potassium} kg/acre
    - Soil Moisture: ${farmData.soilMoisture}%

    NPK Recommendation:
    - Nitrogen Need: ${npkResult.nitrogen_need} kg/acre
    - Phosphorus Need: ${npkResult.phosphorus_need} kg/acre
    - Potassium Need: ${npkResult.potassium_need} kg/acre
    - Organic Matter Need: ${npkResult.organic_matter_need} kg/acre
    - Lime Need: ${npkResult.lime_need} kg/acre

    Please provide a soil correction plan with recommendations for three stages:
    1. Before planting
    2. At planting
    3. 6 weeks after planting

    For each stage, include:
    - Timing
    - Instruction
    - Best option
    - First alternative
    - Second alternative

    DO NOT PROVIDE ANYTHING AFTER OR BEFORE THE JSONOBJECT ONLY PROVIDE THE JSON OBJECT
    Format your response as a JSON object with the following structure:
    {
      "soilCorrectionPlan": [
        {
          "timing": "Before planting",
          "instructions": "Detailed instruction",
          "bestOption": "Best recommended action",
          "firstAlternative": "First alternative action",
          "secondAlternative": "Second alternative action"
        },
        {
          "timing": "At planting",
          "instructions": "Detailed instruction",
          "bestOption": "Best recommended action",
          "firstAlternative": "First alternative action",
          "secondAlternative": "Second alternative action"
        },
        {
          "timing": "6 weeks after planting",
          "instructions": "Detailed instruction",
          "bestOption": "Best recommended action",
          "firstAlternative": "First alternative action",
          "secondAlternative": "Second alternative action"
        }
      ]
    }
  `;

  try {
    const completion = await groq.chat.completions.create({
      messages: [{ role: "user", content: prompt }],
      model: "mixtral-8x7b-32768",
      temperature: 0.1,
      max_tokens: 1500,
    });

    const result = JSON.parse(completion.choices[0]?.message?.content || '{}');
    console.log({result})
    return NextResponse.json(result);
  } catch (error) {
    console.error('Error in soil correction plan analysis:', error);
    return NextResponse.json({ error: 'Failed to generate soil correction plan' }, { status: 500 });
  }
}