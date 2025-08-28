import React, { useState, useEffect } from "react";
import { useUser } from "@clerk/clerk-react";
import { Link } from "react-router-dom";

// Define your appointment type based on your data structure
interface Appointment {
  id: string;
  operationType: string;
  scheduledDate: string;
  scheduledTime: string;
  patientName?: string;
  status: "scheduled" | "completed" | "cancelled";
  createdAt: string;
}

const AppointmentsDashboard: React.FC = () => {
  const { user } = useUser();
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchAppointments();
  }, [user]);

  const fetchAppointments = async () => {
    try {
      setLoading(true);
      setError(null);

      // Replace this with your actual API call
      // const response = await fetch('/api/appointmentsointments', {
      //   headers: {
      //     'Authorization': `Bearer ${await user?.getToken()}`,
      //   },
      // });

      // For now, using mock data
      const mockAppointments: Appointment[] = [
        {
          id: "1",
          operationType: "EGD Prep",
          scheduledDate: "2025-09-01",
          scheduledTime: "10:00 AM",
          patientName: "John Doe",
          status: "scheduled",
          createdAt: "2025-08-25",
        },
        {
          id: "2",
          operationType: "Trilyte",
          scheduledDate: "2025-09-03",
          scheduledTime: "2:00 PM",
          patientName: "Jane Smith",
          status: "completed",
          createdAt: "2025-08-20",
        },
      ];

      // Simulate API delay
      await new Promise((resolve) => setTimeout(resolve, 1000));
      setAppointments(mockAppointments);
    } catch (err) {
      setError("Failed to fetch appointments");
      console.error("Error fetching appointments:", err);
    } finally {
      setLoading(false);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "scheduled":
        return "bg-blue-100 text-blue-800";
      case "completed":
        return "bg-green-100 text-green-800";
      case "cancelled":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  if (loading) {
    return (
      <div className="max-w-6xl mx-auto p-6">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 rounded w-1/4 mb-6"></div>
          <div className="space-y-4">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="h-24 bg-gray-200 rounded"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-6xl mx-auto p-6">
        <div className="text-center py-12">
          <p className="text-red-600 mb-4">{error}</p>
          <button
            onClick={fetchAppointments}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto p-6">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Your Appointments</h1>
      </div>

      {appointments.length === 0 ? (
        <div className="text-center py-12">
          <div className="mx-auto h-24 w-24 text-gray-400 mb-4">
            <svg fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1}
                d="M8 7V3a2 2 0 012-2h4a2 2 0 012 2v4m-6 8h6m-6 0a2 2 0 002 2h4a2 2 0 002-2m-8 0V9a2 2 0 012-2h4a2 2 0 012 2v8z"
              />
            </svg>
          </div>
          <h2 className="text-xl font-semibold text-gray-900 mb-2">
            No appointments yet
          </h2>
          <p className="text-gray-600 mb-6">
            Schedule your first appointment to get started
          </p>
          <Link
            to="/appointments/operations"
            className="bg-blue-600 text-white px-6 py-3 rounded-md hover:bg-blue-700 transition-colors inline-flex items-center"
          >
            Schedule Appointment
          </Link>
        </div>
      ) : (
        <div className="space-y-4">
          {appointments.map((appointment) => (
            <div
              key={appointment.id}
              className="bg-white rounded-lg shadow-md p-6 border border-gray-200"
            >
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    {appointment.operationType}
                  </h3>
                  {appointment.patientName && (
                    <p className="text-gray-600 mb-1">
                      Patient: {appointment.patientName}
                    </p>
                  )}
                  <div className="flex items-center space-x-4 text-sm text-gray-500">
                    <span>📅 {appointment.scheduledDate}</span>
                    <span>🕐 {appointment.scheduledTime}</span>
                    <span>Created: {appointment.createdAt}</span>
                  </div>
                </div>
                <span
                  className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(
                    appointment.status
                  )}`}
                >
                  {appointment.status.charAt(0).toUpperCase() +
                    appointment.status.slice(1)}
                </span>
              </div>

              <div className="flex space-x-3">
                <button className="bg-gray-100 text-gray-700 px-4 py-2 rounded hover:bg-gray-200 transition-colors">
                  View Details
                </button>
                {appointment.status === "scheduled" && (
                  <>
                    <button className="bg-blue-100 text-blue-700 px-4 py-2 rounded hover:bg-blue-200 transition-colors">
                      Reschedule
                    </button>
                    <button className="bg-red-100 text-red-700 px-4 py-2 rounded hover:bg-red-200 transition-colors">
                      Cancel
                    </button>
                  </>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AppointmentsDashboard;
