export interface FarmInput {
    farmer_name: string;
    location: string;
    farm_name: string;
    crop_name: string;
    target_yield: string | number;
    field_size: string | number;
    ph: string | number;
    organic_carbon: string | number;
    nitrogen: string | number;
    phosphorus: string | number;
    potassium: string | number;
    soil_moisture: string | number;
  }
  
  export interface NPKRecommendation {
    n: number;
    p: number;
    k: number;
    organic_matter: number;
    lime: number;
  }
  
  export interface Report {
    content: string;
    recommendation: NPKRecommendation;
    date: string;
    consultant: string;
  }
  export interface SoilAnalysisReportData {
    Nutrientrecommendation:NPKRecommendation;
    farmInfo: FarmInfo;
    soilData: SoilData;
    recommendations: any;
    soilCorrectionPlan:soilCorrectionPlan[]
    pestControl:any
    diseaseControl:any
  }
  
  export interface FarmData {
    farmerName: string;
    farmName: string;
    county: string;
    location: { lat: number; lng: number; label: string };
    cropName: string;
    fieldSize: number;
    targetYield: string;
    ph: string;
    organicCarbon: string;
    nitrogen: string;
    phosphorus: string;
    potassium: string;
    soilMoisture: string;
    temperature: number;
    soilConductivity?: any;
  }