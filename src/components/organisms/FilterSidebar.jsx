import React from "react";
import ApperIcon from "@/components/ApperIcon";
import Button from "@/components/atoms/Button";

const FilterSidebar = ({ 
  filters, 
  onFiltersChange, 
  isOpen, 
  onClose,
  categories = [],
  brands = []
}) => {
  const priceRanges = [
    { label: "Under ₹500", min: 0, max: 500 },
    { label: "₹500 - ₹1000", min: 500, max: 1000 },
    { label: "₹1000 - ₹2000", min: 1000, max: 2000 },
    { label: "₹2000 - ₹5000", min: 2000, max: 5000 },
    { label: "Above ₹5000", min: 5000, max: null }
  ];

  const sizes = ["XS", "S", "M", "L", "XL", "XXL"];
  const colors = ["Black", "White", "Red", "Blue", "Green", "Yellow", "Pink", "Gray"];

  const handleFilterChange = (type, value, checked) => {
    const newFilters = { ...filters };
    
    if (type === "priceRange") {
      newFilters.priceRange = checked ? value : { min: 0, max: null };
    } else {
      if (!newFilters[type]) {
        newFilters[type] = [];
      }
      
      if (checked) {
        newFilters[type] = [...newFilters[type], value];
      } else {
        newFilters[type] = newFilters[type].filter(item => item !== value);
      }
    }
    
    onFiltersChange(newFilters);
  };

  const FilterSection = ({ title, children }) => (
    <div className="border-b border-gray-200 pb-6 mb-6">
      <h3 className="text-lg font-semibold text-secondary mb-4">{title}</h3>
      <div className="space-y-2">{children}</div>
    </div>
  );

  const CheckboxFilter = ({ label, checked, onChange }) => (
    <label className="flex items-center space-x-2 cursor-pointer">
      <input
        type="checkbox"
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
        className="w-4 h-4 text-primary border-gray-300 rounded focus:ring-primary"
      />
      <span className="text-sm text-gray-700">{label}</span>
    </label>
  );

  const sidebarContent = (
    <div className="h-full overflow-y-auto">
      <div className="p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-display font-semibold text-secondary">Filters</h2>
          <button
            onClick={onClose}
            className="lg:hidden text-gray-400 hover:text-secondary"
          >
            <ApperIcon name="X" size={24} />
          </button>
        </div>

        {/* Category Filter */}
        {categories.length > 0 && (
          <FilterSection title="Category">
            {categories.map((category) => (
              <CheckboxFilter
                key={category}
                label={category}
                checked={filters.categories?.includes(category)}
                onChange={(checked) => handleFilterChange("categories", category, checked)}
              />
            ))}
          </FilterSection>
        )}

        {/* Price Range Filter */}
        <FilterSection title="Price Range">
          {priceRanges.map((range, index) => (
            <CheckboxFilter
              key={index}
              label={range.label}
              checked={
                filters.priceRange?.min === range.min && 
                filters.priceRange?.max === range.max
              }
              onChange={(checked) => handleFilterChange("priceRange", range, checked)}
            />
          ))}
        </FilterSection>

        {/* Size Filter */}
        <FilterSection title="Size">
          <div className="grid grid-cols-3 gap-2">
            {sizes.map((size) => (
              <button
                key={size}
                onClick={() => handleFilterChange("sizes", size, !filters.sizes?.includes(size))}
                className={`p-2 text-sm border rounded-lg transition-colors ${
                  filters.sizes?.includes(size)
                    ? "bg-primary text-white border-primary"
                    : "bg-white text-gray-700 border-gray-300 hover:border-primary"
                }`}
              >
                {size}
              </button>
            ))}
          </div>
        </FilterSection>

        {/* Color Filter */}
        <FilterSection title="Color">
          <div className="grid grid-cols-4 gap-2">
            {colors.map((color) => (
              <button
                key={color}
                onClick={() => handleFilterChange("colors", color, !filters.colors?.includes(color))}
                className={`p-1 text-xs border rounded text-center transition-colors ${
                  filters.colors?.includes(color)
                    ? "bg-primary text-white border-primary"
                    : "bg-white text-gray-700 border-gray-300 hover:border-primary"
                }`}
              >
                {color}
              </button>
            ))}
          </div>
        </FilterSection>

        {/* Brand Filter */}
        {brands.length > 0 && (
          <FilterSection title="Brand">
            {brands.map((brand) => (
              <CheckboxFilter
                key={brand}
                label={brand}
                checked={filters.brands?.includes(brand)}
                onChange={(checked) => handleFilterChange("brands", brand, checked)}
              />
            ))}
          </FilterSection>
        )}

        {/* Clear Filters */}
        <Button
          variant="outline"
          className="w-full"
          onClick={() => onFiltersChange({})}
        >
          Clear All Filters
        </Button>
      </div>
    </div>
  );

  return (
    <>
      {/* Mobile Overlay */}
      {isOpen && (
        <div 
          className="lg:hidden fixed inset-0 bg-black bg-opacity-50 z-40"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <div className={`
        fixed lg:sticky top-0 left-0 h-screen w-80 bg-white shadow-lg z-50 transition-transform duration-300 lg:transform-none
        ${isOpen ? "transform translate-x-0" : "transform -translate-x-full lg:translate-x-0"}
      `}>
        {sidebarContent}
      </div>
    </>
  );
};

export default FilterSidebar;