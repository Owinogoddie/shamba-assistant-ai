'use client';

import React, { useState, useCallback, useEffect, useRef } from 'react';
import { OpenStreetMapProvider } from 'leaflet-geosearch';
import { Input } from "@/components/ui/input";

// Define the structure of a Location object
interface Location {
  lat: number;
  lng: number;
  label: string;
}

// Define the props that the LocationSearch component accepts
interface LocationSearchProps {
  value?: { lat: number; lng: number; label: string };
  onChange: (lat: number, lng: number, label: string) => void;
}

// Custom debounce function to limit how often a function is called
function debounce<T extends (...args: any[]) => any>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeout: NodeJS.Timeout | null = null;

  return (...args: Parameters<T>) => {
    const later = () => {
      timeout = null;
      func(...args);
    };

    if (timeout !== null) {
      clearTimeout(timeout);
    }
    timeout = setTimeout(later, wait);
  };
}

// Debounced search function
const debouncedSearch = debounce((term: string, searchFunc: (term: string) => Promise<void>) => {
  searchFunc(term);
}, 300);

export function LocationSearch({ onChange: onLocationSelect }: LocationSearchProps) {
  // State for the search input
  const [searchTerm, setSearchTerm] = useState('');
  // State for the search results
  const [results, setResults] = useState<Location[]>([]);
  // State to control whether the results dropdown is open
  const [isOpen, setIsOpen] = useState(false);

  // Create a ref to hold the OpenStreetMapProvider instance
  const provider = useRef(new OpenStreetMapProvider());

  // Function to perform the search
  const search = async (term: string) => {
    if (term.length > 2) {
      const searchResults = await provider.current.search({ query: term });
      const formattedResults: Location[] = searchResults.map(result => ({
        lat: result.y,
        lng: result.x,
        label: result.label
      }));
      setResults(formattedResults);
      setIsOpen(true);
    } else {
      setResults([]);
      setIsOpen(false);
    }
  };

  // Effect to trigger search when searchTerm changes
  useEffect(() => {
    debouncedSearch(searchTerm, search);
  }, [searchTerm]);

  // Function to handle selection of a location
  const handleSelect = useCallback((location: Location) => {
    onLocationSelect(location.lat, location.lng, location.label);
    setSearchTerm(location.label);
    setIsOpen(false);
  }, [onLocationSelect]);

  return (
    <div className="relative">
      <Input
        type="text"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        placeholder="Search for a location"
      />
      {isOpen && results.length > 0 && (
        <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-md shadow-lg">
          <div className="max-h-60 overflow-auto">
            {results.map((result, index) => (
              <div
                key={index}
                className="px-4 py-2 cursor-pointer hover:bg-gray-100"
                onClick={() => handleSelect(result)}
              >
                {result.label}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}