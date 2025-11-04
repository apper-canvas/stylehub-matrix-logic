import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import ApperIcon from "@/components/ApperIcon";
import Button from "@/components/atoms/Button";
import PriceDisplay from "@/components/molecules/PriceDisplay";
import RatingDisplay from "@/components/molecules/RatingDisplay";
import Badge from "@/components/atoms/Badge";
import Loading from "@/components/ui/Loading";
import Error from "@/components/ui/Error";
import { productService } from "@/services/api/productService";
import { useCart } from "@/hooks/useCart";
import { useWishlist } from "@/hooks/useWishlist";
import { toast } from "react-toastify";

const ProductDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedSize, setSelectedSize] = useState("");
  const [selectedColor, setSelectedColor] = useState("");
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  
  const { addToCart } = useCart();
  const { toggleWishlist, isInWishlist } = useWishlist();

  const loadProduct = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await productService.getById(parseInt(id));
      setProduct(data);
      
      // Set default selections
      if (data.sizes && data.sizes.length > 0) {
        setSelectedSize(data.sizes[0]);
      }
      if (data.colors && data.colors.length > 0) {
        setSelectedColor(data.colors[0]);
      }
    } catch (err) {
      setError(err.message || "Failed to load product");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (id) {
      loadProduct();
    }
  }, [id]);

  const handleAddToCart = () => {
    if (product.sizes && product.sizes.length > 0 && !selectedSize) {
      toast.error("Please select a size");
      return;
    }

    const cartItem = {
      productId: product.Id.toString(),
      title: product.title,
      image: product.images[0],
      price: product.price,
      quantity: quantity,
      size: selectedSize,
      color: selectedColor
    };
    
    addToCart(cartItem);
    toast.success(`${product.title} added to cart!`);
  };

  const handleToggleWishlist = () => {
    const wishlistItem = {
      productId: product.Id.toString(),
      title: product.title,
      image: product.images[0],
      price: product.price,
      discount: product.discount
    };
    
    toggleWishlist(wishlistItem);
    
    if (isInWishlist(product.Id.toString())) {
      toast.info(`${product.title} removed from wishlist`);
    } else {
      toast.success(`${product.title} added to wishlist!`);
    }
  };

  const handleBuyNow = () => {
    handleAddToCart();
    navigate("/cart");
  };

  if (loading) return <Loading />;
  
  if (error) return <Error message={error} onRetry={loadProduct} />;
  
  if (!product) return <Error message="Product not found" />;

  const discountPercentage = product.originalPrice > product.price 
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0;

  const isWishlisted = isInWishlist(product.Id.toString());

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Breadcrumb */}
        <nav className="mb-8">
          <div className="flex items-center space-x-2 text-sm text-gray-600">
            <button onClick={() => navigate("/")} className="hover:text-primary">Home</button>
            <ApperIcon name="ChevronRight" size={16} />
            <button onClick={() => navigate(`/category/${product.category.toLowerCase()}`)} className="hover:text-primary">
              {product.category}
            </button>
            <ApperIcon name="ChevronRight" size={16} />
            <span className="text-secondary">{product.title}</span>
          </div>
        </nav>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Product Images */}
          <div className="space-y-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="aspect-square bg-gray-100 rounded-xl overflow-hidden"
            >
              <img
                src={product.images[selectedImage]}
                alt={product.title}
                className="w-full h-full object-cover"
              />
            </motion.div>

            {/* Thumbnail Images */}
            {product.images.length > 1 && (
              <div className="flex gap-2 overflow-x-auto">
                {product.images.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImage(index)}
                    className={`flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 transition-colors ${
                      selectedImage === index ? "border-primary" : "border-gray-200"
                    }`}
                  >
                    <img
                      src={image}
                      alt={`${product.title} ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Product Info */}
          <div className="space-y-6">
            <div>
              <p className="text-gray-600 mb-2">{product.brand}</p>
              <h1 className="text-3xl font-display font-bold text-secondary mb-4">
                {product.title}
              </h1>
              
              {product.rating && (
                <RatingDisplay
                  rating={product.rating}
                  reviewCount={product.reviewCount}
                  size="md"
                />
              )}
            </div>

            {/* Price */}
            <div className="space-y-2">
              <PriceDisplay
                price={product.price}
                originalPrice={product.originalPrice}
                discount={discountPercentage}
                size="xl"
              />
              {discountPercentage > 0 && (
                <Badge variant="discount">
                  Save ₹{(product.originalPrice - product.price).toLocaleString()}
                </Badge>
              )}
            </div>

            {/* Size Selection */}
            {product.sizes && product.sizes.length > 0 && (
              <div>
                <h3 className="font-medium text-secondary mb-3">Size</h3>
                <div className="flex flex-wrap gap-2">
                  {product.sizes.map((size) => (
                    <button
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      className={`px-4 py-2 border rounded-lg transition-colors ${
                        selectedSize === size
                          ? "bg-primary text-white border-primary"
                          : "bg-white text-gray-700 border-gray-300 hover:border-primary"
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Color Selection */}
            {product.colors && product.colors.length > 0 && (
              <div>
                <h3 className="font-medium text-secondary mb-3">Color: {selectedColor}</h3>
                <div className="flex flex-wrap gap-2">
                  {product.colors.map((color) => (
                    <button
                      key={color}
                      onClick={() => setSelectedColor(color)}
                      className={`px-4 py-2 border rounded-lg transition-colors ${
                        selectedColor === color
                          ? "bg-primary text-white border-primary"
                          : "bg-white text-gray-700 border-gray-300 hover:border-primary"
                      }`}
                    >
                      {color}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Quantity */}
            <div>
              <h3 className="font-medium text-secondary mb-3">Quantity</h3>
              <div className="flex items-center gap-4">
                <div className="flex items-center border border-gray-300 rounded-lg">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="p-2 hover:bg-gray-100 transition-colors"
                  >
                    <ApperIcon name="Minus" size={16} />
                  </button>
                  <span className="px-4 py-2 font-medium">{quantity}</span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="p-2 hover:bg-gray-100 transition-colors"
                  >
                    <ApperIcon name="Plus" size={16} />
                  </button>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="space-y-4">
              <div className="flex gap-4">
                <Button
                  onClick={handleAddToCart}
                  className="flex-1"
                  icon="ShoppingCart"
                  disabled={!product.inStock}
                >
                  Add to Cart
                </Button>
                <Button
                  onClick={handleToggleWishlist}
                  variant="outline"
                  icon="Heart"
                  className={isWishlisted ? "text-primary border-primary" : ""}
                >
                  {isWishlisted ? "Wishlisted" : "Wishlist"}
                </Button>
              </div>
              
              <Button
                onClick={handleBuyNow}
                size="lg"
                className="w-full"
                disabled={!product.inStock}
              >
                Buy Now
              </Button>
            </div>

            {/* Stock Status */}
            <div className="flex items-center gap-2">
              {product.inStock ? (
                <>
                  <ApperIcon name="Check" size={16} className="text-success" />
                  <span className="text-success font-medium">In Stock</span>
                </>
              ) : (
                <>
                  <ApperIcon name="X" size={16} className="text-error" />
                  <span className="text-error font-medium">Out of Stock</span>
                </>
              )}
            </div>

            {/* Product Description */}
            {product.description && (
              <div>
                <h3 className="font-medium text-secondary mb-3">Description</h3>
                <p className="text-gray-600 leading-relaxed">
                  {product.description}
                </p>
              </div>
            )}

            {/* Product Tags */}
            {product.tags && product.tags.length > 0 && (
              <div>
                <h3 className="font-medium text-secondary mb-3">Tags</h3>
                <div className="flex flex-wrap gap-2">
                  {product.tags.map((tag) => (
                    <Badge key={tag} variant="default">
                      {tag}
                    </Badge>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailPage;