import { NextResponse } from "next/server";
import { Groq } from "groq-sdk";
import { corsResponse } from "../../cors";

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});

interface Chemical {
  name: string;
  active_ingredient?: string;
  application: string;
  dosage: string;
}

interface Disease {
  name: string;
  signs: string;
  prevention: string;
  chemicals: Chemical[];
}

interface FormattedDisease {
  name: string;
  prevention: string;
  chemicalControl: string;
  modeOfApplication: string;
  rateOfApplication: string;
}

interface MaizeData {
  plant_name: string;
  diseases: Disease[];
}
const maizeData: MaizeData = {
  plant_name: "MAIZE",
  diseases: [
    {
      name: "Maize lethal necrosis disease",
      signs:
        "Appearance of chlorotic mottling on leaves starting from older to younger leaves",
      prevention:
        "Control vectors such as aphids, thrips, leaf beetles and ensure proper nutrition",
      chemicals: [
        {
          name: "No chemical available for the control of the virus",
          active_ingredient: "N/A",
          application: "N/A",
          dosage: "N/A",
        },
      ],
    },
    {
      name: "Maize Smut",
      signs:
        "Soil borne formation of whitish galls/swellings which rapture realising dark spores",
      prevention: "No prevention",
      chemicals: [
        {
          name: "Gearlock Turbo",
          active_ingredient:
            "Metalaxyl 150 g/kg + Propamocarb hydrochloride 100 g/kg",
          application: "Drench the soil",
          dosage: "40g/20l",
        },
      ],
    },
    {
      name: "Northern leaf blight",
      signs: "Grey-green lesions on leaves which turn pale grey",
      prevention: "Plant resistant variety",
      chemicals: [
        {
          name: "Gearlock Turbo 250wp",
          active_ingredient:
            "Metalaxyl 150 g/kg + Propamocarb hydrochloride 100 g/kg",
          application: "Foliar Spray",
          dosage: "40g/20l",
        },
      ],
    },
  ],
};
export async function POST(request: Request) {
  const { cropPlanned } = await request.json();

  const maizeRelatedTerms = ["maize", "corn", "maize(corn)"];
  const isMaizeRelated = maizeRelatedTerms.some((term) =>
    cropPlanned.toLowerCase().includes(term)
  );

  if (isMaizeRelated) {
    // console.log("Maize related pest")
    try {
      const formattedDiseases: FormattedDisease[] = maizeData.diseases.map(
        (disease: Disease) => ({
          name: disease.name,
          prevention: disease.prevention,
          chemicalControl:
            disease.chemicals.map((chem) => chem.name).join(", ") ||
            "Not recommended",
          modeOfApplication: disease.chemicals[0]?.application || "N/A",
          rateOfApplication: disease.chemicals[0]?.dosage || "N/A",
        })
      );

      return corsResponse({ diseases: formattedDiseases });
    } catch (error) {
      console.error("Error fetching maize data:", error);
      return NextResponse.json(
        { error: "Failed to fetch maize data" },
        { status: 500 }
      );
    }
  }

  // If not maize-related, use the AI model
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

    IMPORTANT: Your entire response must be a valid JSON object. Do not include any text before or after the JSON. Use the following structure:
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

    const responseContent = completion.choices[0]?.message?.content || "{}";

    let result: { diseases: FormattedDisease[] };
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

    return corsResponse(result);
  } catch (error) {
    console.error("Error in disease analysis:", error);

    return corsResponse({ error: "Failed to analyze disease data" }, 500);
  }
}

export async function OPTIONS(request: Request) {
  return corsResponse({});
}
