import React from "react";
import { ArrowRight } from "lucide-react";

interface YesFlowProps {
  onArrowClick: () => void;
}

const YesFlow: React.FC<YesFlowProps> = ({ onArrowClick }) => {
  return (
    <div className="flex flex-col items-center p-4">
      <div className="bg-white p-6 rounded-lg shadow-md mb-6 w-full max-w-xs">
        <p className="text-center text-gray-700 text-base">
          Please delete previous calendar invites to avoid confusion before
          proceeding.
        </p>
      </div>
      <button onClick={onArrowClick} className="mb-6">
        <ArrowRight size={32} className="animate-bounce-right text-blue-500" />
      </button>
    </div>
  );
};

export default YesFlow;
