import React from "react";
import { Outlet } from "react-router-dom";

const RootLayout: React.FC = () => {
  return (
    <div className="min-h-screen bg-bg100 flex flex-col items-center justify-center">
      <Outlet />
    </div>
  );
};

export default RootLayout;
