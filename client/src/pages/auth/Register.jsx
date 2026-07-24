import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { registerUser } from "../../services/auth.service";
import { toast } from "react-toastify";

export default function Register() {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    role: "MEMBER",
  });

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const data = await registerUser(formData);

      toast.success(data.message || "Registration successful!");

      setFormData({
        fullName: "",
        email: "",
        password: "",
        role: "MEMBER",
      });

      navigate("/login");
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Registration failed."
      );
    }
  };

  return (
    <div className="min-h-screen bg-slate-200 flex items-center justify-center px-4 py-8">
      <div className="w-full max-w-2xl">
        <div className="overflow-hidden rounded-[32px] shadow-2xl">
          <div className="bg-slate-100 px-10 py-12 text-center">
            <h1 className="text-5xl font-extrabold text-slate-900">Join SmartFit</h1>
            <p className="mt-3 text-lg text-slate-600">Create your member account and start training.</p>
          </div>

          <div className="bg-white px-10 py-8 sm:px-12 sm:py-10">
            <form onSubmit={handleSubmit} className="space-y-5">
              <label className="block">
                <span className="text-sm font-medium text-slate-700">Full Name</span>
                <input
                  type="text"
                  name="fullName"
                  placeholder="Your full name"
                  className="mt-2 w-full rounded-2xl border border-slate-300 bg-slate-50 px-4 py-3 text-slate-900 outline-none transition focus:border-purple-500 focus:bg-white"
                  value={formData.fullName}
                  onChange={handleChange}
                  required
                />
              </label>

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
                  placeholder="Create a password"
                  className="mt-2 w-full rounded-2xl border border-slate-300 bg-slate-50 px-4 py-3 text-slate-900 outline-none transition focus:border-purple-500 focus:bg-white"
                  value={formData.password}
                  onChange={handleChange}
                  required
                />
              </label>

              <label className="block">
                <span className="text-sm font-medium text-slate-700">Role</span>
                <select
                  name="role"
                  className="mt-2 w-full rounded-2xl border border-slate-300 bg-slate-50 px-4 py-3 text-slate-900 outline-none transition focus:border-purple-500 focus:bg-white"
                  value={formData.role}
                  onChange={handleChange}
                >
                  <option value="MEMBER">Member</option>
                  <option value="TRAINER">Trainer</option>
                </select>
              </label>

              <button
                type="submit"
                className="w-full rounded-2xl bg-purple-700 px-6 py-3 text-base font-semibold text-white shadow-sm transition hover:bg-purple-800"
              >
                Register
              </button>
            </form>

            <div className="mt-6 flex flex-col gap-3 text-sm text-slate-600 sm:flex-row sm:justify-between">
              <Link
                to="/login"
                className="block font-medium text-purple-700 transition hover:text-purple-900"
              >
                Already have an account? Sign In
              </Link>

              <button
                type="button"
                className="block font-medium text-slate-700 transition hover:text-slate-900"
              >
                Contact Us
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}