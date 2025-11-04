import React from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import ApperIcon from "@/components/ApperIcon";
import Button from "@/components/atoms/Button";
import PriceDisplay from "@/components/molecules/PriceDisplay";
import Empty from "@/components/ui/Empty";
import { useWishlist } from "@/hooks/useWishlist";
import { useCart } from "@/hooks/useCart";
import { toast } from "react-toastify";

const WishlistPage = () => {
  const { wishlistItems, removeFromWishlist } = useWishlist();
  const { addToCart } = useCart();

  const handleRemoveFromWishlist = (productId, title) => {
    removeFromWishlist(productId);
    toast.info(`${title} removed from wishlist`);
  };

  const handleAddToCart = (item) => {
    const cartItem = {
      productId: item.productId,
      title: item.title,
      image: item.image,
      price: item.price,
      quantity: 1,
      size: "M", // Default size
      color: "Default"
    };
    
    addToCart(cartItem);
    toast.success(`${item.title} added to cart!`);
  };

  const handleMoveToCart = (item) => {
    handleAddToCart(item);
    removeFromWishlist(item.productId);
    toast.success(`${item.title} moved to cart!`);
  };

  if (wishlistItems.length === 0) {
    return (
      <div className="min-h-screen bg-background">
        <div className="max-w-4xl mx-auto px-4 py-8">
          <Empty 
            title="Your wishlist is empty"
            description="Save your favorite items to your wishlist and find them easily later!"
            action={{
              label: "Explore Products",
              onClick: () => window.location.href = "/products"
            }}
            icon="Heart"
          />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-display font-bold text-secondary mb-2">
            My Wishlist
          </h1>
          <p className="text-gray-600">
            {wishlistItems.length} {wishlistItems.length === 1 ? "item" : "items"} saved for later
          </p>
        </div>

        {/* Wishlist Items Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          <AnimatePresence>
            {wishlistItems.map((item) => (
              <motion.div
                key={item.productId}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.2 }}
                className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-shadow duration-300"
              >
                <div className="relative">
                  <Link to={`/product/${item.productId}`}>
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-full aspect-[3/4] object-cover hover:opacity-80 transition-opacity"
                    />
                  </Link>
                  
                  {/* Remove from Wishlist Button */}
                  <button
                    onClick={() => handleRemoveFromWishlist(item.productId, item.title)}
                    className="absolute top-2 right-2 w-8 h-8 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center shadow-sm hover:bg-white transition-colors"
                  >
                    <ApperIcon name="X" size={16} className="text-gray-600" />
                  </button>
                  
                  {/* Discount Badge */}
                  {item.discount > 0 && (
                    <div className="absolute top-2 left-2 bg-success text-white px-2 py-1 rounded text-xs font-medium">
                      {item.discount}% OFF
                    </div>
                  )}
                </div>

                <div className="p-4">
                  <Link 
                    to={`/product/${item.productId}`}
                    className="hover:text-primary transition-colors"
                  >
                    <h3 className="font-medium text-secondary mb-2 line-clamp-2">
                      {item.title}
                    </h3>
                  </Link>
                  
                  <div className="mb-4">
                    <PriceDisplay price={item.price} size="lg" />
                  </div>
                  
                  <div className="space-y-2">
                    <Button
                      onClick={() => handleMoveToCart(item)}
                      className="w-full"
                      icon="ShoppingCart"
                    >
                      Move to Cart
                    </Button>
                    
                    <Button
                      onClick={() => handleAddToCart(item)}
                      variant="outline"
                      className="w-full"
                      icon="Plus"
                    >
                      Add to Cart
                    </Button>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* Wishlist Actions */}
        <div className="mt-12 text-center">
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              onClick={() => window.location.href = "/products"}
              variant="outline"
              icon="Plus"
            >
              Add More Items
            </Button>
            
            <Button
              onClick={() => {
                wishlistItems.forEach(item => handleAddToCart(item));
                toast.success("All items moved to cart!");
              }}
              icon="ShoppingCart"
            >
              Move All to Cart
            </Button>
          </div>
          
          <p className="text-sm text-gray-500 mt-4">
            Items in your wishlist are saved for 30 days
          </p>
        </div>
      </div>
    </div>
  );
};

export default WishlistPage;