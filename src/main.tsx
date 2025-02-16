import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import {
  createBrowserRouter,
  RouterProvider,
  RouteObject,
} from "react-router-dom";
import ErrorPage from "./error-page.tsx";
import RootLayout from "./routes/RootLayout.tsx";
import AppointmentFlow from "./routes/AppointmentFlow";
import GatoradeMiralax from "./routes/gatorade-miralax";
import Trilyte from "./routes/trilyte";

const routes: RouteObject[] = [
  {
    path: "/",
    element: <RootLayout />,
    errorElement: <ErrorPage />,
    children: [{ index: true, element: <AppointmentFlow /> }],
  },
  {
    path: "/trilyte",
    element: <Trilyte />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/gatorade-miralax",
    element: <GatoradeMiralax />,
    errorElement: <ErrorPage />,
  },
];

const router = createBrowserRouter(routes);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
