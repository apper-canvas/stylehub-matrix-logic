import React from "react";
import { cn } from "@/utils/cn";

const PriceDisplay = ({ 
  price, 
  originalPrice, 
  discount, 
  size = "md",
  className 
}) => {
  const sizes = {
    sm: "text-sm",
    md: "text-base",
    lg: "text-lg",
    xl: "text-xl font-semibold"
  };

  return (
    <div className={cn("flex items-center gap-2", className)}>
      <span className={cn("font-semibold text-secondary", sizes[size])}>
        ₹{price?.toLocaleString()}
      </span>
      {originalPrice && originalPrice > price && (
        <>
          <span className={cn("line-through text-gray-400", sizes[size])}>
            ₹{originalPrice.toLocaleString()}
          </span>
          {discount && (
            <span className="text-xs bg-gradient-to-r from-success to-success text-white px-2 py-1 rounded">
              {discount}% OFF
            </span>
          )}
        </>
      )}
    </div>
  );
};

export default PriceDisplay;