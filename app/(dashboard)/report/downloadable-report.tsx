import React, { useEffect, useRef, useState } from "react";
import { useReactToPrint } from "react-to-print";
import { SoilAnalysisReportData } from "./lib/types";
import SoilAnalysisReport from "./analysis-report";

interface DownloadableReportProps {
  reportData: SoilAnalysisReportData;
}

const DownloadableReport: React.FC<DownloadableReportProps> = ({
  reportData,
}) => {
  const [isMounted, setIsMounted] = useState(false);
  const componentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
    documentTitle: `Soil_Analysis_Report_${reportData.farmInfo.name}`,
    onAfterPrint: () => console.log("Printed successfully"),
  });
  if (!isMounted) {
    return null;
  }
  return (
    <div>
      <button
        onClick={handlePrint}
        className="mb-4 px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-300"
      >
        Download PDF
      </button>
      <div className="shadow-2xl p-8 bg-gray-100">
        <div ref={componentRef}>
          <SoilAnalysisReport {...reportData} />
        </div>
      </div>
    </div>
  );
};

export default DownloadableReport;
