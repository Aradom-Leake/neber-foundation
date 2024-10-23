import React from "react";
import { Route, Routes } from "react-router-dom";

import HealthPage from "../components/developmental/HealthPage";
import EducationPage from "../components/developmental/EducationPage";
import InfrastructurePage from "../components/developmental/InfrastructurePage";
import AgriculturePage from "../components/developmental/Agriculturepage";

export default function Development() {
  return (
    <>
      <Routes>
        <Route path="/health" element={<HealthPage />} />
        <Route path="/education" element={<EducationPage />} />
        <Route path="/infrastracture" element={<InfrastructurePage />} />
        <Route path="/agriculture" element={<AgriculturePage />} />
      </Routes>
    </>
  );
}
