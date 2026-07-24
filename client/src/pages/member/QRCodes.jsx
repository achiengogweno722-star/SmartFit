import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { generateQrCode, getMyQrCodes } from "../../services/qr.service";

export default function QRCodes() {
  const [codes, setCodes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [generating, setGenerating] = useState(false);

  useEffect(() => {
    loadCodes();
  }, []);

  const loadCodes = async () => {
    try {
      const data = await getMyQrCodes();
      setCodes(data.codes || []);
    } catch (error) {
      toast.error(error.response?.data?.message || error.message || "Failed to load QR codes.");
    } finally {
      setLoading(false);
    }
  };

  const handleGenerate = async () => {
    try {
      setGenerating(true);
      const data = await generateQrCode();
      toast.success("QR code generated.");
      setCodes((prev) => [data.qr, ...prev]);
    } catch (error) {
      toast.error(error.response?.data?.message || error.message || "Failed to generate QR code.");
    } finally {
      setGenerating(false);
    }
  };

  return (
    <div className="space-y-8 px-4 py-6 md:px-0">
      <div className="bg-purple-50 ring-1 ring-purple-100 rounded-xl shadow-md p-8">
        <h1 className="text-3xl font-bold text-purple-700">QR Codes</h1>
        <p className="text-slate-600 mt-2">
          Generate and manage your access QR codes.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-[0.9fr_1.1fr] gap-6">
        <section className="bg-white ring-1 ring-purple-100 rounded-xl shadow-md p-6">
          <h2 className="text-2xl font-semibold text-purple-800 mb-4">Create Code</h2>
          <button
            onClick={handleGenerate}
            disabled={generating}
            className="rounded-xl bg-purple-700 px-6 py-3 text-white hover:bg-purple-800 transition"
          >
            {generating ? "Generating..." : "Generate QR Code"}
          </button>
          <p className="mt-4 text-slate-600">
            Each code expires in 24 hours and can be used for gym access.
          </p>
        </section>

        <section className="bg-purple-50 ring-1 ring-purple-100 rounded-xl shadow-md p-6">
          <h2 className="text-2xl font-semibold text-purple-800 mb-4">Recent Codes</h2>

          {loading ? (
            <p className="text-slate-600">Loading QR codes...</p>
          ) : codes.length === 0 ? (
            <p className="text-slate-600">No QR codes generated yet.</p>
          ) : (
            <div className="space-y-4">
              {codes.map((code) => (
                <div key={code.id} className="rounded-3xl border border-purple-100 bg-white p-5 shadow-sm">
                  <p className="font-semibold text-purple-800">{code.code}</p>
                  <p className="text-slate-600 mt-2">
                    Expires: {new Date(code.expiresAt).toLocaleString()}
                  </p>
                </div>
              ))}
            </div>
          )}
        </section>
      </div>
    </div>
  );
}
