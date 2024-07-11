'use client';

import dynamic from 'next/dynamic';
import { SoilAnalysisReportData } from './lib/types';

const DownloadableReport = dynamic(() => import('./downloadable-report'), { ssr: false });

interface ClientSideDownloadableReportProps {
  reportData: SoilAnalysisReportData;
}

const ClientSideDownloadableReport: React.FC<ClientSideDownloadableReportProps> = ({ reportData }) => {
  return <DownloadableReport reportData={reportData} />;
};

export default ClientSideDownloadableReport;