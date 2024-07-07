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
  