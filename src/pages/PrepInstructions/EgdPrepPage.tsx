import { useNavigate } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import { calculateDates, Dates, exportToICS } from "../../utils";
import { useReactToPrint } from "react-to-print";
import dayjs from "dayjs";
import { useAppointment } from "../../contexts/AppointmentContext";

const EGDPrepPage = () => {
  // Get data from context instead of location state
  const { appointmentDate, appointmentTime, selectedOperation } =
    useAppointment();
  const navigate = useNavigate(); // Use navigate hook
  const [dates, setDates] = useState<Dates | null>(null);
  const componentRef = useRef<HTMLDivElement>(null);

  const handlePrint = useReactToPrint({
    documentTitle: "EGD_Prep_Schedule",
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
      // Redirect back to an earlier step if data is missing
      navigate("/schedule", { replace: true });
      setDates(null); // Ensure dates are cleared if context data disappears
    }
    // Depend on context values
  }, [appointmentDate, appointmentTime]);

  const handleBack = () => {
    navigate(-1); // Use navigate for back action
  };

  return (
    <div className="min-h-screen bg-bg100 flex items-center justify-center">
      <div
        ref={componentRef}
        className="w-full max-w-3xl mx-auto p-4 md:p-6 bg-bg100"
      >
        <h1 className="text-2xl md:text-3xl text-center font-bold mb-6 text-text100">
          {selectedOperation?.name || "Procedure"} - EGD Schedule{" "}
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
            onClick={() => exportToICS(dates, "egd")}
            className="flex-1 bg-indigo-500 text-white px-4 py-2 rounded-lg shadow-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm md:text-base"
          >
            Export to Calendar
          </button>
        </div>

        {/* Back button */}
        <button
          onClick={handleBack}
          className="w-full mb-6 bg-red-400 text-white px-4 py-2 rounded-lg shadow-md hover:bg-red-500 focus:outline-none focus:ring-2 focus:ring-red-500 text-sm md:text-base"
        >
          Back
        </button>

        <div className="space-y-4 md:space-y-6">
          {dates?.twoWeeksPrior && (
            <div className="w-full p-4 md:p-6 bg-bg300 shadow-lg rounded-lg">
              <h2 className="text-xl md:text-2xl font-bold mb-4">
                <strong>2 Weeks Prior</strong> <br />
                <span className="text-sm md:text-base">
                  {dates.twoWeeksPrior}
                </span>
              </h2>
              <p className="text-sm md:text-base font-bold">
                Read all instructions at least 2 weeks prior to your procedure.
              </p>
              <p className="text-sm md:text-base text-red-600 mt-2">
                If you do not follow the instructions you may have your
                procedure rescheduled.
              </p>
              <p className="text-sm md:text-base text-red-600 mt-2">
                Stool must be clear to yellow at the time of the procedure.
              </p>

              <div className="mt-6">
                <h3 className="text-lg font-bold mb-2">For Your Safety</h3>
                <p className="text-sm md:text-base font-bold mb-2">
                  You <span className="font-extrabold">MUST</span> have a
                  driver.
                </p>
                <ul className="list-disc list-inside space-y-2 text-sm md:text-base ml-4">
                  <li>
                    This person <span className="font-bold">has</span> to:
                    <ul className="list-disc list-inside ml-6 mt-1">
                      <li>Drive you home.</li>
                      <li>Stay at clinic during procedure.</li>
                      <li>Be immediately available by phone.</li>
                      <li>
                        Remain with you after your procedure for{" "}
                        <span className="font-bold">24 hours.</span>
                      </li>
                    </ul>
                  </li>
                  <li>
                    <span className="font-bold">Public transportation</span> is
                    allowed <span className="font-bold">ONLY</span> if you have
                    someone you know with you.
                  </li>
                </ul>
              </div>

              <div className="mt-4">
                <p className="text-sm md:text-base font-bold">
                  Remove prior to procedure:
                </p>
                <ul className="list-disc list-inside space-y-1 text-sm md:text-base ml-4">
                  <li>All piercings and jewelry</li>
                  <li>Dentures</li>
                </ul>
              </div>

              <div className="mt-4">
                <p className="text-sm md:text-base">
                  Call <span className="font-bold">417-875-3760</span> if{" "}
                  <span className="font-bold">positive</span> for{" "}
                  <span className="font-bold">COVID</span> within{" "}
                  <span className="font-bold">10 days</span> of procedure.
                </p>
              </div>

              <div className="mt-4">
                <h3 className="text-lg font-bold mb-2">
                  Cardiac Defibrillator, Pacemaker or Cardiac Stent
                </h3>
                <ul className="list-disc list-inside space-y-1 text-sm md:text-base ml-4">
                  <li>
                    If you have had one placed after you have scheduled this
                    procedure, call 417-875-3760 option 1, option 2.
                  </li>
                  <li>
                    <span className="font-bold">MUST</span> have a
                    pacemaker/defibrillator check is required within 90 days of
                    procedure
                  </li>
                </ul>
              </div>

              <div className="mt-4">
                <p className="text-sm md:text-base">
                  If you need to cancel call our office{" "}
                  <span className="font-bold">5 days</span> in advance.
                </p>
              </div>
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
                Please get approval from your doctor to stop these medicines. If
                unable to stop, please call 417-875-3760 option 1, option 2.
              </p>
              <p className="text-sm md:text-base font-bold mb-2">
                STOP 5 days before procedure day
              </p>
              <ul className="list-disc list-inside space-y-1 text-sm md:text-base ml-4">
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

          {dates?.fortyEightHoursPrior && (
            <div className="w-full p-4 md:p-6 bg-bg300 shadow-lg rounded-lg">
              <h2 className="text-xl md:text-2xl font-bold mb-4">
                <strong>48 Hours Prior</strong> <br />
                <span className="text-sm md:text-base">
                  {dates.fortyEightHoursPrior}
                </span>
              </h2>
              <p className="text-sm md:text-base font-bold mb-2">
                STOP 48 hours before procedure day
              </p>
              <ul className="list-disc list-inside space-y-1 text-sm md:text-base ml-4">
                <li>Eliquis (Apixaban)</li>
                <li>Pradaxa (Dabigatran)</li>
                <li>Xarelto (Rivaroxban)</li>
              </ul>
              <p className="text-sm md:text-base mt-4">
                All other daily medicines not listed above can be taken with a
                sip of water. Take at least{" "}
                <span className="font-bold">6 hours before procedure</span>.
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
              <p className="text-sm md:text-base font-bold">
                STOP eating nuts, seeds, corn, or popcorn.
              </p>
            </div>
          )}

          {dates?.dayOfProcedure && (
            <div className="w-full p-4 md:p-6 bg-bg300 shadow-lg rounded-lg">
              <h2 className="text-xl md:text-2xl font-bold mb-4">
                <strong>Day of Procedure</strong> <br />
                <span className="text-sm md:text-base">
                  {dates.dayOfProcedure}
                </span>
              </h2>
              <p className="text-sm md:text-base font-bold text-red-600">
                Do NOT EAT anything after midnight
              </p>
              <p className="text-sm md:text-base mt-2">
                You may have{" "}
                <span className="font-bold">
                  CLEAR LIQUIDS until 6 hours before
                </span>{" "}
                your procedure
              </p>

              <div className="mt-4 p-4 bg-bg300/50 rounded-lg">
                <h3 className="text-lg font-bold mb-3">Clear Liquid Diet</h3>
                <p className="text-sm md:text-base font-bold text-red-600 mb-2">
                  Do NOT drink RED or PURPLE liquids.
                </p>
                <ul className="list-disc list-inside space-y-1 text-sm md:text-base ml-4">
                  <li>Water</li>
                  <li>Chicken Bouillon</li>
                  <li>Apple or strained fruit juices without pulp</li>
                  <li>Soda, Kool-Aid, Tang, Gatorade</li>
                  <li>Plain Jell-O</li>
                  <li>Italian ice or popsicles (no fruit bars or sherbet)</li>
                  <li>Tea or Coffee without milk or creamer</li>
                  <li>Hard candy example: Lifesavers - NO gum</li>
                  <li>NO drinks with alcohol</li>
                </ul>
              </div>

              {dates?.sixHoursPrior && (
                <div className="mt-4 p-4 bg-bg300/50 rounded-lg">
                  <h3 className="text-lg md:text-xl font-bold mb-3">
                    <strong>6 Hours Prior</strong> <br />
                    <span className="text-sm md:text-base">
                      {dates.sixHoursPrior}
                    </span>
                  </h3>
                  <p className="text-sm md:text-base font-bold text-red-600">
                    STOP all clear liquids
                  </p>
                </div>
              )}

              {dates?.fourHoursPrior && (
                <div className="mt-4 p-4 bg-bg300/50 rounded-lg">
                  <h3 className="text-lg md:text-xl font-bold mb-3">
                    <strong>4 Hours Prior</strong> <br />
                    <span className="text-sm md:text-base">
                      {dates.fourHoursPrior}
                    </span>
                  </h3>
                  <p className="text-sm md:text-base">
                    Take your <span className="font-bold">blood pressure</span>{" "}
                    medicine with a sip of water.
                  </p>
                  <p className="text-sm md:text-base mt-2">
                    If you are <span className="font-bold">diabetic</span> talk
                    to the doctor who orders your medicine. You may need to
                    change your medicine for day of procedure.
                  </p>
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
            onClick={() => exportToICS(dates, "egd")}
            className="flex-1 bg-indigo-500 text-white px-4 py-2 rounded-lg shadow-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm md:text-base"
          >
            Export to Calendar
          </button>
        </div>
      </div>
    </div>
  );
};

export default EGDPrepPage;
