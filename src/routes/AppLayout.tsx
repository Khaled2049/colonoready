import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";

const AppLayout: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col bg-bg100 text-text100">
      <Navbar />

      <main className="flex-grow flex items-center justify-center">
        <Outlet />
      </main>
    </div>
  );
};

export default AppLayout;
