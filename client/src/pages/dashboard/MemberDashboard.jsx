
import { useEffect, useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { Link, Navigate } from "react-router-dom";
import { toast } from "react-toastify";

import { getRecommendations } from "../../services/recommendation.service";
import { getNutritionRecommendations } from "../../services/nutritionRecommendation.service";
import { getProfile } from "../../services/member.service";

export default function MemberDashboard() {
  const { user } = useAuth();

  const [recommendations, setRecommendations] = useState([]);
  const [nutritionRecommendations, setNutritionRecommendations] = useState([]);

  const [loadingRecommendations, setLoadingRecommendations] = useState(true);
  const [loadingNutrition, setLoadingNutrition] = useState(true);

  // NEW
  const [loadingProfile, setLoadingProfile] = useState(true);
  const [profileExists, setProfileExists] = useState(false);

  useEffect(() => {
    checkProfile();
  }, []);

  useEffect(() => {
    if (profileExists) {
      loadWorkoutRecommendations();
      loadNutritionRecommendations();
    }
  }, [profileExists]);

  const checkProfile = async () => {
  try {
    await getProfile();
    setProfileExists(true);
  } catch (error) {
    console.error("Profile check failed:", error);
    setProfileExists(false);
  } finally {
    setLoadingProfile(false);
  }
};

  const loadWorkoutRecommendations = async () => {
    try {
      const data = await getRecommendations();


      setRecommendations(data.recommendations || []);
    } catch (error) {


      toast.error(
        error.response?.data?.message ||
          error.message ||
          "Failed to load workout recommendations."
      );
    } finally {
      setLoadingRecommendations(false);
    }
  };


  const loadNutritionRecommendations = async () => {
    try {
    
      const data = await getNutritionRecommendations();
    
      setNutritionRecommendations(data.recommendations || []);
    } catch (error) {


      toast.error(
        error.response?.data?.message ||
          error.message ||
          "Failed to load nutrition recommendations."
      );
    } finally {
      setLoadingNutrition(false);
    }
  };

  if (loadingProfile) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-100">
      <div className="bg-white rounded-3xl shadow-xl px-12 py-10 text-center">
        <div className="mx-auto h-16 w-16 animate-spin rounded-full border-4 border-violet-600 border-t-transparent"></div>

        <h2 className="mt-6 text-3xl font-bold text-slate-800">
          SmartFit
        </h2>

        <p className="mt-2 text-gray-600">
          Preparing your dashboard...
        </p>
      </div>
    </div>
  );
}

  if (!profileExists) {
    return <Navigate to="/member/profile" replace />;
  }

  return (
    <div className="space-y-8 px-4 py-8 md:px-0">
     
<section className="rounded-3xl bg-gradient-to-r from-purple-700 via-violet-600 to-indigo-600 text-white px-8 py-6 shadow-xl">
  <div className="flex flex-col lg:flex-row justify-between items-center gap-8">
    <div>
      <p className="uppercase tracking-widest text-purple-200">
        SMARTFIT MEMBER
      </p>
<p className="mt-3 text-purple-200">
  {new Date().toLocaleDateString(undefined, {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  })}
</p>
    <h1 className="text-3xl font-bold mt-2">
        Welcome back,
      </h1>

     <h2 className="text-2xl font-bold mt-1">
        {user?.fullName}
      </h2>

      <p className="mt-5 max-w-xl text-purple-100">
        Stay consistent with your workouts, monitor your progress,
        and receive personalized workout and nutrition
        recommendations designed just for you.
      </p>
    </div>

    <div className="grid grid-cols-3 gap-5">
     <div className="bg-white/20 backdrop-blur rounded-2xl p-4 text-center">
       <p className="text-2xl font-bold">
          {recommendations.length}
        </p>
        <p className="text-sm mt-2">
          Workouts
        </p>
      </div>

     <div className="bg-white/20 backdrop-blur rounded-2xl p-4 text-center">
       <p className="text-2xl font-bold">
          {nutritionRecommendations.length}
        </p>
        <p className="text-sm mt-2">
          Meal Plans
        </p>
      </div>

     <div className="bg-white/20 backdrop-blur rounded-2xl p-4 text-center">
       <p className="text-2xl font-bold">
          {user?.role}
        </p>
        <p className="text-sm mt-2">
          Account
        </p>
      </div>
    </div>
  </div>
</section>


      <div className="space-y-6">
       
<section className="col-span-1">
  <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">

    <div className="bg-white rounded-3xl p-6 shadow-lg border border-gray-100 hover:shadow-xl transition">
      <div className="flex justify-between items-center">
        <div>
          <p className="text-gray-500">Workout Plans</p>

          <h2 className="text-4xl font-bold text-violet-700 mt-2">
            {recommendations?.length ?? 0}
          </h2>
        </div>

        <div className="text-5xl">
          💪
        </div>
      </div>
    </div>

    <div className="bg-white rounded-3xl p-6 shadow-lg border border-gray-100 hover:shadow-xl transition">
      <div className="flex justify-between items-center">
        <div>
          <p className="text-gray-500">Meal Plans</p>

          <h2 className="text-4xl font-bold text-green-600 mt-2">
            {nutritionRecommendations?.length ?? 0}
          </h2>
        </div>

        <div className="text-5xl">
          🥗
        </div>
      </div>
    </div>

    <div className="bg-white rounded-3xl p-6 shadow-lg border border-gray-100 hover:shadow-xl transition">
      <div className="flex justify-between items-center">
        <div>
          <p className="text-gray-500">Member</p>

          <h2 className="text-xl font-bold mt-2">
            {user?.fullName}
          </h2>
        </div>

        <div className="text-5xl">
          👤
        </div>
      </div>
    </div>

    <div className="bg-white rounded-3xl p-6 shadow-lg border border-gray-100 hover:shadow-xl transition">
      <div className="flex justify-between items-center">
        <div>
          <p className="text-gray-500">Current Goal</p>

          <h2 className="text-lg font-bold mt-2">
            {recommendations?.[0]?.workoutPlan?.targetGoal
              ? recommendations[0].workoutPlan.targetGoal.replaceAll("_", " ")
              : "Not Set"}
          </h2>
        </div>

        <div className="text-5xl">
          🎯
        </div>
      </div>
    </div>

  </div>
</section>

<section className="rounded-3xl bg-white p-7 shadow-lg">

  <h2 className="text-2xl font-bold text-slate-800">
    Quick Actions
  </h2>

  <p className="mt-2 text-gray-500">
    Access everything you need with one click.
  </p>

  <div className="grid grid-cols-2 gap-4 mt-8">

    <Link
      to="/member/profile"
      className="rounded-2xl bg-violet-600 text-white p-5 hover:bg-violet-700 transition"
    >
      <h3 className="font-bold text-lg">
        👤 My Profile
      </h3>

      <p className="text-violet-100 mt-2">
        View or edit your profile
      </p>
    </Link>

    <Link
      to="/member/progress"
      className="rounded-2xl bg-orange-500 text-white p-5 hover:bg-orange-600 transition"
    >
      <h3 className="font-bold text-lg">
        📈 Progress
      </h3>

      <p className="text-orange-100 mt-2">
        Track your fitness journey
      </p>
    </Link>

    <Link
      to="/member/appointments"
      className="rounded-2xl bg-blue-600 text-white p-5 hover:bg-blue-700 transition"
    >
      <h3 className="font-bold text-lg">
        📅 Appointments
      </h3>

      <p className="text-blue-100 mt-2">
        View upcoming sessions
      </p>
    </Link>

    <Link
      to="/member/attendance"
      className="rounded-2xl bg-green-600 text-white p-5 hover:bg-green-700 transition"
    >
      <h3 className="font-bold text-lg">
        ✅ Attendance
      </h3>

      <p className="text-green-100 mt-2">
        Check your attendance history
      </p>
    </Link>

  </div>

</section>
        
      </div>

      <div className="space-y-8">
      <section className="min-w-0 rounded-[1.75rem] bg-white p-7 shadow-lg ring-1 ring-purple-100">
        <div className="flex items-center justify-between border-b border-gray-200 pb-5 mb-8">
  <div>
    <h2 className="text-3xl font-bold text-gray-900">
      💪 Workout Recommendations
    </h2>

    <p className="text-gray-500 mt-1">
      Personalized workouts selected just for you.
    </p>
  </div>

  <div className="bg-violet-600 text-white px-5 py-2 rounded-full font-semibold shadow-lg">
    {recommendations.length} Plans
  </div>
</div>

        <div className="mt-6 space-y-4">
          {loadingRecommendations ? (
            <div className="rounded-[1.5rem] bg-purple-50 p-6 text-center text-slate-500 ring-1 ring-slate-200">
              Loading workout recommendations...
            </div>
          ) : recommendations.length === 0 ? (
            <div className="rounded-[1.5rem] bg-purple-50 p-6 text-center text-slate-500 ring-1 ring-slate-200">
              No workout recommendations found.
            </div>
          ) : (
            recommendations.slice(0, 5).map((item) => (
             <div
  key={item.id}
  className="bg-white rounded-3xl shadow-lg border border-gray-100 overflow-hidden hover:shadow-2xl hover:-translate-y-1 transition-all duration-300"
>
  {/* Card Header */}
  <div className="bg-gradient-to-r from-violet-600 via-purple-600 to-indigo-600 p-6 text-white">
    <div className="flex justify-between items-start">
      <div>
        <h3 className="text-2xl font-bold">
          {item.workoutPlan?.name}
        </h3>

        <p className="text-violet-100 mt-2">
          {item.workoutPlan?.description}
        </p>
      </div>

      <span className="bg-white text-violet-700 px-4 py-2 rounded-full font-bold">
        {item.recommendationScore}%
      </span>
    </div>
  </div>

  {/* Card Body */}
  <div className="p-6">

    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">

      <div className="bg-violet-50 rounded-2xl p-4 text-center">
        <p className="text-3xl">🎯</p>
        <p className="text-xs text-gray-500 mt-2">Goal</p>
        <p className="font-bold mt-1">
          {item.workoutPlan?.targetGoal?.replaceAll("_", " ")}
        </p>
      </div>

      <div className="bg-blue-50 rounded-2xl p-4 text-center">
        <p className="text-3xl">🔥</p>
        <p className="text-xs text-gray-500 mt-2">Difficulty</p>
        <p className="font-bold mt-1">
          {item.workoutPlan?.difficulty}
        </p>
      </div>

      <div className="bg-orange-50 rounded-2xl p-4 text-center">
        <p className="text-3xl">⏱️</p>
        <p className="text-xs text-gray-500 mt-2">Duration</p>
        <p className="font-bold mt-1">
          {item.workoutPlan?.duration} mins
        </p>
      </div>

      <div className="bg-green-50 rounded-2xl p-4 text-center">
        <p className="text-3xl">📅</p>
        <p className="text-xs text-gray-500 mt-2">Sessions</p>
        <p className="font-bold mt-1">
          {item.workoutPlan?.sessionsPerWeek}/week
        </p>
      </div>

    </div>

    <div className="mt-6 flex items-center justify-between">

      <div>
        <p className="text-sm text-gray-500">
          Recommendation Reason
        </p>

        <p className="font-semibold text-gray-800">
          {item.reason}
        </p>
      </div>

      <button className="bg-violet-600 hover:bg-violet-700 text-white px-6 py-3 rounded-xl font-semibold transition">
        Start Workout
      </button>

    </div>

  </div>
</div>))
          )}
        </div>
      </section>

      <section className="min-w-0 rounded-[1.75rem] bg-slate-50 p-7 shadow-lg ring-1 ring-purple-100">
       <div className="flex items-center justify-between border-b border-gray-200 pb-5 mb-8">
  <div>
    <h2 className="text-3xl font-bold text-gray-900">
      🥗 Nutrition Recommendations
    </h2>

    <p className="text-gray-500 mt-1">
      Healthy meals tailored to your fitness goal.
    </p>
  </div>

  <div className="bg-green-600 text-white px-5 py-2 rounded-full font-semibold shadow-lg">
    {nutritionRecommendations.length} Meals
  </div>
</div>

        <div className="mt-6 space-y-4">
          {loadingNutrition ? (
            <div className="rounded-[1.5rem] bg-white p-6 text-center text-slate-500 ring-1 ring-slate-200">
              Loading nutrition recommendations...
            </div>
          ) : nutritionRecommendations.length === 0 ? (
            <div className="rounded-[1.5rem] bg-white p-6 text-center text-slate-500 ring-1 ring-slate-200">
              No nutrition recommendations found.
            </div>
          ) : (
           nutritionRecommendations.slice(0, 5).map((item) => (
  <div
    key={item.id}
    className="rounded-3xl bg-white p-6 shadow-lg border border-gray-100"
  >
    <h3 className="text-xl font-bold text-green-700">
      {item.meal?.name || "Meal Recommendation"}
    </h3>

    <p className="mt-2 text-gray-600">
      {item.reason}
    </p>

    <div className="mt-4 flex justify-between items-center">
      <span className="rounded-full bg-green-100 px-4 py-2 text-sm font-semibold text-green-700">
        Score: {item.recommendationScore}
      </span>

      <span className="text-sm text-gray-500">
        {item.meal?.mealType}
      </span>
    </div>
  </div>
))
          )}
        </div>
      </section>
      </div>
    </div>
  );
}


