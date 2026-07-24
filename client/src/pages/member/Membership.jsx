import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { getMyMembership, subscribeMembership } from "../../services/membership.service";

const subscriptionOptions = [
  { label: "Weekly", amount: 999, durationDays: 7, description: "Flexible access for one week.", features: ["Gym access", "Weekly fitness tips"] },
  { label: "Basic", amount: 2999, durationDays: 30, description: "A simple monthly gym membership.", features: ["Gym access", "Monthly newsletters"] },
  { label: "Standard", amount: 4999, durationDays: 30, description: "Monthly access with added guidance.", features: ["Gym access", "Trainer guidance", "Progress tracking"] },
  { label: "Premium", amount: 9999, durationDays: 90, description: "Three months of comprehensive support.", features: ["All standard benefits", "Personalized training", "Nutrition coaching"] },
];

export default function Membership() {
  const [membership, setMembership] = useState(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState(subscriptionOptions[0]);

  useEffect(() => { loadMembership(); }, []);

  const loadMembership = async () => {
    try {
      const data = await getMyMembership();
      setMembership(data.membership);
    } catch (error) {
      toast.error(error.response?.data?.message || error.message || "Failed to load membership.");
    } finally { setLoading(false); }
  };

  const handleSubmit = async () => {
    try {
      setSubmitting(true);
      const data = await subscribeMembership({ amount: selectedPlan.amount, durationDays: selectedPlan.durationDays, currency: "KES", description: `${selectedPlan.label} membership` });
      toast.success(data.message || "Membership subscribed successfully.");
      setMembership(data.membership);
    } catch (error) {
      toast.error(error.response?.data?.message || error.message || "Failed to subscribe.");
    } finally { setSubmitting(false); }
  };

  const status = membership?.membershipStatus || "Not subscribed";
  const expiry = membership?.membershipExpires ? new Date(membership.membershipExpires) : null;

  return (
    <div className="space-y-6 px-4 py-6 md:px-0">
      <header className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div><p className="text-sm font-semibold uppercase tracking-[0.22em] text-violet-600">SmartFit access</p><h1 className="mt-2 text-3xl font-bold tracking-tight text-slate-900">Membership</h1><p className="mt-2 text-slate-600">Review your access status and choose a plan that works for you.</p></div>
        <span className={`w-fit rounded-full px-4 py-2 text-sm font-semibold ${status === "ACTIVE" ? "bg-emerald-100 text-emerald-700" : "bg-slate-100 text-slate-700"}`}>{status === "ACTIVE" ? "Active membership" : "No active membership"}</span>
      </header>

      <div className="grid grid-cols-1 gap-6 xl:grid-cols-[0.72fr_1.28fr]">
        <aside className="h-fit rounded-[1.75rem] bg-white p-6 shadow-lg ring-1 ring-violet-100">
          <h2 className="text-xl font-semibold text-slate-900">Your membership</h2>
          {loading ? <p className="mt-5 text-sm text-slate-500">Loading membership details...</p> : <dl className="mt-5 space-y-4">
            <div className="rounded-2xl bg-slate-50 p-4"><dt className="text-sm text-slate-500">Status</dt><dd className="mt-1 text-lg font-semibold text-slate-900">{status === "ACTIVE" ? "Active" : "Not subscribed"}</dd></div>
            <div className="rounded-2xl bg-slate-50 p-4"><dt className="text-sm text-slate-500">Started</dt><dd className="mt-1 font-medium text-slate-900">{membership?.membershipStarted ? new Date(membership.membershipStarted).toLocaleDateString() : "—"}</dd></div>
            <div className="rounded-2xl bg-slate-50 p-4"><dt className="text-sm text-slate-500">Expires</dt><dd className="mt-1 font-medium text-slate-900">{expiry ? expiry.toLocaleDateString() : "—"}</dd></div>
          </dl>}
          <div className="mt-6 rounded-2xl border border-violet-100 bg-violet-50 p-4"><p className="text-sm font-semibold text-violet-900">Fitness details</p><p className="mt-1 text-sm leading-6 text-violet-800">Update your personal fitness information in Profile and track changes in Progress.</p><div className="mt-3 flex gap-3 text-sm font-semibold"><Link to="/member/profile" className="text-violet-700 hover:text-violet-900">Profile</Link><Link to="/member/progress" className="text-violet-700 hover:text-violet-900">Progress</Link></div></div>
        </aside>

        <section className="rounded-[1.75rem] bg-white p-6 shadow-lg ring-1 ring-violet-100">
          <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between"><div><h2 className="text-xl font-semibold text-slate-900">Choose a plan</h2><p className="mt-1 text-sm text-slate-600">Select a plan, then subscribe or renew below.</p></div><span className="w-fit rounded-full bg-violet-50 px-3 py-1.5 text-sm font-semibold text-violet-700">Prices in KES</span></div>
          <div className="mt-6 grid gap-4 md:grid-cols-2">
            {subscriptionOptions.map((plan) => {
              const selected = selectedPlan.label === plan.label;
              return <button key={plan.label} type="button" onClick={() => setSelectedPlan(plan)} className={`min-w-0 rounded-2xl border p-5 text-left transition ${selected ? "border-violet-500 bg-violet-50 ring-2 ring-violet-100" : "border-slate-200 bg-white hover:border-violet-200 hover:bg-slate-50"}`}>
                <div className="flex items-start justify-between gap-3"><div className="min-w-0"><h3 className="text-lg font-semibold text-slate-900">{plan.label}</h3><p className="mt-1 text-sm leading-5 text-slate-600">{plan.description}</p></div><p className="shrink-0 text-right text-lg font-bold text-violet-700">KES {plan.amount.toLocaleString()}</p></div>
                <p className="mt-3 text-sm font-medium text-slate-500">{plan.durationDays} days</p><ul className="mt-4 space-y-2 text-sm text-slate-700">{plan.features.map((feature) => <li key={feature} className="flex gap-2"><span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-violet-500" />{feature}</li>)}</ul>
              </button>;
            })}
          </div>
          <div className="mt-6 flex flex-col gap-4 rounded-2xl bg-slate-900 p-5 text-white sm:flex-row sm:items-center sm:justify-between"><div><p className="text-sm text-slate-300">Selected plan</p><p className="mt-1 text-lg font-semibold">{selectedPlan.label} · KES {selectedPlan.amount.toLocaleString()} / {selectedPlan.durationDays} days</p></div><button type="button" onClick={handleSubmit} disabled={submitting} className="shrink-0 rounded-xl bg-violet-500 px-5 py-3 font-semibold text-white transition hover:bg-violet-400 disabled:cursor-not-allowed disabled:opacity-60">{submitting ? "Processing..." : "Subscribe / Renew"}</button></div>
        </section>
      </div>
    </div>
  );
}
