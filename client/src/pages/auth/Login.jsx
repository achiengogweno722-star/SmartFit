import { useState } from "react";
import { useNavigate } from "react-router-dom";
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
    <div className="min-h-screen bg-slate-100 flex items-center justify-center">
      <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-md">
        <h1 className="text-3xl font-bold text-center text-blue-600 mb-6">
          SmartFit Login
        </h1>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="email"
            name="email"
            placeholder="Email"
            className="w-full border rounded-lg p-3"
            value={formData.email}
            onChange={handleChange}
            required
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            className="w-full border rounded-lg p-3"
            value={formData.password}
            onChange={handleChange}
            required
          />

          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white rounded-lg py-3"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
}