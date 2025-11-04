import React from "react";
import { ToastContainer } from "react-toastify";
import { router } from "@/router";


// Custom Hooks
// Router is now imported and used in main.jsx

function App() {
  // App component is no longer the main component
  // Router configuration is handled in src/router/index.jsx
  // Layout and state management is handled in src/components/organisms/Layout.jsx

return (
    <div>
      {/* This component is kept for compatibility but main routing is now handled by RouterProvider */}
      {/* All functionality has been moved to Layout component */}
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
}

export default App;