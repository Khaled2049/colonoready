import React from "react";
import { CheckCircle } from "lucide-react";
import { Operation } from "../routes/AppointmentFlow";

interface OperationSelectionProps {
  operations: Operation[];
  onSelect: (operation: Operation) => void;
  onBack: () => void;
}

const OperationSelection: React.FC<OperationSelectionProps> = ({
  operations,
  onSelect,
  onBack,
}) => {
  return (
    <div className="flex flex-col items-center p-4 w-full max-w-md mx-auto">
      <div className="bg-white p-5 rounded-lg shadow-md w-full mb-4">
        <h2 className="text-lg font-semibold text-center text-gray-800 mb-3">
          Select Procedure Type
        </h2>
        <p className="text-center text-gray-600 text-sm mb-5">
          Please select the type of procedure you would like to schedule
        </p>

        <div className="space-y-3">
          {operations.map((operation) => (
            <button
              key={operation.id}
              onClick={() => onSelect(operation)}
              className="w-full flex items-center p-4 border border-gray-200 rounded-lg hover:bg-blue-50 transition-colors"
            >
              <div className="flex-1 text-left">
                <h3 className="font-medium text-gray-800">{operation.name}</h3>
                {operation.description && (
                  <p className="text-sm text-gray-600 mt-1">
                    {operation.description}
                  </p>
                )}
              </div>
              <CheckCircle size={20} className="text-blue-500" />
            </button>
          ))}
        </div>
        <button
          onClick={onBack}
          className="w-full mt-4 mb-6 bg-red-400 text-white px-4 py-2 rounded-lg shadow-md hover:bg-red-500 focus:outline-none focus:ring-2 focus:ring-red-500 text-sm md:text-base"
        >
          Back
        </button>
      </div>
    </div>
  );
};

export default OperationSelection;
