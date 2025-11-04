import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import ApperIcon from "@/components/ApperIcon";
import Button from "@/components/atoms/Button";
import PriceDisplay from "@/components/molecules/PriceDisplay";
import Empty from "@/components/ui/Empty";
import { useCart } from "@/hooks/useCart";
import { toast } from "react-toastify";

const CartPage = () => {
  const navigate = useNavigate();
  const { cartItems, updateQuantity, removeFromCart, clearCart, cartCount, cartTotal } = useCart();

  const shipping = cartTotal > 1000 ? 0 : 99;
  const total = cartTotal + shipping;

  const handleQuantityChange = (productId, newQuantity) => {
    if (newQuantity <= 0) {
      handleRemoveItem(productId);
    } else {
      updateQuantity(productId, newQuantity);
    }
  };

  const handleRemoveItem = (productId) => {
    const item = cartItems.find(item => item.productId === productId);
    removeFromCart(productId);
    toast.info(`${item?.title} removed from cart`);
  };

  const handleCheckout = () => {
    toast.success("Proceeding to checkout...");
    // In a real app, this would navigate to checkout
    clearCart();
    navigate("/");
  };

  const handleContinueShopping = () => {
    navigate("/products");
  };

  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen bg-background">
        <div className="max-w-4xl mx-auto px-4 py-8">
          <Empty 
            title="Your cart is empty"
            description="Looks like you haven't added anything to your cart yet. Start shopping to fill it up!"
            action={{
              label: "Start Shopping",
              onClick: handleContinueShopping
            }}
            icon="ShoppingCart"
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
            Shopping Cart
          </h1>
          <p className="text-gray-600">
            {cartCount} {cartCount === 1 ? "item" : "items"} in your cart
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-xl p-6 shadow-sm">
              <div className="space-y-6">
                <AnimatePresence>
                  {cartItems.map((item) => (
                    <motion.div
                      key={`${item.productId}-${item.size}-${item.color}`}
                      layout
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      className="flex gap-4 p-4 border border-gray-200 rounded-lg"
                    >
                      <Link to={`/product/${item.productId}`}>
                        <img
                          src={item.image}
                          alt={item.title}
                          className="w-24 h-30 object-cover rounded-lg hover:opacity-80 transition-opacity"
                        />
                      </Link>
                      
                      <div className="flex-1 min-w-0">
                        <Link 
                          to={`/product/${item.productId}`}
                          className="hover:text-primary transition-colors"
                        >
                          <h3 className="font-medium text-secondary mb-2 line-clamp-2">
                            {item.title}
                          </h3>
                        </Link>
                        
                        <div className="text-sm text-gray-500 mb-3">
                          {item.size && `Size: ${item.size}`}
                          {item.color && item.size && " • "}
                          {item.color && `Color: ${item.color}`}
                        </div>
                        
                        <div className="flex items-center justify-between">
                          <PriceDisplay price={item.price} size="lg" />
                          
                          <div className="flex items-center gap-4">
                            {/* Quantity Controls */}
                            <div className="flex items-center gap-2">
                              <button
                                onClick={() => handleQuantityChange(item.productId, item.quantity - 1)}
                                className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-100 transition-colors"
                              >
                                <ApperIcon name="Minus" size={14} />
                              </button>
                              <span className="w-12 text-center font-medium">
                                {item.quantity}
                              </span>
                              <button
                                onClick={() => handleQuantityChange(item.productId, item.quantity + 1)}
                                className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-100 transition-colors"
                              >
                                <ApperIcon name="Plus" size={14} />
                              </button>
                            </div>
                            
                            {/* Remove Button */}
                            <button
                              onClick={() => handleRemoveItem(item.productId)}
                              className="text-gray-400 hover:text-error transition-colors p-1"
                              title="Remove item"
                            >
                              <ApperIcon name="Trash2" size={18} />
                            </button>
                          </div>
                        </div>
                        
                        {/* Item Total */}
                        <div className="mt-3 text-right">
                          <span className="text-lg font-semibold text-secondary">
                            ₹{(item.price * item.quantity).toLocaleString()}
                          </span>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>
              
              {/* Continue Shopping */}
              <div className="mt-8 pt-6 border-t border-gray-200">
                <Button
                  variant="outline"
                  onClick={handleContinueShopping}
                  icon="ArrowLeft"
                >
                  Continue Shopping
                </Button>
              </div>
            </div>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl p-6 shadow-sm sticky top-8">
              <h2 className="text-xl font-display font-semibold text-secondary mb-6">
                Order Summary
              </h2>
              
              <div className="space-y-4 mb-6">
                <div className="flex justify-between">
                  <span className="text-gray-600">
                    Subtotal ({cartCount} {cartCount === 1 ? "item" : "items"})
                  </span>
                  <span className="font-medium">₹{cartTotal.toLocaleString()}</span>
                </div>
                
                <div className="flex justify-between">
                  <span className="text-gray-600">Shipping</span>
                  <span className="font-medium">
                    {shipping === 0 ? "Free" : `₹${shipping}`}
                  </span>
                </div>
                
                {shipping === 0 && (
                  <div className="text-sm text-success flex items-center gap-1">
                    <ApperIcon name="Check" size={14} />
                    <span>Free shipping applied!</span>
                  </div>
                )}
                
                {cartTotal < 1000 && cartTotal > 0 && (
                  <div className="text-sm text-gray-600 bg-gray-50 p-3 rounded-lg">
                    Add ₹{(1000 - cartTotal).toLocaleString()} more for free shipping
                  </div>
                )}
                
                <div className="border-t pt-4">
                  <div className="flex justify-between text-lg font-semibold">
                    <span>Total</span>
                    <span>₹{total.toLocaleString()}</span>
                  </div>
                </div>
              </div>
              
              <Button
                onClick={handleCheckout}
                className="w-full mb-4"
                size="lg"
              >
                Proceed to Checkout
              </Button>
              
              <div className="text-center space-y-2">
                <div className="flex items-center justify-center gap-2 text-sm text-gray-500">
                  <ApperIcon name="Shield" size={14} />
                  <span>Secure checkout</span>
                </div>
                <div className="flex items-center justify-center gap-2 text-sm text-gray-500">
                  <ApperIcon name="RotateCcw" size={14} />
                  <span>Easy returns within 30 days</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartPage;