"use client";

import React, { useState, useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { Button } from "@/components/ui/button";
import axios from "axios";

const AdminPage = () => {
  const [files, setFiles] = useState<File[]>([]);
  const [loading, setLoading] = useState(false);

  const onDrop = useCallback((acceptedFiles: File[]) => {
    setFiles(acceptedFiles);
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  const handleSubmit = async () => {
    if (files.length === 0) {
      alert("Please upload at least one file");
      return;
    }

    setLoading(true);
    const formData = new FormData();
    files.forEach((file) => {
      formData.append("documents", file);
    });

    try {
      const response = await axios.post("/api/embedDocs", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      console.log(response.data);
      alert("Documents processed successfully");
      setFiles([]);
    } catch (error: any) {
      console.log("Error processing documents:", error.message);
      alert("Error processing documents. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-background min-h-[675px] overflow-y-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Upload and Process Documents</h1>
      <div
        {...getRootProps()}
        className="border-2 border-dashed border-gray-300 rounded-lg p-8 mb-4 cursor-pointer"
      >
        <input {...getInputProps()} />
        {isDragActive ? (
          <p>Drop the files here ...</p>
        ) : (
          <p>Drag &apos;n&apos; drop some files here, or click to select files</p>
        )}
      </div>
      {files.length > 0 && (
        <div className="mb-4">
          <h2 className="text-lg font-semibold">Selected Files:</h2>
          <ul>
            {files.map((file, index) => (
              <li key={index}>{file.name}</li>
            ))}
          </ul>
        </div>
      )}
      <Button onClick={handleSubmit} disabled={loading}>
        {loading ? "Processing..." : "Process Documents"}
      </Button>
    </div>
  );
};

export default AdminPage;