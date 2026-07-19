import { useAuth } from "../../context/AuthContext";

export default function MemberDashboard() {
  const { user } = useAuth();

  return (
    <div className="flex justify-center items-center h-full">
      <div className="bg-white shadow-lg rounded-xl p-10 w-[500px] text-center">
        <h1 className="text-5xl font-bold text-blue-600">
          Member Dashboard
        </h1>

        <p className="mt-8 text-xl">
          Welcome,
        </p>

        <h2 className="text-2xl font-semibold text-gray-800 mt-2">
          {user?.fullName || "Member"}
        </h2>

        <div className="mt-8 text-left space-y-3">
          <p>
            <strong>Email:</strong> {user?.email || "N/A"}
          </p>

          <p>
            <strong>Role:</strong> {user?.role || "MEMBER"}
          </p>

          <p>
            <strong>User ID:</strong> {user?.id || "N/A"}
          </p>
        </div>
      </div>
    </div>
  );
}