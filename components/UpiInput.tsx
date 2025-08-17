// import React, { useState } from "react";

interface UpiInputProps {
  setForm: React.Dispatch<React.SetStateAction<any>>;
}

const UpiInput: React.FC<UpiInputProps> = ({ setForm }) => {
  const [mode, setMode] = useState("fixed"); // "fixed" or "custom"
  const [upiId, setUpiId] = useState("");
  const [name, setName] = useState("U");
  const [amount, setAmount] = useState("");

  const handleChange = () => {
    let upiUrl = "";
    if (mode === "fixed" && amount) {
      upiUrl = `upi://pay?pa=${upiId}&pn=${name}&am=${amount}&cur=INR`;
    } else {
      upiUrl = `upi://pay?pa=${upiId}&pn=${name}&cur=INR`;
    }

    setForm((prev: any) => ({
      ...prev,
      payment: { upi: upiUrl },
    }));
  };

  return (
    <div className="p-4 bg-white rounded-2xl shadow-md space-y-4">
      <h2 className="text-lg font-semibold">UPI Payment Setup</h2>

      {/* Dropdown to choose mode */}
      <div>
        <label className="block text-sm font-medium mb-1">Mode</label>
        <select
          value={mode}
          onChange={(e) => setMode(e.target.value)}
          className="w-full border rounded-lg px-3 py-2"
        >
          <option value="fixed">Fixed Amount</option>
          <option value="custom">Custom Amount</option>
        </select>
      </div>

      {/* UPI ID Input */}
      <div>
        <label className="block text-sm font-medium mb-1">UPI ID</label>
        <input
          type="text"
          value={upiId}
          onChange={(e) => setUpiId(e.target.value)}
          onBlur={handleChange}
          placeholder="example@upi"
          className="w-full border rounded-lg px-3 py-2"
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">UPI ID</label>
        <input
          type="text"
          value={upiId}
          onChange={(e) => setName(e.target.value)}
          onBlur={handleChange}
          placeholder="eg:Kishor"
          className="w-full border rounded-lg px-3 py-2"
        />
      </div>

      {/* Amount Input (only if mode is fixed) */}
      {mode === "fixed" && (
        <div>
          <label className="block text-sm font-medium mb-1">Amount (₹)</label>
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            onBlur={handleChange}
            placeholder="Enter amount"
            className="w-full border rounded-lg px-3 py-2"
          />
        </div>
      )}

      {/* Preview */}
      <div className="mt-4 p-3 bg-gray-100 rounded-lg text-sm">
        <p className="font-medium">Preview:</p>
        <p className="break-all text-blue-600">
          {mode === "fixed" && amount
            ? `upi://pay?pa=${upiId}&pn=User&am=${amount}&cur=INR`
            : `upi://pay?pa=${upiId}&pn=User&cur=INR`}
        </p>
      </div>
      {/* Note */}
      <p className="text-sm text-gray-500 mt-2">
        ⚡ These UPI details work with any payment app that supports UPI transactions
        (Google Pay, PhonePe, Paytm, etc).
      </p>
    </div>
  );
};

export default UpiInput;
