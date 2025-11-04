import React from "react";
import { Link } from "react-router-dom";
import ApperIcon from "@/components/ApperIcon";
import Button from "@/components/atoms/Button";

const NotFound = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center px-4">
      <div className="text-center max-w-md mx-auto">
        <div className="mb-8">
          <ApperIcon name="AlertCircle" size={64} className="text-primary mx-auto mb-4" />
          <h1 className="text-6xl font-display font-bold text-secondary mb-2">404</h1>
          <h2 className="text-2xl font-display font-semibold text-secondary mb-4">
            Page Not Found
          </h2>
          <p className="text-gray-600 mb-8">
            Sorry, the page you're looking for doesn't exist. It might have been moved, deleted, or you entered the wrong URL.
          </p>
        </div>

        <div className="space-y-4">
          <Link to="/">
            <Button className="w-full">
              <ApperIcon name="Home" size={20} className="mr-2" />
              Go Back Home
            </Button>
          </Link>
          
          <Link to="/products">
            <Button variant="secondary" className="w-full">
              <ApperIcon name="ShoppingBag" size={20} className="mr-2" />
              Browse Products
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NotFound;