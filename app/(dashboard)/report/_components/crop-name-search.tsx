'use client';

import React, { useState, useEffect } from 'react';
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface CropNameSearchProps {
  value: string;
  onChange: (value: string) => void;
}

export function CropNameSearch({ value, onChange }: CropNameSearchProps) {
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [uniqueCrops, setUniqueCrops] = useState<string[]>([]);

  useEffect(() => {
    fetch('/unique_crop_names.json')
      .then(response => response.json())
      .then(data => setUniqueCrops(data.unique_crops))
      .catch(error => console.error('Error loading crop names:', error));
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;
    onChange(inputValue);

    if (inputValue.length > 0) {
      const filteredSuggestions = uniqueCrops.filter(crop =>
        crop.toLowerCase().includes(inputValue.toLowerCase())
      );
      setSuggestions(filteredSuggestions);
    } else {
      setSuggestions([]);
    }
  };

  const handleSuggestionClick = (suggestion: string) => {
    onChange(suggestion);
    setSuggestions([]);
  };

  return (
    <div className="relative">
      <Label htmlFor="cropName">Crop Name</Label>
      <Input
        id="cropName"
        name="cropName"
        value={value}
        onChange={handleInputChange}
        autoComplete="off"
      />
      {suggestions.length > 0 && (
        <ul className="absolute z-10 w-full bg-white border border-gray-300 mt-1 max-h-60 overflow-auto">
          {suggestions.map((suggestion, index) => (
            <li
              key={index}
              className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
              onClick={() => handleSuggestionClick(suggestion)}
            >
              {suggestion}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}