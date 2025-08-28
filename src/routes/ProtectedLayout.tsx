import { useAuth } from "@clerk/clerk-react";
import { Navigate, Outlet } from "react-router-dom";

export default function ProtectedLayout() {
  const { userId, isLoaded } = useAuth();

  if (!isLoaded) {
    return <div>Loading...</div>;
  }

  if (!userId) {
    return <Navigate to="/sign-in" />;
  }

  return <Outlet />;
}
