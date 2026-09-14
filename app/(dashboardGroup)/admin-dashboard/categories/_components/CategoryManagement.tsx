"use client";

import {
  ChevronDown,
  ChevronUp,
  Crown,
  FolderOpen,
  Package,
  Plus,
} from "lucide-react";
import { useState } from "react";
import AddCategoryModal from "./addCategoryModal";

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

const CategoryManagement = ({
  categories: initialCategories,
}: {
  categories: Category[];
}) => {
  const [categories, setCategories] = useState(initialCategories);

  const [openCategory, setOpenCategory] = useState<string | null>(null);

  const [showAddModal, setShowAddModal] = useState(false);

  const totalServices = categories.reduce(
    (total, category) => total + category.services.length,
    0,
  );

  const totalPremiumServices = categories.reduce(
    (total, category) =>
      total + category.services.filter((service) => service.isPremium).length,
    0,
  );

  const handleToggle = (id: string) => {
    setOpenCategory((prev) => (prev === id ? null : id));
  };

 const handleCategorySuccess = (newCategory: {
  id: string;
  name: string;
}) => {
  setCategories((prev) => [
    ...prev,
    {
      id: newCategory.id,
      name: newCategory.name,
      services: [],
    },
  ]);

  setShowAddModal(false);
};

  return (
    <div className="min-h-screen bg-[#09090b] p-4 text-white md:p-6">
      {/* Header */}
      <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold">Categories</h1>

          <p className="mt-1 text-sm text-gray-400">
            Manage all service categories
          </p>
        </div>

        <button
          onClick={() => setShowAddModal(true)}
          className="flex w-fit items-center gap-2 rounded-lg bg-white px-4 py-2.5 text-sm font-medium text-black hover:bg-gray-200"
        >
          <Plus size={18} />
          Add Category
        </button>
      </div>

      {/* Stats */}
      <div className="mb-6 grid gap-4 sm:grid-cols-3">
        {/* Total Categories */}
        <div className="rounded-xl border border-white/10 bg-white/[0.03] p-5">
          <div className="flex items-center gap-4">
            <FolderOpen size={22} />

            <div>
              <p className="text-sm text-gray-400">Total Categories</p>

              <h2 className="text-2xl font-bold">{categories.length}</h2>
            </div>
          </div>
        </div>

        {/* Total Services */}
        <div className="rounded-xl border border-white/10 bg-white/[0.03] p-5">
          <div className="flex items-center gap-4">
            <Package size={22} />

            <div>
              <p className="text-sm text-gray-400">Total Services</p>

              <h2 className="text-2xl font-bold">{totalServices}</h2>
            </div>
          </div>
        </div>

        {/* Premium Services */}
        <div className="rounded-xl border border-white/10 bg-white/[0.03] p-5">
          <div className="flex items-center gap-4">
            <Crown size={22} className="text-yellow-400" />

            <div>
              <p className="text-sm text-gray-400">Premium Services</p>

              <h2 className="text-2xl font-bold">{totalPremiumServices}</h2>
            </div>
          </div>
        </div>
      </div>

      {/* Categories */}
      <div className="space-y-3">
        {categories.map((category) => {
          const isOpen = openCategory === category.id;

          return (
            <div
              key={category.id}
              className="overflow-hidden rounded-xl border border-white/10 bg-white/[0.03]"
            >
              {/* Category Header */}
              <div className="flex items-center justify-between p-4 md:p-5">
                <button
                  onClick={() => handleToggle(category.id)}
                  className="flex min-w-0 flex-1 items-center gap-4 text-left"
                >
                  <FolderOpen size={21} />

                  <div>
                    <h2 className="font-semibold">{category.name}</h2>

                    <p className="mt-1 text-sm text-gray-500">
                      {category.services.length}{" "}
                      {category.services.length === 1 ? "service" : "services"}
                    </p>
                  </div>
                </button>

                {/* Open / Close */}
                <button
                  onClick={() => handleToggle(category.id)}
                  className="rounded-lg p-2 text-gray-400 hover:bg-white/10 hover:text-white"
                >
                  {isOpen ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                </button>
              </div>

              {/* Services */}
              {isOpen && (
                <div className="border-t border-white/10 p-4">
                  {category.services.length === 0 ? (
                    <p className="py-6 text-center text-sm text-gray-500">
                      No services in this category
                    </p>
                  ) : (
                    <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-3">
                      {category.services.map((service) => (
                        <div
                          key={service.id}
                          className="rounded-lg border border-white/10 bg-black/20 p-4"
                        >
                          <div className="flex items-start justify-between gap-3">
                            <h3 className="font-medium">{service.title}</h3>

                            {service.isPremium && (
                              <span className="flex items-center gap-1 rounded-full bg-yellow-500/10 px-2 py-1 text-xs text-yellow-400">
                                <Crown size={12} />
                                Premium
                              </span>
                            )}
                          </div>

                          <p className="mt-2 line-clamp-2 text-sm text-gray-500">
                            {service.description}
                          </p>

                          <p className="mt-3 font-semibold">৳{service.price}</p>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Add Category Modal */}
      {showAddModal && (
        <AddCategoryModal
          onClose={() => setShowAddModal(false)}
          onSuccess={handleCategorySuccess}
        />
      )}
    </div>
  );
};

export default CategoryManagement;
