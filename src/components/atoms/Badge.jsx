import React from "react";
import { cn } from "@/utils/cn";

const Badge = ({ 
  children, 
  variant = "default", 
  size = "sm",
  className 
}) => {
  const variants = {
    default: "bg-gray-100 text-gray-700",
    primary: "bg-gradient-to-r from-primary to-accent text-white",
    success: "bg-gradient-to-r from-success to-success text-white",
    warning: "bg-gradient-to-r from-warning to-warning text-white",
    error: "bg-gradient-to-r from-error to-accent text-white",
    discount: "bg-gradient-to-r from-success to-success text-white"
  };

  const sizes = {
    sm: "px-2 py-1 text-xs",
    md: "px-3 py-1.5 text-sm"
  };

  return (
    <span className={cn(
      "inline-flex items-center rounded-full font-medium",
      variants[variant],
      sizes[size],
      className
    )}>
      {children}
    </span>
  );
};

export default Badge;