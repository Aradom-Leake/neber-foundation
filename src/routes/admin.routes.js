import React from "react";
import { Route, Routes } from "react-router-dom";
import AdminDashboard from "../pages/adminDashboard";
import AdminReqOrg from "../pages/admin/adminReqOrgList";
import AdminRegOrg from "../pages/admin/adminRegOrgList";
import AdminEditOrg from "../pages/admin/adminEditOrg";
import AdminLogin from "../components/admin/login/adminLogin";
import AdminReqFund from "../pages/admin/adminReqFund";
import AdminRegFund from "../pages/admin/adminRegFund";
import ViewSelectedFund from "../components/admin/Fund/fundview";
// import GetUserList from "../components/admin/user/userlist";
import GetAllUserList from "../pages/admin/adminUserList";
import RequestedDonation from "../pages/admin/adminReqDonList";
import AcceptedDonation from "../pages/admin/adminAcceptedDonList";
import ReviewOrganization from "../pages/admin/adminReviewOrg";
import { useAuth } from "../context/AuthProvider";
import ProtectedRoute from "../components/ProtectedRoute";
export default function Donator() {
  const { auth } = useAuth();
  console.log(auth);
  return (
    <>
      <Routes>
        <Route path="/login" element={<AdminLogin />} />
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <AdminDashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/reqorglist"
          element={
            <ProtectedRoute>
              <AdminReqOrg />
            </ProtectedRoute>
          }
        />
        <Route
          path="/reqfund"
          element={
            <ProtectedRoute>
              <AdminReqFund />
            </ProtectedRoute>
          }
        />
        <Route
          path="/editorg/:id"
          element={
            <ProtectedRoute>
              <AdminEditOrg />
            </ProtectedRoute>
          }
        />
        <Route
          path="/viewreqfund/:fundID"
          element={
            <ProtectedRoute>
              <ViewSelectedFund />
            </ProtectedRoute>
          }
        />
        <Route
          path="/getusers"
          element={
            <ProtectedRoute>
              <GetAllUserList />
            </ProtectedRoute>
          }
        />
        <Route
          path="/reqdon"
          element={
            <ProtectedRoute>
              <RequestedDonation />
            </ProtectedRoute>
          }
        />
        <Route
          path="/accepteddon"
          element={
            <ProtectedRoute>
              <AcceptedDonation />
            </ProtectedRoute>
          }
        />
        <Route
          path="/revieworg/:id"
          element={
            <ProtectedRoute>
              <ReviewOrganization />
            </ProtectedRoute>
          }
        />
      </Routes>
    </>
  );
}
