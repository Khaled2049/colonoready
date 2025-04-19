import React from "react";
import { useNavigate } from "react-router-dom";
import Logo from "../../components/Logo"; // Adjust import path
import { useAppointment } from "../../contexts/AppointmentContext";

const AppointmentQuestionPage: React.FC = () => {
  const navigate = useNavigate();
  const { resetFlow } = useAppointment(); // Reset state when starting

  const handleYes = () => {
    resetFlow(); // Clear any previous state
    navigate("/info"); // Navigate to the 'Yes' info page route
  };

  const handleNo = () => {
    resetFlow(); // Clear any previous state
    navigate("/select-operation"); // Navigate to operation selection route
  };

  return (
    <div className="flex flex-col items-center p-4">
      <div className="mb-4">
        <Logo />
      </div>
      <h1 className="text-2xl font-semibold mb-6 text-center text-text100">
        Have you already scheduled an appointment with OpReady?
      </h1>
      <div className="flex flex-col sm:flex-row gap-4 w-full max-w-sm">
        <button
          onClick={handleYes}
          className="w-full bg-green-500 text-white px-4 py-2 rounded-lg shadow-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500 text-sm md:text-base"
        >
          {" "}
          {/* Use consistent button styling */}
          Yes
        </button>
        <button
          onClick={handleNo}
          className="w-full bg-red-400 text-white px-4 py-2 rounded-lg shadow-md hover:bg-red-500 focus:outline-none focus:ring-2 focus:ring-red-500 text-sm md:text-base"
        >
          {" "}
          {/* Use consistent button styling */}
          No
        </button>
      </div>
    </div>
  );
};

export default AppointmentQuestionPage;
