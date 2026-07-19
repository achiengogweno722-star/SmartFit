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
    <div className="flex justify-center py-10 bg-slate-100 min-h-screen">
      <div className="bg-white shadow-xl rounded-xl p-10 w-full max-w-2xl">
        <h1 className="text-4xl font-bold text-center text-blue-600 mb-8">
          Member Profile
        </h1>

        <form onSubmit={handleSubmit} className="space-y-5">

          <div>
            <label className="font-semibold">Date of Birth</label>
            <input
              type="date"
              name="dateOfBirth"
              className="w-full border rounded-lg p-3 mt-1"
              value={profile.dateOfBirth}
              onChange={handleChange}
              required
            />
          </div>

          <div>
            <label className="font-semibold">Gender</label>
            <select
              name="gender"
              className="w-full border rounded-lg p-3 mt-1"
              value={profile.gender}
              onChange={handleChange}
            >
              <option value="MALE">Male</option>
              <option value="FEMALE">Female</option>
              <option value="OTHER">Other</option>
            </select>
          </div>

          <div>
            <label className="font-semibold">Height (cm)</label>
            <input
              type="number"
              name="height"
              className="w-full border rounded-lg p-3 mt-1"
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
              className="w-full border rounded-lg p-3 mt-1"
              value={profile.weight}
              onChange={handleChange}
              required
            />
          </div>

          <div>
            <label className="font-semibold">Fitness Level</label>
            <select
              name="fitnessLevel"
              className="w-full border rounded-lg p-3 mt-1"
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
              className="w-full border rounded-lg p-3 mt-1"
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
            <label className="font-semibold">Available Days Per Week</label>
            <input
              type="number"
              min="1"
              max="7"
              name="availableDaysPerWeek"
              className="w-full border rounded-lg p-3 mt-1"
              value={profile.availableDaysPerWeek}
              onChange={handleChange}
              required
            />
          </div>

          <div>
            <label className="font-semibold">Preferred Workout Time</label>
            <select
              name="preferredWorkoutTime"
              className="w-full border rounded-lg p-3 mt-1"
              value={profile.preferredWorkoutTime}
              onChange={handleChange}
            >
              <option>Morning</option>
              <option>Afternoon</option>
              <option>Evening</option>
            </select>
          </div>

          <div>
            <label className="font-semibold">Medical Conditions</label>
            <textarea
              name="medicalConditions"
              className="w-full border rounded-lg p-3 mt-1"
              rows="3"
              value={profile.medicalConditions}
              onChange={handleChange}
            />
          </div>

          <div>
            <label className="font-semibold">Phone Number</label>
            <input
              type="text"
              name="phoneNumber"
              className="w-full border rounded-lg p-3 mt-1"
              value={profile.phoneNumber}
              onChange={handleChange}
            />
          </div>

          <div>
            <label className="font-semibold">Address</label>
            <input
              type="text"
              name="address"
              className="w-full border rounded-lg p-3 mt-1"
              value={profile.address}
              onChange={handleChange}
            />
          </div>

          <div>
            <label className="font-semibold">Emergency Contact</label>
            <input
              type="text"
              name="emergencyContact"
              className="w-full border rounded-lg p-3 mt-1"
              value={profile.emergencyContact}
              onChange={handleChange}
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg"
          >
            {loading ? "Saving..." : "Save Profile"}
          </button>

        </form>
      </div>
    </div>
  );
}