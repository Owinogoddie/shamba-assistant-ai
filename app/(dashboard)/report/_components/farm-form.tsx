'use client';

import React, { useState, useCallback } from 'react';
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { CountySelect } from "./county-select";
import { LocationSearch } from "./location-search";
import { CropNameSearch } from "./crop-name-search";
import { FarmData } from '../lib/types'

interface FarmFormProps {
  onSubmit: (data: FarmData) => void;
}

export function FarmForm({ onSubmit }: FarmFormProps) {
  const [farmData, setFarmData] = useState<FarmData>({
    farmerName: "",
    farmName: "",
    county: "",
    location: { lat: 0, lng: 0, label: "" },
    cropName: "",
    fieldSize: 0,
    targetYield: "",
    ph: "",
    organicCarbon: "",
    nitrogen: "",
    phosphorus: "",
    potassium: "",
    soilMoisture: "",
    temperature: 0,
    soilConductivity: "",
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFarmData(prev => ({ ...prev, [name]: value }));
  };

  const handleCountySelect = useCallback((county: string) => {
    setFarmData((prev) => ({ ...prev, county }));
  }, []);

  const handleLocationSelect = useCallback((lat: number, lng: number, label: string) => {
    setFarmData((prev) => ({ ...prev, location: { lat, lng, label } }));
  }, []);

  const handleCropNameSelect = useCallback((cropName: string) => {
    setFarmData((prev) => ({ ...prev, cropName }));
  }, []);

  const handleSubmit = useCallback((e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(farmData);
  }, [farmData, onSubmit]);

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid md:grid-cols-2 gap-4">
        {Object.keys(farmData).map((key) => {
          if (key === 'county') {
            return (
              <div key={key} className="md:col-span-2">
                <Label htmlFor={key}>County</Label>
                <CountySelect
                  value={farmData.county}
                  onChange={handleCountySelect}
                />
              </div>
            );
          } else if (key === 'location') {
            return (
              <div key={key} className="md:col-span-2">
                <Label htmlFor={key}>Location</Label>
                <LocationSearch
                  value={farmData.location}
                  onChange={handleLocationSelect}
                />
              </div>
            );
          } else if (key === 'cropName') {
            return (
              <div key={key} className="md:col-span-2">
                <CropNameSearch
                  value={farmData.cropName}
                  onChange={handleCropNameSelect}
                />
              </div>
            );
          } else if (key === 'soilConductivity') {
            return (
              <div key={key}>
                <Label htmlFor={key}>Soil Conductivity</Label>
                <Input
                  id={key}
                  name={key}
                  type="number"
                  value={farmData[key] as string}
                  onChange={handleInputChange}
                />
              </div>
            );
          } else {
            return (
              <div key={key}>
                <Label htmlFor={key}>{key.charAt(0).toUpperCase() + key.slice(1)}</Label>
                <Input
                  id={key}
                  name={key}
                  type={key === 'temperature' ? 'number' : 'text'}
                  value={farmData[key as keyof FarmData] as string}
                  onChange={handleInputChange}
                  required={key !== 'soilConductivity'}
                />
              </div>
            );
          }
        })}
      </div>
      <Button type="submit" className='w-full'>Generate Report</Button>
    </form>
  );
}