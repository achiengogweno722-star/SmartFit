import { BrowserRouter, Routes, Route, Link } from "react-router-dom";

import Register from "../pages/auth/Register";
import Login from "../pages/auth/Login";

import MemberDashboard from "../pages/dashboard/MemberDashboard";
import TrainerDashboard from "../pages/dashboard/TrainerDashboard";
import AdminDashboard from "../pages/dashboard/AdminDashboard";

import MemberProfile from "../pages/member/MemberProfile";

import ProtectedRoute from "./ProtectedRoute";
import DashboardLayout from "../layouts/DashboardLayout";

function Home() {
  return (
    <div className="min-h-screen bg-slate-100 flex items-center justify-center">
      <div className="bg-white rounded-xl shadow-lg p-10 text-center">
        <h1 className="text-4xl font-bold text-blue-600">
          SmartFit Frontend
        </h1>

        <p className="mt-4 text-gray-600">
          Authentication System
        </p>

        <div className="mt-6 flex justify-center gap-4">
          <Link
            to="/register"
            className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700"
          >
            Register
          </Link>

          <Link
            to="/login"
            className="bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700"
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
            path="/member/dashboard"
            element={<MemberDashboard />}
          />

          <Route
            path="/member/profile"
            element={<MemberProfile />}
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
        </Route>

      </Routes>
    </BrowserRouter>
  );
}