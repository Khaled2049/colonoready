import React, { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import CalendarNotificationsGuide from "./CalendarNotificationsGuide";
import { Operation } from "../routes/AppointmentFlow";
import {
  LocalizationProvider,
  DatePicker,
  TimePicker,
} from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";

interface SchedulerProps {
  selectedOperation?: Operation | null;
}

// Define procedure routes type for better type safety
type ProcedureRoutes = {
  [procedure: string]: {
    [option: string]: string;
  };
};

const Scheduler: React.FC<SchedulerProps> = ({ selectedOperation }) => {
  const operationName = selectedOperation?.name || "Colonoscopy";
  const [showNotificationsGuide, setShowNotificationsGuide] = useState(false);
  const [formData, setFormData] = useState<any>(null);

  const { control, handleSubmit } = useForm();
  const navigate = useNavigate();

  const onSubmit = (data: any) => {
    const { date, time, option } = data;

    if (date && time) {
      setFormData({
        date: date.toISOString(),
        time: time.toISOString(),
        option: option || operationName, // Use operation name as option if no specific option selected
        procedure: operationName,
      });
      setShowNotificationsGuide(true);
    } else {
      alert("Please select a date and time");
    }
  };

  const handleNotificationsComplete = () => {
    if (!formData) return;

    // Define procedure routes mapping with proper typing
    const procedureRoutes: ProcedureRoutes = {
      Colonoscopy: {
        Trilyte: "/trilyte",
        "Gatorade/Miralax": "/gatorade-miralax",
      },
      "Egd Prep": {
        "Egd Prep": "/egd-prep", // Uses the procedure name as the option
      },
    };

    // Check if we have specific routes for this procedure with type checking
    if (operationName in procedureRoutes) {
      const option = formData.option || operationName;

      // Type-safe access to the routes
      const procedureOptions = procedureRoutes[operationName];

      if (option in procedureOptions) {
        const route = procedureOptions[option];
        navigate(route, { state: formData });
        return;
      }
    }

    // Default fallback if no specific route is found
    navigate("/procedure-scheduled", {
      state: {
        date: formData.date,
        time: formData.time,
        procedure: operationName,
      },
    });
  };

  // Only show preparation options for Colonoscopy
  const showPreparationOptions = operationName === "Colonoscopy";

  if (showNotificationsGuide) {
    return (
      <CalendarNotificationsGuide onComplete={handleNotificationsComplete} />
    );
  }

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <div className="max-w-2xl mx-auto p-6 bg-bg100 min-h-screen">
        <h1 className="text-3xl font-bold text-text100 text-center mb-8">
          {operationName} Event Creator
        </h1>

        <form
          onSubmit={handleSubmit(onSubmit)}
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
              render={({ field }) => (
                <DatePicker
                  {...field}
                  value={field.value ? dayjs(field.value) : null}
                  onChange={(date) => field.onChange(date)}
                  className="bg-bg200 rounded-lg"
                  slotProps={{
                    textField: { variant: "outlined", fullWidth: true },
                  }}
                />
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
              render={({ field }) => (
                <TimePicker
                  {...field}
                  className="bg-bg200 rounded-lg"
                  value={field.value ? dayjs(field.value) : null}
                  onChange={(time) => field.onChange(time)}
                  slotProps={{
                    textField: { variant: "outlined", fullWidth: true },
                  }}
                />
              )}
            />
          </div>

          {/* Preparation Option - Only show for Colonoscopy */}
          {showPreparationOptions && (
            <fieldset className="space-y-4">
              <legend className="text-lg font-medium text-text100 mb-4">
                Preparation Method
              </legend>
              <Controller
                control={control}
                name="option"
                defaultValue="Trilyte"
                render={({ field }) => (
                  <div className="space-y-4">
                    <label className="flex items-center">
                      <input
                        type="radio"
                        {...field}
                        value="Trilyte"
                        checked={field.value === "Trilyte"}
                        onChange={() => field.onChange("Trilyte")}
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
