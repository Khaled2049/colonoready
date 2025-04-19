import { useNavigate } from "react-router-dom";
import { useAppointment } from "../../contexts/AppointmentContext";

const DefaultPrepPage = () => {
  const navigate = useNavigate();
  const { selectedOperation, appointmentDate, appointmentTime } =
    useAppointment();

  // Format date and time for display
  const formattedDate = appointmentDate
    ? new Date(appointmentDate.toString()).toLocaleDateString("en-US", {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
      })
    : "Not scheduled";

  const formattedTime = appointmentTime
    ? appointmentTime.format("h:mm A")
    : "Not scheduled";

  const handleContactClick = () => {
    // You could implement a modal or navigate to a contact page
    alert("Please call our office at (555) 123-4567 for assistance.");
  };

  const handleBackToSchedule = () => {
    navigate("/select-operation", { replace: true });
  };

  return (
    <div className="max-w-3xl mx-auto p-4 sm:p-6 bg-bg100 shadow-md rounded-lg my-4">
      <div className="text-center mb-6 sm:mb-8">
        <h1 className="text-xl sm:text-2xl font-bold text-accent200 mb-2">
          General Procedure Information
        </h1>
        <p className="text-text200">
          We couldn't find specific preparation instructions for your procedure.
          Here's some general information to help you prepare.
        </p>
      </div>

      <div className="bg-primary100 p-4 rounded-lg mb-6">
        <h2 className="text-lg sm:text-xl font-semibold mb-2 text-text200">
          Your Appointment Details
        </h2>
        <p className="text-text100 mb-1">
          <span className="font-medium">Procedure:</span>{" "}
          {selectedOperation?.name || "Not selected"}
        </p>
        <p className="text-text100 mb-1">
          <span className="font-medium">Date:</span> {formattedDate}
        </p>
        <p className="text-text100 mb-1">
          <span className="font-medium">Time:</span> {formattedTime}
        </p>
      </div>

      <div className="mb-6">
        <h2 className="text-lg sm:text-xl font-semibold mb-3 text-text200">
          General Instructions
        </h2>

        <div className="bg-accent100 bg-opacity-10 p-4 rounded-lg mb-4 border-l-4 border-accent100">
          <p className="text-accent200 font-medium">Important Notice</p>
          <p className="text-text200">
            Your doctor may have specific preparation instructions for your
            procedure. These general guidelines do not replace personalized
            medical advice.
          </p>
        </div>

        <h3 className="font-medium text-lg mt-4 mb-2 text-text200">
          Before Your Procedure:
        </h3>
        <ul className="list-disc pl-6 space-y-2 text-text100">
          <li>You will need someone to drive you home after the procedure.</li>
          <li>Wear comfortable clothing and leave valuables at home.</li>
          <li>Follow any dietary restrictions provided by your doctor.</li>
          <li>Inform your doctor about all medications you are taking.</li>
          <li>Arrive 30 minutes before your scheduled appointment time.</li>
        </ul>

        <h3 className="font-medium text-lg mt-4 mb-2 text-text200">
          What to Bring:
        </h3>
        <ul className="list-disc pl-6 space-y-2 text-text100">
          <li>Your insurance card and photo ID</li>
          <li>A list of your current medications</li>
          <li>Any paperwork provided during your consultation</li>
          <li>The name and phone number of your designated driver</li>
        </ul>
      </div>

      <div className="flex flex-col sm:flex-row justify-center gap-4 mt-8">
        <button
          onClick={handleContactClick}
          className="bg-accent200 text-bg100 px-6 py-2 rounded-lg hover:bg-opacity-90 transition-colors w-full sm:w-auto"
        >
          Contact Us
        </button>
        <button
          onClick={handleBackToSchedule}
          className="bg-bg300 text-primary300 px-6 py-2 rounded-lg hover:bg-opacity-80 transition-colors w-full sm:w-auto"
        >
          Back to Scheduling
        </button>
      </div>

      <div className="mt-8 text-center text-sm text-text200">
        <p>
          If you have any questions or need specific preparation instructions,
        </p>
        <p>please call our office at (555) 123-4567.</p>
      </div>
    </div>
  );
};

export default DefaultPrepPage;
