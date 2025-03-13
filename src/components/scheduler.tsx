import React, { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { AlertCircle } from "lucide-react";
import CalendarNotificationsGuide from "./CalendarNotificationsGuide"; // Import the notifications component
import { Operation } from "../routes/AppointmentFlow"; // Import the Operation interface

interface SchedulerProps {
  selectedOperation?: Operation | null;
}

const Scheduler: React.FC<SchedulerProps> = ({ selectedOperation }) => {
  // Default to Colonoscopy if no operation is selected
  const operationName = selectedOperation?.name || "Colonoscopy";

  // Add state to control the visibility of the notifications guide
  const [showNotificationsGuide, setShowNotificationsGuide] = useState(false);
  // Store form data to use after notifications guide is completed
  const [formData, setFormData] = useState<any>(null);

  const { control, handleSubmit } = useForm();
  const navigate = useNavigate();

  const onSubmit = (data: any) => {
    const { date, time, option } = data;

    if (date && time) {
      // Store the form data for later use
      setFormData({
        date: date.toISOString(),
        time: time.toISOString(),
        option,
        procedure: operationName,
      });

      // Show the notifications guide
      setShowNotificationsGuide(true);
    } else {
      alert("Please select a date and time");
    }
  };

  // Handler for when the notifications guide is completed
  const handleNotificationsComplete = () => {
    if (formData) {
      // Navigate to the appropriate page based on the procedure type and option
      if (operationName === "Colonoscopy") {
        if (formData.option === "Trilyte") {
          navigate("/trilyte", { state: formData });
        } else if (formData.option === "Gatorade/Miralax") {
          navigate("/gatorade-miralax", { state: formData });
        }
      } else {
        // Generic handler for other procedure types
        navigate("/procedure-scheduled", {
          state: {
            date: formData.date,
            time: formData.time,
            procedure: operationName,
          },
        });
      }
    }
  };

  // Determine if we should show procedure-specific options
  const showPreparationOptions = operationName === "Colonoscopy";

  // If showing notifications guide, render that instead of the form
  if (showNotificationsGuide) {
    return (
      <CalendarNotificationsGuide onComplete={handleNotificationsComplete} />
    );
  }

  return (
    <div className="max-w-2xl mx-auto p-6 bg-bg100 min-h-screen">
      <h1
        className="text-3xl font-bold text-text100 text-center mb-8"
        id="form-title"
      >
        {operationName} Event Creator
      </h1>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="space-y-8 bg-primary200 rounded-xl shadow-lg p-8"
        aria-labelledby="form-title"
      >
        {/* Date Selection */}
        <div className="space-y-2">
          <label
            htmlFor="date"
            className="block text-lg font-medium text-text100"
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
                    className="w-full p-4 bg-bg200 border border-accent200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent transition-colors"
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
            className="block text-lg font-medium text-text100"
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
                    className="w-full p-4 bg-bg200 border border-accent200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent transition-colors"
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
            <legend className="text-lg font-medium text-text100 mb-4">
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
                        className="w-5 h-5 text-text100 focus:ring-primary focus:ring-2 border border-accent200"
                      />
                      <label
                        htmlFor="trilyte"
                        className="ml-3 text-text100 text-lg cursor-pointer"
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
                        className="w-5 h-5 text-text100 focus:ring-primary focus:ring-2 border border-accent200"
                      />
                      <label
                        htmlFor="gatoradeMiralax"
                        className="ml-3 text-text100 text-lg cursor-pointer"
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
            className="w-full bg-primary300 text-white py-4 px-6 rounded-lg font-medium text-lg hover:bg-accent200 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 transition-colors"
          >
            Generate Schedule
          </button>
        </div>
      </form>
    </div>
  );
};

export default Scheduler;
