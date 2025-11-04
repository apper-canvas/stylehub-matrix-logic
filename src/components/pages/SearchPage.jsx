import React, { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import ProductGrid from "@/components/organisms/ProductGrid";
import FilterSidebar from "@/components/organisms/FilterSidebar";
import FilterChips from "@/components/molecules/FilterChips";
import SearchBar from "@/components/molecules/SearchBar";
import Button from "@/components/atoms/Button";
import { productService } from "@/services/api/productService";
import { useCart } from "@/hooks/useCart";
import { useWishlist } from "@/hooks/useWishlist";

const SearchPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filters, setFilters] = useState({});
  const [sortBy, setSortBy] = useState("popularity");
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  
  const { addToCart } = useCart();
  const { toggleWishlist, wishlistItems } = useWishlist();

  const query = searchParams.get("q") || "";

  const loadProducts = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await productService.getAll();
      
      // Filter products based on search query
      const searchResults = data.filter(product =>
        product.title.toLowerCase().includes(query.toLowerCase()) ||
        product.brand.toLowerCase().includes(query.toLowerCase()) ||
        product.category.toLowerCase().includes(query.toLowerCase()) ||
        product.subcategory?.toLowerCase().includes(query.toLowerCase()) ||
        product.description?.toLowerCase().includes(query.toLowerCase()) ||
        product.tags?.some(tag => tag.toLowerCase().includes(query.toLowerCase()))
      );
      
      setProducts(searchResults);
      setFilteredProducts(searchResults);
    } catch (err) {
      setError(err.message || "Failed to load search results");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (query) {
      loadProducts();
    }
  }, [query]);

  // Apply filters and sorting
  useEffect(() => {
    let filtered = [...products];

    // Apply category filter
    if (filters.categories && filters.categories.length > 0) {
      filtered = filtered.filter(product => 
        filters.categories.includes(product.category)
      );
    }

    // Apply size filter
    if (filters.sizes && filters.sizes.length > 0) {
      filtered = filtered.filter(product => 
        product.sizes && product.sizes.some(size => filters.sizes.includes(size))
      );
    }

    // Apply color filter
    if (filters.colors && filters.colors.length > 0) {
      filtered = filtered.filter(product => 
        product.colors && product.colors.some(color => filters.colors.includes(color))
      );
    }

    // Apply brand filter
    if (filters.brands && filters.brands.length > 0) {
      filtered = filtered.filter(product => 
        filters.brands.includes(product.brand)
      );
    }

    // Apply price range filter
    if (filters.priceRange && (filters.priceRange.min || filters.priceRange.max)) {
      filtered = filtered.filter(product => {
        const price = product.price;
        const min = filters.priceRange.min || 0;
        const max = filters.priceRange.max || Infinity;
        return price >= min && price <= max;
      });
    }

    // Apply sorting
    switch (sortBy) {
      case "price-low":
        filtered.sort((a, b) => a.price - b.price);
        break;
      case "price-high":
        filtered.sort((a, b) => b.price - a.price);
        break;
      case "newest":
        filtered.sort((a, b) => b.Id - a.Id);
        break;
      case "rating":
        filtered.sort((a, b) => (b.rating || 0) - (a.rating || 0));
        break;
      default:
        // popularity - keep original order
        break;
    }

    setFilteredProducts(filtered);
  }, [products, filters, sortBy]);

  const handleSearch = (newQuery) => {
    if (newQuery.trim()) {
      setSearchParams({ q: newQuery.trim() });
    }
  };

  const handleFiltersChange = (newFilters) => {
    setFilters(newFilters);
  };

  const handleRemoveFilter = (filterType, value) => {
    const newFilters = { ...filters };
    
    if (filterType === "priceRange") {
      delete newFilters.priceRange;
    } else if (newFilters[filterType]) {
      newFilters[filterType] = newFilters[filterType].filter(item => item !== value);
      if (newFilters[filterType].length === 0) {
        delete newFilters[filterType];
      }
    }
    
    setFilters(newFilters);
  };

  const handleClearAllFilters = () => {
    setFilters({});
  };

  // Get unique values for filter options
  const categories = [...new Set(products.map(p => p.category))];
  const brands = [...new Set(products.map(p => p.brand))];

  const sortOptions = [
    { value: "popularity", label: "Popularity" },
    { value: "newest", label: "Newest First" },
    { value: "price-low", label: "Price: Low to High" },
    { value: "price-high", label: "Price: High to Low" },
    { value: "rating", label: "Customer Rating" }
  ];

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto px-4 py-6">
        {/* Search Header */}
        <div className="mb-8">
          <div className="mb-4">
            <SearchBar onSearch={handleSearch} placeholder="Search for products..." />
          </div>
          
          {query && (
            <h1 className="text-2xl font-display font-bold text-secondary mb-4">
              Search results for "{query}"
            </h1>
          )}
          
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
            <FilterChips
              filters={filters}
              onRemoveFilter={handleRemoveFilter}
              onClearAll={handleClearAllFilters}
            />
            <div className="flex items-center gap-4">
              <Button
                variant="outline"
                onClick={() => setIsFilterOpen(true)}
                className="lg:hidden"
                icon="Filter"
              >
                Filters
              </Button>
              <div className="flex items-center gap-2">
                <span className="text-sm text-gray-600">Sort by:</span>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-primary/20 focus:border-primary"
                >
                  {sortOptions.map(option => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>
              <span className="text-sm text-gray-600">
                {filteredProducts.length} results
              </span>
            </div>
          </div>
        </div>

        {query ? (
          <div className="flex gap-8">
            {/* Filter Sidebar - Desktop */}
            <div className="hidden lg:block flex-shrink-0">
              <FilterSidebar
                filters={filters}
                onFiltersChange={handleFiltersChange}
                isOpen={true}
                onClose={() => {}}
                categories={categories}
                brands={brands}
              />
            </div>

            {/* Search Results */}
            <div className="flex-1 min-w-0">
              <ProductGrid
                products={filteredProducts}
                loading={loading}
                error={error}
                onRetry={loadProducts}
                onAddToCart={addToCart}
                onToggleWishlist={toggleWishlist}
                wishlistItems={wishlistItems}
              />
            </div>
          </div>
        ) : (
          <div className="text-center py-16">
            <h2 className="text-xl font-semibold text-secondary mb-4">
              Enter a search term to find products
            </h2>
            <p className="text-gray-600">
              Try searching for categories, brands, or specific items you're looking for.
            </p>
          </div>
        )}

        {/* Mobile Filter Sidebar */}
        <FilterSidebar
          filters={filters}
          onFiltersChange={handleFiltersChange}
          isOpen={isFilterOpen}
          onClose={() => setIsFilterOpen(false)}
          categories={categories}
          brands={brands}
        />
      </div>
    </div>
  );
};

export default SearchPage;