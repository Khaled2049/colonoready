// src/types/index.ts
export interface Operation {
  id: string;
  name: string;
  description?: string;
  prepOptions?: PrepOption[]; // Add possible prep options if needed
}

export interface PrepOption {
  id: string; // e.g., 'trilyte'
  name: string; // e.g., 'Trilyte'
  route: string; // e.g., '/prep/trilyte'
}

// Define available operations centrally
export const AVAILABLE_OPERATIONS: Operation[] = [
  {
    id: "colonoscopy",
    name: "Colonoscopy",
    description: "Examination of the large intestine using a flexible camera",
    prepOptions: [
      { id: "trilyte", name: "Trilyte", route: "/prep/trilyte" },
      {
        id: "gatorade-miralax",
        name: "Gatorade/Miralax",
        route: "/prep/gatorade-miralax",
      },
    ],
  },
  {
    id: "egd",
    name: "EGD",
    description:
      "Upper endoscopy examination of the esophagus, stomach, and duodenum",
    prepOptions: [{ id: "egd-prep", name: "EGD Prep", route: "/prep/egd" }],
  },
  {
    id: "flexible-sigmoidoscopy",
    name: "Flexible Sigmoidoscopy",
    description:
      "Examination of the lower part of the colon using a flexible camera",
    prepOptions: [
      {
        id: "flexible-sigmoidoscopy-prep",
        name: "Flexible Sigmoidoscopy Prep",
        route: "/prep/flexible-sigmoidoscopy",
      },
    ],
  },
  {
    id: "ileoscopy",
    name: "ileoscopy",
    description: "Examination of the ileum using a flexible camera",
    prepOptions: [
      {
        id: "ileoscopy-prep",
        name: "Ileoscopy Prep",
        route: "/prep/ileoscopy",
      },
    ],
  },
  {
    id: "pouchscopy",
    name: "Pouchscopy",
    description: "Examination of the ileal pouch using a flexible camera",
    prepOptions: [
      {
        id: "pouchscopy-prep",
        name: "Pouchscopy Prep",
        route: "/prep/pouchscopy",
      },
    ],
  },
  {
    id: "ercp",
    name: "ERCP",
    description: "Endoscopic retrograde cholangiopancreatography",
    prepOptions: [
      {
        id: "ercp-prep",
        name: "ERCP Prep",
        route: "/prep/ercp",
      },
    ],
  },
  {
    id: "endoscopic-ultrasound",
    name: "Endoscopic Ultrasound",
    description: "Endoscopic ultrasound examination of the digestive tract",
    prepOptions: [
      {
        id: "endoscopic-ultrasound",
        name: "Endoscopic Ultrasound Prep",
        route: "/prep/endoscopic-ultrasound",
      },
    ],
  },
];

// Helper function to find an operation by ID
export const findOperationById = (id: string): Operation | undefined => {
  return AVAILABLE_OPERATIONS.find((op) => op.id === id);
};

// Define procedure routes mapping (can be derived from AVAILABLE_OPERATIONS)
type ProcedureRoutes = {
  [procedureName: string]: {
    [optionName: string]: string;
  };
};

export const procedureRoutes: ProcedureRoutes = AVAILABLE_OPERATIONS.reduce(
  (acc, op) => {
    if (op.prepOptions && op.prepOptions.length > 0) {
      acc[op.name] = op.prepOptions.reduce((optAcc, option) => {
        optAcc[option.name] = option.route;
        return optAcc;
      }, {} as { [optionName: string]: string });
    }
    return acc;
  },
  {} as ProcedureRoutes
);
