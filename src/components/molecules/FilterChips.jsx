import React from "react";
import ApperIcon from "@/components/ApperIcon";

const FilterChips = ({ filters, onRemoveFilter, onClearAll }) => {
  const activeFilters = [];

  // Collect active filters
  if (filters.categories?.length > 0) {
    filters.categories.forEach(cat => {
      activeFilters.push({ type: "category", value: cat, label: cat });
    });
  }

  if (filters.sizes?.length > 0) {
    filters.sizes.forEach(size => {
      activeFilters.push({ type: "size", value: size, label: `Size ${size}` });
    });
  }

  if (filters.colors?.length > 0) {
    filters.colors.forEach(color => {
      activeFilters.push({ type: "color", value: color, label: color });
    });
  }

  if (filters.brands?.length > 0) {
    filters.brands.forEach(brand => {
      activeFilters.push({ type: "brand", value: brand, label: brand });
    });
  }

  if (filters.priceRange?.min || filters.priceRange?.max) {
    const label = `₹${filters.priceRange.min || 0} - ₹${filters.priceRange.max || "∞"}`;
    activeFilters.push({ type: "priceRange", value: filters.priceRange, label });
  }

  if (activeFilters.length === 0) return null;

  return (
    <div className="flex flex-wrap gap-2 items-center">
      {activeFilters.map((filter, index) => (
        <div
          key={index}
          className="flex items-center gap-1 bg-primary/10 text-primary px-3 py-1.5 rounded-full text-sm"
        >
          <span>{filter.label}</span>
          <button
            onClick={() => onRemoveFilter(filter.type, filter.value)}
            className="hover:bg-primary/20 rounded-full p-0.5 transition-colors"
          >
            <ApperIcon name="X" size={12} />
          </button>
        </div>
      ))}
      {activeFilters.length > 1 && (
        <button
          onClick={onClearAll}
          className="text-sm text-gray-600 hover:text-primary underline ml-2"
        >
          Clear All
        </button>
      )}
    </div>
  );
};

export default FilterChips;