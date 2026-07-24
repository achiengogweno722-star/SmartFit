import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { bookAppointment, getMyAppointments } from "../../services/appointment.service";

export default function Appointments() {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [booking, setBooking] = useState(false);
  const [form, setForm] = useState({
    trainerId: "",
    scheduledAt: "",
    notes: "",
  });

  useEffect(() => {
    loadAppointments();
  }, []);

  const loadAppointments = async () => {
    try {
      const data = await getMyAppointments();
      setAppointments(data.appointments || []);
    } catch (error) {
      toast.error(error.response?.data?.message || error.message || "Failed to load appointments.");
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

  const handleBook = async (e) => {
    e.preventDefault();
    try {
      setBooking(true);
      await bookAppointment({
        trainerId: Number(form.trainerId),
        scheduledAt: form.scheduledAt,
        notes: form.notes,
      });
      toast.success("Appointment booked successfully.");
      setForm({ trainerId: "", scheduledAt: "", notes: "" });
      await loadAppointments();
    } catch (error) {
      toast.error(error.response?.data?.message || error.message || "Failed to book appointment.");
    } finally {
      setBooking(false);
    }
  };

  return (
    <div className="space-y-8 px-4 py-6 md:px-0">
      <div className="bg-purple-50 ring-1 ring-purple-100 rounded-xl shadow-md p-8">
        <h1 className="text-3xl font-bold text-purple-700">Appointments</h1>
        <p className="text-slate-600 mt-2">
          Schedule a session with your trainer.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-[0.95fr_1.05fr] gap-6">
        <section className="bg-white ring-1 ring-purple-100 rounded-xl shadow-md p-6">
          <h2 className="text-2xl font-semibold text-purple-800 mb-4">Book a Trainer</h2>

          <form onSubmit={handleBook} className="space-y-5">
            <div>
              <label className="font-semibold text-slate-700">Trainer ID</label>
              <input
                type="number"
                name="trainerId"
                value={form.trainerId}
                onChange={handleChange}
                className="w-full border border-purple-200 rounded-xl p-3 mt-2"
                placeholder="Enter trainer ID"
                required
              />
            </div>

            <div>
              <label className="font-semibold text-slate-700">Date and Time</label>
              <input
                type="datetime-local"
                name="scheduledAt"
                value={form.scheduledAt}
                onChange={handleChange}
                className="w-full border border-purple-200 rounded-xl p-3 mt-2"
                required
              />
            </div>

            <div>
              <label className="font-semibold text-slate-700">Notes</label>
              <textarea
                name="notes"
                value={form.notes}
                onChange={handleChange}
                rows="3"
                className="w-full border border-purple-200 rounded-xl p-3 mt-2"
                placeholder="Optional notes for your trainer"
              />
            </div>

            <button
              type="submit"
              disabled={booking}
              className="w-full rounded-xl bg-purple-700 text-white py-3 hover:bg-purple-800 transition"
            >
              {booking ? "Booking..." : "Book Appointment"}
            </button>
          </form>
        </section>

        <section className="bg-purple-50 ring-1 ring-purple-100 rounded-xl shadow-md p-6">
          <h2 className="text-2xl font-semibold text-purple-800 mb-4">Upcoming Appointments</h2>

          {loading ? (
            <p className="text-slate-600">Loading appointments...</p>
          ) : appointments.length === 0 ? (
            <p className="text-slate-600">No appointments scheduled.</p>
          ) : (
            <div className="space-y-4">
              {appointments.map((appointment) => (
                <div key={appointment.id} className="rounded-3xl border border-purple-100 bg-white p-5 shadow-sm">
                  <div className="flex flex-col gap-2 sm:flex-row sm:justify-between sm:items-center">
                    <div>
                      <h3 className="text-lg font-semibold text-purple-800">
                        {appointment.trainer?.user?.fullName || "Trainer"}
                      </h3>
                      <p className="text-slate-600">
                        {new Date(appointment.scheduledAt).toLocaleString()}
                      </p>
                    </div>
                    <span className="rounded-full bg-purple-100 px-4 py-2 text-sm font-semibold text-purple-700">
                      {appointment.status}
                    </span>
                  </div>
                  <p className="mt-3 text-slate-700">{appointment.notes || "No notes."}</p>
                </div>
              ))}
            </div>
          )}
        </section>
      </div>
    </div>
  );
}
