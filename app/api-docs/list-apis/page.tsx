import React from "react";
import Link from "next/link";
import apiList from "../api-list.json";

const ApiList: React.FC = () => {
  return (
    <div className="min-h-screen bg-green-50">
      <nav className="bg-green-600 p-4">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <h1 className="text-2xl font-bold text-white">
            Shamba Assistant AI API
          </h1>
          <Link href="/api-docs" className="text-white hover:text-green-200">
            Home
          </Link>
        </div>
      </nav>
      <div className="max-w-4xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-center text-green-800 mb-8">
          API Endpoints
        </h2>
        <ul className="space-y-6">
          {apiList.map((api) => (
            <li key={api.id} className="bg-white rounded-lg shadow-md p-6">
              <Link href={`/api-docs/${api.id}`} className="block">
                <h3 className="text-2xl font-semibold text-green-700 mb-2">
                  {api.title}
                </h3>
                <p className="text-green-600 mb-4">{api.description}</p>
                <div className="flex items-center mb-2">
                  <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded mr-2">
                    {api.method}
                  </span>
                  <code className="text-sm bg-green-100 text-green-800 px-2 py-1 rounded">
                    {api.endpoint}
                  </code>
                </div>
                <p className="text-sm text-green-500">
                  Click to view detailed documentation
                </p>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default ApiList;
