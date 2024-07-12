// app/api-docs/components/ApiEndpoint.tsx

import React, { useState } from 'react';
import { Copy, Check } from 'lucide-react';

interface ApiEndpointProps {
  title: string;
  endpoint: string;
  method: string;
  description: string;
  requestBody: object;
  responseBody: object;
  exampleRequest: object;
  exampleResponse: object;
}

const ApiEndpoint: React.FC<ApiEndpointProps> = ({
  title,
  endpoint,
  method,
  description,
  requestBody,
  responseBody,
  exampleRequest,
  exampleResponse,
}) => {
  const [copiedEndpoint, setCopiedEndpoint] = useState(false);
  const [copiedRequestBody, setCopiedRequestBody] = useState(false);

  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';
  const fullUrl = `${baseUrl}${endpoint}`;

  const copyToClipboard = (text: string, setCopied: (value: boolean) => void) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="bg-white shadow overflow-hidden sm:rounded-lg mb-8 border border-green-200">
      <div className="px-4 py-5 sm:px-6 bg-green-100">
        <h3 className="text-lg leading-6 font-medium text-green-800">{title}</h3>
        <p className="mt-1 max-w-2xl text-sm text-green-600">{description}</p>
      </div>
      <div className="border-t border-green-200 px-4 py-5 sm:p-0">
        <dl className="sm:divide-y sm:divide-green-200">
          <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
            <dt className="text-sm font-medium text-green-500">Endpoint</dt>
            <dd className="mt-1 text-sm text-green-900 sm:mt-0 sm:col-span-2 flex items-center">
              <code className="bg-green-50 px-2 py-1 rounded">{fullUrl}</code>
              <button
                onClick={() => copyToClipboard(fullUrl, setCopiedEndpoint)}
                className="ml-2 text-green-500 hover:text-green-600 focus:outline-none"
              >
                {copiedEndpoint ? <Check size={18} /> : <Copy size={18} />}
              </button>
              {copiedEndpoint && <span className="ml-2 text-xs text-green-500">Copied!</span>}
            </dd>
          </div>
          <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
            <dt className="text-sm font-medium text-green-500">Method</dt>
            <dd className="mt-1 text-sm text-green-900 sm:mt-0 sm:col-span-2">
              <span className="bg-green-100 text-green-800 px-2 py-1 rounded">{method}</span>
            </dd>
          </div>
          <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
            <dt className="text-sm font-medium text-green-500">Request Body</dt>
            <dd className="mt-1 text-sm text-green-900 sm:mt-0 sm:col-span-2">
              <pre className="bg-green-50 p-2 rounded overflow-x-auto relative">
                {JSON.stringify(requestBody, null, 2)}
                <button
                  onClick={() => copyToClipboard(JSON.stringify(requestBody, null, 2), setCopiedRequestBody)}
                  className="absolute top-2 right-2 text-green-500 hover:text-green-600 focus:outline-none"
                >
                  {copiedRequestBody ? <Check size={18} /> : <Copy size={18} />}
                </button>
              </pre>
              {copiedRequestBody && <span className="text-xs text-green-500">Copied!</span>}
            </dd>
          </div>
          <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
            <dt className="text-sm font-medium text-green-500">Response Body</dt>
            <dd className="mt-1 text-sm text-green-900 sm:mt-0 sm:col-span-2">
              <pre className="bg-green-50 p-2 rounded overflow-x-auto">
                {JSON.stringify(responseBody, null, 2)}
              </pre>
            </dd>
          </div>
          <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
            <dt className="text-sm font-medium text-green-500">Example Request</dt>
            <dd className="mt-1 text-sm text-green-900 sm:mt-0 sm:col-span-2">
              <pre className="bg-green-50 p-2 rounded overflow-x-auto">
                {JSON.stringify(exampleRequest, null, 2)}
              </pre>
            </dd>
          </div>
          <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
            <dt className="text-sm font-medium text-green-500">Example Response</dt>
            <dd className="mt-1 text-sm text-green-900 sm:mt-0 sm:col-span-2">
              <pre className="bg-green-50 p-2 rounded overflow-x-auto">
                {JSON.stringify(exampleResponse, null, 2)}
              </pre>
            </dd>
          </div>
        </dl>
      </div>
    </div>
  );
};

export default ApiEndpoint;