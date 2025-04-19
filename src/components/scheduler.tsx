import React from "react";
import { Controller, useForm } from "react-hook-form";
// Remove useNavigate import from here
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { TimePicker } from "@mui/x-date-pickers/TimePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { Dayjs } from "dayjs";
import { Operation } from "../types"; // Adjust path

interface SchedulerProps {
  selectedOperation: Operation; // Should not be null here
  onSubmit: (data: {
    date: Dayjs | null;
    time: Dayjs | null;
    option?: string;
  }) => void;
}

const Scheduler: React.FC<SchedulerProps> = ({
  selectedOperation,
  onSubmit,
}) => {
  const operationName = selectedOperation.name;
  // Remove internal state management for navigation (showNotificationsGuide, formData)

  const { control, handleSubmit } = useForm<{
    date: Dayjs | null;
    time: Dayjs | null;
    option?: string;
  }>({
    defaultValues: {
      date: null,
      time: null,
      // Set default prep option based on operation if needed
      option: operationName === "Colonoscopy" ? "Trilyte" : undefined,
    },
  });

  // No need for internal onSubmit redirecting; call the prop function
  const handleFormSubmit = (data: {
    date: Dayjs | null;
    time: Dayjs | null;
    option?: string;
  }) => {
    onSubmit(data); // Pass data up to the Page component
  };

  // Only show preparation options for Colonoscopy (or others if configured)
  const showPreparationOptions = operationName === "Colonoscopy";

  // Remove the conditional rendering for CalendarNotificationsGuide

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <div className="max-w-2xl mx-auto p-6 bg-bg100 min-h-screen">
        <h1 className="text-3xl font-bold text-text100 text-center mb-8">
          Schedule Your {operationName}
        </h1>
        <form
          onSubmit={handleSubmit(handleFormSubmit)} // Use the new handler
          className="space-y-8 bg-primary200 rounded-xl shadow-lg p-8"
        >
          {/* Date Selection */}
          <div className="space-y-2">
            <label className="block text-lg font-medium text-text100">
              Procedure Date
            </label>
            <Controller
              control={control}
              name="date"
              rules={{ required: "Date is required" }} // Add validation
              render={({ field, fieldState: { error } }) => (
                <>
                  <DatePicker
                    {...field}
                    value={field.value} // Already a Dayjs object or null
                    onChange={(date) => field.onChange(date)}
                    className="bg-bg200 rounded-lg w-full" // Ensure width
                    slotProps={{
                      textField: {
                        variant: "outlined",
                        fullWidth: true,
                        error: !!error,
                        helperText: error?.message,
                      },
                    }}
                  />
                </>
              )}
            />
          </div>

          {/* Time Selection */}
          <div className="space-y-2">
            <label className="block text-lg font-medium text-text100">
              Procedure Time
            </label>
            <Controller
              control={control}
              name="time"
              rules={{ required: "Time is required" }} // Add validation
              render={({ field, fieldState: { error } }) => (
                <>
                  <TimePicker
                    {...field}
                    value={field.value}
                    onChange={(time) => field.onChange(time)}
                    className="bg-bg200 rounded-lg w-full" // Ensure width
                    slotProps={{
                      textField: {
                        variant: "outlined",
                        fullWidth: true,
                        error: !!error,
                        helperText: error?.message,
                      },
                    }}
                  />
                </>
              )}
            />
          </div>

          {/* Preparation Option */}
          {showPreparationOptions && (
            <fieldset className="space-y-4">
              <legend className="text-lg font-medium text-text100 mb-4">
                Preparation Method
              </legend>
              <Controller
                control={control}
                name="option" // Name matches form state
                // defaultValue="Trilyte" // Set in useForm defaultValues
                render={({ field }) => (
                  <div className="space-y-4">
                    {/* Radio buttons for Trilyte and Gatorade/Miralax */}
                    {/* Ensure value matches the string expected */}
                    <label className="flex items-center">
                      <input
                        type="radio"
                        {...field}
                        value="Trilyte"
                        checked={field.value === "Trilyte"}
                        onChange={() => field.onChange("Trilyte")} // Correct usage
                        className="w-5 h-5"
                      />
                      <span className="ml-3">Trilyte</span>
                    </label>
                    <label className="flex items-center">
                      <input
                        type="radio"
                        {...field}
                        value="Gatorade/Miralax"
                        checked={field.value === "Gatorade/Miralax"}
                        onChange={() => field.onChange("Gatorade/Miralax")}
                        className="w-5 h-5"
                      />
                      <span className="ml-3">Gatorade/Miralax</span>
                    </label>
                  </div>
                )}
              />
            </fieldset>
          )}

          {/* Submit Button */}
          <div className="pt-4">
            <button
              type="submit"
              className="w-full bg-primary300 text-white py-4 px-6 rounded-lg font-medium text-lg hover:bg-accent200"
            >
              Generate Schedule
            </button>
          </div>
        </form>
      </div>
    </LocalizationProvider>
  );
};

export default Scheduler;
