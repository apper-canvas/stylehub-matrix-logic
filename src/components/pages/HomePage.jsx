import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import ProductGrid from "@/components/organisms/ProductGrid";
import ApperIcon from "@/components/ApperIcon";
import Button from "@/components/atoms/Button";
import { productService } from "@/services/api/productService";
import { useCart } from "@/hooks/useCart";
import { useWishlist } from "@/hooks/useWishlist";

const HomePage = () => {
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  const { addToCart } = useCart();
  const { toggleWishlist, wishlistItems } = useWishlist();

  const loadFeaturedProducts = async () => {
    try {
      setLoading(true);
      setError(null);
      const products = await productService.getAll();
      // Get first 8 products as featured
      setFeaturedProducts(products.slice(0, 8));
    } catch (err) {
      setError(err.message || "Failed to load featured products");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadFeaturedProducts();
  }, []);

  const categories = [
    {
      name: "Women's Fashion",
      path: "/category/women",
      image: "https://images.unsplash.com/photo-1483985988355-763728e1935b?w=400&h=300&fit=crop",
      gradient: "from-pink-500 to-rose-500"
    },
    {
      name: "Men's Fashion",
      path: "/category/men",
      image: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=400&h=300&fit=crop",
      gradient: "from-blue-500 to-indigo-500"
    },
    {
      name: "Kids Collection",
      path: "/category/kids",
      image: "https://images.unsplash.com/photo-1503944168801-af4f8b70b3b4?w=400&h=300&fit=crop",
      gradient: "from-yellow-500 to-orange-500"
    },
    {
      name: "Accessories",
      path: "/category/accessories",
      image: "https://images.unsplash.com/photo-1506629905607-b5f92cc4d8fe?w=400&h=300&fit=crop",
      gradient: "from-purple-500 to-pink-500"
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative h-[600px] bg-gradient-to-br from-primary via-accent to-primary overflow-hidden">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative max-w-7xl mx-auto px-4 h-full flex items-center">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-white max-w-2xl"
          >
            <h1 className="text-5xl md:text-6xl font-display font-bold mb-6 leading-tight">
              Fashion That 
              <span className="block bg-gradient-to-r from-white to-yellow-200 bg-clip-text text-transparent">
                Speaks You
              </span>
            </h1>
            <p className="text-xl mb-8 text-white/90">
              Discover the latest trends in fashion and lifestyle. Curated collections that match your style.
            </p>
            <div className="flex gap-4">
              <Button size="lg" className="bg-white text-primary hover:bg-gray-100">
                Shop Now
              </Button>
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-primary">
                Explore Collections
              </Button>
            </div>
          </motion.div>
        </div>
        
        {/* Decorative Elements */}
        <div className="absolute top-20 right-20 w-32 h-32 bg-white/10 rounded-full blur-xl"></div>
        <div className="absolute bottom-20 right-40 w-24 h-24 bg-yellow-300/20 rounded-full blur-lg"></div>
      </section>

      {/* Categories Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-display font-bold text-secondary mb-4">
              Shop by Category
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Find exactly what you're looking for in our carefully curated collections
            </p>
          </motion.div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {categories.map((category, index) => (
              <motion.div
                key={category.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ scale: 1.05 }}
              >
                <Link to={category.path}>
                  <div className="relative h-48 rounded-xl overflow-hidden group">
                    <img
                      src={category.image}
                      alt={category.name}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className={`absolute inset-0 bg-gradient-to-t ${category.gradient} opacity-60`}></div>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <h3 className="text-white text-lg font-display font-semibold text-center">
                        {category.name}
                      </h3>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-display font-bold text-secondary mb-4">
              Featured Products
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Handpicked items from our latest collection that are trending right now
            </p>
          </motion.div>

          <ProductGrid
            products={featuredProducts}
            loading={loading}
            error={error}
            onRetry={loadFeaturedProducts}
            onAddToCart={addToCart}
            onToggleWishlist={toggleWishlist}
            wishlistItems={wishlistItems}
          />

          <div className="text-center mt-12">
            <Button size="lg" asChild>
              <Link to="/products">
                View All Products
                <ApperIcon name="ArrowRight" className="ml-2" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="py-16 bg-gradient-to-r from-secondary to-gray-800">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl font-display font-bold text-white mb-4">
              Stay Updated with Latest Trends
            </h2>
            <p className="text-white/80 mb-8">
              Subscribe to our newsletter and get exclusive offers, style tips, and early access to new collections.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-3 rounded-lg border-0 focus:ring-2 focus:ring-primary"
              />
              <Button className="bg-gradient-to-r from-primary to-accent">
                Subscribe
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;