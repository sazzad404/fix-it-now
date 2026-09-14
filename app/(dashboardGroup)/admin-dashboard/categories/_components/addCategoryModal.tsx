"use client";

import { X } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { createCategory } from "../../_action/createCategories";


type Service = {
  id: string;
  categoryId: string;
  technicianId: string;
  title: string;
  price: string;
  description: string;
  thumbnail: string | null;
  isPremium: boolean;
  createdAt: string;
  updatedAt: string;
};

type Category = {
  id: string;
  name: string;
  services: Service[];
};
type AddCategoryModalProps = {
  onClose: () => void;
  onSuccess: (category: {
    id: string;
    name: string;
  }) => void;
};
const AddCategoryModal = ({
  onClose,
  onSuccess,
}: AddCategoryModalProps) => {
  const [name, setName] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!name.trim()) {
      toast.error("Category name is required");
      return;
    }

    try {
      setIsLoading(true);

      const result = await createCategory(name.trim());

      if (!result.success) {
        toast.error(result.message);
        return;
      }

      toast.success(result.message);

      // নতুন category parent component-এ পাঠানো
      onSuccess(result.data);

    } catch (error) {
      console.error("Create category error:", error);
      toast.error("Failed to add category");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4">
      <div className="w-full max-w-md rounded-xl border border-white/10 bg-[#111113] p-6 text-white shadow-2xl">
        {/* Header */}
        <div className="mb-6 flex items-center justify-between">
          <div>
            <h2 className="text-xl font-semibold">
              Add Category
            </h2>

            <p className="mt-1 text-sm text-gray-500">
              Create a new service category
            </p>
          </div>

          <button
            onClick={onClose}
            type="button"
            className="rounded-lg p-2 text-gray-400 hover:bg-white/10 hover:text-white"
          >
            <X size={20} />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit}>
          <label className="mb-2 block text-sm text-gray-300">
            Category Name
          </label>

          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="e.g. AC Repair"
            className="w-full rounded-lg border border-white/10 bg-white/5 px-4 py-3 text-sm outline-none placeholder:text-gray-600 focus:border-white/30"
          />

          {/* Buttons */}
          <div className="mt-6 flex justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="rounded-lg border border-white/10 px-4 py-2.5 text-sm text-gray-300 hover:bg-white/5"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={isLoading}
              className="rounded-lg bg-white px-5 py-2.5 text-sm font-medium text-black hover:bg-gray-200 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {isLoading ? "Adding..." : "Add Category"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddCategoryModal;