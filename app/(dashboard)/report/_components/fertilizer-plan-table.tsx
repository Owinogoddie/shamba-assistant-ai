import React from "react";
import { ProcessedFertilizerPlan, ProcessedOption } from "../lib/types";

interface Props {
  plan: ProcessedFertilizerPlan;
}

const FertilizerPlanTable: React.FC<Props> = ({ plan }) => {
  const renderApplicationOption = (option: ProcessedOption, title: string) => {
    return (
      <div className="">
        <h3 className="text-xl font-semibold mb-4 text-green-800">{title}</h3>
        <table className="min-w-full bg-white border border-gray-300 shadow-lg rounded-lg overflow-hidden mb-8">
          <thead>
            <tr className="bg-green-100">
              <th className="py-2 px-4 border-b">Application</th>
              <th className="py-2 px-4 border-b">Timing</th>
              <th className="py-2 px-4 border-b">Fertilizer</th>
            </tr>
          </thead>
          <tbody>
            <tr className="bg-gray-50">
              <td className="py-2 px-4 border-b">1st Application</td>
              <td className="py-2 px-4 border-b">
                {option.firstApplication.timing}
              </td>
              <td className="py-2 px-4 border-b">
                {option.firstApplication.fertilizer}
              </td>
            </tr>
            {option.secondApplication && (
              <tr>
                <td className="py-2 px-4 border-b">2nd Application</td>
                <td className="py-2 px-4 border-b">
                  {option.secondApplication.timing}
                </td>
                <td className="py-2 px-4 border-b">
                  {option.secondApplication.fertilizer}
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    );
  };

  const renderSoilCorrection = () => {
    if (!plan.soilCorrection) return null;

    return (
      <div className="mb-8">
        <h3 className="text-xl font-semibold mb-4 text-green-800">
          Soil Correction
        </h3>
        <table className="min-w-full bg-white border border-gray-300 shadow-lg rounded-lg overflow-hidden mb-8">
          <thead>
            <tr className="bg-green-100">
              <th className="py-2 px-4 border-b">Amendment</th>
              <th className="py-2 px-4 border-b">Application</th>
            </tr>
          </thead>
          <tbody>
            {plan.soilCorrection.limeApplication && (
              <tr className="bg-gray-50">
                <td className="py-2 px-4 border-b">Lime</td>
                <td className="py-2 px-4 border-b">
                  {plan.soilCorrection.limeApplication}
                </td>
              </tr>
            )}
            {plan.soilCorrection.organicMatterApplication && (
              <tr>
                <td className="py-2 px-4 border-b">Organic Matter</td>
                <td className="py-2 px-4 border-b">
                  {plan.soilCorrection.organicMatterApplication}
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    );
  };

  return (
    <section className="mb-8 mt-6 page-break-inside-avoid">
      <h2 className="text-2xl font-semibold mb-4 text-green-800">
        Fertilizer Plan
      </h2>
      {renderApplicationOption(plan.bestOption, "Best Option")}
      {renderApplicationOption(plan.secondOption, "Second Option")}
      {renderApplicationOption(plan.thirdOption, "Third Option")}
      {renderSoilCorrection()}
    </section>
  );
};

export default FertilizerPlanTable;
