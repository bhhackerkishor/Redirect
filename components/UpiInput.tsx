// components/UpiInput.tsx
import { useState } from "react";

type UpiType = "upiid" | "upiid+amount+currency" | "upiid+amount+currency+payer";

export default function UpiInput({ form, setForm }: { form: any; setForm: any }) {
  const [option, setOption] = useState<UpiType>("upiid");

  const handleChange = (field: string, value: string) => {
    setForm((prev: any) => ({
      ...prev,
      payment: {
        ...prev.payment,
        [field]: value,
      },
    }));
  };

  return (
    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
      <h2 className="text-xl font-semibold text-gray-800 mb-4">UPI Setup</h2>

      {/* Dropdown selector */}
      <select
        value={option}
        onChange={(e) => setOption(e.target.value as UpiType)}
        className="border border-gray-300 rounded-lg px-3 py-2 mb-4 w-full"
      >
        <option value="upiid">UPI ID Only</option>
        <option value="upiid+amount+currency">UPI ID + Amount + Currency</option>
        <option value="upiid+amount+currency+payer">
          UPI ID + Amount + Currency + Payer Name
        </option>
      </select>

      {/* UPI ID */}
      <input
        placeholder="example@upi"
        value={form.payment?.upiid || ""}
        onChange={(e) => handleChange("upiid", e.target.value)}
        className="w-full border border-gray-300 rounded-lg px-3 py-2 mb-3"
      />

      {/* Conditional Fields */}
      {(option === "upiid+amount+currency" || option === "upiid+amount+currency+payer") && (
        <div className="flex gap-2 mb-3">
          <input
            type="number"
            placeholder="Amount"
            value={form.payment?.amount || ""}
            onChange={(e) => handleChange("amount", e.target.value)}
            className="flex-1 border border-gray-300 rounded-lg px-3 py-2"
          />
          <select
            value={form.payment?.currency || "INR"}
            onChange={(e) => handleChange("currency", e.target.value)}
            className="border border-gray-300 rounded-lg px-3 py-2"
          >
            <option value="INR">INR</option>
            <option value="USD">USD</option>
            <option value="EUR">EUR</option>
          </select>
        </div>
      )}

      {option === "upiid+amount+currency+payer" && (
        <input
          placeholder="Payer Name"
          value={form.payment?.payer || ""}
          onChange={(e) => handleChange("payer", e.target.value)}
          className="w-full border border-gray-300 rounded-lg px-3 py-2 mb-3"
        />
      )}

      {/* Note */}
      <p className="text-sm text-gray-500 mt-2">
        ⚡ These UPI details work with any payment app that supports UPI transactions
        (Google Pay, PhonePe, Paytm, etc).
      </p>
    </div>
  );
}
