import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import ApperIcon from "@/components/ApperIcon";
import Button from "@/components/atoms/Button";
import PriceDisplay from "@/components/molecules/PriceDisplay";
import { toast } from "react-toastify";

const CartDrawer = ({ 
  isOpen, 
  onClose, 
  cartItems, 
  onUpdateQuantity, 
  onRemoveItem,
  onCheckout 
}) => {
  const subtotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const shipping = subtotal > 1000 ? 0 : 99;
  const total = subtotal + shipping;

  const handleQuantityChange = (productId, newQuantity) => {
    if (newQuantity <= 0) {
      onRemoveItem(productId);
      toast.info("Item removed from cart");
    } else {
      onUpdateQuantity(productId, newQuantity);
    }
  };

  const handleRemoveItem = (productId, title) => {
    onRemoveItem(productId);
    toast.info(`${title} removed from cart`);
  };

  const handleCheckout = () => {
    onCheckout();
    toast.success("Proceeding to checkout...");
    onClose();
  };

  return (
    <>
      {/* Backdrop */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50"
          />
        )}
      </AnimatePresence>

      {/* Cart Drawer */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "tween", duration: 0.3 }}
            className="fixed right-0 top-0 h-full w-full max-w-md bg-white shadow-2xl z-50 flex flex-col"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b">
              <h2 className="text-xl font-display font-semibold text-secondary">
                Shopping Cart ({cartItems.length})
              </h2>
              <button
                onClick={onClose}
                className="text-gray-400 hover:text-secondary transition-colors"
              >
                <ApperIcon name="X" size={24} />
              </button>
            </div>

            {/* Cart Items */}
            <div className="flex-1 overflow-y-auto p-6">
              {cartItems.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full text-center">
                  <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                    <ApperIcon name="ShoppingCart" size={32} className="text-gray-400" />
                  </div>
                  <h3 className="text-lg font-medium text-secondary mb-2">Your cart is empty</h3>
                  <p className="text-gray-500 mb-4">Start adding some items to your cart</p>
                  <Button onClick={onClose} variant="outline">
                    Continue Shopping
                  </Button>
                </div>
              ) : (
                <div className="space-y-6">
                  {cartItems.map((item) => (
                    <motion.div
                      key={`${item.productId}-${item.size}-${item.color}`}
                      layout
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      className="flex gap-4"
                    >
                      <img
                        src={item.image}
                        alt={item.title}
                        className="w-16 h-20 object-cover rounded-lg"
                      />
                      <div className="flex-1">
                        <h4 className="font-medium text-secondary mb-1 line-clamp-2">
                          {item.title}
                        </h4>
                        <div className="text-sm text-gray-500 mb-2">
                          {item.size && `Size: ${item.size}`}
                          {item.color && item.size && " • "}
                          {item.color && `Color: ${item.color}`}
                        </div>
                        <div className="flex items-center justify-between">
                          <PriceDisplay price={item.price} size="sm" />
                          <div className="flex items-center gap-2">
                            <button
                              onClick={() => handleQuantityChange(item.productId, item.quantity - 1)}
                              className="w-6 h-6 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-100"
                            >
                              <ApperIcon name="Minus" size={12} />
                            </button>
                            <span className="w-8 text-center text-sm">{item.quantity}</span>
                            <button
                              onClick={() => handleQuantityChange(item.productId, item.quantity + 1)}
                              className="w-6 h-6 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-100"
                            >
                              <ApperIcon name="Plus" size={12} />
                            </button>
                          </div>
                        </div>
                      </div>
                      <button
                        onClick={() => handleRemoveItem(item.productId, item.title)}
                        className="text-gray-400 hover:text-error transition-colors"
                      >
                        <ApperIcon name="Trash2" size={16} />
                      </button>
                    </motion.div>
                  ))}
                </div>
              )}
            </div>

            {/* Footer */}
            {cartItems.length > 0 && (
              <div className="border-t p-6">
                <div className="space-y-2 mb-4">
                  <div className="flex justify-between text-sm">
                    <span>Subtotal</span>
                    <span>₹{subtotal.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Shipping</span>
                    <span>{shipping === 0 ? "Free" : `₹${shipping}`}</span>
                  </div>
                  <div className="flex justify-between font-semibold text-lg border-t pt-2">
                    <span>Total</span>
                    <span>₹{total.toLocaleString()}</span>
                  </div>
                </div>
                <Button onClick={handleCheckout} className="w-full">
                  Proceed to Checkout
                </Button>
                <p className="text-xs text-gray-500 text-center mt-2">
                  Free shipping on orders over ₹1000
                </p>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default CartDrawer;