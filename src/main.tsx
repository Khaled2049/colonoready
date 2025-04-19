import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import { router } from "./routes";
import { AppointmentProvider } from "./contexts/AppointmentContext";
import { registerSW } from "virtual:pwa-register";
import InstallPWA from "../src/components/InstallPwa";
import "./index.css";

const updateSW = registerSW({
  onNeedRefresh() {
    if (confirm("New content available. Reload to update?")) {
      updateSW(true);
    }
  },
  onOfflineReady() {
    console.log("App ready to work offline");
  },
});

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <AppointmentProvider>
      <RouterProvider router={router} />
    </AppointmentProvider>
    <InstallPWA />
  </React.StrictMode>
);
