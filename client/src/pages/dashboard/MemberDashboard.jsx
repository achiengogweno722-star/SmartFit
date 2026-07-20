import { useEffect, useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

import { getRecommendations } from "../../services/recommendation.service";
import { getNutritionRecommendations } from "../../services/nutritionRecommendation.service";

export default function MemberDashboard() {
  const { user } = useAuth();

  const [recommendations, setRecommendations] = useState([]);
  const [nutritionRecommendations, setNutritionRecommendations] = useState([]);

  const [loadingRecommendations, setLoadingRecommendations] = useState(true);
  const [loadingNutrition, setLoadingNutrition] = useState(true);

  useEffect(() => {
    loadWorkoutRecommendations();
    loadNutritionRecommendations();
  }, []);

  // ================= WORKOUT =================
  const loadWorkoutRecommendations = async () => {
    try {
      const data = await getRecommendations();

      console.log("========== WORKOUT API RESPONSE ==========");
      console.log(data);
      console.log("Recommendations:", data.recommendations);
      console.log("Count:", data.count);
      console.log("==========================================");

      setRecommendations(data.recommendations || []);
    } catch (error) {
      console.error("Workout Error:", error);

      toast.error(
        error.response?.data?.message ||
          error.message ||
          "Failed to load workout recommendations."
      );
    } finally {
      setLoadingRecommendations(false);
    }
  };

  // ================= NUTRITION =================
  const loadNutritionRecommendations = async () => {
    try {
      const data = await getNutritionRecommendations();

      console.log("========== NUTRITION API RESPONSE ==========");
      console.log(data);
      console.log("Recommendations:", data.recommendations);
      console.log("Count:", data.count);
      console.log("===========================================");

      setNutritionRecommendations(data.recommendations || []);
    } catch (error) {
      console.error("========== NUTRITION ERROR ==========");
      console.error(error);
      console.error("====================================");

      toast.error(
        error.response?.data?.message ||
          error.message ||
          "Failed to load nutrition recommendations."
      );
    } finally {
      setLoadingNutrition(false);
    }
  };

  return (
    <div className="space-y-8">
      {/* Welcome */}
      <div className="bg-white rounded-xl shadow-md p-8">
        <h1 className="text-3xl font-bold text-blue-600">
          Welcome, {user?.fullName}
        </h1>

        <p className="text-gray-600 mt-2">
          Here's an overview of your SmartFit account.
        </p>
      </div>

      {/* User Info */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-xl shadow-md p-6">
          <h2 className="font-semibold">Email</h2>
          <p>{user?.email}</p>
        </div>

        <div className="bg-white rounded-xl shadow-md p-6">
          <h2 className="font-semibold">Role</h2>
          <p>{user?.role}</p>
        </div>

        <div className="bg-white rounded-xl shadow-md p-6">
          <h2 className="font-semibold">User ID</h2>
          <p>{user?.id}</p>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-white rounded-xl shadow-md p-8">
        <h2 className="text-2xl font-semibold mb-6">
          Quick Actions
        </h2>

        <div className="grid grid-cols-2 gap-4">
          <Link
            to="/member/profile"
            className="bg-blue-600 text-white rounded-lg p-4 text-center hover:bg-blue-700 transition"
          >
            View Profile
          </Link>

          <button
            className="bg-orange-600 text-white rounded-lg p-4"
            disabled
          >
            Progress Tracking (Coming Soon)
          </button>
        </div>
      </div>

      {/* Workout Recommendations */}
      <div className="bg-white rounded-xl shadow-md p-8">
        <h2 className="text-2xl font-bold text-blue-600 mb-6">
          Top Workout Recommendations
        </h2>

        {loadingRecommendations ? (
          <p>Loading workout recommendations...</p>
        ) : recommendations.length === 0 ? (
          <p>No workout recommendations found.</p>
        ) : (
          recommendations.slice(0, 5).map((item) => (
            <div
              key={item.id}
              className="border rounded-lg p-5 mb-4"
            >
              <h3 className="text-xl font-bold">
                {item.workoutPlan?.name}
              </h3>

              <p className="text-gray-600">
                {item.workoutPlan?.description}
              </p>

              <div className="grid grid-cols-2 gap-3 mt-3">
                <p>
                  <strong>Goal:</strong>{" "}
                  {item.workoutPlan?.targetGoal?.replaceAll("_", " ")}
                </p>

                <p>
                  <strong>Difficulty:</strong>{" "}
                  {item.workoutPlan?.difficulty}
                </p>

                <p>
                  <strong>Duration:</strong>{" "}
                  {item.workoutPlan?.duration} mins
                </p>

                <p>
                  <strong>Calories:</strong>{" "}
                  {item.workoutPlan?.calories}
                </p>

                <p>
                  <strong>Sessions:</strong>{" "}
                  {item.workoutPlan?.sessionsPerWeek}/week
                </p>

                <p className="text-green-600 font-bold">
                  Score: {item.recommendationScore}%
                </p>
              </div>

              <p className="mt-3">
                <strong>Reason:</strong> {item.reason}
              </p>
            </div>
          ))
        )}
      </div>

      {/* Nutrition Recommendations */}
      <div className="bg-white rounded-xl shadow-md p-8">
        <h2 className="text-2xl font-bold text-green-600 mb-6">
          Top Nutrition Recommendations
        </h2>

        {loadingNutrition ? (
          <p>Loading nutrition recommendations...</p>
        ) : nutritionRecommendations.length === 0 ? (
          <p>No nutrition recommendations found.</p>
        ) : (
          nutritionRecommendations.slice(0, 5).map((item) => (
            <div
              key={item.id}
              className="border rounded-lg p-5 mb-4"
            >
              <h3 className="text-xl font-bold">
                {item.mealPlan?.name}
              </h3>

              <div className="grid grid-cols-2 gap-3 mt-3">
                <p>
                  <strong>Goal:</strong>{" "}
                  {item.mealPlan?.goal?.replaceAll("_", " ")}
                </p>

                <p>
                  <strong>Calories:</strong>{" "}
                  {item.mealPlan?.calories}
                </p>
              </div>

              <div className="mt-4 space-y-2">
                <p>
                  <strong>Breakfast:</strong>{" "}
                  {item.mealPlan?.breakfast}
                </p>

                <p>
                  <strong>Lunch:</strong>{" "}
                  {item.mealPlan?.lunch}
                </p>

                <p>
                  <strong>Dinner:</strong>{" "}
                  {item.mealPlan?.dinner}
                </p>

                <p>
                  <strong>Snacks:</strong>{" "}
                  {item.mealPlan?.snacks}
                </p>

                <p className="text-green-600 font-bold">
                  Recommendation Score: {item.recommendationScore}%
                </p>

                <p>
                  <strong>Reason:</strong> {item.reason}
                </p>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}