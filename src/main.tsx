import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import {
  createBrowserRouter,
  RouterProvider,
  RouteObject,
} from "react-router-dom";
import { ClerkProvider } from "@clerk/clerk-react";

import ErrorPage from "./error-page.tsx";

import GatoradeMiralax from "./routes/gatorade-miralax";
import Trilyte from "./routes/trilyte";
import EGDPrep from "./routes/egd-prep.tsx";
import ProtectedLayout from "./routes/ProtectedLayout.tsx";
import SignInPage from "./routes/SignInPage.tsx";
import SignUpPage from "./routes/SignUpPage.tsx";
import LandingPage from "./routes/LandingPage.tsx";
import OperationSelection from "./components/OperationSelection.tsx";
import SchedulerPage from "./routes/SchedulerPage.tsx";
import AppLayout from "./routes/AppLayout.tsx";
import AppointmentsDashboard from "./routes/AppointmentsDashboard.tsx";

const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;

if (!PUBLISHABLE_KEY) {
  throw new Error("Missing Publishable Key from .env.local");
}

const routes: RouteObject[] = [
  {
    path: "/",
    element: <AppLayout />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <LandingPage />,
      },
      {
        path: "sign-in/*",
        element: <SignInPage />,
      },
      {
        path: "sign-up/*",
        element: <SignUpPage />,
      },
      {
        path: "appointments",
        element: <ProtectedLayout />,
        children: [
          {
            index: true,
            element: <AppointmentsDashboard />,
          },
          {
            path: "operations",
            element: <OperationSelection />,
          },
          {
            path: "operations/:operationId",
            element: <SchedulerPage />,
          },
          {
            path: "trilyte",
            element: <Trilyte />,
          },
          {
            path: "egd-prep",
            element: <EGDPrep />,
          },
          {
            path: "gatorade-miralax",
            element: <GatoradeMiralax />,
          },
        ],
      },
    ],
  },
];

const router = createBrowserRouter(routes);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ClerkProvider publishableKey={PUBLISHABLE_KEY}>
      <RouterProvider router={router} />
    </ClerkProvider>
  </React.StrictMode>
);
