import { useState } from "react";
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

  const handleSubmit = async (e) => {
  e.preventDefault();

  try {
    const data = await registerUser(formData);

    toast.success(data.message || "Registration successful!");

    console.log(data);

    setFormData({
      fullName: "",
      email: "",
      password: "",
      role: "MEMBER",
    });

  } catch (error) {
    toast.error(
      error.response?.data?.message || "Registration failed."
    );
  }
};

  return (
    <div className="min-h-screen bg-slate-100 flex items-center justify-center">
      <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-md">
        <h1 className="text-3xl font-bold text-center text-blue-600 mb-6">
          SmartFit Register
        </h1>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            name="fullName"
            placeholder="Full Name"
            className="w-full border rounded-lg p-3"
            value={formData.fullName}
            onChange={handleChange}
          />

          <input
            type="email"
            name="email"
            placeholder="Email"
            className="w-full border rounded-lg p-3"
            value={formData.email}
            onChange={handleChange}
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            className="w-full border rounded-lg p-3"
            value={formData.password}
            onChange={handleChange}
          />

          <select
            name="role"
            className="w-full border rounded-lg p-3"
            value={formData.role}
            onChange={handleChange}
          >
            <option value="MEMBER">Member</option>
            <option value="TRAINER">Trainer</option>
          </select>

          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white rounded-lg py-3"
          >
            Register
          </button>
        </form>
      </div>
    </div>
  );
}