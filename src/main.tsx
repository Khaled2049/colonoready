import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import { router } from "./routes"; // Import the router configuration
import { AppointmentProvider } from "./contexts/AppointmentContext";
import "./index.css";

// Import MUI Localization (if not already wrapping higher up)
// You might wrap this around RouterProvider or within RootLayout depending on needs
// import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
// import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    {/* <LocalizationProvider dateAdapter={AdapterDayjs}> */}
    <AppointmentProvider>
      {" "}
      {/* Provide context to the entire app */}
      <RouterProvider router={router} />
    </AppointmentProvider>
    {/* </LocalizationProvider> */}
  </React.StrictMode>
);
