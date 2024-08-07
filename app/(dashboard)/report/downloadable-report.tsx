import React, { useRef } from "react";
import { useReactToPrint } from "react-to-print";
import { SoilAnalysisReportData } from "./lib/types";
import SoilAnalysisReport from "./analysis-report";
import MobileSoilAnalysisReport from "./mobile-analysis-report";

const PrintableReport: React.FC<{ reportData: SoilAnalysisReportData }> = ({ reportData }) => (
  <div style={{ width: '210mm', height: '297mm', padding: '10mm' }}>
    <SoilAnalysisReport {...reportData} />
  </div>
);

const DownloadableReport: React.FC<{ reportData: SoilAnalysisReportData }> = ({ reportData }) => {
  const componentRef = useRef<HTMLDivElement>(null);

  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
    documentTitle: `Soil_Analysis_Report_${reportData.farmInfo.name}`,
    onAfterPrint: () => console.log("Printed successfully"),
  });

  return (
    <div>
      <button onClick={handlePrint} className="mb-4 px-4 py-2 bg-green-500 text-white rounded">
        Download PDF
      </button>
      <div className="shadow-2xl p-8 bg-gray-100">
        {window.innerWidth < 900 ? (
          <MobileSoilAnalysisReport {...reportData} />
        ) : (
          <SoilAnalysisReport {...reportData} />
        )}
      </div>
      <div style={{ display: 'none' }}>
        <div ref={componentRef}>
          <PrintableReport reportData={reportData} />
        </div>
      </div>
    </div>
  );
};

export default DownloadableReport;