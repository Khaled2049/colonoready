import React from "react";
import Logo from "../components/Logo";

interface AppointmentQuestionProps {
  onYes: () => void;
  onNo: () => void;
}

const AppointmentQuestion: React.FC<AppointmentQuestionProps> = ({
  onYes,
  onNo,
}) => {
  return (
    <div className="flex flex-col items-center p-4">
      <div className="mb-4 b-bo">
        <Logo />
      </div>

      <h1 className="text-2xl font-semibold mb-6 text-center text-gray-800">
        Have you already scheduled an appointment with OpReady?
      </h1>
      <div className="flex flex-col sm:flex-row gap-4 w-full max-w-sm">
        <button
          onClick={onYes}
          className="w-full bg-green-500 text-white px-4 py-2 rounded-lg shadow-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500 text-sm md:text-base"
        >
          Yes
        </button>
        <button
          onClick={onNo}
          className="w-full bg-red-400 text-white px-4 py-2 rounded-lg shadow-md hover:bg-red-500 focus:outline-none focus:ring-2 focus:ring-red-500 text-sm md:text-base"
        >
          No
        </button>
      </div>
    </div>
  );
};

export default AppointmentQuestion;
