import { useNavigate } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import dayjs from "dayjs";
import { calculateDates, Dates, exportToICS } from "../../utils";
import { useReactToPrint } from "react-to-print";

import { useAppointment } from "../../contexts/AppointmentContext";

const TrilytePrepPage = () => {
  const { appointmentDate, appointmentTime, selectedOperation } =
    useAppointment();
  const navigate = useNavigate(); // Use navigate hook
  const [dates, setDates] = useState<Dates | null>(null);
  const componentRef = useRef<HTMLDivElement>(null);

  const handlePrint = useReactToPrint({
    documentTitle: "Trilyte_Schedule",
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

        .bg-bg100, .bg-bg300, .shadow-lg {
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
      // Optional: Redirect back to an earlier step if data is missing
      // navigate('/schedule', { replace: true });
      setDates(null); // Ensure dates are cleared if context data disappears
    }
    // Depend on context values
  }, [appointmentDate, appointmentTime]);

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
          {selectedOperation?.name || "Procedure"} - Trilyte Schedule{" "}
        </h1>

        {/* Control buttons at top */}
        <div className="flex flex-col sm:flex-row gap-2 mb-6">
          <button
            onClick={() => handlePrint()}
            className="flex-1 bg-green-500 text-white px-4 py-2 rounded-lg shadow-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500 text-sm md:text-base"
          >
            Download PDF
          </button>
          <button
            onClick={() => exportToICS(dates, "trilyte")}
            className="flex-1 bg-indigo-500 text-white px-4 py-2 rounded-lg shadow-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm md:text-base"
          >
            Export to Calendar
          </button>
        </div>

        {/* Back button */}
        <div className="flex flex-col sm:flex-row gap-2 mb-6">
          <button
            onClick={handleBack}
            className="w-full mb-6 bg-red-400 text-white px-4 py-2 rounded-lg shadow-md hover:bg-red-500 focus:outline-none focus:ring-2 focus:ring-red-500 text-sm md:text-base" // Consistent style
          >
            Back
          </button>
          {/* <button
            onClick={handleGoHome}
            className="w-full mb-6 bg-red-400 text-white px-4 py-2 rounded-lg shadow-md hover:bg-red-500 focus:outline-none focus:ring-2 focus:ring-red-500 text-sm md:text-base" // Consistent style
          >
            Go Home
          </button> */}
        </div>

        <div className="space-y-4 md:space-y-6">
          {dates?.twoWeeksPrior && (
            <div className="w-full p-4 md:p-6 bg-bg300 shadow-lg rounded-lg">
              <h2 className="text-xl md:text-2xl font-bold mb-4">
                <strong>2 Weeks Prior</strong> <br />
                <span className="text-sm md:text-base">
                  {dates.twoWeeksPrior}
                </span>
              </h2>
              <p className="text-sm md:text-base">
                Read all instructions at-least 2 weeks prior to your procedure.
                Failure to follow instructions may result in rescheduling of
                procedure.
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
                <li>STOP eating nuts, seeds, corn, or popcorn</li>
                <li>Ensure you have the following bowel prep items</li>
                <li>Trilyte and Reglan, prescription from pharmacy</li>
                <li>4 - Dulcolax laxative tablets, over-the-counter</li>
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
              <p className="text-sm md:text-base mb-3">
                Stop the following medications if you are on any (Obtain
                approval from prescribing provider prior to stopping)
              </p>
              <ul className="list-disc list-inside space-y-2 text-sm md:text-base">
                <li>Aspirin full dose or 325mg (81 mg okay to continue)</li>
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
              <p className="text-sm md:text-base mb-3">
                Stop the following medications if you are on any (Obtain
                approval from prescribing provider prior to stopping)
              </p>
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
                <div className="my-2 border-t border-gray-300"></div>
                <li>
                  <strong>12:00 noon</strong> - Take 4 Dulcolax tablets,
                  continue clear liquids
                </li>
                <li>
                  <strong>6:00 PM</strong> – Take Reglan to settle your stomach
                  <span className="block ml-4 text-xs md:text-sm text-gray-600 mt-1">
                    If you did not receive Reglan skip this step, some patients
                    have allergies or drug interactions
                  </span>
                </li>
                <li>
                  <strong>6:30 PM</strong> - Start 8oz Trilyte Solution every 10
                  minutes until half gone
                  <span className="block ml-4 text-xs md:text-sm text-gray-600 mt-1">
                    If you get sick, take a 10-15 minute break
                  </span>
                  <span className="block ml-4 text-xs md:text-sm text-gray-600">
                    Place remainder in fridge
                  </span>
                </li>
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
              </ul>

              {dates?.sixHoursPrior && (
                <div className="mt-4 p-4 bg-bg300/50 rounded-lg">
                  <h3 className="text-lg md:text-xl font-bold mb-3">
                    <strong>6 Hours Prior</strong> <br />
                    <span className="text-sm md:text-base">
                      {dates.sixHoursPrior}
                    </span>
                  </h3>
                  <ul className="list-disc list-inside space-y-2 text-sm md:text-base">
                    <li>8oz every 10 minutes until it is gone</li>
                    <li>
                      After finishing liquid prep, take 2 Gas-X/Simethicone
                      tablets by mouth
                    </li>
                    <li>
                      If you take blood pressure medication, make sure to take
                      it at least 6 hours prior to procedure with a sip of water
                    </li>
                    <li>
                      If you are diabetic - talk to the doctor who prescribes
                      your medication, you may need special instructions for day
                      of procedure
                    </li>
                  </ul>
                </div>
              )}

              {dates?.fourHoursPrior && (
                <div className="mt-4 p-4 text-center">
                  <h3 className="text-lg md:text-xl font-bold mb-3">
                    4 hours prior to procedure <br />
                    <span className="text-sm md:text-base">
                      {dates.fourHoursPrior}
                    </span>
                  </h3>
                  <span className="block text-base md:text-lg font-bold text-red-600">
                    DO NOT drink anything
                  </span>
                  <span className="block text-base md:text-lg font-bold text-red-600">
                    Nothing by mouth
                  </span>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Bottom buttons */}
        <div className="flex flex-col sm:flex-row gap-2 mt-6">
          <button
            onClick={() => handlePrint()}
            className="flex-1 bg-green-500 text-white px-4 py-2 rounded-lg shadow-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500 text-sm md:text-base"
          >
            Download PDF
          </button>
          <button
            onClick={() => exportToICS(dates, "trilyte")}
            className="flex-1 bg-indigo-500 text-white px-4 py-2 rounded-lg shadow-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm md:text-base"
          >
            Export to Calendar
          </button>
        </div>
      </div>
    </div>
  );
};

export default TrilytePrepPage;
