import "./index.css"
import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import App from "@/App";
import { router } from "@/router";

ReactDOM.createRoot(document.getElementById("root")).render(<RouterProvider router={router} />)