import { NextResponse } from "next/server";
import { Groq } from "groq-sdk";

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});

// Define types
interface Chemical {
  name: string;
  active_ingredient?: string;
  application: string;
  dosage: string;
}

interface Pest {
  name: string;
  signs: string;
  prevention: string;
  chemicals: Chemical[];
}

interface FormattedPest {
  name: string;
  prevention: string;
  chemicalControl: string;
  modeOfApplication: string;
  rateOfApplication: string;
}

interface MaizeData {
  pests: Pest[];
}

export async function POST(request: Request) {
  const { cropPlanned } = await request.json();

  const maizeRelatedTerms = ["maize", "corn", "maize(corn)"];
  const isMaizeRelated = maizeRelatedTerms.some((term) =>
    cropPlanned.toLowerCase().includes(term)
  );

  if (isMaizeRelated) {
    try {
      const url = new URL('/pests_n_diseases/maize.json', process.env.NEXT_PUBLIC_BASE_URL);
const response = await fetch(url.toString());

      if (!response.ok) {
        throw new Error("Failed to fetch maize data");
      }
      const maizeData: MaizeData = await response.json();

      const formattedPests: FormattedPest[] = maizeData.pests.map(
        (pest: Pest) => ({
          name: pest.name,
          prevention: pest.prevention,
          chemicalControl:
            pest.chemicals.map((chem) => chem.name).join(", ") ||
            "Not recommended",
          modeOfApplication: pest.chemicals[0]?.application || "N/A",
          rateOfApplication: pest.chemicals[0]?.dosage || "N/A",
        })
      );

      return NextResponse.json({ pests: formattedPests });
    } catch (error) {
      console.error("Error fetching maize data:", error);
      return NextResponse.json(
        { error: "Failed to fetch maize data" },
        { status: 500 }
      );
    }
  }

  // If not maize-related
  const prompt = `
    You are an expert in agricultural pest management. For the crop ${cropPlanned}, please provide:
    A list of common pests that affect this crop.
    DO NOT PROVIDE ANYTHING AFTER OR BEFORE THE JSONOBJECT ONLY PROVIDE THE JSON OBJECT
    For each pest, include:
    - Name
    - Prevention methods
    - Chemical control (if applicable)
    - Mode of application
    - Rate of application

    IMPORTANT: Your entire response must be a valid JSON object. Do not include any text before or after the JSON. Use the following structure:
    {
      "pests": [
        {
          "name": "Pest name",
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

    const responseContent = completion.choices[0]?.message?.content || "{}";

    let result: { pests: FormattedPest[] };
    try {
      result = JSON.parse(responseContent);
    } catch (parseError) {
      const jsonMatch = responseContent.match(/\{[\s\S]*\}/);
      if (jsonMatch) {
        result = JSON.parse(jsonMatch[0]);
      } else {
        throw new Error("Failed to extract valid JSON from the response");
      }
    }

    return NextResponse.json(result);
  } catch (error) {
    console.error("Error in pest analysis:", error);
    return NextResponse.json(
      { error: "Failed to analyze pest data" },
      { status: 500 }
    );
  }
}
