import React from "react";
import ApperIcon from "@/components/ApperIcon";

const Error = ({ message = "Something went wrong", onRetry }) => {
  return (
    <div className="min-h-[400px] flex flex-col items-center justify-center text-center p-8">
      <div className="w-16 h-16 mb-4 bg-gradient-to-br from-error to-accent rounded-full flex items-center justify-center">
        <ApperIcon name="AlertCircle" size={32} className="text-white" />
      </div>
      <h3 className="text-xl font-display font-semibold text-secondary mb-2">
        Oops! Something went wrong
      </h3>
      <p className="text-gray-600 mb-6 max-w-md">
        {message}. Please try again or contact support if the problem persists.
      </p>
      {onRetry && (
        <button
          onClick={onRetry}
          className="bg-gradient-to-r from-primary to-accent text-white px-6 py-3 rounded-lg font-medium hover:scale-105 transform transition-all duration-200 shadow-lg"
        >
          Try Again
        </button>
      )}
    </div>
  );
};

export default Error;