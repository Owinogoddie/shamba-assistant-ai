import React, { useState } from "react";
import { Copy, Check } from "lucide-react";
import Link from "next/link";
import apiList from "../api-list.json";

export interface ApiEndpointProps {
  id: string;
  title: string;
  endpoint: string;
  method: string;
  description: string;
  streaming?: boolean;
  requestBody: object;
  responseBody: object;
  exampleRequest: object;
  exampleResponse: object;
  errors?: any;
}

const ApiEndpoint: React.FC<ApiEndpointProps> = ({
  id,
  title,
  endpoint,
  method,
  description,
  streaming,
  requestBody,
  responseBody,
  exampleRequest,
  exampleResponse,
  errors,
}) => {
  const [copiedEndpoint, setCopiedEndpoint] = useState(false);
  const [copiedRequestBody, setCopiedRequestBody] = useState(false);
  const [copiedResponseBody, setCopiedResponseBody] = useState(false);
  const [copiedExampleRequest, setCopiedExampleRequest] = useState(false);
  const [copiedExampleResponse, setCopiedExampleResponse] = useState(false);

  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";
  const fullUrl = `${baseUrl}${endpoint}`;

  const copyToClipboard = (
    text: string,
    setCopied: (value: boolean) => void
  ) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="bg-white shadow-lg rounded-lg overflow-hidden">
      <nav className="bg-green-100 p-4 mb-8">
        <ul className="flex space-x-4 overflow-x-auto">
          {apiList.map((api) => (
            <li key={api.id}>
              <Link
                href={`/api-docs/${api.id}`}
                className={`text-green-700 hover:text-green-900 whitespace-nowrap ${
                  api.id === id ? "font-bold" : ""
                }`}
              >
                {api.title}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
      <div className="px-6 py-4">
        <h2 className="text-3xl font-bold text-green-800 mb-4">{title}</h2>
        <p className="text-lg text-green-600 mb-6">{description}</p>

        <div className="mb-6">
          <h3 className="text-xl font-semibold text-green-700 mb-2">
            Endpoint
          </h3>
          <div className="bg-green-50 p-2 rounded relative">
            <code className="text-green-800 pr-8">{fullUrl}</code>
            <button
              onClick={() => copyToClipboard(fullUrl, setCopiedEndpoint)}
              className="absolute top-2 right-2 text-green-500 hover:text-green-600 focus:outline-none"
            >
              {copiedEndpoint ? <Check size={18} /> : <Copy size={18} />}
            </button>
          </div>
          {copiedEndpoint && (
            <span className="text-xs text-green-500 mt-1">Copied!</span>
          )}
        </div>

        <div className="mb-6 flex items-center space-x-4">
          <div>
            <h3 className="text-xl font-semibold text-green-700 mb-2">
              Method
            </h3>
            <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded">
              {method}
            </span>
          </div>
          {streaming && (
            <div>
              <h3 className="text-xl font-semibold text-green-700 mb-2">
                Streaming
              </h3>
              <span className="bg-purple-100 text-purple-800 px-2 py-1 rounded">
                Enabled
              </span>
            </div>
          )}
        </div>

        <div className="mb-6">
          <h3 className="text-xl font-semibold text-green-700 mb-2">
            Request Body
          </h3>
          <div className="bg-green-50 p-4 rounded relative">
            <pre className="overflow-x-auto pr-8">
              {JSON.stringify(requestBody, null, 2)}
            </pre>
            <button
              onClick={() =>
                copyToClipboard(
                  JSON.stringify(requestBody, null, 2),
                  setCopiedRequestBody
                )
              }
              className="absolute top-4 right-4 text-green-500 hover:text-green-600 focus:outline-none"
            >
              {copiedRequestBody ? <Check size={18} /> : <Copy size={18} />}
            </button>
            {copiedRequestBody && (
              <span className="text-xs text-green-500 mt-1">Copied!</span>
            )}
          </div>
        </div>

        <div className="mb-6">
          <h3 className="text-xl font-semibold text-green-700 mb-2">
            Response Body
          </h3>
          <div className="bg-green-50 p-4 rounded relative">
            <pre className="bg-green-50 p-4 rounded overflow-x-auto">
              {JSON.stringify(responseBody, null, 2)}
            </pre>
            <button
              onClick={() =>
                copyToClipboard(
                  JSON.stringify(responseBody, null, 2),
                  setCopiedResponseBody
                )
              }
              className="absolute top-2 right-2 text-green-500 hover:text-green-600 focus:outline-none"
            >
              {copiedResponseBody ? <Check size={18} /> : <Copy size={18} />}
            </button>
          </div>
        </div>

        <div className="mb-6">
          <h3 className="text-xl font-semibold text-green-700 mb-2">
            Example Request
          </h3>
          <div className="bg-green-50 p-4 rounded relative">
            <pre className="bg-green-50 p-4 rounded overflow-x-auto">
              {JSON.stringify(exampleRequest, null, 2)}
            </pre>
            <button
              onClick={() =>
                copyToClipboard(
                  JSON.stringify(exampleRequest, null, 2),
                  setCopiedExampleRequest
                )
              }
              className="absolute top-2 right-2 text-green-500 hover:text-green-600 focus:outline-none"
            >
              {copiedExampleRequest ? <Check size={18} /> : <Copy size={18} />}
            </button>

            {copiedExampleRequest && (
              <span className="text-xs text-green-500">Copied!</span>
            )}
          </div>
        </div>

        <div className="mb-6">
          <h3 className="text-xl font-semibold text-green-700 mb-2">
            Example Response
          </h3>
          <div className="bg-green-50 p-4 rounded relative">
            <pre className="bg-green-50 p-4 rounded overflow-x-auto">
              {JSON.stringify(exampleResponse, null, 2)}
            </pre>
            <button
              onClick={() =>
                copyToClipboard(
                  JSON.stringify(exampleResponse, null, 2),
                  setCopiedExampleResponse
                )
              }
              className="absolute top-2 right-2 text-green-500 hover:text-green-600 focus:outline-none"
            >
              {copiedExampleResponse ? <Check size={18} /> : <Copy size={18} />}
            </button>

            {copiedExampleResponse && (
              <span className="text-xs text-green-500">Copied!</span>
            )}
          </div>
        </div>

        {streaming && (
          <div className="mb-6">
            <h3 className="text-xl font-semibold text-green-700 mb-2">
              Streaming Information
            </h3>
            <div className="bg-yellow-50 p-4 rounded">
              <p className="text-yellow-800">
                This endpoint supports streaming responses. The response will be
                sent in chunks as they become available. Clients should be
                prepared to handle a stream of data rather than waiting for a
                complete response.
              </p>
            </div>
          </div>
        )}

        {errors && errors.length > 0 && (
          <div className="mb-6">
            <h3 className="text-xl font-semibold text-red-700 mb-2">Errors</h3>
            <div className="space-y-4">
              {errors.map((error: any, index: any) => (
                <div key={index} className="bg-red-50 p-4 rounded">
                  <h4 className="text-lg font-semibold text-red-800 mb-2">
                    {error.code}: {error.message}
                  </h4>
                  <p className="text-red-600">{error.description}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ApiEndpoint;
