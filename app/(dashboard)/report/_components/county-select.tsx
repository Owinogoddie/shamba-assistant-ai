'use client'
import React, { useState, useEffect, useCallback } from 'react';
import { Input } from "@/components/ui/input";

const KENYAN_COUNTIES = [
  "Mombasa", "Kwale", "Kilifi", "Tana River", "Lamu", "Taita-Taveta", "Garissa",
  "Wajir", "Mandera", "Marsabit", "Isiolo", "Meru", "Tharaka-Nithi", "Embu",
  "Kitui", "Machakos", "Makueni", "Nyandarua", "Nyeri", "Kirinyaga", "Murang'a",
  "Kiambu", "Turkana", "West Pokot", "Samburu", "Trans Nzoia", "Uasin Gishu",
  "Elgeyo-Marakwet", "Nandi", "Baringo", "Laikipia", "Nakuru", "Narok", "Kajiado",
  "Kericho", "Bomet", "Kakamega", "Vihiga", "Bungoma", "Busia", "Siaya", "Kisumu",
  "Homa Bay", "Migori", "Kisii", "Nyamira", "Nairobi"
];

interface CountySelectProps {
  value?: string;
  onChange: (county: string) => void;
}

export function CountySelect({ onChange:onCountySelect }: CountySelectProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCounty, setSelectedCounty] = useState('');

  const filteredCounties = KENYAN_COUNTIES.filter(county =>
    county.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleCountySelect = useCallback((county: string) => {
    setSelectedCounty(county);
    onCountySelect(county);
    setIsOpen(false);
    setSearchTerm('');
  }, [onCountySelect]);

  useEffect(() => {
    if (selectedCounty) {
      handleCountySelect(selectedCounty);
    }
  }, [selectedCounty, handleCountySelect]);

  return (
    <div className="relative">
      <Input
        type="text"
        value={selectedCounty || searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        onClick={() => setIsOpen(true)}
        placeholder="Select a county"
      />
      {isOpen && (
        <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-md shadow-lg">
          <div className="max-h-60 overflow-auto">
            {filteredCounties.map((county) => (
              <div
                key={county}
                className="px-4 py-2 cursor-pointer hover:bg-gray-100"
                onClick={() => handleCountySelect(county)}
              >
                {county}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}