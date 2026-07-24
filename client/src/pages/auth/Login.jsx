import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { toast } from "react-toastify";

import { loginUser } from "../../services/auth.service";
import { useAuth } from "../../context/AuthContext";

export default function Login() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate();
  const { login } = useAuth();

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Call backend login API
      const data = await loginUser(formData);

      // Save authenticated user in Auth Context
      login(data.user, data.token);

      toast.success(data.message || "Login successful!");

      // Clear form
      setFormData({
        email: "",
        password: "",
      });

      // Redirect based on user role
      switch (data.user.role) {
        case "ADMIN":
          navigate("/admin/dashboard");
          break;

        case "TRAINER":
          navigate("/trainer/dashboard");
          break;

        case "MEMBER":
        default:
          navigate("/member/dashboard");
          break;
      }
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Login failed."
      );
    }
  };

  return (
    <div className="min-h-screen bg-slate-200 flex items-center justify-center px-4 py-8">
      <div className="w-full max-w-2xl">
        <div className="overflow-hidden rounded-[32px] shadow-2xl">
          <div className="bg-slate-100 px-10 py-12 text-center">
            <h1 className="text-5xl font-extrabold text-slate-900">Welcome</h1>
            <p className="mt-3 text-lg text-slate-600">SmartFit Member Login</p>
          </div>

          <div className="bg-white px-10 py-8 sm:px-12 sm:py-10">
            <form onSubmit={handleSubmit} className="space-y-5">
              <label className="block">
                <span className="text-sm font-medium text-slate-700">Email</span>
                <input
                  type="email"
                  name="email"
                  placeholder="Enter your email"
                  className="mt-2 w-full rounded-2xl border border-slate-300 bg-slate-50 px-4 py-3 text-slate-900 outline-none transition focus:border-purple-500 focus:bg-white"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </label>

              <label className="block">
                <span className="text-sm font-medium text-slate-700">Password</span>
                <input
                  type="password"
                  name="password"
                  placeholder="Enter your password"
                  className="mt-2 w-full rounded-2xl border border-slate-300 bg-slate-50 px-4 py-3 text-slate-900 outline-none transition focus:border-purple-500 focus:bg-white"
                  value={formData.password}
                  onChange={handleChange}
                  required
                />
              </label>

              <button
                type="submit"
                className="w-full rounded-2xl bg-emerald-600 px-6 py-3 text-base font-semibold text-white shadow-sm transition hover:bg-emerald-700"
              >
                Sign In
              </button>
            </form>

            <div className="mt-6 flex flex-col gap-3 text-sm text-slate-600 sm:flex-row sm:justify-between">
              <button
                type="button"
                className="text-left font-medium text-slate-700 transition hover:text-slate-900"
              >
                Forgot Password?
              </button>
              <button
                type="button"
                className="text-left font-medium text-slate-700 transition hover:text-slate-900"
              >
                Email me a link to log in
              </button>
            </div>

            <div className="mt-8 space-y-3">
              <Link
                to="/register"
                className="block w-full rounded-2xl border border-slate-300 bg-white px-6 py-3 text-center text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
              >
                Sign Up
              </Link>

              <button
                type="button"
                className="block w-full rounded-2xl border border-slate-300 bg-white px-6 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
              >
                Contact Us
              </button>

              <button
                type="button"
                className="block w-full rounded-2xl border border-slate-300 bg-white px-6 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
              >
                Make a Booking
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}