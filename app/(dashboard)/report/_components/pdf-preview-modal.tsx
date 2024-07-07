import React from 'react';

interface Props {
  pdfUrl: string;
  onClose: () => void;
  onDownload: () => void;
}

export default function PDFPreviewModal({ pdfUrl, onClose, onDownload }: Props) {
  console.log("PDFPreviewModal rendered with pdfUrl:", pdfUrl);
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-4 rounded-lg w-11/12 h-5/6">
        <div className="flex justify-between mb-4">
          <h2 className="text-2xl font-bold">PDF Preview</h2>
          <button onClick={onClose} className="text-2xl text-black">&times;</button>
        </div>
        <iframe src={pdfUrl} className="w-full h-5/6" />
        <div className="mt-4 flex justify-end">
          <button onClick={onDownload} className="bg-blue-500 text-white px-4 py-2 rounded">
            Download
          </button>
        </div>
      </div>
    </div>
  );
}