import { useEffect, useMemo, useState } from "react";
import { toast } from "react-toastify";
import { Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { checkIn, checkOut, getMyAttendance } from "../../services/attendance.service";

const weekDays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
const dateKey = (date) => new Date(date).toLocaleDateString("en-CA");
const timeLabel = (date) => new Date(date).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });

export default function Attendance() {
  const [attendance, setAttendance] = useState([]);
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState(false);
  const [isCheckedIn, setIsCheckedIn] = useState(false);
  const [visibleMonth, setVisibleMonth] = useState(() => new Date(new Date().getFullYear(), new Date().getMonth(), 1));
  const [selectedDate, setSelectedDate] = useState(() => dateKey(new Date()));

  useEffect(() => { loadAttendance(); }, []);

  const loadAttendance = async () => {
    try {
      const data = await getMyAttendance();
      const records = data.attendance || [];
      setAttendance(records);
      setIsCheckedIn(records.some((item) => item.checkOut === null));
    } catch (error) {
      toast.error(error.response?.data?.message || error.message || "Failed to load attendance history.");
    } finally {
      setLoading(false);
    }
  };

  const attendanceByDay = useMemo(() => attendance.reduce((days, entry) => {
    const key = dateKey(entry.checkIn);
    days[key] = [...(days[key] || []), entry];
    return days;
  }, {}), [attendance]);

  const calendarDays = useMemo(() => {
    const year = visibleMonth.getFullYear();
    const month = visibleMonth.getMonth();
    const firstDay = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    return Array.from({ length: 42 }, (_, index) => {
      const dayNumber = index - firstDay + 1;
      return dayNumber > 0 && dayNumber <= daysInMonth ? new Date(year, month, dayNumber) : null;
    });
  }, [visibleMonth]);

  const selectedEntries = attendanceByDay[selectedDate] || [];
  const selectedDateLabel = new Date(`${selectedDate}T12:00:00`).toLocaleDateString(undefined, { weekday: "long", month: "long", day: "numeric", year: "numeric" });
  const weeklyChartData = useMemo(() => weekDays.map((day, index) => ({
    day,
    visits: attendance.filter((entry) => new Date(entry.checkIn).getDay() === index).length,
  })), [attendance]);
  const streakSummary = useMemo(() => {
    const visitDays = new Set(attendance.map((entry) => dateKey(entry.checkIn)));
    const today = new Date();
    const latestStreakDay = new Date(today);
    if (!visitDays.has(dateKey(latestStreakDay))) latestStreakDay.setDate(latestStreakDay.getDate() - 1);
    let current = 0;
    while (visitDays.has(dateKey(latestStreakDay))) { current += 1; latestStreakDay.setDate(latestStreakDay.getDate() - 1); }
    const orderedDays = [...visitDays].sort();
    let longest = 0; let run = 0; let rewardedWeeks = 0; let previous = null;
    orderedDays.forEach((key) => {
      const currentDay = new Date(`${key}T12:00:00`);
      const followsPrevious = previous && Math.round((currentDay - previous) / 86400000) === 1;
      if (followsPrevious) run += 1;
      else { rewardedWeeks += Math.floor(run / 7); run = 1; }
      longest = Math.max(longest, run);
      previous = currentDay;
    });
    rewardedWeeks += Math.floor(run / 7);
    const recentDays = Array.from({ length: 14 }, (_, index) => {
      const date = new Date(today); date.setDate(today.getDate() - 13 + index);
      return { day: date.toLocaleDateString(undefined, { month: "short", day: "numeric" }), visit: visitDays.has(dateKey(date)) ? 1 : 0 };
    });
    return { current, longest, rewardPoints: rewardedWeeks * 100, recentDays };
  }, [attendance]);
  const fireCount = streakSummary.current >= 21 ? 4 : streakSummary.current >= 14 ? 3 : streakSummary.current >= 7 ? 2 : streakSummary.current >= 3 ? 1 : 0;
  const fireDisplay = fireCount ? "🔥".repeat(fireCount) : "○";
  const daysToNextReward = streakSummary.current === 0 ? 7 : 7 - (streakSummary.current % 7) || 7;

  const handleCheckIn = async () => {
    try {
      setActionLoading(true);
      await checkIn();
      toast.success("Checked in successfully.");
      await loadAttendance();
    } catch (error) {
      toast.error(error.response?.data?.message || error.message || "Unable to check in.");
    } finally { setActionLoading(false); }
  };

  const handleCheckOut = async () => {
    try {
      setActionLoading(true);
      await checkOut();
      toast.success("Checked out successfully.");
      await loadAttendance();
    } catch (error) {
      toast.error(error.response?.data?.message || error.message || "Unable to check out.");
    } finally { setActionLoading(false); }
  };

  const moveMonth = (amount) => setVisibleMonth((month) => new Date(month.getFullYear(), month.getMonth() + amount, 1));

  return (
    <div className="space-y-6 px-4 py-6 md:px-0">
      <header className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div><p className="text-sm font-semibold uppercase tracking-[0.22em] text-violet-600">Member activity</p><h1 className="mt-2 text-3xl font-bold tracking-tight text-slate-900">Attendance</h1><p className="mt-2 text-slate-600">Check in, check out, and review your gym visits by day and time.</p></div>
        <span className={`inline-flex w-fit rounded-full px-4 py-2 text-sm font-semibold ${isCheckedIn ? "bg-emerald-100 text-emerald-700" : "bg-slate-100 text-slate-700"}`}>{isCheckedIn ? "Currently checked in" : "Not checked in"}</span>
      </header>

      <div className="grid grid-cols-1 gap-6 xl:grid-cols-[0.8fr_1.2fr]">
        <section className="w-full max-w-2xl justify-self-center rounded-[1.75rem] bg-white p-5 shadow-lg ring-1 ring-violet-100">
          <h2 className="text-xl font-semibold text-slate-900">Today&apos;s visit</h2>
          <p className="mt-1 text-sm text-slate-600">Record your arrival and departure time.</p>
          <div className="mt-6 grid gap-3 sm:grid-cols-2 xl:grid-cols-1">
            <button onClick={handleCheckIn} disabled={actionLoading || isCheckedIn} className="rounded-2xl bg-violet-700 px-5 py-4 font-semibold text-white transition hover:bg-violet-800 disabled:cursor-not-allowed disabled:bg-violet-200">{actionLoading && !isCheckedIn ? "Checking in..." : "Check in now"}</button>
            <button onClick={handleCheckOut} disabled={actionLoading || !isCheckedIn} className="rounded-2xl bg-slate-900 px-5 py-4 font-semibold text-white transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:bg-slate-200 disabled:text-slate-500">{actionLoading && isCheckedIn ? "Checking out..." : "Check out now"}</button>
          </div>
          <div className="mt-6 rounded-2xl bg-violet-50 p-5"><p className="text-sm text-slate-500">Total visits</p><p className="mt-1 text-3xl font-bold text-violet-800">{attendance.length}</p><div className="mt-4 grid grid-cols-2 gap-6 border-t border-violet-100 pt-5"><div><p className="text-sm font-medium text-slate-500">Day Streak</p><p className="mt-2 flex items-center gap-3 text-3xl font-bold text-slate-950"><span className="text-3xl leading-none" role="img" aria-label={`${fireCount} fire consistency level`}>🔥</span>{streakSummary.current}</p></div><div><p className="text-sm font-medium text-slate-500">Personal Best</p><p className="mt-3 text-2xl font-bold text-slate-950">{streakSummary.longest} day{streakSummary.longest === 1 ? "" : "s"}</p></div></div><p className="mt-5 text-sm text-slate-600">Times are shown in your device&apos;s local time.</p></div>
        </section>

        <section className="rounded-[1.75rem] bg-white p-6 shadow-lg ring-1 ring-violet-100">
          <div className="flex items-center justify-between gap-3"><button type="button" onClick={() => moveMonth(-1)} className="rounded-xl px-3 py-2 text-lg text-slate-600 transition hover:bg-slate-100" aria-label="Previous month">←</button><h2 className="text-lg font-semibold text-slate-900">{visibleMonth.toLocaleDateString(undefined, { month: "long", year: "numeric" })}</h2><button type="button" onClick={() => moveMonth(1)} className="rounded-xl px-3 py-2 text-lg text-slate-600 transition hover:bg-slate-100" aria-label="Next month">→</button></div>
          <div className="mt-5 grid grid-cols-7 gap-1 text-center">{weekDays.map((day) => <p key={day} className="py-2 text-xs font-semibold uppercase tracking-wide text-slate-400">{day}</p>)}
            {calendarDays.map((day, index) => {
              if (!day) return <div key={`empty-${index}`} className="h-11" />;
              const key = dateKey(day); const entries = attendanceByDay[key] || []; const isSelected = key === selectedDate; const isToday = key === dateKey(new Date());
              return <button key={key} type="button" onClick={() => setSelectedDate(key)} className={`relative flex h-11 flex-col items-center justify-center rounded-xl text-sm font-semibold transition ${isSelected ? "bg-violet-700 text-white shadow-md" : "text-slate-700 hover:bg-violet-50"} ${isToday && !isSelected ? "ring-1 ring-violet-300" : ""}`} aria-label={`View attendance for ${day.toLocaleDateString()}`}><span>{day.getDate()}</span>{entries.length > 0 && <span className={`mt-1 h-1.5 w-1.5 rounded-full ${isSelected ? "bg-white" : "bg-teal-500"}`} />}</button>;
            })}
          </div>
        </section>
      </div>

      <section className="rounded-[1.75rem] bg-white p-6 shadow-lg ring-1 ring-violet-100">
        <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between"><div><h2 className="text-xl font-semibold text-slate-900">Attendance pattern</h2><p className="mt-1 text-sm text-slate-600">Your total gym visits grouped by day of the week.</p></div><span className="w-fit rounded-full bg-violet-50 px-3 py-1.5 text-sm font-semibold text-violet-700">{attendance.length} visits</span></div>
        <div className="mt-5 h-56"><ResponsiveContainer width="100%" height="100%"><BarChart data={weeklyChartData} margin={{ top: 10, right: 12, left: -18, bottom: 0 }}><CartesianGrid stroke="#e2e8f0" strokeDasharray="3 3" vertical={false} /><XAxis dataKey="day" tick={{ fill: "#64748b", fontSize: 12 }} axisLine={false} tickLine={false} /><YAxis allowDecimals={false} tick={{ fill: "#64748b", fontSize: 12 }} axisLine={false} tickLine={false} /><Tooltip cursor={{ fill: "#f5f3ff" }} contentStyle={{ border: "1px solid #e2e8f0", borderRadius: 12 }} formatter={(value) => [`${value} visit${Number(value) === 1 ? "" : "s"}`, "Attendance"]} /><Bar dataKey="visits" fill="#7c3aed" radius={[7, 7, 0, 0]} /></BarChart></ResponsiveContainer></div>
      </section>

      <section className="rounded-[1.75rem] bg-slate-50 p-6 shadow-lg ring-1 ring-violet-100">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between"><div><h2 className="text-xl font-semibold text-slate-900">Streak pattern {fireDisplay}</h2><p className="mt-1 text-sm text-slate-600">Your check-in consistency over the last 14 days.</p></div><div className="grid grid-cols-2 gap-3"><div className="rounded-xl bg-amber-50 px-4 py-2"><p className="text-xs font-semibold uppercase tracking-wide text-amber-700">Points earned</p><p className="mt-1 text-lg font-bold text-amber-900">{streakSummary.rewardPoints} pts</p></div><div className="rounded-xl bg-violet-100 px-4 py-2"><p className="text-xs font-semibold uppercase tracking-wide text-violet-700">Next reward</p><p className="mt-1 text-lg font-bold text-violet-900">{daysToNextReward} day{daysToNextReward === 1 ? "" : "s"}</p></div></div></div>
        <p className="mt-4 rounded-xl border border-amber-100 bg-amber-50 px-4 py-3 text-sm text-amber-900">Earn <strong>100 points</strong> for every seven consecutive attendance days. Keep your fire streak alive to reach the next reward.</p>
        <div className="mt-5 h-40"><ResponsiveContainer width="100%" height="100%"><BarChart data={streakSummary.recentDays} margin={{ top: 5, right: 12, left: -18, bottom: 0 }}><XAxis dataKey="day" interval={1} tick={{ fill: "#64748b", fontSize: 11 }} axisLine={false} tickLine={false} /><YAxis domain={[0, 1]} ticks={[0, 1]} tickFormatter={(value) => value ? "Visit" : ""} tick={{ fill: "#64748b", fontSize: 11 }} axisLine={false} tickLine={false} /><Tooltip cursor={{ fill: "#ede9fe" }} contentStyle={{ border: "1px solid #e2e8f0", borderRadius: 12 }} formatter={(value) => [Number(value) ? "Checked in" : "No visit", "Status"]} /><Bar dataKey="visit" fill="#8b5cf6" radius={[5, 5, 0, 0]} /></BarChart></ResponsiveContainer></div>
      </section>

      <section className="rounded-[1.75rem] bg-slate-50 p-6 shadow-lg ring-1 ring-violet-100">
        <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between"><div><h2 className="text-xl font-semibold text-slate-900">{selectedDateLabel}</h2><p className="mt-1 text-sm text-slate-600">{selectedEntries.length ? `${selectedEntries.length} recorded visit${selectedEntries.length > 1 ? "s" : ""}` : "No visit recorded for this date."}</p></div><button type="button" onClick={() => { const today = new Date(); setVisibleMonth(new Date(today.getFullYear(), today.getMonth(), 1)); setSelectedDate(dateKey(today)); }} className="w-fit rounded-xl bg-white px-4 py-2 text-sm font-semibold text-violet-700 shadow-sm ring-1 ring-slate-200 hover:bg-violet-50">Go to today</button></div>
        <div className="mt-5 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {selectedEntries.map((entry) => <article key={entry.id} className="rounded-2xl bg-white p-5 shadow-sm ring-1 ring-slate-200"><p className="text-sm font-semibold text-violet-700">Gym visit</p><dl className="mt-4 grid grid-cols-2 gap-4 text-sm"><div><dt className="text-slate-500">Check in</dt><dd className="mt-1 font-semibold text-slate-900">{timeLabel(entry.checkIn)}</dd></div><div><dt className="text-slate-500">Check out</dt><dd className="mt-1 font-semibold text-slate-900">{entry.checkOut ? timeLabel(entry.checkOut) : "Still inside"}</dd></div></dl></article>)}
          {!loading && selectedEntries.length === 0 && <div className="rounded-2xl border border-dashed border-slate-300 bg-white p-6 text-sm text-slate-500">Select another date or check in to create an attendance record.</div>}
          {loading && <div className="rounded-2xl bg-white p-6 text-sm text-slate-500">Loading attendance history...</div>}
        </div>
      </section>
    </div>
  );
}
