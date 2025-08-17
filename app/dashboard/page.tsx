"use client";

import { useState, useEffect } from "react";
import { QRCodeCanvas } from "qrcode.react";
import {
  Loader2,
  Save,
  Globe,
  DollarSign,
  ArrowRight,
  Facebook,
  Twitter,
  Instagram,
  Linkedin,
  Youtube,
  AlertCircle,
  CheckCircle2,
  XCircle,
} from "lucide-react";

interface PaymentDetail {
  upiId: string;
  payerName?: string;
  amount?: string;
  currency?: string;
}

interface RedirectData {
  social: Record<string, string>;
  payment: Record<string, PaymentDetail>;
  defaultRedirect: string;
  username: string;
}

export default function Dashboard() {
  const [data, setData] = useState<RedirectData | null>(null);
  const [form, setForm] = useState<RedirectData>({
    social: {},
    payment: {},
    defaultRedirect: "",
    username: "",
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [saveStatus, setSaveStatus] = useState<"success" | "error" | null>(null);

  const socialPlatforms = [
    { id: "facebook", icon: <Facebook className="w-5 h-5" /> },
    { id: "twitter", icon: <Twitter className="w-5 h-5" /> },
    { id: "instagram", icon: <Instagram className="w-5 h-5" /> },
    { id: "linkedin", icon: <Linkedin className="w-5 h-5" /> },
    { id: "youtube", icon: <Youtube className="w-5 h-5" /> },
  ];

  const paymentPlatforms = ["gpay", "phonepe", "paytm"];

  // Fetch redirect data
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch("/api/redirects");
        if (!res.ok) throw new Error("Failed to fetch");
        const d = await res.json();
        setData(d);
        setForm({
          social: d?.links?.social || {},
          payment: d?.links?.payment || {},
          defaultRedirect: d?.defaultRedirect || "",
          username: d?.username || "",
        });
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const handleChange = (
    section: "social" | "payment",
    field: string,
    value: any
  ) => {
    setForm((prev) => ({
      ...prev,
      [section]: { ...prev[section], [field]: value },
    }));
  };

  const generateUpiLink = (pay: PaymentDetail) => {
    if (!pay?.upiId) return "";
    const params = new URLSearchParams({
      pa: pay.upiId,
      pn: pay.payerName || "",
      am: pay.amount || "",
      cu: pay.currency || "INR",
    });
    return `upi://pay?${params.toString()}`;
  };

  const saveData = async () => {
    setSaving(true);
    setSaveStatus(null);
    try {
      const res = await fetch("/api/redirects", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          links: {
            social: form.social,
            payment: form.payment,
          },
          defaultRedirect: form.defaultRedirect,
        }),
      });
      if (!res.ok) throw new Error("Failed to save");
      setSaveStatus("success");
    } catch (err) {
      console.error(err);
      setSaveStatus("error");
    } finally {
      setSaving(false);
      setTimeout(() => setSaveStatus(null), 3000);
    }
  };

  if (loading)
    return (
      <div className="flex items-center justify-center h-screen">
        <Loader2 className="w-8 h-8 animate-spin text-blue-500" />
      </div>
    );

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto space-y-8">
        {/* Header */}
        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-900">Qroly Dashboard</h1>
          <p className="mt-2 text-gray-600">
            Manage your social and payment links
          </p>
        </div>

        {/* QR Code Section */}
        {form.username && (
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 flex flex-col items-center">
            <QRCodeCanvas
              value={`${process.env.NEXT_PUBLIC_BASE_URL}/r/${form.username}`}
              size={180}
              level="H"
              includeMargin
            />
            <p className="mt-2 text-gray-600">
              Your personal link:{" "}
              <span className="text-blue-600 font-medium">
                {process.env.NEXT_PUBLIC_BASE_URL}/r/{form.username}
              </span>
            </p>
            {form.defaultRedirect ? (
              <p className="mt-2 text-sm text-gray-600 flex items-center justify-center">
                <ArrowRight className="w-4 h-4 mr-1" />
                Default redirects to: {form.defaultRedirect}
              </p>
            ) : (
              <p className="mt-2 text-sm text-yellow-600 flex items-center justify-center">
                <AlertCircle className="w-4 h-4 mr-1" />
                No default redirect set
              </p>
            )}
          </div>
        )}

        {/* Social Media Links */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <div className="flex items-center mb-4">
            <Globe className="w-5 h-5 text-blue-500 mr-2" />
            <h2 className="text-xl font-semibold text-gray-800">
              Social Media Links
            </h2>
          </div>
          <div className="space-y-3">
            {socialPlatforms.map(({ id, icon }) => (
              <div key={id} className="flex items-center">
                <div className="w-10 flex justify-center">{icon}</div>
                <input
                  className="flex-1 border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 outline-none transition"
                  placeholder={`https://${id}.com/username`}
                  value={form.social?.[id] || ""}
                  onChange={(e) => handleChange("social", id, e.target.value)}
                />
              </div>
            ))}
          </div>
        </div>

        {/* Payment Links */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <div className="flex items-center mb-4">
            <DollarSign className="w-5 h-5 text-green-500 mr-2" />
            <h2 className="text-xl font-semibold text-gray-800">
              Payment UPI IDs
            </h2>
          </div>
          <div className="space-y-3">
            {paymentPlatforms.map((p) => {
              const pay = form.payment[p] || {
                upiId: "",
                payerName: "",
                amount: "",
                currency: "INR",
              };
              const upiLink = generateUpiLink(pay);
              return (
                <div key={p} className="flex flex-col gap-2 border-b pb-2">
                  <div className="flex items-center gap-2">
                    <input
                      className="flex-1 border border-gray-300 rounded-lg px-4 py-2"
                      placeholder={`${p}@upi`}
                      value={pay.upiId}
                      onChange={(e) =>
                        handleChange("payment", p, { ...pay, upiId: e.target.value })
                      }
                    />
                    <input
                      className="flex-1 border border-gray-300 rounded-lg px-4 py-2"
                      placeholder="Payee Name"
                      value={pay.payerName || ""}
                      onChange={(e) =>
                        handleChange("payment", p, {
                          ...pay,
                          payerName: e.target.value,
                        })
                      }
                    />
                    <input
                      className="w-24 border border-gray-300 rounded-lg px-4 py-2"
                      placeholder="Amount"
                      type="number"
                      value={pay.amount || ""}
                      onChange={(e) =>
                        handleChange("payment", p, { ...pay, amount: e.target.value })
                      }
                    />
                  </div>

                  {/* UPI Link + QR */}
                  {upiLink && (
                    <div className="flex flex-col items-center mt-2">
                      <QRCodeCanvas value={upiLink} size={120} />
                      <a
                        href={upiLink}
                        target="_blank"
                        rel="noreferrer"
                        className="text-blue-600 mt-1 text-sm break-all"
                      >
                        {upiLink}
                      </a>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Default Redirect */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <div className="flex items-center mb-4">
            <ArrowRight className="w-5 h-5 text-purple-500 mr-2" />
            <h2 className="text-xl font-semibold text-gray-800">
              Default Redirect
            </h2>
          </div>
          <select
            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 outline-none transition"
            value={form.defaultRedirect}
            onChange={(e) =>
              setForm({ ...form, defaultRedirect: e.target.value })
            }
          >
            <option value="">-- Select Default Redirect --</option>
            {Object.entries(form.social || {})
              .filter(([_, v]) => v)
              .map(([k, v]) => (
                <option key={`social-${k}`} value={v}>
                  {k} - {v}
                </option>
              ))}
            {Object.entries(form.payment || {})
              .filter(([_, v]: any) => v?.upiId)
              .map(([k, v]: any) => (
                <option key={`payment-${k}`} value={v.upiId}>
                  {k} - {v.upiId}
                </option>
              ))}
          </select>
        </div>

        {/* Save Button */}
        <div className="sticky bottom-4">
          <button
            onClick={saveData}
            disabled={saving}
            className={`w-full flex items-center justify-center px-6 py-3 rounded-xl font-medium text-white shadow-md transition
              ${saving ? "bg-blue-400" : "bg-blue-600 hover:bg-blue-700 hover:shadow-lg"}`}
          >
            {saving ? (
              <>
                <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                Saving...
              </>
            ) : (
              <>
                <Save className="w-5 h-5 mr-2" />
                Save Changes
              </>
            )}
          </button>

          {/* Save status messages */}
          {saveStatus && (
            <div className="mt-3 flex items-center justify-center">
              {saveStatus === "success" ? (
                <div className="flex items-center text-green-600">
                  <CheckCircle2 className="w-5 h-5 mr-1" />
                  Saved successfully
                </div>
              ) : saveStatus === "error" ? (
                <div className="flex items-center text-red-600">
                  <XCircle className="w-5 h-5 mr-1" />
                  Failed to save
                </div>
              ) : null}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
