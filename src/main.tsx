import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import "aos/dist/aos.css";
import { AppProvider } from "./contexts/app/app-context.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <AppProvider>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </AppProvider>
);
