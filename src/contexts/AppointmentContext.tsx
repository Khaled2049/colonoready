import React, { createContext, useState, useContext, ReactNode } from "react";
import { Dayjs } from "dayjs";
import { Operation } from "../types";

interface AppointmentState {
  selectedOperation: Operation | null;
  appointmentDate: Dayjs | null;
  appointmentTime: Dayjs | null;
  prepOption: string | null; // e.g., 'Trilyte', 'Gatorade/Miralax'
}

interface AppointmentContextProps extends AppointmentState {
  setOperation: (operation: Operation | null) => void;
  setDateTime: (date: Dayjs | null, time: Dayjs | null) => void;
  setPrepOption: (option: string | null) => void;
  resetFlow: () => void; // Function to clear the state
}

const AppointmentContext = createContext<AppointmentContextProps | undefined>(
  undefined
);

const initialState: AppointmentState = {
  selectedOperation: null,
  appointmentDate: null,
  appointmentTime: null,
  prepOption: null,
};

export const AppointmentProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [state, setState] = useState<AppointmentState>(initialState);

  const setOperation = (operation: Operation | null) => {
    setState((prev) => ({ ...prev, selectedOperation: operation }));
  };

  const setDateTime = (date: Dayjs | null, time: Dayjs | null) => {
    setState((prev) => ({
      ...prev,
      appointmentDate: date,
      appointmentTime: time,
    }));
  };

  const setPrepOption = (option: string | null) => {
    setState((prev) => ({ ...prev, prepOption: option }));
  };

  const resetFlow = () => {
    setState(initialState);
  };

  return (
    <AppointmentContext.Provider
      value={{
        ...state,
        setOperation,
        setDateTime,
        setPrepOption,
        resetFlow,
      }}
    >
      {children}
    </AppointmentContext.Provider>
  );
};

export const useAppointment = () => {
  const context = useContext(AppointmentContext);
  if (context === undefined) {
    throw new Error(
      "useAppointment must be used within an AppointmentProvider"
    );
  }
  return context;
};
