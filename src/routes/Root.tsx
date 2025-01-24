import React from "react";
import Scheduler from "../components/scheduler";
// import ColonoscopyFAQ from "../components/ColonoscopyFAQ";

const Root: React.FC = () => {
  return (
    <div className="min-h-screen bg-blue-100 flex flex-col items-center justify-center">
      <Scheduler />
      {/* <ColonoscopyFAQ /> */}
    </div>
  );
};

export default Root;
