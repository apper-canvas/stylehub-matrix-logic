import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";

// Layout Components
import Header from "@/components/organisms/Header";

// Page Components
import HomePage from "@/components/pages/HomePage";
import ProductsPage from "@/components/pages/ProductsPage";
import CategoryPage from "@/components/pages/CategoryPage";
import ProductDetailPage from "@/components/pages/ProductDetailPage";
import SearchPage from "@/components/pages/SearchPage";
import CartPage from "@/components/pages/CartPage";
import WishlistPage from "@/components/pages/WishlistPage";

// Cart Drawer Component
import CartDrawer from "@/components/organisms/CartDrawer";

// Custom Hooks
import { useCart } from "@/hooks/useCart";
import { useState } from "react";

function App() {
  const [isCartDrawerOpen, setIsCartDrawerOpen] = useState(false);
  const { cartItems, updateQuantity, removeFromCart, clearCart } = useCart();

  const handleCheckout = () => {
    // In a real app, this would navigate to checkout
    clearCart();
  };

  return (
    <BrowserRouter>
      <div className="min-h-screen bg-background">
        {/* Header */}
        <Header />

        {/* Main Content */}
        <main>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/products" element={<ProductsPage />} />
            <Route path="/category/:category" element={<CategoryPage />} />
            <Route path="/product/:id" element={<ProductDetailPage />} />
            <Route path="/search" element={<SearchPage />} />
            <Route path="/cart" element={<CartPage />} />
            <Route path="/wishlist" element={<WishlistPage />} />
            <Route path="/sale" element={<ProductsPage />} />
          </Routes>
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
    </BrowserRouter>
  );
}

export default App;