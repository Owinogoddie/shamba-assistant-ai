// import { Droplets, Thermometer, CloudRain, AlarmSmoke } from 'lucide-react';

// const createMappedData = (soilData: any) => {
//   return [
//     {
//       label: "Nitrogen (N)",
//       value: soilData.nitrogen,
//       color: "blue",
//       icon: Droplets,
//     },
//     {
//       label: "pH",
//       value: soilData.ph,
//       color: "yellow",
//       icon: Thermometer,
//     },
//     {
//       label: "Phosphorus (P)",
//       value: soilData.phosphorus,
//       color: "red",
//       icon: CloudRain,
//     },
//     {
//       label: "Potassium (K)",
//       value: soilData.temperature,
//       color: "purple",
//       icon: Thermometer,
//     },
//     {
//       label: "Organic Matter",
//       value: soilData.organicCarbon,
//       color: "green",
//       icon: AlarmSmoke,
//     },
//     {
//       label: "Moisture",
//       value: soilData.moisture,
//       color: "yellow",
//       icon: CloudRain,
//     },
//   ];
// };

// const MappedData = createMappedData(soilData);

// // In your JSX:
// {MappedData.map((item, index) => (
//   <div 
//     className={`flex p-4 rounded-lg justify-between items-center shadow-md border-t-4 border-${item.color}-500 bg-${item.color}-50`} 
//     key={index}
//   >
//     <item.icon className={`mr-4 text-${item.color}-500 h-8 w-8`} />
//     <div className="flex flex-col justify-center">
//       <p className={`text-xl font-bold text-${item.color}-600`}>
//         {item.value}
//       </p> 
//       <p className={`text-sm text-${item.color}-700`}>{item.label}</p>
//     </div>
//   </div>
// ))}



// import React from "react";
// import {
//   User,
//   MapPin,
//   Droplets,
//   Thermometer,
//   CloudRain,
//   AlarmSmoke,
//   Phone,
//   Mail,
//   Home,
// } from "lucide-react";
// import { SoilData, SoilAnalysisReportData } from "./lib/types";
// import ReactMarkdown from "react-markdown";
// import { nutrientRecommendations } from "./data";

// const companyInfo = {
//   name: "Shamba Solutions",
//   address: "123 Farm Road, Nairobi, Kenya",
//   contact: "info@shambasolutions.com | +254 123 456 789",
//   logo: "/logo.png",
// };
// const analyst = {
//   name: "John Doe",
//   date: "2024-07-10",
// };
// const SoilAnalysisReport: React.FC<SoilAnalysisReportData> = ({
//   farmInfo,
//   soilData,
//   recommendations,
//   soilCorrectionPlan,
//   pestControl,
//   diseaseControl,
// }) => {
//   const createMappedData = (soilData: any) => {
//     return [
//       {
//         label: "Nitrogen (N)",
//         value: soilData.nitrogen,
//         color: "blue",
//         icon: Droplets,
//       },
//       {
//         label: "Nitrogen (N)",
//         value: soilData.ph,
//         color: "yellow",

//         icon: Thermometer,
//       },
//       {
//         label: "Phosphorus (P)",
//         value: soilData.phosphorus,
//         color: "red",
//         icon: CloudRain,
//       },
//       {
//         label: "Potassium (K)",
//         value: soilData.temperature,
//         color: "purple",
//         icon: Thermometer,
//       },
//       {
//         label: "Organic Matter",
//         value: soilData.organicCarbon,
//         color: "green",
//         icon: AlarmSmoke,
//       },
//       {
//         label: "Moisture",
//         value: soilData.moisture,
//         color: "bg-yellow-500",
//         icon: CloudRain,
//       },
//     ];
//   };
//   const MappedData = createMappedData(soilData);
//   return (
//     <div className="max-w-4xl mx-auto p-8 shadow-lg bg-white font-sans">
//       {/* Main Heading */}
//       <h1 className="text-2xl font-bold text-center text-green-800 mb-8">
//         Soil Analysis Report
//       </h1>

//       {/* Header */}
//       <header className="flex justify-between items-center mb-8 border-b pb-4">
//         <div className="space-y-2">
//           <p className="flex items-center"> Report No: 03000004</p>
//           <h2 className="text-xl font-semibold mb-4 text-slate-400">
//             Facilitator
//           </h2>
//           <p className="flex items-center">
//             <User className="inline h-5 w-5 mr-2 text-green-500" /> john doe
//           </p>
//           <p className="flex items-center">
//             <Phone className="inline h-5 w-5 mr-2 text-green-500" /> 07070707
//           </p>
//           <p className="flex items-center">
//             <Mail className="inline h-5 w-5 mr-2 text-green-500" />{" "}
//             emai@email.com
//           </p>
//         </div>
//         <div className="flex flex-col items-end">
//           <img
//             src="/logo2.svg"
//             alt={`${companyInfo.name} Logo`}
//             className="h-16 mb-2"
//           />
//           <div className="text-right">
//             <h2 className="text-xl font-bold text-green-800">
//               {companyInfo.name}
//             </h2>
//             <p className="text-sm text-gray-600">{companyInfo.address}</p>
//             <p className="text-sm text-gray-600">{companyInfo.contact}</p>
//             <p className="text-sm text-gray-600">{analyst.date}</p>
//           </div>
//         </div>
//       </header>

//       {/* Farm Info */}
//       <section className="mb-8">
//         <h2 className="text-xl text-center font-semibold mb-4 text-slate-400">
//           Farmer Information
//         </h2>
//         <div className="flex justify-center items-center space-x-8">
//           <p>
//             <User className="inline mr-2 text-green-500" /> {farmInfo.name}
//           </p>
//           <p>
//             <User className="inline mr-2 text-green-500" /> {farmInfo.owner}
//           </p>
//           <p>
//             <MapPin className="inline mr-2 text-green-500" />{" "}
//             {farmInfo.location}
//           </p>
//         </div>
//       </section>

//       {/* Soil Condition Cards */}
//       <section className="mb-8 grid grid-cols-4 gap-4">
//         {MappedData.map((item, index) => (
//           <div
//             className={`flex p-4 rounded-lg justify-between items-center shadow-md border-t-4 border-${item.color}-500 bg-${item.color}-50`}
//             key={index}
//           >
//             <item.icon className={`mr-4 text-${item.color}-500 h-8 w-8`} />
//             <div className="flex flex-col justify-center">
//               <p className={`text-xl font-bold text-${item.color}-600`}>
//                 {item.value}
//               </p>
//               <p className={`text-sm text-${item.color}-700`}>{item.label}</p>
//             </div>
//           </div>
//         ))}

//         <div className="flex p-4 rounded-lg shadow-md border-t-4 border-yellow-500 bg-yellow-50">
//           <AlarmSmoke className="mr-4 text-yellow-500 h-8 w-8" />
//           <div className="flex flex-col justify-center">
//             <p className="text-xl font-bold text-yellow-600">
//               {soilData.carbon}%
//             </p>
//             <p className="text-sm text-yellow-700">Carbon Content</p>
//           </div>
//         </div>
//         <div className="flex p-4 rounded-lg shadow-md border-t-4 border-red-500 bg-red-50">
//           <Thermometer className="mr-4 text-red-500 h-8 w-8" />
//           <div className="flex flex-col justify-center">
//             <p className="text-xl font-bold text-red-600">
//               {soilData.temperature}°C
//             </p>
//             <p className="text-sm text-red-700">Temperature</p>
//           </div>
//         </div>
//         <div className="flex p-4 rounded-lg shadow-md border-t-4 border-purple-500 bg-purple-50">
//           <CloudRain className="mr-4 text-purple-500 h-8 w-8" />
//           <div className="flex flex-col justify-center">
//             <p className="text-xl font-bold text-purple-600">{soilData.ph}</p>
//             <p className="text-sm text-purple-700">pH Level</p>
//           </div>
//         </div>
//         <div className="flex p-4 rounded-lg shadow-md border-t-4 border-purple-500 bg-purple-50">
//           <CloudRain className="mr-4 text-purple-500 h-8 w-8" />
//           <div className="flex flex-col justify-center">
//             <p className="text-xl font-bold text-purple-600">{soilData.ph}</p>
//             <p className="text-sm text-purple-700">pH Level</p>
//           </div>
//         </div>
//         <div className="flex p-4 rounded-lg shadow-md border-t-4 border-purple-500 bg-purple-50">
//           <CloudRain className="mr-4 text-purple-500 h-8 w-8" />
//           <div className="flex flex-col justify-center">
//             <p className="text-xl font-bold text-purple-600">{soilData.ph}</p>
//             <p className="text-sm text-purple-700">pH Level</p>
//           </div>
//         </div>
//         <div className="flex p-4 rounded-lg shadow-md border-t-4 border-purple-500 bg-purple-50">
//           <CloudRain className="mr-4 text-purple-500 h-8 w-8" />
//           <div className="flex flex-col justify-center">
//             <p className="text-xl font-bold text-purple-600">{soilData.ph}</p>
//             <p className="text-sm text-purple-700">pH Level</p>
//           </div>
//         </div>
//         <div className="flex p-4 rounded-lg shadow-md border-t-4 border-purple-500 bg-purple-50">
//           <CloudRain className="mr-4 text-purple-500 h-8 w-8" />
//           <div className="flex flex-col justify-center">
//             <p className="text-xl font-bold text-purple-600">{soilData.ph}</p>
//             <p className="text-sm text-purple-700">pH Level</p>
//           </div>
//         </div>
//       </section>
//       {/* Nutrient Recommendations Table */}
//       <section className="mb-8">
//         <h2 className="text-2xl font-semibold mb-4 text-green-800">
//           Nutrient Recommendations
//         </h2>
//         <div className="overflow-x-auto">
//           <table className="min-w-full bg-white border border-gray-300 shadow-lg rounded-lg overflow-hidden">
//             <thead>
//               <tr className="bg-green-100">
//                 <th className="py-3 px-6 text-left text-xs font-medium text-green-700 uppercase tracking-wider">
//                   Nutrient
//                 </th>
//                 <th className="py-3 px-6 text-left text-xs font-medium text-green-700 uppercase tracking-wider">
//                   Amount (kg/ha)
//                 </th>
//               </tr>
//             </thead>
//             <tbody className="divide-y divide-gray-200">
//               {nutrientRecommendations.map((nutrient, index) => (
//                 <tr
//                   key={index}
//                   className={index % 2 === 0 ? "bg-gray-50" : "bg-white"}
//                 >
//                   <td className="py-4 px-6 text-sm font-medium text-gray-900">
//                     {nutrient.name}
//                   </td>
//                   <td className="py-4 px-6 text-sm text-gray-500">
//                     {nutrient.amount.toFixed(2)}
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>
//       </section>

//       <div className="page-break-before">
//         {/* Detailed Analysis and Recommendations */}
//         <section className="mb-8 p-6  bg-white">
//           <h2 className="text-2xl font-semibold mb-4 text-green-800">
//             Detailed Analysis & Recommendations
//           </h2>
//           <div className="space-y-4">
//             {/* <p className="text-gray-700">{recommendations.analysis}</p> */}
//             <h3 className="font-semibold text-green-700 mt-4">
//               Recommendations:
//             </h3>
//             <ReactMarkdown className="prose prose-sm max-w-none">
//               {recommendations}
//             </ReactMarkdown>
//           </div>
//         </section>
//       </div>

//       {/* Soil Correction Plan, Pest Control, and Disease Control */}
//       <div>
//         {/* Soil Correction Plan */}
//         <br />
//         <section className="mb-8 mt-6 page-break-inside-avoid">
//           <h2 className="text-2xl font-semibold mb-4 mt-4 text-green-800">
//             Soil Correction Plan
//           </h2>
//           <table className="min-w-full bg-white border border-gray-300 shadow-lg rounded-lg overflow-hidden mb-8">
//             <thead>
//               <tr className="bg-green-100">
//                 <th className="py-2 px-4 border-b">Timing</th>
//                 <th className="py-2 px-4 border-b">Instructions</th>
//                 <th className="py-2 px-4 border-b">Best Option</th>
//                 <th className="py-2 px-4 border-b">First Alternative</th>
//                 <th className="py-2 px-4 border-b">Second Alternative</th>
//               </tr>
//             </thead>
//             <tbody>
//               {soilCorrectionPlan.map((plan, index) => (
//                 <tr key={index} className={index % 2 === 0 ? "bg-gray-50" : ""}>
//                   <td className="py-2 px-4 border-b">{plan.timing}</td>
//                   <td className="py-2 px-4 border-b">{plan.instructions}</td>
//                   <td className="py-2 px-4 border-b">{plan.bestOption}</td>
//                   <td className="py-2 px-4 border-b">
//                     {plan.firstAlternative}
//                   </td>
//                   <td className="py-2 px-4 border-b">
//                     {plan.secondAlternative}
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </section>

//         {/* Pest Control */}
//         <section className="mb-8 mt-6 page-break-inside-avoid">
//           <h2 className="text-2xl font-semibold mb-4 text-green-800">
//             Pest Control
//           </h2>
//           <table className="min-w-full bg-white border border-gray-300 shadow-lg rounded-lg overflow-hidden mb-8">
//             <thead>
//               <tr className="bg-green-100">
//                 <th className="py-2 px-4 border-b">Pest</th>
//                 <th className="py-2 px-4 border-b">Prevention</th>
//                 <th className="py-2 px-4 border-b">Chemical Name</th>
//                 <th className="py-2 px-4 border-b">Active Ingredient</th>
//                 <th className="py-2 px-4 border-b">Mode of Application</th>
//                 <th className="py-2 px-4 border-b">Rate of Application</th>
//               </tr>
//             </thead>
//             <tbody>
//               {pestControl.map((pest: any, index: number) => (
//                 <tr key={index} className={index % 2 === 0 ? "bg-gray-50" : ""}>
//                   <td className="py-2 px-4 border-b">{pest.pest}</td>
//                   <td className="py-2 px-4 border-b">{pest.prevention}</td>
//                   <td className="py-2 px-4 border-b">{pest.chemicalName}</td>
//                   <td className="py-2 px-4 border-b">
//                     {pest.activeIngredient}
//                   </td>
//                   <td className="py-2 px-4 border-b">
//                     {pest.modeOfApplication}
//                   </td>
//                   <td className="py-2 px-4 border-b">
//                     {pest.rateOfApplication}
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </section>

//         {/* Disease Control */}
//         <section className="mb-8 mt-6 page-break-inside-avoid">
//           <h2 className="text-2xl font-semibold mb-4 text-green-800">
//             Disease Control
//           </h2>
//           <table className="min-w-full bg-white border border-gray-300 shadow-lg rounded-lg overflow-hidden mb-8">
//             <thead>
//               <tr className="bg-green-100">
//                 <th className="py-2 px-4 border-b">Disease</th>
//                 <th className="py-2 px-4 border-b">Prevention</th>
//                 <th className="py-2 px-4 border-b">Chemical Name</th>
//                 <th className="py-2 px-4 border-b">Active Ingredient</th>
//                 <th className="py-2 px-4 border-b">Mode of Application</th>
//                 <th className="py-2 px-4 border-b">Rate of Application</th>
//               </tr>
//             </thead>
//             <tbody>
//               {diseaseControl.map((disease: any, index: number) => (
//                 <tr key={index} className={index % 2 === 0 ? "bg-gray-50" : ""}>
//                   <td className="py-2 px-4 border-b">{disease.disease}</td>
//                   <td className="py-2 px-4 border-b">{disease.prevention}</td>
//                   <td className="py-2 px-4 border-b">{disease.chemicalName}</td>
//                   <td className="py-2 px-4 border-b">
//                     {disease.activeIngredient}
//                   </td>
//                   <td className="py-2 px-4 border-b">
//                     {disease.modeOfApplication}
//                   </td>
//                   <td className="py-2 px-4 border-b">
//                     {disease.rateOfApplication}
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </section>
//       </div>

//       {/* Footer */}
//       <footer className="text-center text-sm text-gray-600 border-t pt-4 mt-8 fixed bottom-0 left-0 right-0 bg-white">
//         <p>
//           © {new Date().getFullYear()} {companyInfo.name}. All rights reserved.
//         </p>
//         <p>
//           This report is confidential and intended for the sole use of the
//           addressed farmer.
//         </p>
//       </footer>
//     </div>
//   );
// };

// export default SoilAnalysisReport;
