import { Outlet, NavLink, useNavigate } from "react-router-dom";
import { HiOutlineChartBar, HiOutlineUserCircle, HiOutlineTrendingUp, HiOutlineBadgeCheck, HiOutlineBell, HiOutlineCalendar, HiOutlineQrcode } from "react-icons/hi";
import { useAuth } from "../context/AuthContext";
import { useTheme } from "../context/ThemeContext";
import logo from "../assets/smartfit-logo.svg";

export default function DashboardLayout() {
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const role = user?.role;
  const dashboardPath = role === "ADMIN" ? "/admin/dashboard" : role === "TRAINER" ? "/trainer/dashboard" : "/member/dashboard";
  const profilePath = role === "MEMBER" ? "/member/profile" : role === "TRAINER" ? "/trainer/profile" : "/admin/profile";
  const navItems = [
    { to: dashboardPath, label: "Dashboard", icon: <HiOutlineChartBar className="h-5 w-5" /> },
    { to: profilePath, label: "Profile", icon: <HiOutlineUserCircle className="h-5 w-5" /> },
  ];
  const memberItems = [
    { to: "/member/progress", label: "Progress", icon: <HiOutlineTrendingUp className="h-5 w-5" /> },
    { to: "/member/attendance", label: "Attendance", icon: <HiOutlineCalendar className="h-5 w-5" /> },
    { to: "/member/membership", label: "Membership", icon: <HiOutlineBadgeCheck className="h-5 w-5" /> },
    { to: "/member/notifications", label: "Notifications", icon: <HiOutlineBell className="h-5 w-5" /> },
    { to: "/member/appointments", label: "Appointments", icon: <HiOutlineCalendar className="h-5 w-5" /> },
    { to: "/member/qr-codes", label: "QR Codes", icon: <HiOutlineQrcode className="h-5 w-5" /> },
  ];
  const itemClass = ({ isActive }) => `flex shrink-0 items-center gap-3 rounded-2xl px-4 py-3 text-sm font-medium transition ${isActive ? "bg-white text-violet-800 shadow-lg shadow-indigo-950/20" : "text-violet-100 hover:bg-white/10 hover:text-white"}`;

  const handleLogout = () => { logout(); navigate("/login"); };

  return (
    <div className="min-h-screen bg-slate-50 lg:flex">
      <aside className="border-b border-white/10 bg-gradient-to-b from-violet-800 via-purple-800 to-indigo-950 p-5 text-white shadow-2xl lg:min-h-screen lg:w-72 lg:border-b-0 lg:border-r lg:p-6">
        <div className="mb-7 flex items-center justify-between gap-3">
          <div className="flex items-center gap-3"><img src={logo} alt="SmartFit logo" className="h-11 w-11 rounded-2xl bg-white/10 p-1" /><div><p className="text-sm uppercase tracking-[0.2em] text-purple-200">SmartFit</p><p className="text-lg font-semibold">Dashboard</p></div></div>
          <button type="button" onClick={toggleTheme} className="rounded-full border border-white/15 bg-white/10 px-3 py-2 text-xs font-semibold text-white transition hover:bg-white/20">{theme === "dark" ? "Light" : "Dark"}</button>
        </div>
        <nav className="flex gap-2 overflow-x-auto pb-1 lg:block lg:space-y-2 lg:overflow-visible">
          {navItems.map((item) => <NavLink key={item.label} to={item.to} className={itemClass}><span>{item.icon}</span><span>{item.label}</span></NavLink>)}
          {role === "MEMBER" && memberItems.map((item) => <NavLink key={item.label} to={item.to} className={itemClass}><span>{item.icon}</span><span>{item.label}</span></NavLink>)}
          <button onClick={handleLogout} className="mt-0 shrink-0 rounded-2xl border border-white/15 bg-white/10 px-5 py-3 text-sm font-semibold text-white transition hover:border-rose-400 hover:bg-rose-500 lg:mt-10 lg:w-full">Logout</button>
        </nav>
      </aside>
      <main className="min-w-0 flex-1 bg-slate-50 p-4 md:p-8"><Outlet /></main>
    </div>
  );
}
