import { Outlet, Link, useNavigate } from "react-router-dom";

export default function DashboardLayout() {
  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem("user"));

  const role = user?.role;

  const dashboardPath =
    role === "ADMIN"
      ? "/admin/dashboard"
      : role === "TRAINER"
      ? "/trainer/dashboard"
      : "/member/dashboard";

  const profilePath =
    role === "MEMBER"
      ? "/member/profile"
      : role === "TRAINER"
      ? "/trainer/profile"
      : "/admin/profile";

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    localStorage.removeItem("role");

    navigate("/login");
  };

  return (
    <div className="min-h-screen flex">
      {/* Sidebar */}
      <aside className="w-64 bg-blue-700 text-white p-6">
        <h1 className="text-3xl font-bold mb-10">
          SmartFit
        </h1>

        <nav className="space-y-4">

          <Link
            to={dashboardPath}
            className="block rounded-lg px-4 py-3 hover:bg-blue-600 transition"
          >
            Dashboard
          </Link>

          <Link
            to={profilePath}
            className="block rounded-lg px-4 py-3 hover:bg-blue-600 transition"
          >
            Profile
          </Link>

          <button
            onClick={handleLogout}
            className="mt-10 w-full rounded-lg bg-red-600 py-3 hover:bg-red-700 transition"
          >
            Logout
          </button>

        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 bg-slate-100 p-8">
        <Outlet />
      </main>
    </div>
  );
}