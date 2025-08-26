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
  XCircle
} from "lucide-react";
import { useSession } from "next-auth/react";
import UpiInput from "@/components/UpiInput";

interface RedirectData {
  social: Record<string, string>;
  payment: Record<string, string>;
  defaultRedirect: string;
  username: string;
}

export default function Dashboard() {
  const { data: session }: any = useSession();
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

  // Social media platforms with icons
  const socialPlatforms = [
    { id: "facebook", icon: <Facebook className="w-5 h-5" /> },
    { id: "twitter", icon: <Twitter className="w-5 h-5" /> },
    { id: "instagram", icon: <Instagram className="w-5 h-5" /> },
    { id: "linkedin", icon: <Linkedin className="w-5 h-5" /> },
    { id: "youtube", icon: <Youtube className="w-5 h-5" /> },
  ];

  // Payment platforms
  const paymentPlatforms = ["gpay", "phonepe", "paytm"];

  // Load user redirect data
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
          username: session.user?.name,
        });
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  // Handle input changes
  const handleChange = (section: "social" | "payment", field: string, value: string) => {
    setForm((prev) => ({
      ...prev,
      [section]: { ...prev[section], [field]: value },
    }));
  };

  // Save data
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

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Loader2 className="w-8 h-8 animate-spin text-blue-500" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto space-y-8">
        {/* Header */}
        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-900">Link Dashboard</h1>
          <p className="mt-2 text-gray-600">Manage your social and payment links</p>
        </div>

        {/* QR Code Section */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <div className="flex flex-col items-center">
            {session ? (
              <>
                <div className="p-3 bg-white rounded-lg border border-gray-200">
                  <QRCodeCanvas
                    value={`${process.env.NEXT_PUBLIC_BASE_URL}/r/${session.user?.name}`}
                    size={180}
                    level="H"
                    includeMargin
                  />
                </div>
                <div className="mt-4 text-center">
                  <p className="text-sm text-gray-500">Your personal link:</p>
                  <p className="font-medium text-blue-600">
                    {process.env.NEXT_PUBLIC_BASE_URL}/r/{session.user?.name}
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
              </>
            ) : (
              <div className="flex items-center text-yellow-600">
                <AlertCircle className="w-5 h-5 mr-2" />
                <p>No username found</p>
              </div>
            )}
          </div>
        </div>

        {/* Social Media Links */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <div className="flex items-center mb-4">
            <Globe className="w-5 h-5 text-blue-500 mr-2" />
            <h2 className="text-xl font-semibold text-gray-800">Social Media Links</h2>
          </div>
          
          <div className="space-y-3">
            {socialPlatforms.map(({id, icon}) => (
              <div key={id} className="flex items-center">
                <div className="w-10 flex justify-center">
                  {icon}
                </div>
                <input
                  className="flex-1 border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
                  placeholder={`https://${id}.com/username`}
                  value={form.social?.[id] || ""}
                  onChange={(e) => handleChange("social", id, e.target.value)}
                />
              </div>
            ))}
          </div>
        </div>

        
        {/* UPI Component */}
      <UpiInput form={form} setForm={setForm} />
        

        {/* Default Redirect */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <div className="flex items-center mb-4">
            <ArrowRight className="w-5 h-5 text-purple-500 mr-2" />
            <h2 className="text-xl font-semibold text-gray-800">Default Redirect</h2>
          </div>
          
          <select
            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
            value={form.defaultRedirect}
            onChange={(e) => setForm({ ...form, defaultRedirect: e.target.value })}
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
              .filter(([_, v]) => v)
              .map(([k, v]) => (
                <option key={`payment-${k}`} value={v}>
                  {k} - {v}
                </option>
              ))}
          </select>
        </div>

        {/* Save Button with Status */}
        <div className="sticky bottom-4">
          <button
            onClick={saveData}
            disabled={saving}
            className={`w-full flex items-center justify-center px-6 py-3 rounded-xl font-medium text-white shadow-md transition
              ${saving 
                ? "bg-blue-400" 
                : "bg-blue-600 hover:bg-blue-700 hover:shadow-lg"}
            `}
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
          
          {saveStatus === "success" && (
            <div className="mt-3 flex items-center justify-center p-3 bg-green-50 text-green-700 rounded-lg">
              <CheckCircle2 className="w-5 h-5 mr-2" />
              Changes saved successfully!
            </div>
          )}
          
          {saveStatus === "error" && (
            <div className="mt-3 flex items-center justify-center p-3 bg-red-50 text-red-700 rounded-lg">
              <XCircle className="w-5 h-5 mr-2" />
              Failed to save changes. Please try again.
            </div>
          )}
        </div>
      </div>
    </div>
  );
        }
