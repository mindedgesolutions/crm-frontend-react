import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { ThemeProvider } from "@/components/theme-provider";
import { Toaster } from "react-hot-toast";
import { Provider } from "react-redux";
import store from "@/store";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider store={store}>
      <ThemeProvider defaultTheme="system" storageKey="crm-ui-theme">
        <Toaster position="top-right" reverseOrder={false} />
        <App />
      </ThemeProvider>
    </Provider>
  </StrictMode>
);
