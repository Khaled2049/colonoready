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

const AVAILABLE_OPERATIONS: Operation[] = [
  {
    id: "colonoscopy",
    name: "Colonoscopy",
    description: "Examination of the large intestine using a flexible camera",
  },
  {
    id: "egd",
    name: "EGD",
    description:
      "Upper endoscopy examination of the esophagus, stomach, and duodenum",
  },
  {
    id: "flexible-sigmoidoscopy",
    name: "Flexible Sigmoidoscopy",
    description:
      "Examination of the lower part of the large intestine using a flexible camera.",
  },
  {
    id: "ileoscopy",
    name: "Ileoscopy",
    description: "Examination of the ileum.",
  },
  {
    id: "pouchscopy",
    name: "Pouchscopy",
    description:
      "Examination of an ileal pouch-anal anastomosis (J-pouch) created after the surgical removal of the colon.",
  },
  {
    id: "ercp",
    name: "ERCP",
    description:
      "A procedure that combines upper gastrointestinal endoscopy and X-rays to diagnose and treat problems of the bile and pancreatic ducts.",
  },
  {
    id: "endoscopic-ultrasound",
    name: "Endoscopic Ultrasound",
    description:
      "A procedure that combines endoscopy with ultrasound to visualize the layers of the gastrointestinal tract and nearby organs.",
  },
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
