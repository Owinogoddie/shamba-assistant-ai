// app/api-docs/page.tsx
"use client";
import React from "react";
import ApiEndpoint from "./_components/api_endpoint";

const ApiDocs: React.FC = () => {
  return (
    <div className="min-h-screen bg-green-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-center text-green-800 mb-8">
          Shamba Assistant AI API Documentation
        </h1>
        <p className="text-xl text-green-600 text-center mb-12">
          Welcome to the API documentation for Shamba Assistant AI. This API
          provides various endpoints to help farmers with crop management,
          disease detection, and soil analysis.
        </p>

        <ApiEndpoint
          title="Disease Report"
          endpoint="/api/report/diseases"
          method="POST"
          description="Get information about potential diseases for a specific crop."
          requestBody={{
            cropPlanned: "string",
          }}
          responseBody={{
            diseases: [
              {
                name: "string",
                prevention: "string",
                chemicalControl: "string",
                modeOfApplication: "string",
                rateOfApplication: "string",
              },
            ],
          }}
          exampleRequest={{
            cropPlanned: "maize",
          }}
          exampleResponse={{
            diseases: [
              {
                name: "Maize Streak Virus",
                prevention:
                  "Use resistant varieties and control insect vectors",
                chemicalControl: "No effective chemical control",
                modeOfApplication: "N/A",
                rateOfApplication: "N/A",
              },
            ],
          }}
        />

        <ApiEndpoint
          title="NPK Predictor"
          endpoint="/api/report/npk-predictor"
          method="POST"
          description="Predict NPK (Nitrogen, Phosphorus, Potassium) needs based on farm data."
          requestBody={{
            cropName: "string",
            targetYield: "number",
            fieldSize: "number",
            ph: "number",
            organicCarbon: "number",
            nitrogen: "number",
            phosphorus: "number",
            potassium: "number",
            soilMoisture: "number",
          }}
          responseBody={{
            nitrogen_need: "number",
            phosphorus_need: "number",
            potassium_need: "number",
          }}
          exampleRequest={{
            cropName: "maize",
            targetYield: 5000,
            fieldSize: 1,
            ph: 6.5,
            organicCarbon: 1.2,
            nitrogen: 20,
            phosphorus: 15,
            potassium: 25,
            soilMoisture: 60,
          }}
          exampleResponse={{
            nitrogen_need: 120,
            phosphorus_need: 60,
            potassium_need: 40,
          }}
        />

        <ApiEndpoint
          title="Final Report"
          endpoint="/api/report/final-report"
          method="POST"
          description="Generate a comprehensive farm report based on farm data and NPK results."
          requestBody={{
            farmData: {
              farmName: "string",
              farmerName: "string",
              location: { label: "string" },
              cropName: "string",
              nitrogen: "number",
              phosphorus: "number",
              potassium: "number",
              soilMoisture: "number",
              organicCarbon: "number",
              ph: "number",
            },
            npkResult: {
              nitrogen_need: "number",
              phosphorus_need: "number",
              potassium_need: "number",
            },
          }}
          responseBody={{
            reportContent: "string",
          }}
          exampleRequest={{
            farmData: {
              farmName: "Green Acres",
              farmerName: "John Doe",
              location: { label: "Nairobi, Kenya" },
              cropName: "maize",
              nitrogen: 20,
              phosphorus: 15,
              potassium: 25,
              soilMoisture: 60,
              organicCarbon: 1.2,
              ph: 6.5,
            },
            npkResult: {
              nitrogen_need: 120,
              phosphorus_need: 60,
              potassium_need: 40,
            },
          }}
          exampleResponse={{
            reportContent: "Detailed farm report content...",
          }}
        />

        <ApiEndpoint
          title="Pest Report"
          endpoint="/api/report/pests"
          method="POST"
          description="Get information about potential pests for a specific crop."
          requestBody={{
            cropPlanned: "string",
          }}
          responseBody={{
            pests: [
              {
                name: "string",
                prevention: "string",
                chemicalControl: "string",
                modeOfApplication: "string",
                rateOfApplication: "string",
              },
            ],
          }}
          exampleRequest={{
            cropPlanned: "tomato",
          }}
          exampleResponse={{
            pests: [
              {
                name: "Tomato Hornworm",
                prevention: "Crop rotation, handpicking",
                chemicalControl: "Bacillus thuringiensis (Bt)",
                modeOfApplication: "Foliar spray",
                rateOfApplication: "1-2 tsp per gallon of water",
              },
            ],
          }}
        />

        <ApiEndpoint
          title="Soil Correction Plan"
          endpoint="/api/report/soil-correction-plan"
          method="POST"
          description="Generate a soil correction plan based on farm data and NPK results."
          requestBody={{
            farmData: {
              cropName: "string",
              targetYield: "number",
              fieldSize: "number",
              ph: "number",
              organicCarbon: "number",
              nitrogen: "number",
              phosphorus: "number",
              potassium: "number",
              soilMoisture: "number",
            },
            npkResult: {
              nitrogen_need: "number",
              phosphorus_need: "number",
              potassium_need: "number",
            },
          }}
          responseBody={{
            soilCorrectionPlan: [
              {
                timing: "string",
                instructions: "string",
                bestOption: "string",
                firstAlternative: "string",
                secondAlternative: "string",
              },
            ],
          }}
          exampleRequest={{
            farmData: {
              cropName: "maize",
              targetYield: 5000,
              fieldSize: 1,
              ph: 6.5,
              organicCarbon: 1.2,
              nitrogen: 20,
              phosphorus: 15,
              potassium: 25,
              soilMoisture: 60,
            },
            npkResult: {
              nitrogen_need: 120,
              phosphorus_need: 60,
              potassium_need: 40,
            },
          }}
          exampleResponse={{
            soilCorrectionPlan: [
              {
                timing: "Before planting",
                instructions: "Apply base fertilizer and adjust soil pH",
                bestOption: "Apply 100 kg/ha of NPK 17-17-17",
                firstAlternative: "Apply 80 kg/ha of DAP",
                secondAlternative: "Apply 90 kg/ha of NPK 15-15-15",
              },
              {
                timing: "6 weeks after planting",
                instructions: "Apply top dressing fertilizer",
                bestOption: "Apply 100 kg/ha of Urea",
                firstAlternative: "Apply 120 kg/ha of CAN",
                secondAlternative: "Apply 90 kg/ha of Ammonium Sulfate",
              },
            ],
          }}
        />

        <ApiEndpoint
          title="Plant Analysis"
          endpoint="/api/plant-analysis"
          method="POST"
          description="Analyze plant images for diseases and provide recommendations."
          requestBody={{
            imageBuffer: "string (base64 encoded image)",
            text: "string (optional)",
          }}
          responseBody={{
            analysisResult: "string (formatted analysis result)",
          }}
          exampleRequest={{
            imageBuffer: "base64_encoded_image_data_here",
            text: "Please analyze this maize plant for any diseases",
          }}
          exampleResponse={{
            analysisResult: `
**Introduction**
The image shows a maize plant with visible signs of disease.

**Disease Name**
Northern Corn Leaf Blight (NCLB)

**Description**
Long, elliptical, grayish-green to tan lesions on the leaves.

**Causes**
Caused by the fungus Exserohilum turcicum.

**Prevention**
1. Plant resistant hybrids
2. Practice crop rotation
3. Remove and destroy crop debris

**Cure**
1. Apply fungicides such as azoxystrobin or pyraclostrobin
2. Timing is critical - apply at first sign of disease
3. Follow label instructions for application rates and frequency
            `,
          }}
        />
      </div>
    </div>
  );
};

export default ApiDocs;
