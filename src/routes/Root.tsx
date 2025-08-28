import React from "react";
import { useNavigate } from "react-router-dom";

const Root: React.FC = () => {
  const navigate = useNavigate();

  React.useEffect(() => {
    navigate("/appointments/operations");
  }, [navigate]);

  return (
    <div className="min-h-screen bg-bg100 flex flex-col items-center justify-center">
      <p className="text-text100">Redirecting to operations...</p>
    </div>
  );
};

export default Root;
