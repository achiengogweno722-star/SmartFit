import { BrowserRouter, Routes, Route, Link } from "react-router-dom";

import Register from "../pages/auth/Register";
import Login from "../pages/auth/Login";

import MemberDashboard from "../pages/dashboard/MemberDashboard";
import TrainerDashboard from "../pages/dashboard/TrainerDashboard";
import AdminDashboard from "../pages/dashboard/AdminDashboard";

import MemberProfile from "../pages/member/MemberProfile";
import CreateMemberProfile from "../pages/member/CreateMemberProfile";
import MemberProgress from "../pages/member/Progress";
import MemberAttendance from "../pages/member/Attendance";
import MemberMembership from "../pages/member/Membership";
import MemberNotifications from "../pages/member/Notifications";
import MemberAppointments from "../pages/member/Appointments";
import MemberQRCodes from "../pages/member/QRCodes";

import AdminProfile from "../pages/admin/AdminProfile";
import TrainerProfile from "../pages/trainer/TrainerProfile";

import ProtectedRoute from "./ProtectedRoute";
import DashboardLayout from "../layouts/DashboardLayout";

function Home() {
  return (
    <div className="min-h-screen bg-purple-50 flex items-center justify-center">
      <div className="bg-white rounded-xl shadow-lg p-10 text-center">
        <h1 className="text-4xl font-bold text-purple-800">
          SmartFit Frontend
        </h1>

        <p className="mt-4 text-slate-700">
          Authentication System
        </p>

        <div className="mt-6 flex justify-center gap-4">
          <Link
            to="/register"
            className="bg-purple-700 text-white px-6 py-3 rounded-lg hover:bg-purple-800"
          >
            Register
          </Link>

          <Link
            to="/login"
            className="bg-purple-600 text-white px-6 py-3 rounded-lg hover:bg-purple-700"
          >
            Login
          </Link>
        </div>
      </div>
    </div>
  );
}

export default function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />

        {/* Member Routes */}
        <Route
          element={
            <ProtectedRoute allowedRole="MEMBER">
              <DashboardLayout />
            </ProtectedRoute>
          }
        >
          <Route
            path="/member/create-profile"
            element={<CreateMemberProfile />}
          />

          <Route
            path="/member/dashboard"
            element={<MemberDashboard />}
          />

          <Route
            path="/member/profile"
            element={<MemberProfile />}
          />

          <Route
            path="/member/progress"
            element={<MemberProgress />}
          />

          <Route
            path="/member/attendance"
            element={<MemberAttendance />}
          />

          <Route
            path="/member/membership"
            element={<MemberMembership />}
          />

          <Route
            path="/member/notifications"
            element={<MemberNotifications />}
          />

          <Route
            path="/member/appointments"
            element={<MemberAppointments />}
          />

          <Route
            path="/member/qr-codes"
            element={<MemberQRCodes />}
          />
        </Route>

        {/* Admin Routes */}
        <Route
          element={
            <ProtectedRoute allowedRole="ADMIN">
              <DashboardLayout />
            </ProtectedRoute>
          }
        >
          <Route
            path="/admin/dashboard"
            element={<AdminDashboard />}
          />

          <Route
            path="/admin/profile"
            element={<AdminProfile />}
          />
        </Route>

        {/* Trainer Routes */}
        <Route
          element={
            <ProtectedRoute allowedRole="TRAINER">
              <DashboardLayout />
            </ProtectedRoute>
          }
        >
          <Route
            path="/trainer/dashboard"
            element={<TrainerDashboard />}
          />

          <Route
            path="/trainer/profile"
            element={<TrainerProfile />}
          />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}