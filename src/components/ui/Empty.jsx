import React from "react";
import ApperIcon from "@/components/ApperIcon";

const Empty = ({ title = "No items found", description, action, icon = "ShoppingBag" }) => {
  return (
    <div className="min-h-[400px] flex flex-col items-center justify-center text-center p-8">
      <div className="w-20 h-20 mb-6 bg-gradient-to-br from-primary/10 to-accent/10 rounded-full flex items-center justify-center">
        <ApperIcon name={icon} size={40} className="text-gray-400" />
      </div>
      <h3 className="text-xl font-display font-semibold text-secondary mb-2">
        {title}
      </h3>
      {description && (
        <p className="text-gray-600 mb-6 max-w-md">
          {description}
        </p>
      )}
      {action && (
        <button
          onClick={action.onClick}
          className="bg-gradient-to-r from-primary to-accent text-white px-8 py-3 rounded-lg font-medium hover:scale-105 transform transition-all duration-200 shadow-lg"
        >
          {action.label}
        </button>
      )}
    </div>
  );
};

export default Empty;