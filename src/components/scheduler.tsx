import { Controller, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { AlertCircle } from "lucide-react";
import { Operation } from "../routes/AppointmentFlow"; // Import the Operation interface

interface SchedulerProps {
  selectedOperation?: Operation | null;
}

const Scheduler: React.FC<SchedulerProps> = ({ selectedOperation }) => {
  // Default to Colonoscopy if no operation is selected
  const operationName = selectedOperation?.name || "Colonoscopy";

  const { control, handleSubmit } = useForm();
  const navigate = useNavigate();

  const onSubmit = (data: any) => {
    const { date, time, option } = data;

    if (date && time) {
      const formattedDate = date ? date.toISOString() : null;
      const formattedTime = time ? time.toISOString() : null;

      // Support for different preparation methods based on procedure type
      if (operationName === "Colonoscopy") {
        if (option === "Trilyte") {
          navigate("/trilyte", {
            state: {
              date: formattedDate,
              time: formattedTime,
              option,
              procedure: operationName,
            },
          });
        } else if (option === "Gatorade/Miralax") {
          navigate("/gatorade-miralax", {
            state: {
              date: formattedDate,
              time: formattedTime,
              option,
              procedure: operationName,
            },
          });
        }
      } else {
        // Generic handler for other procedure types that might be added later
        navigate("/procedure-scheduled", {
          state: {
            date: formattedDate,
            time: formattedTime,
            procedure: operationName,
          },
        });
      }
    } else {
      alert("Please select a date and time");
    }
  };

  // Determine if we should show procedure-specific options
  const showPreparationOptions = operationName === "Colonoscopy";

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h1
        className="text-3xl font-bold text-gray-900 text-center mb-8"
        id="form-title"
      >
        {operationName} Event Creator
      </h1>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="space-y-8 bg-lavender rounded-xl shadow-lg p-8"
        aria-labelledby="form-title"
      >
        {/* Date Selection */}
        <div className="space-y-2">
          <label
            htmlFor="date"
            className="block text-lg font-medium text-gray-700"
          >
            Procedure Date
          </label>
          <div className="relative">
            <Controller
              control={control}
              name="date"
              render={({ field, fieldState: { error } }) => (
                <>
                  <DatePicker
                    {...field}
                    selected={field.value}
                    onChange={(date) => field.onChange(date)}
                    placeholderText="Select date"
                    dateFormat="MMMM d, yyyy"
                    id="date"
                    aria-describedby={error ? "date-error" : undefined}
                    className="w-full p-4 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                    autoComplete="off"
                  />
                  {error && (
                    <div
                      id="date-error"
                      className="mt-2 flex items-center text-red-600"
                      role="alert"
                    >
                      <AlertCircle className="w-4 h-4 mr-2" />
                      <span className="text-sm">{error.message}</span>
                    </div>
                  )}
                </>
              )}
            />
          </div>
        </div>

        {/* Time Selection */}
        <div className="space-y-2">
          <label
            htmlFor="time"
            className="block text-lg font-medium text-gray-700"
          >
            Procedure Time
          </label>
          <div className="relative">
            <Controller
              control={control}
              name="time"
              render={({ field, fieldState: { error } }) => (
                <>
                  <DatePicker
                    {...field}
                    selected={field.value}
                    onChange={(time) => field.onChange(time)}
                    showTimeSelect
                    showTimeSelectOnly
                    timeIntervals={15}
                    timeCaption="Time"
                    dateFormat="h:mm aa"
                    placeholderText="Select time"
                    id="time"
                    aria-describedby={error ? "time-error" : undefined}
                    className="w-full p-4 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                    autoComplete="off"
                  />
                  {error && (
                    <div
                      id="time-error"
                      className="mt-2 flex items-center text-red-600"
                      role="alert"
                    >
                      <AlertCircle className="w-4 h-4 mr-2" />
                      <span className="text-sm">{error.message}</span>
                    </div>
                  )}
                </>
              )}
            />
          </div>
        </div>

        {/* Preparation Option - Only show for Colonoscopy */}
        {showPreparationOptions && (
          <fieldset className="space-y-4">
            <legend className="text-lg font-medium text-gray-700 mb-4">
              Preparation Method
            </legend>
            <div className="space-y-4">
              <Controller
                control={control}
                name="option"
                defaultValue="Trilyte"
                render={({ field }) => (
                  <>
                    <div className="relative flex items-center">
                      <input
                        {...field}
                        type="radio"
                        id="trilyte"
                        value="Trilyte"
                        checked={field.value === "Trilyte"}
                        onChange={() => field.onChange("Trilyte")}
                        className="w-5 h-5 text-blue-500 focus:ring-blue-500 focus:ring-2 border-gray-300"
                      />
                      <label
                        htmlFor="trilyte"
                        className="ml-3 text-gray-700 text-lg cursor-pointer"
                      >
                        Trilyte
                      </label>
                    </div>
                    <div className="relative flex items-center">
                      <input
                        {...field}
                        type="radio"
                        id="gatoradeMiralax"
                        value="Gatorade/Miralax"
                        checked={field.value === "Gatorade/Miralax"}
                        onChange={() => field.onChange("Gatorade/Miralax")}
                        className="w-5 h-5 text-blue-500 focus:ring-blue-500 focus:ring-2 border-gray-300"
                      />
                      <label
                        htmlFor="gatoradeMiralax"
                        className="ml-3 text-gray-700 text-lg cursor-pointer"
                      >
                        Gatorade/Miralax
                      </label>
                    </div>
                  </>
                )}
              />
            </div>
          </fieldset>
        )}

        {/* Submit Button */}
        <div className="pt-4">
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-4 px-6 rounded-lg font-medium text-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
          >
            Generate Schedule
          </button>
        </div>
      </form>
    </div>
  );
};

export default Scheduler;
