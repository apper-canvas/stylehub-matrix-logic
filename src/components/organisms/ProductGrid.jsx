import React from "react";
import ProductCard from "@/components/organisms/ProductCard";
import Loading from "@/components/ui/Loading";
import Error from "@/components/ui/Error";
import Empty from "@/components/ui/Empty";

const ProductGrid = ({ 
  products, 
  loading, 
  error, 
  onRetry,
  onAddToCart,
  onToggleWishlist,
  wishlistItems = []
}) => {
  if (loading) return <Loading />;
  
  if (error) return <Error message={error} onRetry={onRetry} />;
  
  if (!products || products.length === 0) {
    return (
      <Empty 
        title="No products found"
        description="Try adjusting your search or filters to find what you're looking for."
        action={{
          label: "Clear Filters",
          onClick: () => window.location.reload()
        }}
        icon="Search"
      />
    );
  }

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-6">
      {products.map((product) => (
        <ProductCard
          key={product.Id}
          product={product}
          onAddToCart={onAddToCart}
          onToggleWishlist={onToggleWishlist}
          isWishlisted={wishlistItems.some(item => item.productId === product.Id.toString())}
        />
      ))}
    </div>
  );
};

export default ProductGrid;