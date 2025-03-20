import React from "react";
import ReactDOM from "react-dom/client";
import { lazy } from "react";

// import App from "./App.jsx";
import "./index.css";
const App = lazy(() => import("./App.jsx"));

ReactDOM.createRoot(document.getElementById("root")).render(<App />);
