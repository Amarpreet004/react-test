import React from "react";
import ReactDOM from "react-dom/client";
import QuizApp from "./App.jsx"; // Ensure the correct file name
import "bootstrap/dist/css/bootstrap.min.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <QuizApp />
  </React.StrictMode>
);
