import { useState, useEffect } from "react";
import { useAuth } from "../../context/AuthContext";
import { toast } from "react-toastify";

import {
  saveProfile,
  getProfile,
  updateProfile,
} from "../../services/member.service";

export default function MemberProfile() {
  const { user } = useAuth();
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

  const [editing, setEditing] = useState(false);
const [profileExists, setProfileExists] = useState(false);

useEffect(() => {
  loadProfile();
}, []);

  const handleChange = (e) => {
    setProfile((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };
const loadProfile = async () => {
  try {
    const data = await getProfile();

    setProfile(data.profile);

    setProfileExists(true);

    setEditing(false);
  } catch (error) {
    // No profile yet
    setProfileExists(false);
    setEditing(true);
  }
};
  const handleSubmit = async (e) => {
  e.preventDefault();

  try {
    setLoading(true);

    const profileData = {
      ...profile,
      height: Number(profile.height),
      weight: Number(profile.weight),
      availableDaysPerWeek: Number(profile.availableDaysPerWeek),
    };

    if (profileExists) {
      await updateProfile(profileData);
      toast.success("Profile updated successfully!");
    } else {
      await saveProfile(profileData);
      toast.success("Profile created successfully!");
    }

    setProfileExists(true);
    setEditing(false);

    // Reload the latest profile from the server
    loadProfile();
  } catch (error) {
    toast.error(
      error.response?.data?.message ||
      "Failed to save profile."
    );
  } finally {
    setLoading(false);
  }
};

  return (
    <div className="min-h-screen bg-slate-100 p-8">

      {/* Header */}
      <section className="relative overflow-hidden rounded-[2rem] bg-gradient-to-r from-violet-700 via-purple-700 to-indigo-700 p-10 shadow-2xl text-white mb-8">

  {/* Decorative circles */}

  <div className="absolute -top-10 -right-10 h-40 w-40 rounded-full bg-white/10"></div>

  <div className="absolute bottom-0 left-0 h-24 w-24 rounded-full bg-white/10"></div>

  <div className="relative flex flex-col lg:flex-row lg:items-center lg:justify-between gap-8">

    {/* Left Side */}

    <div className="flex items-center gap-6">

      <div className="h-28 w-28 rounded-full bg-white/20 border-4 border-white/30 shadow-xl flex items-center justify-center">

  <span className="text-4xl font-extrabold text-white">
    {user?.fullName
  ? user.fullName
      .split(" ")
      .map((name) => name[0])
      .join("")
      .substring(0, 2)
      .toUpperCase()
  : "SM"}
  </span>

</div>

      <div>

        <p className="uppercase tracking-[0.3em] text-violet-200 text-sm">
          SMARTFIT MEMBER
        </p>

        <h1 className="mt-2 text-5xl font-extrabold">
  {user?.fullName || "SmartFit Member"}
</h1>

<p className="mt-2 text-xl text-violet-100">
  Member Profile
</p>

        <p className="mt-3 text-violet-100">
          Keep your personal information and fitness journey up to date.
        </p>

      </div>

    </div>

    {/* Right Side */}

    <div className="grid grid-cols-2 gap-4">

      <div className="rounded-2xl bg-white/10 backdrop-blur-md p-5 text-center">

        <p className="text-violet-200 text-sm">
          Goal
        </p>

        <h3 className="mt-2 text-lg font-bold">
          {profile.fitnessGoal?.replaceAll("_"," ")}
        </h3>

      </div>

      <div className="rounded-2xl bg-white/10 backdrop-blur-md p-5 text-center">

        <p className="text-violet-200 text-sm">
          Fitness Level
        </p>

        <h3 className="mt-2 text-lg font-bold">
          {profile.fitnessLevel}
        </h3>

      </div>

      <div className="rounded-2xl bg-white/10 backdrop-blur-md p-5 text-center">

        <p className="text-violet-200 text-sm">
          Height
        </p>

        <h3 className="mt-2 text-lg font-bold">
          {profile.height} cm
        </h3>

      </div>

      <div className="rounded-2xl bg-white/10 backdrop-blur-md p-5 text-center">

        <p className="text-violet-200 text-sm">
          Weight
        </p>

        <h3 className="mt-2 text-lg font-bold">
          {profile.weight} kg
        </h3>

      </div>

    </div>

  </div>

</section>

      {!editing ? (

<div className="space-y-8">

  <div className="bg-white rounded-3xl shadow-lg p-8">

    <div className="flex justify-between items-center">

      <div>

        <h2 className="text-3xl font-bold text-slate-800">
          Personal Profile
        </h2>

        <p className="text-slate-500 mt-2">
          Your SmartFit information
        </p>

      </div>

      <button
        onClick={() => setEditing(true)}
        className="bg-violet-600 hover:bg-violet-700 text-white px-6 py-3 rounded-xl"
      >
        Edit Profile
      </button>

    </div>

    <div className="space-y-6 mt-8">

     

  {/* Personal Information */}

  <div className="bg-white rounded-3xl p-10 shadow-xl border border-gray-200 hover:shadow-2xl transition-all duration-300">

    <h3 className="text-xl font-bold text-violet-700 mb-5">
      👤 Personal Information
    </h3>

    <div className="space-y-5">

     <div className="grid grid-cols-2 gap-4 items-start">
       <p className="text-gray-500 font-medium"></p>
       <p className="font-bold text-right break-words">{profile.gender}</p>
      </div>

     <div className="grid grid-cols-2 gap-4 items-start">
       <p className="text-gray-500 font-medium"></p>
        <p className="font-bold text-right break-words">
           {profile.dateOfBirth
  ? new Date(profile.dateOfBirth).toLocaleDateString("en-GB", {
      day: "numeric",
      month: "short",
      year: "numeric",
    })
  : "-"}
        </p>
         
      </div>

      <div className="grid grid-cols-2 gap-4 items-start">
      <p className="text-gray-500 font-medium"></p>
       <p className="font-bold text-right break-words">
          {profile.phoneNumber || "-"}
        </p>
      </div>

      <div className="grid grid-cols-2 gap-4 items-start">
        <p className="text-gray-500 font-medium">Address</p>
       <p className="font-bold text-right break-words">
          {profile.address || "-"}
        </p>
      </div>

    </div>

  </div>

  {/* Body Metrics */}

  <div className="bg-white rounded-3xl p-10 shadow-xl border border-gray-200 hover:shadow-2xl transition-all duration-300">

    <h3 className="text-xl font-bold text-blue-700 mb-5">
      📊 Body Metrics
    </h3>

    <div className="space-y-5">

      <div className="grid grid-cols-2 gap-4 items-start">
        <p className="text-gray-500 font-medium">Height</p>
        <p className="font-bold text-right break-words">
          {profile.height} cm
        </p>
      </div>

      <div className="grid grid-cols-2 gap-4 items-start">
        <p className="text-gray-500 font-medium">Weight</p>
        <p className="font-bold text-right break-words">
          {profile.weight} kg
        </p>
      </div>

     <div className="grid grid-cols-2 gap-4 items-start">
        <p className="text-gray-500 font-medium">Fitness Level</p>
       <p className="font-bold text-right break-words">
          {profile.fitnessLevel}
        </p>
      </div>

    </div>

  </div>
{/* Fitness Goals */}

<div className="bg-white rounded-3xl p-10 shadow-xl border border-gray-200 hover:shadow-2xl transition-all duration-300">

  <h3 className="text-xl font-bold text-green-700 mb-5">
    🎯 Fitness Goals
  </h3>

  <div className="space-y-5">

    <div className="grid grid-cols-2 gap-4 items-start">
      <p className="text-gray-500 font-medium">Goal</p>
     <p className="font-bold text-right break-words">
        {profile.fitnessGoal?.replaceAll("_", " ")}
      </p>
    </div>

    <div className="grid grid-cols-2 gap-4 items-start">
     <p className="text-gray-500 font-medium">Workout Days</p>
     <p className="font-bold text-right break-words"> {profile.availableDaysPerWeek} days/week
      </p>
    </div>

    <div className="grid grid-cols-2 gap-4 items-start">
     <p className="text-gray-500 font-medium">Preferred Time</p>
      <p className="font-bold text-right break-words">
        {profile.preferredWorkoutTime}
      </p>
    </div>

  </div>

</div>
{/* Medical Information */}

<div className="bg-white rounded-3xl p-10 shadow-xl border border-gray-200 hover:shadow-2xl transition-all duration-300">

  <h3 className="text-xl font-bold text-red-700 mb-5">
    🚑 Medical Information
  </h3>

  <div className="space-y-5">

    <div>
      <p className="text-gray-500">
        Medical Conditions
      </p>

      <p className="font-semibold mt-1">
        {profile.medicalConditions || "None"}
      </p>
    </div>

    <div className="pt-4 border-t">

      <p className="text-gray-500">
        Emergency Contact
      </p>

      <p className="font-semibold mt-1">
        {profile.emergencyContact || "Not provided"}
      </p>

    </div>

  </div>

</div>
</div>
    </div>


</div>

) : (

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

        <div className="mt-8 flex gap-4">

  <button
    type="submit"
    disabled={loading}
    className="flex-1 rounded-2xl bg-violet-700 py-4 text-lg font-semibold text-white transition hover:bg-violet-800"
  >
    {loading
      ? "Saving..."
      : profileExists
      ? "Update Profile"
      : "Save Profile"}
  </button>

  {profileExists && (
    <button
      type="button"
      onClick={() => setEditing(false)}
      className="flex-1 rounded-2xl border border-slate-300 bg-white py-4 text-lg font-semibold hover:bg-slate-100"
    >
      Cancel
    </button>
  )}

</div>
      </form>

)}

    </div>
  );
}