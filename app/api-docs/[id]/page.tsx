import React from "react";
import { notFound } from "next/navigation";
import apiList from "../api-list.json";
import ApiDetailsPageClient from "./api-details";
import { ApiEndpointProps } from "../_components/api_endpoint";



export async function generateStaticParams() {
  return apiList.map((api) => ({
    id: api.id,
  }));
}

const ApiDetailsPage: React.FC<{ params: { id: string } }> = ({ params }) => {
  const api = apiList.find((a) => a.id === params.id) as ApiEndpointProps | undefined;

  if (!api) {
    notFound();
  }

  return <ApiDetailsPageClient api={api} />;
};

export default ApiDetailsPage;