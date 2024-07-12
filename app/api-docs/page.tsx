
import React from 'react';
import Link from 'next/link';
import apiList from './api-list.json';

const ApiDocsHome: React.FC = () => {
  return (
    <div className="min-h-screen bg-green-50">
      <nav className="bg-green-600 p-4">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <h1 className="text-2xl font-bold text-white">Shamba Assistant AI API</h1>
          <Link href="/api-docs/list-apis" className="text-white hover:text-green-200">
            API List
          </Link>
        </div>
      </nav>
      <div className="max-w-4xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <h2 className="text-4xl font-bold text-center text-green-800 mb-8">
          Welcome to Shamba Assistant AI API Documentation
        </h2>
        <p className="text-xl text-green-600 text-center mb-12">
          Explore our powerful API endpoints designed to help farmers with crop management, disease detection, and soil analysis.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {apiList.map((api) => (
            <Link
              key={api.id}
              href={`/api-docs/${api.id}`}
              className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow duration-300"
            >
              <h3 className="text-xl font-semibold text-green-700 mb-2">{api.title}</h3>
              <p className="text-green-600 mb-4">{api.shortDescription}</p>
              <div className="flex items-center text-sm text-green-500">
                <span className="mr-2">{api.method}</span>
                <code>{api.endpoint}</code>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ApiDocsHome;