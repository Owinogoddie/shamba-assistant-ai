"use client";

import { FarmInput } from "@/types";
import React, { useState } from "react";
import dynamic from "next/dynamic";
const SearchAddress = dynamic(() => import("@/components/ui/search-address"), {
  ssr: false,
});
interface Props {
  onSubmit: (input: FarmInput) => void;
  isLoading: boolean;
}

export default function FarmReportForm({ onSubmit, isLoading }: Props) {
  const [input, setInput] = useState<FarmInput>({
    farmer_name: "",
    location: "",
    farm_name: "",
    crop_name: "",
    target_yield: "",
    field_size: "",
    ph: "",
    organic_carbon: "",
    nitrogen: "",
    phosphorus: "",
    potassium: "",
    soil_moisture: "",
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type } = e.target;
    setInput(prevInput => ({
      ...prevInput,
      [name]: type === 'number' ? (value === '' ? '' : Number(value)) : value
    }));
  };
  const handleLocationSelect = (location: any) => {
    setInput(prevInput => ({
      ...prevInput,
      location: location.label
    }));
  };
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const formattedInput = Object.entries(input).reduce((acc, [key, value]) => {
      acc[key as keyof FarmInput] = value === '' ? 0 : value;
      return acc;
    }, {} as FarmInput);
    onSubmit(formattedInput);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <input
          name="farmer_name"
          value={input.farmer_name}
          onChange={handleInputChange}
          placeholder="Farmer Name"
          required
          className="input-field"
        />
        <input
          name="farm_name"
          value={input.farm_name}
          onChange={handleInputChange}
          placeholder="Farm Name"
          required
          className="input-field"
        />
        <div className="col-span-2">
          <div className="w-full">
          <SearchAddress
            onSelectLocation={handleLocationSelect}
          />
          </div>
        </div>
        <input
          name="crop_name"
          value={input.crop_name}
          onChange={handleInputChange}
          placeholder="Crop Name"
          required
          className="input-field"
        />
        <input
          name="target_yield"
          type="number"
          value={input.target_yield}
          onChange={handleInputChange}
          placeholder="Target Yield"
          required
          className="input-field"
        />
        <input
          name="field_size"
          type="number"
          value={input.field_size}
          onChange={handleInputChange}
          placeholder="Field Size"
          required
          className="input-field"
        />
        <input
          name="ph"
          type="number"
          step="0.1"
          value={input.ph}
          onChange={handleInputChange}
          placeholder="pH"
          required
          className="input-field"
        />
        <input
          name="organic_carbon"
          type="number"
          step="0.1"
          value={input.organic_carbon}
          onChange={handleInputChange}
          placeholder="Organic Carbon"
          required
          className="input-field"
        />
        <input
          name="nitrogen"
          type="number"
          step="0.01"
          value={input.nitrogen}
          onChange={handleInputChange}
          placeholder="Nitrogen"
          required
          className="input-field"
        />
        <input
          name="phosphorus"
          type="number"
          value={input.phosphorus}
          onChange={handleInputChange}
          placeholder="Phosphorus"
          required
          className="input-field"
        />
        <input
          name="potassium"
          type="number"
          value={input.potassium}
          onChange={handleInputChange}
          placeholder="Potassium"
          required
          className="input-field"
        />
        <input
          name="soil_moisture"
          type="number"
          value={input.soil_moisture}
          onChange={handleInputChange}
          placeholder="Soil Moisture"
          required
          className="input-field"
        />
      </div>
      
      <button 
        type="submit" 
        disabled={isLoading}
        className={`mt-4 bg-green-500 text-white px-4 py-2 rounded ${isLoading ? 'opacity-50 cursor-not-allowed' : 'hover:bg-green-600'}`}
      >
        {isLoading ? 'Generating Report...' : 'Generate Report'}
      </button>
    </form>
  );
}
