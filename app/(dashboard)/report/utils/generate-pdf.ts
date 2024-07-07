import jsPDF from "jspdf";
import "jspdf-autotable";
import { FarmInput, Report } from "@/types";

type ExtendedJsPDF = jsPDF & {
  autoTable: (options: import("jspdf-autotable").UserOptions) => void;
  lastAutoTable: {
    finalY: number;
  };
  internal: jsPDF["internal"] & {
    getNumberOfPages: () => number;
  };
};

export const generatePDF = (input: FarmInput, report: Report): Blob => {
  console.log("generatePDF function called");
  const doc = new jsPDF() as ExtendedJsPDF;
  console.log("jsPDF instance created");
  const pageWidth = doc.internal.pageSize.width;

  // Add logo
  doc.setFontSize(24);
  doc.setTextColor(51, 128, 76); // Green color
  doc.text("Shamba Slns Co.", 10, 20);

  // Title
  doc.setFontSize(22);
  doc.setTextColor(51, 128, 76); // Green color
  doc.text("Farm Report", pageWidth / 2, 40, { align: "center" });

  // Date and Consultant
  doc.setFontSize(10);
  doc.setTextColor(100);
  doc.text(`Date: ${report.date}`, pageWidth - 15, 60, { align: "right" });
  doc.text(`Consultant: ${report.consultant}`, pageWidth - 15, 65, { align: "right" });

  // Farmer and Farm Details
  doc.setFontSize(14);
  doc.setTextColor(0);
  doc.text("Farmer and Farm Details", 10, 80);

  doc.setFontSize(10);
  const farmerDetails = [
    ['Farmer Name', input.farmer_name ?? ''],
    ['Farm Name', input.farm_name ?? ''],
    ['Location', input.location ?? ''],
    ['Crop', input.crop_name ?? ''],
    ['Field Size', `${input.field_size ?? ''} hectares`],
    ['Target Yield', `${input.target_yield ?? ''} kgs/hectare`]
  ];

  doc.autoTable({
    startY: 85,
    head: [["Parameter", "Value"]],
    body: farmerDetails,
    theme: "grid",
    headStyles: { fillColor: [51, 128, 76] },
  });

  // Soil Analysis
  doc.setFontSize(14);
  doc.text("Soil Analysis", 10, doc.lastAutoTable.finalY + 10);

  const soilAnalysis = [
    ["pH", typeof input.ph === "number" ? input.ph.toFixed(2) : input.ph ?? ''],
    ["Organic Carbon", typeof input.organic_carbon === "number" ? `${input.organic_carbon.toFixed(2)}%` : input.organic_carbon ?? ''],
    ["Nitrogen", typeof input.nitrogen === "number" ? `${input.nitrogen.toFixed(2)} mg/kg` : input.nitrogen ?? ''],
    ["Phosphorus", typeof input.phosphorus === "number" ? `${input.phosphorus.toFixed(2)} mg/kg` : input.phosphorus ?? ''],
    ["Potassium", typeof input.potassium === "number" ? `${input.potassium.toFixed(2)} mg/kg` : input.potassium ?? ''],
    ["Soil Moisture", typeof input.soil_moisture === "number" ? `${input.soil_moisture.toFixed(2)}%` : input.soil_moisture ?? ''],
  ];

  doc.autoTable({
    startY: doc.lastAutoTable.finalY + 15,
    head: [["Parameter", "Value"]],
    body: soilAnalysis,
    theme: "grid",
    headStyles: { fillColor: [51, 128, 76] },
  });

  // Nutrient Recommendations
  doc.setFontSize(14);
  doc.text("Nutrient Recommendations", 10, doc.lastAutoTable.finalY + 10);

  const nutrientRecommendation = [
    ["Nitrogen (N)", `${report.recommendation.n.toFixed(2)} kg/ha`],
    ["Phosphorus (P)", `${report.recommendation.p.toFixed(2)} kg/ha`],
    ["Potassium (K)", `${report.recommendation.k.toFixed(2)} kg/ha`],
    ["Organic Matter", `${report.recommendation.organic_matter.toFixed(2)} kg/ha`],
    ["Lime", `${report.recommendation.lime.toFixed(2)} kg/ha`],
  ];

  doc.autoTable({
    startY: doc.lastAutoTable.finalY + 15,
    head: [["Nutrient", "Recommended Amount"]],
    body: nutrientRecommendation,
    theme: "grid",
    headStyles: { fillColor: [51, 128, 76] },
  });

  // Detailed Analysis and Recommendations
  doc.addPage();
  doc.setFontSize(14);
  doc.text("Detailed Analysis and Recommendations", 10, 20);

  doc.setFontSize(10);
  const contentLines = report.content.split('\n');
  let yPosition = 30;
  
  contentLines.forEach(line => {
    if (line.startsWith('**')) {
      // This is a header
      doc.setFontSize(12);
      doc.setFont("helvetica", 'bold');
      doc.text(line.replace(/\*\*/g, '').trim(), 10, yPosition);
      yPosition += 10;
      doc.setFontSize(10);
      doc.setFont("helvetica", 'normal');
    } else if (line.startsWith('-')) {
      // This is a bullet point
      doc.text('•' + line.substr(1), 15, yPosition);
      yPosition += 5;
    } else if (line.trim() !== '') {
      // This is regular text
      const splitText = doc.splitTextToSize(line, pageWidth - 20);
      doc.text(splitText, 10, yPosition);
      yPosition += 5 * splitText.length;
    }

    if (yPosition > doc.internal.pageSize.height - 20) {
      doc.addPage();
      yPosition = 20;
    }
  });

  // Footer
  const pageCount = doc.internal.getNumberOfPages();
  for (let i = 1; i <= pageCount; i++) {
    doc.setPage(i);
    doc.setFontSize(10);
    doc.setTextColor(150);
    doc.text(
      `Page ${i} of ${pageCount}`,
      pageWidth / 2,
      doc.internal.pageSize.height - 10,
      { align: "center" }
    );
    doc.text(
      "Shamba Solutions - Empowering Farmers, Nourishing Nations",
      pageWidth / 2,
      doc.internal.pageSize.height - 5,
      { align: "center" }
    );
  }

  console.log("PDF generation completed");
  return doc.output("blob");
};