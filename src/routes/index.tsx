// src/routes/index.tsx
import { createBrowserRouter, Outlet, RouteObject } from "react-router-dom";
import RootLayout from "../layouts/RootLayout";
import ErrorPage from "../pages/ErrorPage";

// Import Page Components
import AppointmentQuestionPage from "../pages/AppointmentFlow/AppointmentQuestionPage";
import YesInfoPage from "../pages/AppointmentFlow/YesInfoPage";
import OperationSelectionPage from "../pages/AppointmentFlow/OperationSelectionPage";
import SchedulerPage from "../pages/AppointmentFlow/SchedulerPage";
import NotificationsGuidePage from "../pages/AppointmentFlow/NotificationsGuidePage";
// import AppointmentFlowLayout from "../pages/AppointmentFlow/AppointmentFlowLayout"; // Optional layout

// Import Prep Instruction Pages
import TrilytePrepPage from "../pages/PrepInstructions/TrilytePrepPage";
import GatoradeMiralaxPrepPage from "../pages/PrepInstructions/GatoradeMiralaxPrepPage";
import EgdPrepPage from "../pages/PrepInstructions/EgdPrepPage";
import DefaultPrepPage from "../pages/PrepInstructions/DefaultPrepPage";

const routes: RouteObject[] = [
  {
    path: "/",
    element: <RootLayout />,
    errorElement: <ErrorPage />,
    children: [
      {
        // Optional: Wrap flow in its own layout or use RootLayout directly
        element: <Outlet />, // Or just <Outlet /> if no specific layout needed
        children: [
          {
            index: true, // Initial step: "/" maps to AppointmentQuestionPage
            element: <AppointmentQuestionPage />,
          },
          {
            path: "start", // Alternative starting point or alias for clarity
            element: <AppointmentQuestionPage />,
          },
          {
            path: "info", // Step after answering "Yes"
            element: <YesInfoPage />,
          },
          {
            path: "select-operation",
            element: <OperationSelectionPage />,
          },
          {
            path: "schedule", // The scheduling form step
            element: <SchedulerPage />,
          },
          {
            path: "notifications-guide", // The calendar guide step
            element: <NotificationsGuidePage />,
          },
        ],
      },

      {
        path: "/prep/trilyte",
        element: <TrilytePrepPage />,
      },
      {
        path: "/prep/gatorade-miralax",
        element: <GatoradeMiralaxPrepPage />,
      },
      {
        path: "/prep/egd",
        element: <EgdPrepPage />,
      },
      {
        path: "/prep/default", // Fallback if needed
        element: <DefaultPrepPage />,
      },
      // Add other top-level routes if needed
    ],
  },
  // Add other non-layout routes if necessary
];

export const router = createBrowserRouter(routes);
