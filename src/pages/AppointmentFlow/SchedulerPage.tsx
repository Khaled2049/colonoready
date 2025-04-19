import React from "react";
import { useNavigate } from "react-router-dom";
import { useAppointment } from "../../contexts/AppointmentContext";
import { Dayjs } from "dayjs";
import Scheduler from "../../components/scheduler";

const SchedulerPage: React.FC = () => {
  const navigate = useNavigate();
  const { selectedOperation, setDateTime, setPrepOption } = useAppointment();

  React.useEffect(() => {
    if (!selectedOperation) {
      console.warn("No operation selected, redirecting to selection.");
      navigate("/select-operation", { replace: true });
    }
  }, [selectedOperation, navigate]);

  const handleScheduleSubmit = (data: {
    date: Dayjs | null;
    time: Dayjs | null;
    option?: string;
  }) => {
    if (data.date && data.time) {
      setDateTime(data.date, data.time);
      // Set the prep option based on form data ONLY IF applicable (e.g., Colonoscopy)
      if (selectedOperation?.name === "Colonoscopy" && data.option) {
        setPrepOption(data.option);
      } else if (selectedOperation?.name === "EGD") {
        // Set default or only option for EGD if needed
        setPrepOption("EGD Prep");
      } else {
        setPrepOption(null); // Clear option if not applicable
      }
      navigate("/notifications-guide"); // Navigate to the next step
    } else {
      alert("Please select both date and time.");
    }
  };

  const handleBack = () => {
    navigate(-1);
  };

  if (!selectedOperation) {
    return null;
  }

  return (
    <div className="container mx-auto p-4">
      <Scheduler
        selectedOperation={selectedOperation}
        onSubmit={handleScheduleSubmit}
      />
      <button
        onClick={handleBack}
        className="w-full mt-4 mb-6 bg-primary300 text-white px-4 py-2 rounded-lg shadow-md hover:bg-accent200 focus:outline-none focus:ring-2 focus:ring-primary text-sm md:text-base"
      >
        Back
      </button>
    </div>
  );
};

export default SchedulerPage;
