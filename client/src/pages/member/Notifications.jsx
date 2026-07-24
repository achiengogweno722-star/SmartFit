import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { getMyNotifications, markNotificationRead } from "../../services/notification.service";

export default function Notifications() {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadNotifications();
  }, []);

  const loadNotifications = async () => {
    try {
      const data = await getMyNotifications();
      setNotifications(data.notifications || []);
    } catch (error) {
      toast.error(error.response?.data?.message || error.message || "Failed to load notifications.");
    } finally {
      setLoading(false);
    }
  };

  const handleMarkRead = async (id) => {
    try {
      await markNotificationRead(id);
      setNotifications((prev) =>
        prev.map((notification) =>
          notification.id === id ? { ...notification, read: true } : notification
        )
      );
      toast.success("Notification marked read.");
    } catch (error) {
      toast.error(error.response?.data?.message || error.message || "Failed to update notification.");
    }
  };

  return (
    <div className="space-y-8 px-4 py-6 md:px-0">
      <div className="bg-purple-50 ring-1 ring-purple-100 rounded-xl shadow-md p-8">
        <h1 className="text-3xl font-bold text-purple-700">Notifications</h1>
        <p className="text-slate-600 mt-2">
          View alerts and updates from your SmartFit team.
        </p>
      </div>

      <section className="bg-white ring-1 ring-purple-100 rounded-xl shadow-md p-6">
        <h2 className="text-2xl font-semibold text-purple-800 mb-4">Recent Notifications</h2>

        {loading ? (
          <p className="text-slate-600">Loading notifications...</p>
        ) : notifications.length === 0 ? (
          <p className="text-slate-600">You have no notifications.</p>
        ) : (
          <div className="space-y-4">
            {notifications.map((notification) => (
              <div
                key={notification.id}
                className={`rounded-3xl border p-5 shadow-sm ${notification.read ? "bg-slate-50 border-slate-200" : "bg-purple-50 border-purple-200"}`}
              >
                <div className="flex items-center justify-between gap-4">
                  <div>
                    <p className="text-sm uppercase tracking-wide text-slate-500">
                      {notification.type}
                    </p>
                    <h3 className="mt-2 text-lg font-semibold text-purple-800">
                      {notification.title}
                    </h3>
                  </div>
                  {!notification.read && (
                    <button
                      onClick={() => handleMarkRead(notification.id)}
                      className="rounded-full bg-purple-700 px-4 py-2 text-white text-sm hover:bg-purple-800 transition"
                    >
                      Mark Read
                    </button>
                  )}
                </div>
                <p className="mt-3 text-slate-700">{notification.message}</p>
                <p className="mt-2 text-sm text-slate-500">
                  {new Date(notification.createdAt).toLocaleString()}
                </p>
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
