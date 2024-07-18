"use client";

import { useState, useEffect } from "react";
import { ProcessedFertilizerPlan } from "../lib/types";
import FertilizerPlanTable from "./_components/FertilizerPlanTable";

export default function FertilizerPlanPage() {
  const [fertilizerPlan, setFertilizerPlan] =
    useState<ProcessedFertilizerPlan | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function loadFertilizerPlan() {
      try {
        const response = await fetch("/api/fertilizer-plan");
        if (!response.ok) {
          throw new Error("Failed to fetch fertilizer plan");
        }
        const plan: ProcessedFertilizerPlan = await response.json();
        setFertilizerPlan(plan);
      } catch (err) {
        setError("Failed to load fertilizer plan. Please try again later.");
        console.error(err);
      }
    }

    loadFertilizerPlan();
  }, []);

  if (error) return <div className="text-red-500">{error}</div>;
  if (!fertilizerPlan) return <div>Loading...</div>;

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Fertilizer Application Plan</h1>
      <FertilizerPlanTable plan={fertilizerPlan} />
    </div>
  );
}
