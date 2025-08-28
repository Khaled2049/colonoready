import React from "react";
import { useParams, useLocation, useNavigate } from "react-router-dom";
import Scheduler from "../components/scheduler";

const SchedulerPage: React.FC = () => {
  const { operationId } = useParams<{ operationId: string }>();
  const location = useLocation();
  const navigate = useNavigate();

  // Get the operation from route state, or find it by ID if not available
  const selectedOperation =
    location.state?.operation || findOperationById(operationId);

  if (!selectedOperation) {
    // If no operation found, redirect back to operation selection
    React.useEffect(() => {
      navigate("/appointments/operations");
    }, [navigate]);

    return (
      <div className="flex flex-col items-center bg-bg100 text-text100">
        <p>Operation not found. Redirecting...</p>
      </div>
    );
  }

  return <Scheduler selectedOperation={selectedOperation} />;
};

// Helper function to find operation by ID (you can move this to a utils file)
function findOperationById(id: string | undefined) {
  if (!id) return null;

  const operations = [
    {
      id: "colonoscopy",
      name: "Colonoscopy",
      description: "Examination of the large intestine using a flexible camera",
    },
    {
      id: "egd",
      name: "EGD",
      description:
        "Upper endoscopy examination of the esophagus, stomach, and duodenum",
    },
    {
      id: "flexible-sigmoidoscopy",
      name: "Flexible Sigmoidoscopy",
      description:
        "Examination of the lower part of the large intestine using a flexible camera.",
    },
    {
      id: "ileoscopy",
      name: "Ileoscopy",
      description: "Examination of the ileum.",
    },
    {
      id: "pouchscopy",
      name: "Pouchscopy",
      description:
        "Examination of an ileal pouch-anal anastomosis (J-pouch) created after the surgical removal of the colon.",
    },
    {
      id: "ercp",
      name: "ERCP",
      description:
        "A procedure that combines upper gastrointestinal endoscopy and X-rays to diagnose and treat problems of the bile and pancreatic ducts.",
    },
    {
      id: "endoscopic-ultrasound",
      name: "Endoscopic Ultrasound",
      description:
        "A procedure that combines endoscopy with ultrasound to visualize the layers of the gastrointestinal tract and nearby organs.",
    },
  ];

  return operations.find((op) => op.id === id) || null;
}

export default SchedulerPage;
