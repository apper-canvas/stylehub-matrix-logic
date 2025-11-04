import { useState, useEffect } from "react";

export const useWishlist = () => {
  const [wishlistItems, setWishlistItems] = useState([]);

  // Load wishlist from localStorage on mount
  useEffect(() => {
    const savedWishlist = localStorage.getItem("stylehub_wishlist");
    if (savedWishlist) {
      try {
        setWishlistItems(JSON.parse(savedWishlist));
      } catch (error) {
        console.error("Error loading wishlist from localStorage:", error);
      }
    }
  }, []);

  // Save wishlist to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem("stylehub_wishlist", JSON.stringify(wishlistItems));
  }, [wishlistItems]);

  const addToWishlist = (item) => {
    setWishlistItems(prevItems => {
      // Check if item already exists
      const exists = prevItems.some(wishlistItem => 
        wishlistItem.productId === item.productId
      );
      
      if (!exists) {
        return [...prevItems, item];
      }
      
      return prevItems;
    });
  };

  const removeFromWishlist = (productId) => {
    setWishlistItems(prevItems => 
      prevItems.filter(item => item.productId !== productId)
    );
  };

  const toggleWishlist = (item) => {
    const exists = wishlistItems.some(wishlistItem => 
      wishlistItem.productId === item.productId
    );
    
    if (exists) {
      removeFromWishlist(item.productId);
    } else {
      addToWishlist(item);
    }
  };

  const isInWishlist = (productId) => {
    return wishlistItems.some(item => item.productId === productId);
  };

  const clearWishlist = () => {
    setWishlistItems([]);
  };

  const wishlistCount = wishlistItems.length;

  return {
    wishlistItems,
    addToWishlist,
    removeFromWishlist,
    toggleWishlist,
    isInWishlist,
    clearWishlist,
    wishlistCount
  };
};