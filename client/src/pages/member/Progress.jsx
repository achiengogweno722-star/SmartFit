import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Legend,
  ReferenceLine,
} from "recharts";

import { addProgressLog, getProgressLogs } from "../../services/progress.service";

export default function Progress() {
  const [progress, setProgress] = useState([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [form, setForm] = useState({
    weight: "",
    notes: "",
  });

  useEffect(() => {
    loadProgress();
  }, []);

  const loadProgress = async () => {
    try {
      const data = await getProgressLogs();
      setProgress(data.progress || []);
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
          error.message ||
          "Failed to load progress history."
      );
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.weight || Number(form.weight) <= 0) {
      toast.error("Please enter a valid weight.");
      return;
    }

    try {
      setSaving(true);
      await addProgressLog({
        weight: Number(form.weight),
        notes: form.notes,
      });
      toast.success("Progress logged successfully.");
      setForm({ weight: "", notes: "" });
      await loadProgress();
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
          error.message ||
          "Failed to log progress."
      );
    } finally {
      setSaving(false);
    }
  };

  const sortedProgress = [...progress].sort(
    (a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
  );

  const chartData = sortedProgress.map((entry, index) => {
    const previous = sortedProgress[index - 1];
    const weightDelta = previous ? entry.weight - previous.weight : null;
    const bmiDelta = previous ? entry.bmi - previous.bmi : null;

    return {
      date: new Date(entry.createdAt).toLocaleDateString(undefined, {
        month: "short",
        day: "numeric",
      }),
      weight: entry.weight,
      bmi: entry.bmi,
      weightDelta,
      bmiDelta,
    };
  });

  const latestEntry = sortedProgress[sortedProgress.length - 1];
  const previousEntry = sortedProgress[sortedProgress.length - 2];
  const weightChange = latestEntry && previousEntry ? latestEntry.weight - previousEntry.weight : 0;
  const bmiChange = latestEntry && previousEntry ? latestEntry.bmi - previousEntry.bmi : 0;
  const trendLabel = previousEntry
    ? weightChange < 0
      ? "Down"
      : weightChange > 0
      ? "Up"
      : "Stable"
    : "N/A";
  const trendColor = previousEntry
    ? weightChange < 0
      ? "text-emerald-600"
      : weightChange > 0
      ? "text-rose-600"
      : "text-slate-600"
    : "text-slate-600";
  const weightChangeLabel = previousEntry ? `${weightChange >= 0 ? "+" : ""}${weightChange.toFixed(1)} kg` : "N/A";
  const bmiChangeLabel = previousEntry ? `${bmiChange >= 0 ? "+" : ""}${bmiChange.toFixed(1)}` : "N/A";
  const weightBadgeClass = weightChange > 0 ? "bg-rose-50 border-rose-100" : weightChange < 0 ? "bg-emerald-50 border-emerald-100" : "bg-slate-50 border-slate-100";
  const bmiBadgeClass = bmiChange > 0 ? "bg-rose-50 border-rose-100" : bmiChange < 0 ? "bg-emerald-50 border-emerald-100" : "bg-slate-50 border-slate-100";
  const trendBadgeClass = trendLabel === "Up" ? "bg-rose-50 border-rose-100" : trendLabel === "Down" ? "bg-emerald-50 border-emerald-100" : "bg-slate-50 border-slate-100";
  const weightPulseClass = weightChange !== 0 ? "animate-pulse" : "";
  const bmiPulseClass = bmiChange !== 0 ? "animate-pulse" : "";
  const trendPulseClass = trendLabel === "Up" || trendLabel === "Down" ? "animate-pulse" : "";
  const weightIcon = weightChange > 0 ? (
    <svg className="h-4 w-4 text-rose-600" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
      <path d="M10 4l6 6H4l6-6z" />
    </svg>
  ) : weightChange < 0 ? (
    <svg className="h-4 w-4 text-emerald-600" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
      <path d="M10 16l-6-6h12l-6 6z" />
    </svg>
  ) : (
    <svg className="h-4 w-4 text-slate-500" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
      <path d="M5 10h10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
  const bmiIcon = bmiChange > 0 ? (
    <svg className="h-4 w-4 text-rose-600" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
      <path d="M10 4l6 6H4l6-6z" />
    </svg>
  ) : bmiChange < 0 ? (
    <svg className="h-4 w-4 text-emerald-600" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
      <path d="M10 16l-6-6h12l-6 6z" />
    </svg>
  ) : (
    <svg className="h-4 w-4 text-slate-500" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
      <path d="M5 10h10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
  const trendIcon = trendLabel === "Up" ? (
    <svg className="h-4 w-4 text-rose-600" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
      <path d="M10 4l6 6H4l6-6z" />
    </svg>
  ) : trendLabel === "Down" ? (
    <svg className="h-4 w-4 text-emerald-600" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
      <path d="M10 16l-6-6h12l-6 6z" />
    </svg>
  ) : (
    <svg className="h-4 w-4 text-slate-500" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
      <path d="M5 10h10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );

  return (
    <div className="space-y-8 px-4 py-8 md:px-8 lg:px-12">
      {false && <section className="overflow-hidden rounded-[2rem] bg-gradient-to-r from-violet-700 via-purple-700 to-indigo-600 p-8 text-white shadow-[0_30px_80px_rgba(124,58,237,0.18)]">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
          <div className="max-w-3xl">
            <p className="uppercase tracking-[0.32em] text-sm text-violet-200">SmartFit Progress</p>
            <h1 className="mt-3 text-4xl font-extrabold tracking-tight sm:text-5xl">
              Track your weight, BMI, and momentum in one place.
            </h1>
            <p className="mt-4 max-w-2xl text-purple-100 text-base sm:text-lg">
              Keep your training consistent and monitor changes with clear charts, trend cues, and log history.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
            <div className="rounded-3xl bg-white/10 p-5 ring-1 ring-white/10 backdrop-blur-xl">
              <p className="text-sm uppercase tracking-[0.24em] text-purple-200">Latest weight</p>
              <p className="mt-3 text-3xl font-semibold">{latestEntry ? `${latestEntry.weight} kg` : "—"}</p>
              <p className="mt-2 text-sm text-purple-200">
                {latestEntry ? `Recorded ${new Date(latestEntry.createdAt).toLocaleDateString()}` : "No entry yet"}
              </p>
            </div>
            <div className="rounded-3xl bg-white/10 p-5 ring-1 ring-white/10 backdrop-blur-xl">
              <p className="text-sm uppercase tracking-[0.24em] text-purple-200">BMI change</p>
              <p className="mt-3 text-3xl font-semibold">{bmiChangeLabel}</p>
              <p className="mt-2 text-sm text-purple-200">Since last entry</p>
            </div>
            <div className="rounded-3xl bg-white/10 p-5 ring-1 ring-white/10 backdrop-blur-xl">
              <p className="text-sm uppercase tracking-[0.24em] text-purple-200">Trend</p>
              <p className={`mt-3 text-3xl font-semibold ${trendColor}`}>{trendLabel}</p>
              <p className="mt-2 text-sm text-purple-200">Weight momentum</p>
            </div>
          </div>
        </div>
      </section>}

      <div className="grid grid-cols-1 gap-6 xl:grid-cols-[1.05fr_1.5fr]">
        <section className="rounded-[1.75rem] bg-white p-7 shadow-lg ring-1 ring-purple-100">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h2 className="text-2xl font-semibold text-slate-900">Add Progress</h2>
              <p className="mt-1 text-sm text-slate-500">Log your latest weight, notes and keep the chart up to date.</p>
            </div>
            <span className="inline-flex items-center rounded-full bg-violet-50 px-4 py-2 text-sm font-semibold text-violet-700">
              {progress.length} logged entries
            </span>
          </div>

          <form onSubmit={handleSubmit} className="mt-8 space-y-5">
            <div className="space-y-2">
              <label className="block text-sm font-semibold text-slate-700">Weight (kg)</label>
              <input
                type="number"
                name="weight"
                value={form.weight}
                onChange={handleChange}
                min="1"
                step="0.1"
                className="w-full rounded-3xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-900 outline-none transition focus:border-violet-500 focus:ring-2 focus:ring-violet-100"
                placeholder="Enter your current weight"
              />
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-semibold text-slate-700">Notes</label>
              <textarea
                name="notes"
                value={form.notes}
                onChange={handleChange}
                rows="4"
                className="w-full rounded-3xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-900 outline-none transition focus:border-violet-500 focus:ring-2 focus:ring-violet-100"
                placeholder="Add any notes about today’s workout or nutrition"
              />
            </div>

            <button
              type="submit"
              disabled={saving}
              className="inline-flex w-full items-center justify-center rounded-3xl bg-violet-700 px-6 py-3 text-base font-semibold text-white shadow-lg shadow-violet-500/20 transition hover:bg-violet-800 disabled:cursor-not-allowed disabled:opacity-70"
            >
              {saving ? "Saving progress..." : "Save Progress"}
            </button>
          </form>
        </section>

        <section className="rounded-[1.75rem] bg-slate-50 p-7 shadow-lg ring-1 ring-purple-100">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h2 className="text-2xl font-semibold text-slate-900">Progress Overview</h2>
              <p className="mt-1 text-sm text-slate-600">Visualize weight and BMI trends over time.</p>
            </div>
            <div className="rounded-full bg-white px-4 py-2 text-sm font-medium text-slate-700 shadow-sm ring-1 ring-slate-200">
              {latestEntry ? new Date(latestEntry.createdAt).toLocaleDateString() : "No entries yet"}
            </div>
          </div>

          {loading ? (
            <div className="mt-8 rounded-3xl bg-white p-8 text-center text-slate-500 ring-1 ring-purple-100">
              Loading progress history...
            </div>
          ) : progress.length === 0 ? (
            <div className="mt-8 rounded-3xl bg-white p-8 text-center text-slate-500 ring-1 ring-purple-100">
              No progress logs yet. Add your first entry to activate the chart.
            </div>
          ) : (
            <>
              <div className="mt-8 grid gap-4 lg:grid-cols-3">
                <div className="rounded-3xl border border-violet-100 bg-white p-4 shadow-sm">
                  <div className="flex items-baseline justify-between gap-3"><p className="text-xs uppercase tracking-[0.24em] text-slate-500">Weight delta</p><p className="text-sm font-semibold text-violet-700">{weightChangeLabel}</p></div>
                  <div className="mt-3 h-28"><ResponsiveContainer width="100%" height="100%"><BarChart data={chartData.slice(-6)}><ReferenceLine y={0} stroke="#cbd5e1" /><Bar dataKey="weightDelta" fill="#8b5cf6" radius={[5, 5, 0, 0]} /></BarChart></ResponsiveContainer></div>
                </div>
                <div className="rounded-3xl border border-teal-100 bg-white p-4 shadow-sm">
                  <div className="flex items-baseline justify-between gap-3"><p className="text-xs uppercase tracking-[0.24em] text-slate-500">BMI delta</p><p className="text-sm font-semibold text-teal-700">{bmiChangeLabel}</p></div>
                  <div className="mt-3 h-28"><ResponsiveContainer width="100%" height="100%"><BarChart data={chartData.slice(-6)}><ReferenceLine y={0} stroke="#cbd5e1" /><Bar dataKey="bmiDelta" fill="#2dd4bf" radius={[5, 5, 0, 0]} /></BarChart></ResponsiveContainer></div>
                </div>
                <div className="rounded-3xl border border-indigo-100 bg-white p-4 shadow-sm">
                  <div className="flex items-baseline justify-between gap-3"><p className="text-xs uppercase tracking-[0.24em] text-slate-500">Weight trend</p><p className={`text-sm font-semibold ${trendColor}`}>{trendLabel}</p></div>
                  <div className="mt-3 h-28"><ResponsiveContainer width="100%" height="100%"><LineChart data={chartData.slice(-6)}><ReferenceLine y={0} stroke="#cbd5e1" /><Line type="monotone" dataKey="weightDelta" stroke="#4f46e5" strokeWidth={3} dot={false} activeDot={{ r: 4 }} /></LineChart></ResponsiveContainer></div>
                </div>
              </div>

              <div className="mt-8 h-[420px] rounded-[1.5rem] bg-white p-4 shadow-sm ring-1 ring-slate-200">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={chartData} margin={{ top: 15, right: 20, left: 0, bottom: 10 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                    <XAxis dataKey="date" tick={{ fill: "#6b7280", fontSize: 12 }} axisLine={false} tickLine={false} />
                    <YAxis yAxisId="weight" tick={{ fill: "#6b7280", fontSize: 12 }} axisLine={false} tickLine={false} width={44} />
                    <YAxis yAxisId="bmi" orientation="right" tick={{ fill: "#0f766e", fontSize: 12 }} axisLine={false} tickLine={false} width={38} />
                    <Tooltip
                      cursor={{ stroke: "#c7d2fe", strokeWidth: 2 }}
                      contentStyle={{
                        backgroundColor: "#ffffff",
                        border: "1px solid #e5e7eb",
                        borderRadius: 18,
                      }}
                    />
                    <Legend verticalAlign="top" height={48} wrapperStyle={{ paddingBottom: 10 }} />
                    <Line
                      type="monotone"
                      dataKey="weight"
                      yAxisId="weight"
                      stroke="#7c3aed"
                      name="Weight (kg)"
                      strokeWidth={3}
                      dot={{ r: 4 }}
                      activeDot={{ r: 6 }}
                    />
                    <Line
                      type="monotone"
                      dataKey="bmi"
                      yAxisId="bmi"
                      stroke="#14b8a6"
                      name="BMI"
                      strokeWidth={3}
                      dot={{ r: 4 }}
                      activeDot={{ r: 6 }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>

              <div className="mt-5 rounded-[1.5rem] bg-white p-5 shadow-sm ring-1 ring-slate-200">
                <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">
                  <div>
                    <h3 className="font-semibold text-slate-900">Change at each check-in</h3>
                    <p className="text-sm text-slate-500">Bars show movement since the previous entry; the first entry is the baseline.</p>
                  </div>
                  <div className="flex gap-3 text-xs font-medium">
                    <span className="text-violet-700">Weight (kg)</span>
                    <span className="text-teal-700">BMI</span>
                  </div>
                </div>
                <div className="mt-4 h-52">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={chartData} margin={{ top: 10, right: 20, left: 0, bottom: 0 }}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" vertical={false} />
                      <XAxis dataKey="date" tick={{ fill: "#6b7280", fontSize: 12 }} axisLine={false} tickLine={false} />
                      <YAxis tick={{ fill: "#6b7280", fontSize: 12 }} axisLine={false} tickLine={false} width={40} />
                      <Tooltip
                        cursor={{ fill: "#f5f3ff" }}
                        formatter={(value, name) => [
                          `${Number(value).toFixed(1)}${name === "Weight delta" ? " kg" : ""}`,
                          name,
                        ]}
                        contentStyle={{ backgroundColor: "#ffffff", border: "1px solid #e5e7eb", borderRadius: 18 }}
                      />
                      <Bar dataKey="weightDelta" name="Weight delta" fill="#8b5cf6" radius={[6, 6, 0, 0]} />
                      <Bar dataKey="bmiDelta" name="BMI delta" fill="#2dd4bf" radius={[6, 6, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </>
          )}
        </section>
      </div>

      <section className="rounded-[1.75rem] bg-white p-7 shadow-lg ring-1 ring-purple-100">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="text-2xl font-semibold text-slate-900">History</h2>
            <p className="mt-1 text-sm text-slate-500">Review your past progress logs in detail.</p>
          </div>
          <span className="inline-flex items-center rounded-full bg-violet-50 px-4 py-2 text-sm font-semibold text-violet-700">
            {progress.length} entries
          </span>
        </div>

        {loading ? (
          <div className="mt-8 rounded-3xl bg-slate-50 p-8 text-center text-slate-500 ring-1 ring-slate-200">
            Loading progress history...
          </div>
        ) : progress.length === 0 ? (
          <div className="mt-8 rounded-3xl bg-slate-50 p-8 text-center text-slate-500 ring-1 ring-slate-200">
            No progress logs found.
          </div>
        ) : (
          <div className="mt-8 space-y-4">
            {progress.map((entry) => (
              <div
                key={entry.id}
                className="rounded-3xl border border-slate-200 bg-slate-50 p-5 shadow-sm"
              >
                <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
                  <div>
                    <p className="text-sm text-slate-500">
                      {new Date(entry.createdAt).toLocaleString()}
                    </p>
                    <p className="mt-2 text-lg font-semibold text-slate-900">
                      {entry.weight} kg • BMI {entry.bmi}
                    </p>
                  </div>
                  <p className="rounded-3xl bg-white px-4 py-3 text-sm text-slate-700 shadow-sm ring-1 ring-slate-200">
                    {entry.notes || "No notes provided."}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
