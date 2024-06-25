import React from "react";
export const CommingSoon = ({ title}:{title:string}) => {
  return (
    <div className={`w-full h-screen bg-[url("/image.webp")] max-h-[675px] overflow-y-hidden`}>
{/* https://vojislavd.com/ta-template-demo/assets/img/coming-soon.jpg */}
      <div className="w-full h-screen flex flex-col items-center justify-between bg-black bg-opacity-70 py-8">
        <div className="flex-1 flex flex-col items-center justify-center">
          <h1 className="text-4xl lg:text-5xl xl:text-6xl text-gray-200 tracking-wider font-bold font-serif mt-12 text-center">
            {title}
          </h1>
          <div className="flex flex-col items-center space-y-4 mt-24">
            <p className="text-gray-300 uppercase text-sm">
              Notify me when it&apos;s ready
            </p>
            <div className="w-full flex items-center">
              <input
                type="email"
                name="email"
                id="email"
                className="w-72 p-2 border-gray-300 focus:outline-none focus:ring-0 focus:border-gray-300 rounded-tl rounded-bl text-sm"
                placeholder="Email"
                autoComplete="off"
              />
              <button className="bg-blue-600 hover:bg-blue-700 py-2 px-6 text-gray-100 border border-blue-600 rounded-tr rounded-br text-sm">
                Subscribe
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
