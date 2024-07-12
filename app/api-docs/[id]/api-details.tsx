'use client'

import React from "react";
import Link from "next/link";
import ApiEndpoint, { ApiEndpointProps } from "../_components/api_endpoint";

const ApiDetailsPageClient: React.FC<{ api: ApiEndpointProps }> = ({ api }) => {
  return (
    <div className="min-h-screen bg-green-50">
      <nav className="bg-green-600 p-4">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <h1 className="text-2xl font-bold text-white">
            Shamba Assistant AI API
          </h1>
          <div className="space-x-4">
            <Link href="/api-docs" className="text-white hover:text-green-200">
              Home
            </Link>
            <Link
              href="/api-docs/list-apis"
              className="text-white hover:text-green-200"
            >
              API List
            </Link>
          </div>
        </div>
      </nav>
      <div className="max-w-4xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <ApiEndpoint {...api} />
      </div>
    </div>
  );
};

export default ApiDetailsPageClient;