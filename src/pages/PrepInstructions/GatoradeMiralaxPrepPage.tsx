import { useNavigate } from "react-router-dom";
import { useEffect, useRef, useState } from "react";

import { calculateDates, Dates, exportToICS } from "../../utils";
import { useReactToPrint } from "react-to-print";
import { useAppointment } from "../../contexts/AppointmentContext";
import dayjs from "dayjs";

const GatoradeMiralaxPrepPage: React.FC = () => {
  // Get data from context instead of location state
  const { appointmentDate, appointmentTime, selectedOperation } =
    useAppointment();
  const navigate = useNavigate(); // Use navigate hook
  const [dates, setDates] = useState<Dates | null>(null);
  const componentRef = useRef<HTMLDivElement>(null);

  const handlePrint = useReactToPrint({
    documentTitle: "Gatorade_Miralax_Schedule",
    contentRef: componentRef,
    pageStyle: `
    @page {
      size: letter portrait;
      margin: 0.75in;
    }
    
    @media print {
      body {
        font-family: 'Times New Roman', Times, serif;
        font-size: 12pt;
        line-height: 1.5;
        color: black;
      }

      h1, h2, h3 {
        color: black;
        font-family: Arial, sans-serif;
        margin-bottom: 0.5em;
      }

      button {
        display: none !important;
      }

      .bg-blue-100, .bg-bg300, .shadow-lg {
        background: white !important;
        box-shadow: none !important;
        border-radius: 0 !important;
      }

      .text-red-600 {
        color: black !important;
        font-weight: bold !important;
      }

      ul {
        margin-left: 1.5em !important;
        list-style-type: disc !important;
      }

      li {
        break-inside: avoid;
      }

      .text-gray-600 {
        color: black !important;
        font-style: italic;
      }

      hr {
        border-top: 1px solid black;
      }
    }
  `,
  });

  useEffect(() => {
    // Check if Dayjs objects exist in context
    if (
      appointmentDate &&
      dayjs.isDayjs(appointmentDate) &&
      appointmentTime &&
      dayjs.isDayjs(appointmentTime)
    ) {
      // Combine Dayjs date and time parts into a single Dayjs object, then convert to JS Date
      // This assumes appointmentDate and appointmentTime represent the correct local date/time
      const combinedDayjs = appointmentDate
        .hour(appointmentTime.hour())
        .minute(appointmentTime.minute())
        .second(appointmentTime.second());

      const combinedDateTime = combinedDayjs.toDate(); // Convert to standard JS Date

      setDates(calculateDates(combinedDateTime));
    } else {
      // Handle case where date/time aren't set (e.g., redirect or show error)
      console.warn(
        "Appointment date/time not found in context. Redirecting..."
      );
      // Redirect back to an earlier step if data is missing
      navigate("/schedule", { replace: true });
      setDates(null); // Ensure dates are cleared if context data disappears
    }
    // Depend on context values
  }, [appointmentDate, appointmentTime]);

  const handleExport = () => {
    if (dates) {
      // Pass operation name for better event naming
      exportToICS(dates, "gatorade-miralax");
    } else {
      alert("Date information is not available to export.");
    }
  };

  const handleBack = () => {
    navigate(-1); // Use navigate for back action
  };

  // const handleGoHome = () => {
  //   navigate("/"); // Navigate to the root/start page
  // };

  return (
    <div className="min-h-screen bg-bg100 flex items-center justify-center">
      <div
        ref={componentRef}
        className="w-full max-w-3xl mx-auto p-4 md:p-6 bg-bg100"
      >
        <h1 className="text-2xl md:text-3xl text-center font-bold mb-6 text-text100">
          {selectedOperation?.name || "Procedure"} - Gatorade/Miralax Schedule{" "}
        </h1>

        {/* Control buttons at top */}
        <div className="flex flex-col sm:flex-row gap-2 mb-6">
          <button
            onClick={() => handlePrint()}
            disabled={!dates} // Disable if dates aren't calculated yet
            className="flex-1 bg-green-500 text-white px-4 py-2 rounded-lg shadow-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500 text-sm md:text-base"
          >
            Download PDF
          </button>
          <button
            onClick={() => handleExport()}
            disabled={!dates} // Disable if dates aren't calculated yet
            className="flex-1 bg-indigo-500 text-white px-4 py-2 rounded-lg shadow-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm md:text-base"
          >
            Export to Calendar
          </button>
        </div>

        {/* Navigation Buttons */}
        <div className="flex flex-col sm:flex-row gap-2 mb-6">
          <button
            onClick={handleBack}
            className="w-full mb-6 bg-red-400 text-white px-4 py-2 rounded-lg shadow-md hover:bg-red-500 focus:outline-none focus:ring-2 focus:ring-red-500 text-sm md:text-base"
          >
            Back
          </button>
          {/* <button
            onClick={handleGoHome}
            className="btn btn-primary flex-1" // Consistent style
          >
            Go Home
          </button> */}
        </div>

        <div className="space-y-4 md:space-y-6">
          {dates?.twoWeeksPrior && (
            <div className="w-full p-4 md:p-6 bg-bg300 shadow-lg rounded-lg">
              <h2 className="text-xl md:text-2xl font-bold">
                <strong>2 Weeks Prior</strong> <br />
                <span className="text-sm md:text-base">
                  {dates.twoWeeksPrior}
                </span>
              </h2>
              <p className="mt-3 text-sm md:text-base">
                Read all instructions at-least 2 weeks prior to your procedure.
                Failure to follow instructions may result in rescheduling of
                procedure. Stool must be clear to yellow at time of procedure
              </p>
            </div>
          )}

          {dates?.sevenDaysPrior && (
            <div className="w-full p-4 md:p-6 bg-bg300 shadow-lg rounded-lg">
              <h2 className="text-xl md:text-2xl font-bold mb-4">
                <strong>7 Days Prior</strong> <br />
                <span className="text-sm md:text-base">
                  {dates.sevenDaysPrior}
                </span>
              </h2>
              <ul className="list-disc list-inside space-y-2 text-sm md:text-base">
                <li>Purchase bowel prep items</li>
                <li>STOP eating nuts, seeds, corn, or popcorn</li>
                <li>64 ounces of Gatorade</li>
                <li>no red or purple</li>
                <li>Patients with diabetes should use Gatorade G2</li>
                <li>1 - 8 ounce bottle of Miralax</li>
                <li>4 - Dulcolax laxative 5mg tablets</li>
                <li>
                  2 - Gas-X/Simethicone (gas relief) Extra strength chewable
                  tablets
                </li>
              </ul>
            </div>
          )}

          {dates?.fiveDaysPrior && (
            <div className="w-full p-4 md:p-6 bg-bg300 shadow-lg rounded-lg">
              <h2 className="text-xl md:text-2xl font-bold mb-4">
                <strong>5 Days Prior</strong> <br />
                <span className="text-sm md:text-base">
                  {dates.fiveDaysPrior}
                </span>
              </h2>
              <p className="mb-3 text-sm md:text-base">
                Please get approval from prescribing provider to stop below
                medications; if unable to stop, please call{" "}
                <strong>417-875-3760</strong>
              </p>
              <ul className="list-disc list-inside space-y-2 text-sm md:text-base">
                <li>Aspirin (81 mg okay to continue)</li>
                <li>Vitamin E, iron, fish oil, other herbals</li>
                <li>Aggrenox (aspirin and Dipyridamole)</li>
                <li>Brilinta (Ticagrelor)</li>
                <li>Coumadin (Warfarin)</li>
                <li>Effient (Prasugrel)</li>
                <li>Plavix (Clopidogrel)</li>
              </ul>
            </div>
          )}

          {dates?.threeDaysPrior && (
            <div className="w-full p-4 md:p-6 bg-bg300 shadow-lg rounded-lg">
              <h2 className="text-xl md:text-2xl font-bold mb-4">
                <strong>3 Days Prior</strong> <br />
                <span className="text-sm md:text-base">
                  {dates.threeDaysPrior}
                </span>
              </h2>
              <ul className="list-disc list-inside space-y-2 text-sm md:text-base">
                <li>
                  Start a low fiber diet (no fruits, vegetables, grains, cereal
                  or oatmeal)
                </li>
                <li>Stop any fiber supplement or iron</li>
              </ul>
            </div>
          )}

          {dates?.fortyEightHoursPrior && (
            <div className="w-full p-4 md:p-6 bg-bg300 shadow-lg rounded-lg">
              <h2 className="text-xl md:text-2xl font-bold mb-4">
                <strong>48 Hours Prior</strong> <br />
                <span className="text-sm md:text-base">
                  {dates.fortyEightHoursPrior}
                </span>
              </h2>
              <ul className="list-disc list-inside space-y-2 text-sm md:text-base">
                <li>Eliquis (Apixaban)</li>
                <li>Pradaxa (Dabigatran)</li>
                <li>Xarelto (Rivaroxban)</li>
              </ul>
            </div>
          )}

          {dates?.oneDayPrior && (
            <div className="w-full p-4 md:p-6 bg-bg300 shadow-lg rounded-lg">
              <h2 className="text-xl md:text-2xl font-bold mb-4">
                <strong>Day Before Procedure</strong> <br />
                <span className="text-sm md:text-base">
                  {dates.oneDayPrior}
                </span>
              </h2>
              <ul className="list-disc list-inside space-y-2 text-sm md:text-base">
                <li>All day - Clear liquid diet</li>
                <li>DO NOT eat any solid foods</li>
                <li>
                  Drink an extra 8 ounces of clear liquids every hour that you
                  are awake
                </li>
                <li>
                  <strong>04:00 pm</strong> - Take 4 Dulcolax tablets, continue
                  clear liquids
                </li>
                <li>
                  <strong>6:00 PM</strong> Start drinking Gatorade/Miralax
                  solution
                  <br />
                  <span className="text-xs md:text-sm text-gray-600 ml-4 block mt-1">
                    Drink 8 ounces every 15 minutes (over 1-2 hours) until half
                    of the mixture is gone
                  </span>
                </li>
                <li>Continue clear liquid diet until bed</li>
              </ul>
            </div>
          )}

          {dates?.dayOfProcedure && (
            <div className="w-full p-4 md:p-6 bg-bg300 shadow-lg rounded-lg">
              <h2 className="text-xl md:text-2xl font-bold mb-4">
                Day of Procedure <br />
                <span className="text-sm md:text-base">
                  {dates.dayOfProcedure}
                </span>
              </h2>
              <ul className="list-disc list-inside space-y-2 text-sm md:text-base">
                <li>Continue clear liquid diet</li>
                <li>
                  <strong>6 hours before your procedure</strong> Drink the
                  second half of solution 8 ounces every 15 minutes (over 1-2
                  hours) until mixture is gone
                  <span className="text-xs md:text-sm text-gray-600 ml-4 block mt-1">
                    After finishing liquid prep, take 2 Gas-X/Simethicone
                    tablets by mouth
                  </span>
                </li>
              </ul>
            </div>
          )}

          {dates?.fourHoursPrior && (
            <div className="w-full p-4 md:p-6 bg-bg300 text-center rounded-lg">
              <h2 className="text-xl md:text-2xl font-bold mb-4">
                4 hours prior to procedure <br />
                <span className="text-sm md:text-base">
                  {dates.fourHoursPrior}
                </span>
              </h2>
              <span className="block text-sm md:text-base text-red-600 font-bold">
                DO NOT drink anything
              </span>
              <span className="block text-sm md:text-base text-red-600 font-bold">
                Nothing by mouth
              </span>
            </div>
          )}
        </div>

        {/* Control buttons at bottom */}
        <div className="flex flex-col sm:flex-row gap-2 mt-6">
          <button
            onClick={() => handlePrint()}
            className="flex-1 bg-green-500 text-white px-4 py-2 rounded-lg shadow-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500 text-sm md:text-base"
          >
            Download PDF
          </button>
          <button
            onClick={() => exportToICS(dates, "gatorade-miralax")}
            className="flex-1 bg-indigo-500 text-white px-4 py-2 rounded-lg shadow-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm md:text-base"
          >
            Export to Calendar
          </button>
        </div>
      </div>
    </div>
  );
};

export default GatoradeMiralaxPrepPage;
