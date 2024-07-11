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
}

export interface FarmInput {
  farmer_name: string;
  location?: string;
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



export interface CompanyInfo {
  name: string;
  address: string;
  contact: string;
  logo: string;
}

export interface Analyst {
  name: string;
  date: string;
}

export interface FarmInfo {
  name: string;
  owner: string;
  location: string;
}

export interface SoilData {
  nitrogen: any;
  phosphorus: any;
  potassium: any;
  moisture: any;
  carbon: any;
  temperature: any;
  ph: any;
}

export interface Recommendations {
  analysis: string;
  items: string;
}
export interface soilCorrectionPlan{
  timing: string
    instructions: string,
    bestOption: string,
    firstAlternative: string,
    secondAlternative: string
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

