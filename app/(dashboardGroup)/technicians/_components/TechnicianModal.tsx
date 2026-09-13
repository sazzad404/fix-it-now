"use client";

import {
  Briefcase,
  Clock,
  Mail,
  MapPin,
  Star,
  X,
} from "lucide-react";
import { useEffect } from "react";
import { Technician } from "./TechnicianCard";

const TechnicianDetailsModal = ({
  technician,
  onClose,
}: {
  technician: Technician;
  onClose: () => void;
}) => {
  const initials =
    technician.user.name
      ?.split(" ")
      .map((word) => word[0])
      .join("")
      .slice(0, 2)
      .toUpperCase() || "T";

  // ESC চাপলে modal close
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    // Modal open থাকলে background scroll বন্ধ
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "unset";
    };
  }, [onClose]);

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 p-4 backdrop-blur-md"
      onClick={onClose}
    >
      {/* Modal */}
      <div
        className="relative flex max-h-[90vh] w-full max-w-2xl flex-col overflow-hidden rounded-3xl border border-zinc-800 bg-zinc-950 shadow-[0_25px_80px_rgba(0,0,0,0.6)]"
        onClick={(event) => event.stopPropagation()}
      >
        {/* ================= HEADER ================= */}
        <div className="relative shrink-0">
          {/* Cover */}
          <div className="relative h-36 overflow-hidden bg-gradient-to-br from-blue-600/40 via-indigo-600/30 to-purple-600/30">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(59,130,246,0.3),transparent_40%)]" />

            <div className="absolute -right-20 -top-20 h-56 w-56 rounded-full bg-blue-500/10 blur-3xl" />

            <div className="absolute -bottom-20 -left-20 h-56 w-56 rounded-full bg-purple-500/10 blur-3xl" />
          </div>

          {/* Close Button */}
          <button
            onClick={onClose}
            aria-label="Close modal"
            className="absolute right-4 top-4 flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-black/30 text-zinc-300 backdrop-blur-md transition-all hover:border-red-500/30 hover:bg-red-500/10 hover:text-red-400"
          >
            <X className="h-5 w-5" />
          </button>

          {/* Avatar */}
          <div className="absolute bottom-0 left-6 translate-y-1/2">
            <div className="flex h-24 w-24 items-center justify-center rounded-3xl border-[5px] border-zinc-950 bg-gradient-to-br from-blue-500 to-indigo-600 text-3xl font-bold text-white shadow-2xl">
              {initials}
            </div>
          </div>

          {/* Rating */}
          <div className="absolute bottom-4 right-5 flex items-center gap-1.5 rounded-full border border-yellow-500/20 bg-black/40 px-3 py-1.5 backdrop-blur-md">
            <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />

            <span className="text-sm font-semibold text-white">
              {technician.rating || 0}
            </span>

            <span className="text-xs text-zinc-500">
              Rating
            </span>
          </div>
        </div>

        {/* ================= SCROLLABLE CONTENT ================= */}
        <div className="overflow-y-auto">
          <div className="p-6 pt-16 sm:p-8 sm:pt-16">
            {/* Profile */}
            <div>
              <h2 className="text-2xl font-bold tracking-tight text-white">
                {technician.user.name}
              </h2>

              <div className="mt-2 flex items-center gap-2 text-sm text-zinc-500">
                <Mail className="h-4 w-4 shrink-0 text-blue-400" />

                <span className="break-all">
                  {technician.user.email}
                </span>
              </div>
            </div>

            {/* ================= STATS ================= */}
            <div className="mt-7 grid grid-cols-2 gap-3 sm:grid-cols-3">
              {/* Experience */}
              <div className="rounded-2xl border border-white/5 bg-white/[0.03] p-4 transition hover:bg-white/[0.05]">
                <div className="flex items-center gap-2 text-zinc-500">
                  <Briefcase className="h-4 w-4 text-blue-400" />

                  <span className="text-xs">
                    Experience
                  </span>
                </div>

                <p className="mt-2 text-sm font-bold text-white">
                  {technician.experience || 0} years
                </p>
              </div>

              {/* Location */}
              <div className="rounded-2xl border border-white/5 bg-white/[0.03] p-4 transition hover:bg-white/[0.05]">
                <div className="flex items-center gap-2 text-zinc-500">
                  <MapPin className="h-4 w-4 text-blue-400" />

                  <span className="text-xs">
                    Location
                  </span>
                </div>

                <p className="mt-2 truncate text-sm font-bold text-white">
                  {technician.location || "Not added"}
                </p>
              </div>

              {/* Availability */}
              <div className="rounded-2xl border border-white/5 bg-white/[0.03] p-4 transition hover:bg-white/[0.05]">
                <div className="flex items-center gap-2 text-zinc-500">
                  <Clock className="h-4 w-4 text-emerald-400" />

                  <span className="text-xs">
                    Availability
                  </span>
                </div>

                <p className="mt-2 text-sm font-bold text-white">
                  {technician.availability?.length || 0} slots
                </p>
              </div>
            </div>

            {/* ================= ABOUT ================= */}
            <div className="mt-8">
              <div className="mb-3 flex items-center gap-3">
                <div className="h-5 w-1 rounded-full bg-blue-500" />

                <h3 className="text-sm font-semibold uppercase tracking-wider text-zinc-400">
                  About Technician
                </h3>
              </div>

              <div className="rounded-2xl border border-white/5 bg-white/[0.02] p-4">
                <p className="text-sm leading-7 text-zinc-400">
                  {technician.bio ||
                    "No professional bio available."}
                </p>
              </div>
            </div>

            {/* ================= SKILLS ================= */}
            <div className="mt-8">
              <div className="mb-3 flex items-center gap-3">
                <div className="h-5 w-1 rounded-full bg-blue-500" />

                <h3 className="text-sm font-semibold uppercase tracking-wider text-zinc-400">
                  Professional Skills
                </h3>
              </div>

              <div className="rounded-2xl border border-white/5 bg-white/[0.02] p-4">
                {technician.skills?.length ? (
                  <div className="flex flex-wrap gap-2">
                    {technician.skills.map((skill) => (
                      <span
                        key={skill}
                        className="rounded-xl border border-blue-500/20 bg-blue-500/10 px-3 py-2 text-xs font-medium text-blue-400"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                ) : (
                  <p className="text-sm text-zinc-600">
                    No skills added.
                  </p>
                )}
              </div>
            </div>

            {/* ================= AVAILABILITY ================= */}
            <div className="mt-8">
              <div className="mb-3 flex items-center gap-3">
                <div className="h-5 w-1 rounded-full bg-emerald-500" />

                <h3 className="text-sm font-semibold uppercase tracking-wider text-zinc-400">
                  Available Slots
                </h3>
              </div>

              <div className="rounded-2xl border border-white/5 bg-white/[0.02] p-4">
                {technician.availability?.length ? (
                  <div className="flex flex-wrap gap-2">
                    {technician.availability.map((slot) => (
                      <span
                        key={slot}
                        className="rounded-xl border border-emerald-500/20 bg-emerald-500/10 px-3 py-2 text-xs font-medium text-emerald-400"
                      >
                        {slot}
                      </span>
                    ))}
                  </div>
                ) : (
                  <p className="text-sm text-zinc-600">
                    No availability added.
                  </p>
                )}
              </div>
            </div>

            {/* ================= FOOTER ================= */}
            <div className="mt-8 border-t border-white/5 pt-5">
              <button
                onClick={onClose}
                className="w-full rounded-xl border border-white/10 bg-white/[0.04] px-4 py-3 text-sm font-semibold text-zinc-300 transition-all hover:border-blue-500/30 hover:bg-blue-500/10 hover:text-white"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TechnicianDetailsModal;