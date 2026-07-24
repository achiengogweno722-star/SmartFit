import { Link } from "react-router-dom";
import { HiOutlineCalendar, HiOutlineClipboardList, HiOutlineUserGroup } from "react-icons/hi";

const quickActions = [
  { title: "My schedule", description: "Review your upcoming sessions and manage your availability.", icon: HiOutlineCalendar, tone: "bg-violet-100 text-violet-700" },
  { title: "Member plans", description: "Create focused workout plans that keep members moving.", icon: HiOutlineClipboardList, tone: "bg-teal-100 text-teal-700" },
  { title: "My profile", description: "Keep your trainer details and expertise up to date.", icon: HiOutlineUserGroup, to: "/trainer/profile", tone: "bg-amber-100 text-amber-700" },
];

export default function TrainerDashboard() {
  return (
    <div className="space-y-8 px-4 py-8 md:px-0">
      {false && <section className="overflow-hidden rounded-[2rem] bg-gradient-to-r from-violet-700 via-purple-700 to-indigo-600 p-8 text-white shadow-[0_30px_80px_rgba(124,58,237,0.18)]">
        <div className="flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">
          <div className="max-w-3xl">
            <p className="text-sm uppercase tracking-[0.32em] text-violet-200">SmartFit Coach Space</p>
            <h1 className="mt-4 text-4xl font-extrabold tracking-tight sm:text-5xl">Make every session count.</h1>
            <p className="mt-4 max-w-2xl text-base text-violet-100 sm:text-lg">Plan purposeful workouts, guide your members, and keep your coaching day organized.</p>
          </div>
          <div className="rounded-[1.5rem] bg-white/10 p-5 ring-1 ring-white/10 backdrop-blur-xl">
            <p className="text-sm uppercase tracking-[0.24em] text-violet-200">Today&apos;s focus</p>
            <p className="mt-3 text-2xl font-semibold">Coach with clarity</p>
            <p className="mt-2 text-sm text-violet-200">Your tools are ready when you are.</p>
          </div>
        </div>
      </section>}

      <section className="rounded-[1.75rem] bg-white p-7 shadow-lg ring-1 ring-purple-100">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div><h2 className="text-2xl font-semibold text-slate-900">Coach workspace</h2><p className="mt-1 text-slate-600">Jump back into the tools you use most.</p></div>
          <span className="inline-flex w-fit rounded-full bg-violet-50 px-4 py-2 text-sm font-semibold text-violet-700">Trainer</span>
        </div>
        <div className="mt-7 grid gap-5 md:grid-cols-3">
          {quickActions.map(({ title, description, icon: Icon, to, tone }) => {
            const content = <>
              <span className={`inline-flex rounded-2xl p-3 ${tone}`}><Icon className="h-6 w-6" /></span>
              <h3 className="mt-5 text-xl font-semibold text-slate-900">{title}</h3>
              <p className="mt-2 text-sm leading-6 text-slate-600">{description}</p>
              <p className="mt-5 text-sm font-semibold text-violet-700">{to ? <>Open workspace <span aria-hidden="true">→</span></> : "Coming soon"}</p>
            </>;
            const cardClass = "group rounded-[1.5rem] border border-slate-200 bg-slate-50 p-6 transition hover:-translate-y-1 hover:border-violet-200 hover:bg-white hover:shadow-lg";
            return to ? <Link key={title} to={to} className={cardClass}>{content}</Link> : <div key={title} className={cardClass}>{content}</div>;
          })}
        </div>
      </section>

      <section className="rounded-[1.75rem] bg-slate-50 p-7 shadow-lg ring-1 ring-purple-100">
        <h2 className="text-2xl font-semibold text-slate-900">Coaching rhythm</h2>
        <p className="mt-2 max-w-2xl text-slate-600">Start with the schedule, tailor a plan, then check your profile is ready for members to find the right coach.</p>
        <div className="mt-6 grid gap-4 sm:grid-cols-3">
          {["Review upcoming sessions", "Update member workout plans", "Keep your profile current"].map((step, index) => (
            <div key={step} className="rounded-3xl bg-white p-5 shadow-sm ring-1 ring-slate-200"><p className="text-sm font-semibold text-violet-700">0{index + 1}</p><p className="mt-3 font-medium text-slate-900">{step}</p></div>
          ))}
        </div>
      </section>
    </div>
  );
}
