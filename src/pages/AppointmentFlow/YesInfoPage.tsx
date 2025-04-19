// src/pages/AppointmentFlow/YesInfoPage.tsx (Adjust import paths if needed)
import React from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import { Calendar, Trash2, CheckCircle, Menu, Info } from "lucide-react";

const YesInfoPage: React.FC = () => {
  const navigate = useNavigate(); // Get the navigate function

  const steps = [
    {
      title: "Open Calendar App",
      description:
        "Access your calendar application on your device (Google Calendar, Apple Calendar, Outlook)",
      icon: <Calendar className="text-blue-500" size={20} />,
    },
    {
      title: "Find Events",
      description: "Locate the calendar event you wish to delete",
      icon: <Menu className="text-blue-500" size={20} />,
    },
    {
      title: "Delete Event",
      description: "Tap on the event and select the delete or trash option",
      icon: <Trash2 className="text-blue-500" size={20} />,
    },
    {
      title: "Confirm Deletion",
      description: "Confirm the deletion when prompted",
      icon: <CheckCircle className="text-blue-500" size={20} />,
    },
  ];

  const handleContinue = () => {
    // Navigate to the next step in the flow
    navigate("/select-operation");
  };

  const handleBack = () => {
    // Navigate to the previous page in history
    navigate(-1);
  };

  return (
    <div className="flex flex-col items-center p-4 w-full max-w-md mx-auto bg-bg100">
      {/* Header */}
      <div className="p-5 rounded-t-lg shadow-md w-full border-b border-secondary bg-primary200">
        {/* ... header content ... */}
        <h2 className="text-lg font-semibold text-center text-text100 mb-1">
          How to Delete Calendar Events
        </h2>
        <p className="text-center text-secondary text-sm">
          Please delete previous calendar invites to avoid confusion
        </p>
      </div>

      {/* Steps list */}
      <div className="bg-primary100 p-5 rounded-b-lg shadow-md w-full mb-4">
        {/* ... steps list content ... */}
        <ul className="space-y-4">
          {steps.map((step, index) => (
            <li key={index} className="flex items-start gap-3">
              {/* ... step item ... */}
              <div className="bg-accent p-2 rounded-full mt-0.5">
                {step.icon}
              </div>
              <div>
                <h3 className="font-medium text-text100 mb-0.5">{`${
                  index + 1
                }. ${step.title}`}</h3>
                <p className="text-secondary text-sm">{step.description}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>

      {/* Info tip */}
      <div className="flex items-start gap-2 text-xs p-3 bg-accent100 rounded-lg w-full text-text100">
        {/* ... info tip content ... */}
        <Info size={16} className="flex-shrink-0 mt-0.5" />
        <p>
          Deleting calendar events helps avoid scheduling conflicts and ensures
          you have the most up-to-date information.
        </p>
      </div>

      {/* Navigation Buttons */}
      <div className="flex gap-4 w-full mt-4 justify-center">
        <button
          onClick={handleBack} // Add Back button handler
          className="px-4 py-2 bg-gray-300 text-gray-800 rounded-md hover:bg-gray-400 transition-colors" // Example secondary styling
        >
          Back
        </button>
        <button
          onClick={handleContinue} // Use the new handler
          className="px-4 py-2 bg-primary300 text-white rounded-md hover:bg-accent200 transition-colors"
        >
          Continue
        </button>
      </div>
    </div>
  );
};

export default YesInfoPage;
