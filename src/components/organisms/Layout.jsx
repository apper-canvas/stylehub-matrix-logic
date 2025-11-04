import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { useCart } from "@/hooks/useCart";
import { useAuth } from "@/layouts/Root";
import Header from "@/components/organisms/Header";
import CartDrawer from "@/components/organisms/CartDrawer";
const Layout = () => {
  const [isCartDrawerOpen, setIsCartDrawerOpen] = useState(false);
  const { cartItems, updateQuantity, removeFromCart, clearCart } = useCart();
  const { logout } = useAuth();

  const handleCheckout = () => {
    // In a real app, this would navigate to checkout
    clearCart();
  };

  // Outlet context to pass state to child routes
  const outletContext = {
    isCartDrawerOpen,
    setIsCartDrawerOpen,
    cartItems,
    updateQuantity,
    removeFromCart,
    clearCart,
    handleCheckout
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <Header logout={logout} />

      {/* Main Content */}
      <main>
        <Outlet context={outletContext} />
      </main>

      {/* Cart Drawer */}
      <CartDrawer
        isOpen={isCartDrawerOpen}
        onClose={() => setIsCartDrawerOpen(false)}
        cartItems={cartItems}
        onUpdateQuantity={updateQuantity}
        onRemoveItem={removeFromCart}
        onCheckout={handleCheckout}
      />

      {/* Toast Notifications */}
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </div>
  );
};

export default Layout;