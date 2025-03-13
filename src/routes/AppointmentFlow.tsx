import React, { useState } from "react";
import AppointmentQuestion from "./AppointmentQuestion";
import YesFlow from "./YesFlow";
import Scheduler from "../components/scheduler";
import OperationSelection from "../components/OperationSelection";

// Define the available operations - easy to extend in the future
export interface Operation {
  id: string;
  name: string;
  description?: string;
}

// Initial list of operations - can be expanded easily
const AVAILABLE_OPERATIONS: Operation[] = [
  {
    id: "colonoscopy",
    name: "Colonoscopy",
    description: "Examination of the large intestine using a flexible camera",
  },
  // Add more operations here in the future
  // {
  //   id: "endoscopy",
  //   name: "Endoscopy",
  //   description: "Examination of the upper digestive tract"
  // },
];

type Step = "question" | "yes" | "operation-select" | "scheduler";

const AppointmentFlow: React.FC = () => {
  const [step, setStep] = useState<Step>("question");
  const [selectedOperation, setSelectedOperation] = useState<Operation | null>(
    null
  );

  const handleYes = () => setStep("yes");
  const handleBack = () => setStep("question");

  const handleNo = () => {
    // When user selects "No", go to operation selection instead of directly to scheduler
    setStep("operation-select");
  };

  const handleArrowClick = () => setStep("operation-select");

  const handleOperationSelect = (operation: Operation) => {
    setSelectedOperation(operation);
    setStep("scheduler");
  };

  return (
    <div className="flex flex-col items-center bg-bg100 text-text100">
      {step === "question" && (
        <AppointmentQuestion onYes={handleYes} onNo={handleNo} />
      )}

      {step === "yes" && <YesFlow onArrowClick={handleArrowClick} />}

      {step === "operation-select" && (
        <OperationSelection
          operations={AVAILABLE_OPERATIONS}
          onSelect={handleOperationSelect}
          onBack={handleBack}
        />
      )}

      {step === "scheduler" && (
        <Scheduler selectedOperation={selectedOperation} />
      )}
    </div>
  );
};

export default AppointmentFlow;
