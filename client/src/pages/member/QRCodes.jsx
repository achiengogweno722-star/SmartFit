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
      toast.error(
        error.response?.data?.message ||
          error.message ||
          "Failed to load QR code."
      );
    } finally {
      setLoading(false);
    }
  };

  const handleGenerate = async () => {
    try {
      setGenerating(true);

      const data = await generateQrCode();

      toast.success("New Gym QR generated.");

      // Only keep the newest QR
      setCodes([data.qr]);
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
          error.message ||
          "Failed to generate QR code."
      );
    } finally {
      setGenerating(false);
    }
  };

  const currentCode = codes[0];

  return (
    <div className="space-y-8 px-4 py-6 md:px-0">

      {/* Header */}
      <section className="rounded-[2rem] bg-gradient-to-r from-violet-700 via-purple-700 to-indigo-700 p-10 text-white shadow-[0_25px_80px_rgba(124,58,237,.25)]">

  <p className="uppercase tracking-[0.3em] text-violet-200 text-sm">
    SMARTFIT
  </p>

  <h1 className="mt-3 text-5xl font-black">
    Digital Membership Pass
  </h1>

  <p className="mt-4 max-w-2xl text-violet-100 text-lg">
    Present this digital membership pass when entering or leaving the gym.
    Your QR code is encrypted, unique, and automatically expires after 24 hours.
  </p>

</section>

      <div className="grid gap-8 lg:grid-cols-[380px_1fr]">

        {/* Generate Card */}

        <section className="rounded-3xl bg-white p-8 shadow-lg">

          <h2 className="text-2xl font-bold text-slate-800">
            Generate Access Pass
          </h2>

          <p className="mt-3 text-slate-500">
            Your previous QR will automatically become invalid.
          </p>

          <button
            onClick={handleGenerate}
            disabled={generating}
            className="mt-8 w-full rounded-2xl bg-violet-700 py-4 text-lg font-semibold text-white transition hover:bg-violet-800"
          >
            {generating ? "Generating..." : "Generate New QR"}
          </button>

          <div className="mt-8 rounded-2xl bg-violet-50 p-5">

            <h3 className="font-semibold text-violet-700">
              Security
            </h3>

            <ul className="mt-3 space-y-2 text-sm text-slate-600">
              <li>• Only one QR is active.</li>
              <li>• Previous QR becomes invalid.</li>
              <li>• QR expires after 24 hours.</li>
              <li>• Used for gym check-in and check-out.</li>
            </ul>

          </div>

        </section>

        {/* Active QR */}

        <section className="rounded-3xl bg-white p-8 shadow-lg">

          <div className="flex justify-between items-center mb-8">

            <h2 className="text-2xl font-bold text-slate-800">
              Active Gym Pass
            </h2>

            {currentCode && (
              <span className="rounded-full bg-green-100 px-4 py-2 text-sm font-semibold text-green-700">
                Active
              </span>
            )}

          </div>

          {loading ? (

            <div className="text-center py-20 text-slate-500">
              Loading QR Code...
            </div>

          ) : !currentCode ? (

            <div className="rounded-2xl bg-slate-50 p-16 text-center">

              <div className="text-6xl">
                📱
              </div>

              <h3 className="mt-6 text-2xl font-bold text-slate-700">
                No Active QR Code
              </h3>

              <p className="mt-3 text-slate-500">
                Click "Generate New QR" to create your gym access pass.
              </p>

            </div>

          ) : (

            <div className="max-w-lg mx-auto rounded-3xl border border-slate-200 bg-slate-50 p-8">

              <div className="flex justify-center">

                <img
                  src={currentCode.qrImage}
                  alt="Gym QR Code"
                  className="w-72 h-72 rounded-2xl border bg-white p-4 shadow-sm"
                />

              </div>

              <div className="mt-8 space-y-4 text-center">

                <div>

                  <p className="text-sm text-slate-500">
                    Status
                  </p>

                  <p className="font-bold text-green-600">
                    Active
                  </p>

                </div>

                <div>

                  <p className="text-sm text-slate-500">
                    Valid Until
                  </p>

                  <p className="font-semibold text-lg">
                    {new Date(currentCode.expiresAt).toLocaleString()}
                  </p>

                </div>

                <div>

                  <p className="text-sm text-slate-500">
                    Gym Pass ID
                  </p>

                  <p className="break-all font-mono text-sm text-violet-700">
                    {currentCode.code}
                  </p>

                </div>

              </div>

            </div>

          )}

        </section>

      </div>

    </div>
  );
}