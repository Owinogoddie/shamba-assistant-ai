import { SoilAnalysisReportData } from './lib/types';

export const placeholderData: any = {

  
  farmInfo: {
    name: "Green Acres Farm",
    owner: "Jane Smith",
    location: "Nakuru, Kenya"
  },
  soilData: {
    nitrogen: 1.2,
    phosphorus: 0.8,
    potassium: 1.5,
    moisture: 35,
    carbon: 2.8,
    temperature: 25,
    ph: 6.5
  },
  recommendations: {
    analysis: "The soil analysis indicates moderate fertility with balanced NPK levels. The pH is slightly acidic, which is suitable for most crops. Organic matter content is good, contributing to water retention and nutrient availability.",
    items: `
# Recommendations

1. **Nitrogen Management:**
   - Apply 50 kg/ha of nitrogen fertilizer to support leafy growth.
   - Consider using slow-release nitrogen sources for prolonged nutrient availability.

2. **Phosphorus and Potassium:**
   - Maintain current phosphorus levels through organic mulching.
   - Monitor potassium levels and consider a light application if deficiency symptoms appear.

3. **pH Adjustment:**
   - Consider liming in the next season to slightly increase pH for optimal nutrient uptake.
   - Aim for a pH of 6.8-7.2 for most crops.

4. **Organic Matter:**
   - Implement cover cropping to further improve soil organic matter and moisture retention.
   - Rotate with leguminous crops to naturally fix nitrogen in the soil.

5. **Water Management:**
   - Current moisture levels are adequate. Implement efficient irrigation practices during dry spells.
   - Consider mulching to reduce water evaporation from the soil surface.
    `
  },
  soilCorrectionPlan: [
    {
      timing: "Before Planting",
      instructions: "If Available",
      bestOption: "1049 kg Compost",
      firstAlternative: "Use 1049 kg of animal manure",
      secondAlternative: "Commercial organic fertilizer"
    },
    {
      timing: "At Planting",
      instructions: "Place the fertilizer at the bottom of the planting holes, put 10 cm of soil on top, add the seed and cover the seed with soil.",
      bestOption: "Use recommended fertilizer mix",
      firstAlternative: "Use a balanced NPK fertilizer",
      secondAlternative: "Use organic starter fertilizer"
    },
    {
      timing: "6 weeks after",
      instructions: "You can topdress when your crops are 6 weeks old and healthy (no pests, sufficient rain).",
      bestOption: "Topdress with urea",
      firstAlternative: "Topdress with ammonium nitrate",
      secondAlternative: "Topdress with compost tea"
    }
  ],
  pestControl: [
    {
      pest: "Aphids",
      prevention: "Use reflective mulches",
      chemicalName: "Insect-B-Gone",
      activeIngredient: "Pyrethrin",
      modeOfApplication: "Foliar spray",
      rateOfApplication: "5ml/L",
    },
    {
      pest: "Cutworms",
      prevention: "Clear debris, use collar barriers",
      chemicalName: "CutStop",
      activeIngredient: "Chlorpyrifos",
      modeOfApplication: "Soil drench",
      rateOfApplication: "10ml/L",
    }
  ],
  diseaseControl: [
    {
      disease: "Blight",
      prevention: "Crop rotation, proper spacing",
      chemicalName: "BlightAway",
      activeIngredient: "Mancozeb",
      modeOfApplication: "Foliar spray",
      rateOfApplication: "20g/10L",
    },
    {
      disease: "Powdery Mildew",
      prevention: "Proper air circulation",
      chemicalName: "MildewGuard",
      activeIngredient: "Sulfur",
      modeOfApplication: "Dusting",
      rateOfApplication: "5g/m²",
    }
  ],

};
export const nutrientRecommendations = [
  { name: "Nitrogen (N)", amount: 1911.21 },
  { name: "Phosphorus (P)", amount: 2526.23 },
  { name: "Potassium (K)", amount: 232.30 },
];

export const soilCorrectionPlan= [
  {
    timing: "Before Planting",
    instructions: "If Available",
    bestOption: "1049 kg Compost",
    firstAlternative: "Use 1049 kg of animal manure",
    secondAlternative: "Commercial organic fertilizer"
  },
  {
    timing: "At Planting",
    instructions: "Place the fertilizer at the bottom of the planting holes, put 10 cm of soil on top, add the seed and cover the seed with soil.",
    bestOption: "Use recommended fertilizer mix",
    firstAlternative: "Use a balanced NPK fertilizer",
    secondAlternative: "Use organic starter fertilizer"
  },
  {
    timing: "6 weeks after",
    instructions: "You can topdress when your crops are 6 weeks old and healthy (no pests, sufficient rain).",
    bestOption: "Topdress with urea",
    firstAlternative: "Topdress with ammonium nitrate",
    secondAlternative: "Topdress with compost tea"
  }
]
export const pestControl= [
  {
    pest: "Aphids",
    prevention: "Use reflective mulches",
    chemicalName: "Insect-B-Gone",
    activeIngredient: "Pyrethrin",
    modeOfApplication: "Foliar spray",
    rateOfApplication: "5ml/L",
  },
  {
    pest: "Cutworms",
    prevention: "Clear debris, use collar barriers",
    chemicalName: "CutStop",
    activeIngredient: "Chlorpyrifos",
    modeOfApplication: "Soil drench",
    rateOfApplication: "10ml/L",
  }
]
export const diseaseControl= [
  {
    disease: "Blight",
    prevention: "Crop rotation, proper spacing",
    chemicalName: "BlightAway",
    activeIngredient: "Mancozeb",
    modeOfApplication: "Foliar spray",
    rateOfApplication: "20g/10L",
  },
  {
    disease: "Powdery Mildew",
    prevention: "Proper air circulation",
    chemicalName: "MildewGuard",
    activeIngredient: "Sulfur",
    modeOfApplication: "Dusting",
    rateOfApplication: "5g/m²",
  }
]