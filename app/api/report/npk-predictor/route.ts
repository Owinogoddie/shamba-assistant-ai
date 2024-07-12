import { NextResponse } from 'next/server';
import axios from 'axios';

export async function POST(request: Request) {
  const farmData = await request.json();
  
  try {
    const response = await axios.post(
      "https://godfreyowino-npk-predictor-cc214d6.hf.space/predict",
      {
        crop_name: farmData.cropName,
        target_yield: farmData.targetYield,
        field_size: farmData.fieldSize,
        ph: farmData.ph,
        organic_carbon: farmData.organicCarbon,
        nitrogen: farmData.nitrogen,
        phosphorus: farmData.phosphorus,
        potassium: farmData.potassium,
        soil_moisture: farmData.soilMoisture,
      }
    );
// console.log(response.data)
    return NextResponse.json(response.data);
  } catch (error) {
    console.error('Error in NPK prediction:', error);
    return NextResponse.json({ error: 'Failed to predict NPK needs' }, { status: 500 });
  }
}