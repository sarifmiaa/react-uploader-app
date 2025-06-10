import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { AppProvider } from "@shopify/polaris";
import "@shopify/polaris/build/esm/styles.css";
import "./index.css";
import App from "./App.tsx";

// ToDo: Replace with your i18n configuration later
const i18n = {};

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <AppProvider i18n={i18n}>
      <App />
    </AppProvider>
  </StrictMode>
);
