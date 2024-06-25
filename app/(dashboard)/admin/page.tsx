"use client";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import axios from "axios";

const AdminPage = () => {
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    setLoading(true); // Set loading to true to disable the button
    try {
      const response = await axios.post("/api/embedDocs");
      console.log(response.data);
    } catch (error) {
      console.log("error generating", error.message);
      setLoading(false);
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="bg-gradient-to-r from-emerald-700 to-transparent min-h-[675px] overflow-y-hidden">
      <div>
        <Button onClick={handleSubmit} disabled={loading}>
          Add embeddings
        </Button>
      </div>
    </div>
  );
};

export default AdminPage;
