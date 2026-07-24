import { useState } from "react";
import { toast } from "react-toastify";
import { saveProfile } from "../../services/member.service";

export default function MemberProfile() {
  const [profile, setProfile] = useState({
    gender: "MALE",
    dateOfBirth: "",
    height: "",
    weight: "",
    fitnessLevel: "BEGINNER",
    fitnessGoal: "WEIGHT_LOSS",
    availableDaysPerWeek: 3,
    preferredWorkoutTime: "Morning",
    medicalConditions: "",
    phoneNumber: "",
    address: "",
    emergencyContact: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setProfile((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      await saveProfile({
        ...profile,
        height: Number(profile.height),
        weight: Number(profile.weight),
        availableDaysPerWeek: Number(profile.availableDaysPerWeek),
      });

      toast.success("Profile saved successfully!");
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Failed to save profile."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-100 p-8">

      {/* Header */}
      <section className="rounded-3xl bg-gradient-to-r from-violet-700 via-purple-600 to-indigo-600 text-white p-8 shadow-xl mb-8">
        <div className="flex items-center justify-between">

          <div>
            <p className="uppercase tracking-widest text-violet-200">
              SMARTFIT MEMBER
            </p>

            <h1 className="text-4xl font-bold mt-2">
              My Profile
            </h1>

            <p className="mt-3 text-violet-100">
              Manage your personal information and fitness preferences.
            </p>
          </div>

          <div className="hidden md:flex h-24 w-24 rounded-full bg-white/20 backdrop-blur items-center justify-center text-5xl">
            👤
          </div>

        </div>
      </section>

      <form onSubmit={handleSubmit}>

        <div className="grid lg:grid-cols-2 gap-8">

          {/* Personal Information */}
          <div className="bg-white rounded-3xl shadow-lg p-8">

            <h2 className="text-2xl font-bold text-slate-800 mb-6">
              Personal Information
            </h2>

            <div className="space-y-5">

              <div>
                <label className="font-semibold">Date of Birth</label>
                <input
                  type="date"
                  name="dateOfBirth"
                  className="w-full mt-2 rounded-xl border p-3"
                  value={profile.dateOfBirth}
                  onChange={handleChange}
                  required
                />
              </div>

              <div>
                <label className="font-semibold">Gender</label>
                <select
                  name="gender"
                  className="w-full mt-2 rounded-xl border p-3"
                  value={profile.gender}
                  onChange={handleChange}
                >
                  <option value="MALE">Male</option>
                  <option value="FEMALE">Female</option>
                  <option value="OTHER">Other</option>
                </select>
              </div>

              <div>
                <label className="font-semibold">Phone Number</label>
                <input
                  type="text"
                  name="phoneNumber"
                  className="w-full mt-2 rounded-xl border p-3"
                  value={profile.phoneNumber}
                  onChange={handleChange}
                />
              </div>

              <div>
                <label className="font-semibold">Address</label>
                <input
                  type="text"
                  name="address"
                  className="w-full mt-2 rounded-xl border p-3"
                  value={profile.address}
                  onChange={handleChange}
                />
              </div>

              <div>
                <label className="font-semibold">Emergency Contact</label>
                <input
                  type="text"
                  name="emergencyContact"
                  className="w-full mt-2 rounded-xl border p-3"
                  value={profile.emergencyContact}
                  onChange={handleChange}
                />
              </div>

            </div>

          </div>

          {/* Fitness Information */}
          <div className="bg-white rounded-3xl shadow-lg p-8">

            <h2 className="text-2xl font-bold text-slate-800 mb-6">
              Fitness Information
            </h2>

            <div className="space-y-5">

              <div>
                <label className="font-semibold">Height (cm)</label>
                <input
                  type="number"
                  name="height"
                  className="w-full mt-2 rounded-xl border p-3"
                  value={profile.height}
                  onChange={handleChange}
                  required
                />
              </div>

              <div>
                <label className="font-semibold">Weight (kg)</label>
                <input
                  type="number"
                  name="weight"
                  className="w-full mt-2 rounded-xl border p-3"
                  value={profile.weight}
                  onChange={handleChange}
                  required
                />
              </div>

              <div>
                <label className="font-semibold">Fitness Level</label>
                <select
                  name="fitnessLevel"
                  className="w-full mt-2 rounded-xl border p-3"
                  value={profile.fitnessLevel}
                  onChange={handleChange}
                >
                  <option value="BEGINNER">Beginner</option>
                  <option value="INTERMEDIATE">Intermediate</option>
                  <option value="ADVANCED">Advanced</option>
                </select>
              </div>

              <div>
                <label className="font-semibold">Fitness Goal</label>
                <select
                  name="fitnessGoal"
                  className="w-full mt-2 rounded-xl border p-3"
                  value={profile.fitnessGoal}
                  onChange={handleChange}
                >
                  <option value="WEIGHT_LOSS">Weight Loss</option>
                  <option value="MUSCLE_GAIN">Muscle Gain</option>
                  <option value="STRENGTH">Strength</option>
                  <option value="ENDURANCE">Endurance</option>
                  <option value="GENERAL_FITNESS">General Fitness</option>
                </select>
              </div>

              <div>
                <label className="font-semibold">
                  Available Days Per Week
                </label>
                <input
                  type="number"
                  min="1"
                  max="7"
                  name="availableDaysPerWeek"
                  className="w-full mt-2 rounded-xl border p-3"
                  value={profile.availableDaysPerWeek}
                  onChange={handleChange}
                  required
                />
              </div>

              <div>
                <label className="font-semibold">
                  Preferred Workout Time
                </label>
                <select
                  name="preferredWorkoutTime"
                  className="w-full mt-2 rounded-xl border p-3"
                  value={profile.preferredWorkoutTime}
                  onChange={handleChange}
                >
                  <option>Morning</option>
                  <option>Afternoon</option>
                  <option>Evening</option>
                </select>
              </div>

              <div>
                <label className="font-semibold">
                  Medical Conditions
                </label>
                <textarea
                  rows="3"
                  name="medicalConditions"
                  className="w-full mt-2 rounded-xl border p-3"
                  value={profile.medicalConditions}
                  onChange={handleChange}
                />
              </div>

            </div>

          </div>

        </div>

        <div className="mt-8">
          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-2xl bg-violet-700 py-4 text-lg font-semibold text-white transition hover:bg-violet-800"
          >
            {loading ? "Saving..." : "Save Profile"}
          </button>
        </div>

      </form>

    </div>
  );
}