import { useState } from "react";
import { X } from "lucide-react";
import api from "../api/api";

function NewBrandModal({ isOpen, onClose, onBrandCreated }) {
  const [brandName, setBrandName] = useState("");
  const [loading, setLoading] = useState(false);

  if (!isOpen) return null;

  const handleCreate = async () => {
    if (!brandName.trim()) return;

    try {
      setLoading(true);

  const res = await api.post("/brands", {
  name: brandName,
});

      setBrandName("");

      onClose();

  if (onBrandCreated) {
  onBrandCreated(res.data._id);
}

    } catch (err) {
      console.log(err);
      alert("Failed to create brand");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/60 flex justify-center items-center z-50">

      <div className="w-[420px] rounded-2xl bg-[#111827] border border-slate-700 p-6">

        {/* Header */}
        <div className="flex justify-between items-center">

          <h2 className="text-2xl font-bold text-white">
            ✨ Create New Brand
          </h2>

          <button
            onClick={onClose}
            className="text-slate-400 hover:text-white"
          >
            <X />
          </button>

        </div>

        {/* Input */}

        <div className="mt-6">

          <label className="text-slate-300 text-sm">
            Brand Name
          </label>

          <input
            value={brandName}
            onChange={(e) => setBrandName(e.target.value)}
            placeholder="Premium Beauty"
            className="mt-2 w-full rounded-xl bg-slate-800 px-4 py-3 text-white outline-none border border-slate-700"
          />

        </div>

        {/* Buttons */}

        <div className="flex justify-end gap-3 mt-8">

          <button
            onClick={onClose}
            className="px-5 py-2 rounded-lg bg-slate-700 text-white"
          >
            Cancel
          </button>

          <button
            onClick={handleCreate}
            disabled={loading}
            className="px-5 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white disabled:opacity-50"
          >
            {loading ? "Creating..." : "Create"}
          </button>

        </div>

      </div>

    </div>
  );
}

export default NewBrandModal;