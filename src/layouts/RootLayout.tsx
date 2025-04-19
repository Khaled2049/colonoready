import React from "react";
import { Outlet } from "react-router-dom";
// import Header from '../components/Header'; // Example header
// import Footer from '../components/Footer'; // Example footer

const RootLayout: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col">
      {/* <Header /> */}
      <main className="flex-grow container mx-auto p-4">
        {/* Outlet renders the matched child route component */}
        <Outlet />
      </main>
      {/* <Footer /> */}
    </div>
  );
};

export default RootLayout;
