import React from "react";
import { Route, Routes} from "react-router-dom";
import Jobs from "../components/Jobs";
import VacancyDetail from "../components/vacancy/VacancyDetail";
import VacancyDashboard from "../components/vacancy/VacancyDashboard";
import JobApplicant from "../components/vacancy/JobApplicant";
import ApplyForJob from "../components/vacancy/ApplyForJob";
import ProtectedRoute from "../components/ProtectedRoute";
export default function Careers() {
  return (
    <>
      <Routes>
        <Route path="/all" element={<Jobs />} />
        <Route path="/:id" element={<VacancyDetail />} />
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <VacancyDashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/dashboard/:vacancyId"
          element={
            <ProtectedRoute>
              <JobApplicant  />
            </ProtectedRoute>
          }
        />
        <Route path="/vacancy/apply/:vacancyId" element={<ApplyForJob/>} />
      </Routes>
    </>
  );
}
