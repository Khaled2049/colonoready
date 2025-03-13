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
    <div className="flex flex-col items-center p-4 bg-bg100 w-full max-w-md mx-auto">
      <div className="bg-bg200 p-5 rounded-lg shadow-md w-full mb-4 border border-primary300">
        <h2 className="text-lg font-semibold text-center text-text100 mb-3">
          Select Procedure Type
        </h2>
        <p className="text-center text-secondary text-sm mb-5">
          Please select the type of procedure you would like to schedule
        </p>

        <div className="space-y-3 bg-bg200">
          {operations.map((operation) => (
            <button
              key={operation.id}
              onClick={() => onSelect(operation)}
              className="w-full flex items-center p-4 border border-accent200 hover:bg-accent200/30 transition-colors"
            >
              <div className="flex-1 text-left ">
                <h3 className="font-medium text-text100 ">{operation.name}</h3>
                {operation.description && (
                  <p className="text-sm text-secondary mt-1 ">
                    {operation.description}
                  </p>
                )}
              </div>
              <CheckCircle size={20} className="text-text100" />
            </button>
          ))}
        </div>
        <button
          onClick={onBack}
          className="w-full mt-4 mb-6 bg-primary300 text-white px-4 py-2 rounded-lg shadow-md hover:bg-accent200 focus:outline-none focus:ring-2 focus:ring-primary text-sm md:text-base"
        >
          Back
        </button>
      </div>
    </div>
  );
};

export default OperationSelection;
