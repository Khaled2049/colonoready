import React from "react";
import { useNavigate } from "react-router-dom";
import { useAppointment } from "../../contexts/AppointmentContext";
import CalendarNotificationsGuide from "../../components/CalendarNotificationsGuide"; // Adjust path
import { procedureRoutes } from "../../types"; // Import the route map

const NotificationsGuidePage: React.FC = () => {
  const navigate = useNavigate();
  const { selectedOperation, prepOption, appointmentDate, appointmentTime } =
    useAppointment();

  // Redirect if essential data is missing
  React.useEffect(() => {
    if (!selectedOperation || !appointmentDate || !appointmentTime) {
      console.warn("Missing appointment data, redirecting.");
      // Redirect to an earlier step, e.g., the scheduler or operation selection
      navigate("/schedule", { replace: true });
    }
  }, [selectedOperation, appointmentDate, appointmentTime, navigate]);

  const handleNotificationsComplete = () => {
    if (!selectedOperation) return; // Should be handled by useEffect, but good practice

    const operationName = selectedOperation.name;
    const currentPrepOption = prepOption || operationName; // Use operation name if no specific prep option

    // Look up the route using the centralized map
    const route = procedureRoutes[operationName]?.[currentPrepOption];

    if (route) {
      navigate(route); // Navigate to the specific prep page
    } else {
      console.warn(
        `No prep route found for ${operationName} with option ${currentPrepOption}. Navigating to default.`
      );
      // Fallback navigation (e.g., a generic success/info page or default prep)
      // Pass data via context, not route state, for prep pages to consume
      navigate("/prep/default");
    }
  };

  if (!selectedOperation || !appointmentDate || !appointmentTime) {
    return null; // Or loading/redirect indicator
  }

  return (
    <div className="container mx-auto p-4">
      <CalendarNotificationsGuide onComplete={handleNotificationsComplete} />
    </div>
  );
};

export default NotificationsGuidePage;
