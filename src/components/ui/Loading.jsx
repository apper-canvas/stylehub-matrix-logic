import React from "react";

const Loading = () => {
  return (
    <div className="min-h-[400px] flex items-center justify-center">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 w-full max-w-6xl px-4">
        {[...Array(8)].map((_, index) => (
          <div key={index} className="animate-pulse">
            <div className="bg-gray-200 rounded-lg aspect-[3/4] mb-3"></div>
            <div className="bg-gray-200 h-4 rounded mb-2"></div>
            <div className="bg-gray-200 h-3 rounded w-3/4 mb-2"></div>
            <div className="bg-gray-200 h-4 rounded w-1/2"></div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Loading;