import { useState } from "react";

export default function CreateMemberProfile() {
  const [formData, setFormData] = useState({
    age: "",
    gender: "",
    height: "",
    weight: "",
    fitnessLevel: "",
    fitnessGoal: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log(formData);
  };

  return (
    <div className="max-w-3xl mx-auto bg-white rounded-xl shadow-md p-8">
      <h1 className="text-3xl font-bold text-blue-600 mb-6">
        Complete Your Profile
      </h1>

      <form
        onSubmit={handleSubmit}
        className="grid grid-cols-1 md:grid-cols-2 gap-6"
      >
        <div>
          <label className="block mb-2 font-semibold">
            Age
          </label>

          <input
            type="number"
            name="age"
            value={formData.age}
            onChange={handleChange}
            className="w-full border rounded-lg p-3"
            required
          />
        </div>

        <div>
          <label className="block mb-2 font-semibold">
            Gender
          </label>

          <select
            name="gender"
            value={formData.gender}
            onChange={handleChange}
            className="w-full border rounded-lg p-3"
            required
          >
            <option value="">Select</option>
            <option value="MALE">Male</option>
            <option value="FEMALE">Female</option>
            <option value="OTHER">Other</option>
          </select>
        </div>

        <div>
          <label className="block mb-2 font-semibold">
            Height (cm)
          </label>

          <input
            type="number"
            name="height"
            value={formData.height}
            onChange={handleChange}
            className="w-full border rounded-lg p-3"
            required
          />
        </div>

        <div>
          <label className="block mb-2 font-semibold">
            Weight (kg)
          </label>

          <input
            type="number"
            name="weight"
            value={formData.weight}
            onChange={handleChange}
            className="w-full border rounded-lg p-3"
            required
          />
        </div>

        <div>
          <label className="block mb-2 font-semibold">
            Fitness Level
          </label>

          <select
            name="fitnessLevel"
            value={formData.fitnessLevel}
            onChange={handleChange}
            className="w-full border rounded-lg p-3"
            required
          >
            <option value="">Select</option>
            <option value="BEGINNER">Beginner</option>
            <option value="INTERMEDIATE">Intermediate</option>
            <option value="ADVANCED">Advanced</option>
          </select>
        </div>

        <div>
          <label className="block mb-2 font-semibold">
            Fitness Goal
          </label>

          <select
            name="fitnessGoal"
            value={formData.fitnessGoal}
            onChange={handleChange}
            className="w-full border rounded-lg p-3"
            required
          >
            <option value="">Select</option>
            <option value="WEIGHT_LOSS">Weight Loss</option>
            <option value="MUSCLE_GAIN">Muscle Gain</option>
            <option value="STRENGTH">Strength</option>
            <option value="ENDURANCE">Endurance</option>
            <option value="GENERAL_FITNESS">General Fitness</option>
          </select>
        </div>

        <button
          type="submit"
          className="md:col-span-2 bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700"
        >
          Save Profile
        </button>
      </form>
    </div>
  );
}