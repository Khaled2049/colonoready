import React, { useState } from "react";
import AppointmentQuestion from "./AppointmentQuestion";
import YesFlow from "./YesFlow";
import Scheduler from "../components/scheduler";

type Step = "question" | "yes" | "scheduler";

const AppointmentFlow: React.FC = () => {
  const [step, setStep] = useState<Step>("question");

  const handleYes = () => setStep("yes");
  const handleNo = () => setStep("scheduler");
  const handleArrowClick = () => setStep("scheduler");

  return (
    <div className="flex flex-col items-center">
      {step === "question" && (
        <AppointmentQuestion onYes={handleYes} onNo={handleNo} />
      )}
      {step === "yes" && <YesFlow onArrowClick={handleArrowClick} />}
      {step === "scheduler" && <Scheduler />}
    </div>
  );
};

export default AppointmentFlow;
