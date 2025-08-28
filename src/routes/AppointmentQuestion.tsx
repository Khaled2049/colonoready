import React from "react";
import { useNavigate } from "react-router-dom";
import Logo from "../components/Logo";

const AppointmentQuestion: React.FC = () => {
  const navigate = useNavigate();

  const handleYes = () => navigate("/sign-in");
  const handleNo = () => navigate("/sign-up");

  return (
    <div className="grid place-items-center">
      <div className="flex flex-col items-center">
        <Logo />
        <h1 className="text-2xl font-semibold mb-6 text-center text-text100">
          Have you already scheduled an appointment with OpReady?
        </h1>
        <div className="flex flex-col sm:flex-row gap-4 w-full max-w-sm">
          <button
            onClick={handleYes}
            className="w-full bg-green-500 text-white px-4 py-2 rounded-lg shadow-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500 text-sm md:text-base"
          >
            Yes
          </button>
          <button
            onClick={handleNo}
            className="w-full bg-red-400 text-white px-4 py-2 rounded-lg shadow-md hover:bg-red-500 focus:outline-none focus:ring-2 focus:ring-red-500 text-sm md:text-base"
          >
            No
          </button>
        </div>
      </div>
    </div>
  );
};

export default AppointmentQuestion;
