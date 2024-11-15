import React from "react";
import {
  Thermometer,
  Zap,
  User,
  Phone,
  Mail,
  MapPin,
  Droplets,
} from "lucide-react";
import { SoilData, SoilAnalysisReportData } from "./lib/types";
import ReactMarkdown from "react-markdown";
import Image from "next/image";
import FertilizerPlanTable from "./_components/fertilizer-plan-table";

function generateReportNumber() {
  const date = new Date();
  const year = date.getFullYear().toString().substr(-2);
  const month = (date.getMonth() + 1).toString().padStart(2, "0");
  const day = date.getDate().toString().padStart(2, "0");
  const random = Math.floor(Math.random() * 10000)
    .toString()
    .padStart(4, "0");
  return `${year}${month}${day}-${random}`;
}
const companyInfo = {
  name: "Shamba Solutions",
  address: "Thika Road, KU, Kenya",
  contact: "hello@ycenterssl.com | +254 790 566 616",
  logo: "/logo_dark.svg",
};
const analyst = {
  name: "Steve Kinyua",
  date: new Date().toISOString().split('T')[0],
};
const SoilAnalysisReport: React.FC<SoilAnalysisReportData> = ({
  farmInfo,
  soilData,
  recommendations,
  pestControl,
  diseaseControl,
  Nutrientrecommendation,
  fertilizerApplicationPlan,
}) => {
  const createMappedData = (soilData: any) => {
    return [
      {
        label: "pH",
        value: soilData.ph,
        color: "yellow",
        icon: "/water-drop.svg",
      },
      {
        label: "Temp",
        value: soilData.temperature,
        color: "red",
        icon: Thermometer,
      },
      {
        label: "Conductivity",
        value: soilData.conductivity,
        color: "emerald",
        icon: Zap,
      },
      {
        label: "Nitrogen (N)",
        value: soilData.nitrogen,
        color: "blue",
        icon: "/nitrogen-icon.svg",
      },
      {
        label: "Phosphorus (P)",
        value: soilData.phosphorus,
        color: "orange",
        icon: "/phosphorus.svg",
      },
      {
        label: "Potassium (K)",
        value: soilData.potassium,
        color: "purple",
        icon: "/potassium.svg",
      },
      {
        label: "Moisture",
        value: soilData.moisture,
        color: "cyan",
        icon: Droplets,
      },
    ];
  };
  const MappedData = createMappedData(soilData);

  function convertToNutrientRecommendations(data: any) {
    return [
      { name: "Nitrogen (N)", amount: data.nitrogen_need },
      { name: "Phosphorus (P)", amount: data.phosphorus_need },
      { name: "Potassium (K)", amount: data.potassium_need },
    ];
  }
  const nutrientRecommendations = convertToNutrientRecommendations(
    Nutrientrecommendation
  );

  const reportNumber = generateReportNumber();
  return (
    <div className="max-w-4xl mx-auto p-8 shadow-lg bg-white font-sans">
      {/* Main Heading */}
      <h1 className="text-2xl font-bold text-center text-green-800 mb-8">
        Shamba Solutions Analysis Report
      </h1>

      {/* Header */}
      <header className="flex justify-between items-center mb-8 border-b pb-4">
        <div className="space-y-2">
          <p className="flex items-center"> Report No: {reportNumber}</p>
          <h2 className="text-xl font-semibold mb-4 text-slate-400">
            Facilitator
          </h2>
          <p className="flex items-center">
            <User className="inline h-5 w-5 mr-2 text-green-500" /> john doe
          </p>
          <p className="flex items-center">
            <Phone className="inline h-5 w-5 mr-2 text-green-500" /> 07070707
          </p>
          <p className="flex items-center">
            <Mail className="inline h-5 w-5 mr-2 text-green-500" />{" "}
            emai@email.com
          </p>
        </div>
        <div className="flex flex-col items-end">
          <Image
            src={companyInfo.logo}
            alt={`${companyInfo.name} Logo`}
            height={120}
            width={100}
            className="h-16 mb-2"
          />
          <div className="text-right">
            <h2 className="text-xl font-bold text-green-800">
              {companyInfo.name}
            </h2>
            <p className="text-sm text-gray-600">{companyInfo.address}</p>
            <p className="text-sm text-gray-600">{companyInfo.contact}</p>
            <p className="text-sm text-gray-600">{analyst.date}</p>
          </div>
        </div>
      </header>

      {/* Farm Info */}
      <section className="mb-8">
        <h2 className="text-xl text-center font-semibold mb-4 text-slate-400">
          Farmer Information
        </h2>
        <div className="flex justify-center items-center space-x-8">
          <p>
            <User className="inline mr-2 text-green-500" /> {farmInfo.name}
          </p>
          <p>
            <User className="inline mr-2 text-green-500" /> {farmInfo.owner}
          </p>
          <p>
            <MapPin className="inline mr-2 text-green-500" />{" "}
            {farmInfo.location}
          </p>
        </div>
      </section>

      {/* Soil Condition Cards */}
      <section className="mb-8 grid grid-cols-4 gap-4">
        {MappedData.map((item, index) => (
          <div
            className={`flex p-4 rounded-lg justify-between items-center shadow-md border-t-4 border-${item.color}-500 bg-${item.color}-50`}
            key={index}
          >
            {typeof item.icon === "string" ? (
              <Image
                src={item.icon}
                alt={item.label}
                width={32}
                height={32}
                className={`mr-4 text-${item.color}-500`}
              />
            ) : (
              <item.icon className={`mr-4 text-${item.color}-500 h-8 w-8`} />
            )}
            <div className="flex flex-col justify-center">
              <p
                className={`text-xl text-right font-bold text-${item.color}-600`}
              >
                {item.value}
              </p>
              <p className={`text-sm text-${item.color}-700`}>{item.label}</p>
            </div>
          </div>
        ))}
      </section>
      {/* Nutrient Recommendations Table */}
      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4 text-green-800">
          Nutrient Recommendations
        </h2>
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border border-gray-300 shadow-lg rounded-lg overflow-hidden">
            <thead>
              <tr className="bg-green-100">
                <th className="py-3 px-6 text-left text-xs font-medium text-green-700 uppercase tracking-wider">
                  Nutrient
                </th>
                <th className="py-3 px-6 text-left text-xs font-medium text-green-700 uppercase tracking-wider">
                  Amount (kg/acre)
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {nutrientRecommendations.map((nutrient, index) => (
                <tr
                  key={index}
                  className={index % 2 === 0 ? "bg-gray-50" : "bg-white"}
                >
                  <td className="py-4 px-6 text-sm font-medium text-gray-900">
                    {nutrient.name}
                  </td>
                  <td className="py-4 px-6 text-sm text-gray-500">
                    {nutrient.amount.toFixed(2)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Fertilizer Plan, Pest Control, and Disease Control */}
      <div>
        {/* Fertilizer Plan */}
        <br />
        <section className="mb-8 mt-6 page-break-inside-avoid">
          <FertilizerPlanTable plan={fertilizerApplicationPlan} />
        </section>

        {/* Pest Control */}
        <section className="mb-8 mt-6 page-break-inside-avoid">
          <h2 className="text-2xl font-semibold mb-4 text-green-800">
            Pest Control
          </h2>
          <table className="min-w-full bg-white border border-gray-300 shadow-lg rounded-lg overflow-hidden mb-8">
            <thead>
              <tr className="bg-green-100">
                <th className="py-2 px-4 border-b">Pest</th>
                <th className="py-2 px-4 border-b">Prevention</th>
                <th className="py-2 px-4 border-b">Chemical Name</th>
                {/* <th className="py-2 px-4 border-b">Active Ingredient</th> */}
                <th className="py-2 px-4 border-b">Mode of Application</th>
                <th className="py-2 px-4 border-b">Rate of Application</th>
              </tr>
            </thead>
            <tbody>
              {/* prevention
chemicalControl
modeOfApplication
rateOfApplication */}
              {pestControl.map((pest: any, index: number) => (
                <tr key={index} className={index % 2 === 0 ? "bg-gray-50" : ""}>
                  <td className="py-2 px-4 border-b">{pest.name}</td>
                  <td className="py-2 px-4 border-b">{pest.prevention}</td>
                  <td className="py-2 px-4 border-b">{pest.chemicalControl}</td>
                  {/* <td className="py-2 px-4 border-b">
                    {pest.activeIngredient}
                  </td> */}
                  <td className="py-2 px-4 border-b">
                    {pest.modeOfApplication}
                  </td>
                  <td className="py-2 px-4 border-b">
                    {pest.rateOfApplication}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>

        {/* Disease Control */}
        <section className="mb-8 mt-6 page-break-inside-avoid">
          <h2 className="text-2xl font-semibold mb-4 text-green-800">
            Disease Control
          </h2>
          <table className="min-w-full bg-white border border-gray-300 shadow-lg rounded-lg overflow-hidden mb-8">
            <thead>
              <tr className="bg-green-100">
                <th className="py-2 px-4 border-b">Disease</th>
                <th className="py-2 px-4 border-b">Prevention</th>
                <th className="py-2 px-4 border-b">Chemical Name</th>
                {/* <th className="py-2 px-4 border-b">Active Ingredient</th> */}
                <th className="py-2 px-4 border-b">Mode of Application</th>
                <th className="py-2 px-4 border-b">Rate of Application</th>
              </tr>
            </thead>
            <tbody>
              {diseaseControl.map((disease: any, index: number) => (
                <tr key={index} className={index % 2 === 0 ? "bg-gray-50" : ""}>
                  <td className="py-2 px-4 border-b">{disease.name}</td>
                  <td className="py-2 px-4 border-b">{disease.prevention}</td>
                  <td className="py-2 px-4 border-b">
                    {disease.chemicalControl}
                  </td>
                  {/* <td className="py-2 px-4 border-b">
                    {disease.activeIngredient}
                  </td> */}
                  <td className="py-2 px-4 border-b">
                    {disease.modeOfApplication}
                  </td>
                  <td className="py-2 px-4 border-b">
                    {disease.rateOfApplication}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>
      </div>

      {/* analysis */}

      <div className="page-break-before">
        {/* Detailed Analysis and Recommendations */}
        <section className="mb-8 p-6  bg-white">
          <h2 className="text-2xl font-semibold mb-4 text-green-800">
            Detailed Analysis & Recommendations
          </h2>
          <div className="space-y-4">
            {/* <p className="text-gray-700">{recommendations.analysis}</p> */}
            <h3 className="font-semibold text-green-700 mt-4">
              Recommendations:
            </h3>
            <ReactMarkdown className="prose prose-sm max-w-none">
              {recommendations}
            </ReactMarkdown>
          </div>
        </section>
      </div>

      {/* Footer */}
      <footer className="text-center text-sm text-gray-600 border-t pt-4 mt-8 fixed bottom-0 left-0 right-0 bg-white">
        <p>
          © {new Date().getFullYear()} {companyInfo.name}. All rights reserved.
        </p>
        <p>
          This report is confidential and intended for the sole use of the
          addressed farmer.
        </p>
      </footer>
    </div>
  );
};

export default SoilAnalysisReport;
