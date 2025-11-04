import React from "react";
import ApperIcon from "@/components/ApperIcon";
import { cn } from "@/utils/cn";

const RatingDisplay = ({ rating, reviewCount, size = "sm", className }) => {
  const renderStars = () => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;

    for (let i = 1; i <= 5; i++) {
      if (i <= fullStars) {
        stars.push(
          <ApperIcon 
            key={i} 
            name="Star" 
            size={size === "sm" ? 12 : 16} 
            className="fill-warning text-warning" 
          />
        );
      } else if (i === fullStars + 1 && hasHalfStar) {
        stars.push(
          <ApperIcon 
            key={i} 
            name="StarHalf" 
            size={size === "sm" ? 12 : 16} 
            className="fill-warning text-warning" 
          />
        );
      } else {
        stars.push(
          <ApperIcon 
            key={i} 
            name="Star" 
            size={size === "sm" ? 12 : 16} 
            className="text-gray-300" 
          />
        );
      }
    }
    return stars;
  };

  return (
    <div className={cn("flex items-center gap-1", className)}>
      <div className="flex gap-0.5">
        {renderStars()}
      </div>
      <span className="text-xs text-gray-600">
        {rating} ({reviewCount})
      </span>
    </div>
  );
};

export default RatingDisplay;