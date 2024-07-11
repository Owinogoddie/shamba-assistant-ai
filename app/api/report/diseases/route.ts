import { NextResponse } from 'next/server';
import { Groq } from 'groq-sdk';

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});

export async function POST(request: Request) {
  const { cropPlanned } = await request.json();

  const prompt = `
    You are an expert in agricultural disease management. For the crop ${cropPlanned}, please provide:
    A list of common diseases that affect this crop.
    DO NOT PROVIDE ANYTHING AFTER OR BEFORE THE JSONOBJECT ONLY PROVIDE THE JSON OBJECT
    
    For each disease, include:
    - Name
    - Prevention methods
    - Chemical control (if applicable)
    - Mode of application
    - Rate of application

    Format your response as a JSON object with the following structure:
    {
      "diseases": [
        {
          "name": "Disease name",
          "prevention": "Prevention methods",
          "chemicalControl": "Chemical name or 'Not recommended'",
          "modeOfApplication": "How to apply the chemical",
          "rateOfApplication": "Application rate"
        }
      ]
    }
  `;

  try {
    const completion = await groq.chat.completions.create({
      messages: [{ role: "user", content: prompt }],
      model: "mixtral-8x7b-32768",
      temperature: 0.1,
      max_tokens: 1000,
    });

    const result = JSON.parse(completion.choices[0]?.message?.content || '{}');
    console.log({result})
    return NextResponse.json(result);
  } catch (error) {
    console.error('Error in disease analysis:', error);
    return NextResponse.json({ error: 'Failed to analyze disease data' }, { status: 500 });
  }
}