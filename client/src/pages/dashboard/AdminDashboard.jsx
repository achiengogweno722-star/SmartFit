import { useEffect, useState } from "react";
import {
  BarChart,
  Bar,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

import { getDashboardStats } from "../../services/dashboard.service";

export default function AdminDashboard() {
  const [dashboard, setDashboard] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadStats = async () => {
      try {
        const data = await getDashboardStats();
        setDashboard(data.dashboard);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    loadStats();
  }, []);

  const chartData = dashboard
    ? [
        { name: "Members", value: dashboard.totalMembers },
        { name: "Trainers", value: dashboard.totalTrainers },
        { name: "Workout Plans", value: dashboard.totalWorkoutPlans },
        { name: "Completions", value: dashboard.totalWorkoutCompletions },
      ]
    : [];

  return (
    <div className="space-y-8 px-4 py-8 md:px-0">
      {false && <section className="overflow-hidden rounded-[2rem] bg-gradient-to-r from-cyan-600 via-slate-800 to-violet-700 p-8 text-white shadow-[0_30px_80px_rgba(79,70,229,0.18)]">
        <div className="flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">
          <div className="max-w-3xl">
            <p className="uppercase tracking-[0.32em] text-sm text-cyan-200">Admin Control</p>
            <h1 className="mt-4 text-4xl font-extrabold tracking-tight sm:text-5xl">Gym performance dashboard</h1>
            <p className="mt-4 max-w-2xl text-slate-200 text-base sm:text-lg">
              Monitor key member metrics, activity breakdowns, and the health of your exercise programs.
            </p>
          </div>
          <div className="grid gap-4 sm:grid-cols-3">
            <div className="rounded-[1.5rem] bg-white/10 p-5 ring-1 ring-white/10 backdrop-blur-xl">
              <p className="text-sm uppercase tracking-[0.24em] text-cyan-200">Members</p>
              <p className="mt-3 text-3xl font-semibold">{loading ? "..." : dashboard?.totalMembers ?? 0}</p>
            </div>
            <div className="rounded-[1.5rem] bg-white/10 p-5 ring-1 ring-white/10 backdrop-blur-xl">
              <p className="text-sm uppercase tracking-[0.24em] text-cyan-200">Trainers</p>
              <p className="mt-3 text-3xl font-semibold">{loading ? "..." : dashboard?.totalTrainers ?? 0}</p>
            </div>
            <div className="rounded-[1.5rem] bg-white/10 p-5 ring-1 ring-white/10 backdrop-blur-xl">
              <p className="text-sm uppercase tracking-[0.24em] text-cyan-200">Plans</p>
              <p className="mt-3 text-3xl font-semibold">{loading ? "..." : dashboard?.totalWorkoutPlans ?? 0}</p>
            </div>
          </div>
        </div>
      </section>}

      <div className="grid grid-cols-1 gap-6 xl:grid-cols-[1.2fr_0.8fr]">
        <section className="rounded-[1.75rem] bg-white p-7 shadow-lg ring-1 ring-slate-200">
          <h2 className="text-2xl font-semibold text-slate-900">Performance summary</h2>
          <p className="mt-3 text-slate-600">Review the most important metrics for members, trainers, and workouts.</p>

          <div className="mt-8 grid gap-4 sm:grid-cols-2">
            <div className="rounded-3xl border border-slate-200 bg-slate-50 p-5">
              <p className="text-sm text-slate-500">Workout completions</p>
              <p className="mt-3 text-3xl font-bold text-purple-800">{loading ? "..." : dashboard?.totalWorkoutCompletions ?? 0}</p>
            </div>
            <div className="rounded-3xl border border-slate-200 bg-slate-50 p-5">
              <p className="text-sm text-slate-500">Calories burned</p>
              <p className="mt-3 text-3xl font-bold text-purple-800">{loading ? "..." : dashboard?.totalCaloriesBurned ?? 0}</p>
            </div>
            <div className="rounded-3xl border border-slate-200 bg-slate-50 p-5">
              <p className="text-sm text-slate-500">Average BMI</p>
              <p className="mt-3 text-3xl font-bold text-purple-800">{loading ? "..." : dashboard?.averageBMI ?? 0}</p>
            </div>
            <div className="rounded-3xl border border-slate-200 bg-slate-50 p-5">
              <p className="text-sm text-slate-500">Average weight</p>
              <p className="mt-3 text-3xl font-bold text-purple-800">{loading ? "..." : dashboard?.averageWeight ?? 0}</p>
            </div>
          </div>
        </section>

        <section className="rounded-[1.75rem] bg-slate-50 p-7 shadow-lg ring-1 ring-slate-200">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h2 className="text-2xl font-semibold text-slate-900">Activity breakdown</h2>
              <p className="mt-2 text-slate-600">See how gym engagement is distributed across core categories.</p>
            </div>
            <span className="inline-flex items-center rounded-full bg-white px-4 py-2 text-sm font-semibold text-slate-700 shadow-sm ring-1 ring-slate-200">
              {loading ? "Loading..." : "Updated"}
            </span>
          </div>

          <div className="mt-6 h-[420px] rounded-[1.5rem] bg-white p-4 shadow-sm ring-1 ring-slate-200">
            {loading ? (
              <div className="flex h-full items-center justify-center text-slate-500">Loading dashboard charts...</div>
            ) : (
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={chartData} margin={{ top: 20, right: 20, left: 0, bottom: 10 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                  <XAxis dataKey="name" tick={{ fill: "#475569" }} axisLine={false} tickLine={false} />
                  <YAxis tick={{ fill: "#475569" }} axisLine={false} tickLine={false} />
                  <Tooltip />
                  <Bar dataKey="value" fill="#7c3aed" radius={[8, 8, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            )}
          </div>
        </section>
      </div>

      <section className="rounded-[1.75rem] bg-white p-7 shadow-lg ring-1 ring-slate-200">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <h2 className="text-2xl font-semibold text-slate-900">Most popular workout</h2>
            <p className="mt-2 text-slate-600">The workout your members engage with most.</p>
          </div>
          <span className="rounded-full bg-violet-50 px-4 py-2 text-sm font-semibold text-violet-700 shadow-sm ring-1 ring-violet-100">
            {loading ? "..." : dashboard?.mostPopularWorkout || "No data"}
          </span>
        </div>
        {!loading && dashboard?.mostPopularWorkout && (
          <p className="mt-6 text-slate-700">{dashboard.mostPopularWorkout}</p>
        )}
      </section>
    </div>
  );
}
