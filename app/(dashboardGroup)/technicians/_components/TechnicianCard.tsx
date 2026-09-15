"use client";

import { ArrowRight, Briefcase, Clock, Mail, MapPin, Star } from "lucide-react";
import { useState } from "react";
import TechnicianDetailsModal from "./TechnicianModal";

export type Technician = {
  id: string;
  userId: string;
  skills: string[];
  experience: number;
  bio: string;
  rating: number;
  location: string;
  availability: string[];
  createdAt: string;
  updatedAt: string;

  user: {
    id: string;
    name: string;
    email: string;
  };

  reviews: {
    id: string;
    bookingId: string;
    customerId: string;
    technicianId: string;
    rating: number;
    comment: string;
    createdAt: string;
    updatedAt: string;
  }[];
};
const TechnicianCard = ({ technician }: { technician: Technician }) => {
  const [showDetails, setShowDetails] = useState(false);

  const initials =
    technician.user.name
      ?.split(" ")
      .map((word) => word[0])
      .join("")
      .slice(0, 2)
      .toUpperCase() || "T";

  return (
    <>
      {/* Technician Card */}
      <div className="group overflow-hidden rounded-2xl border border-zinc-800 bg-zinc-900 shadow-lg transition-all duration-300 hover:-translate-y-1 hover:border-blue-500/40 hover:shadow-blue-500/5">
        {/* Header */}
        <div className="relative h-24 bg-gradient-to-br from-blue-600/30 via-indigo-600/20 to-purple-600/20">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(59,130,246,0.18),transparent_40%)]" />

          {/* Avatar */}
          <div className="absolute -bottom-8 left-6">
            <div className="flex h-16 w-16 items-center justify-center rounded-2xl border-4 border-zinc-900 bg-gradient-to-br from-blue-500 to-indigo-600 text-xl font-bold text-white shadow-xl">
              {initials}
            </div>
          </div>

          {/* Rating */}
          <div className="absolute right-4 top-4 flex items-center gap-2 rounded-full border border-white/10 bg-zinc-900/80 px-3 py-1.5 backdrop-blur">
            <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />

            <span className="text-sm font-semibold text-white">
              {technician.rating || 0}
            </span>

            <span className="text-xs text-zinc-500">
              ({technician.reviews?.length || 0})
            </span>
          </div>
        </div>

        {/* Body */}
        <div className="p-6 pt-12">
          {/* Name */}
          <div>
            <h2 className="text-xl font-bold text-white">
              {technician.user.name}
            </h2>

            <div className="mt-1 flex items-center gap-1.5 text-sm text-zinc-500">
              <Mail className="h-4 w-4 shrink-0" />

              <span className="truncate">{technician.user.email}</span>
            </div>
          </div>

          {/* Stats */}
          <div className="mt-5 grid grid-cols-2 gap-3">
            <div className="rounded-xl border border-white/5 bg-white/[0.03] p-3">
              <div className="flex items-center gap-2 text-zinc-500">
                <Briefcase className="h-4 w-4 text-blue-400" />

                <span className="text-xs">Experience</span>
              </div>

              <p className="mt-1 font-semibold text-white">
                {technician.experience || 0} years
              </p>
            </div>

            <div className="rounded-xl border border-white/5 bg-white/[0.03] p-3">
              <div className="flex items-center gap-2 text-zinc-500">
                <MapPin className="h-4 w-4 text-blue-400" />

                <span className="text-xs">Location</span>
              </div>

              <p className="mt-1 truncate font-semibold text-white">
                {technician.location || "Not added"}
              </p>
            </div>
          </div>

          {/* Bio */}
          <div className="mt-5">
            <p className="line-clamp-2 text-sm leading-6 text-zinc-400">
              {technician.bio || "No professional bio available."}
            </p>
          </div>

          {/* Skills */}
          <div className="mt-5">
            <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-zinc-500">
              Skills
            </p>

            <div className="flex flex-wrap gap-2">
              {technician.skills?.length > 0 ? (
                technician.skills.slice(0, 4).map((skill) => (
                  <span
                    key={skill}
                    className="rounded-lg border border-blue-500/20 bg-blue-500/10 px-3 py-1.5 text-xs font-medium text-blue-400"
                  >
                    {skill}
                  </span>
                ))
              ) : (
                <span className="text-sm text-zinc-600">No skills added</span>
              )}

              {technician.skills?.length > 4 && (
                <span className="rounded-lg border border-white/5 bg-white/[0.03] px-3 py-1.5 text-xs text-zinc-500">
                  +{technician.skills.length - 4} more
                </span>
              )}
            </div>
          </div>

          {/* Availability */}
          <div className="mt-5 flex items-center gap-2 border-t border-white/5 pt-4">
            <Clock className="h-4 w-4 text-emerald-400" />

            <span className="text-xs text-zinc-500">
              {technician.availability?.length
                ? `${technician.availability.length} available slots`
                : "No availability"}
            </span>
          </div>

          {/* Button */}
          <button
            onClick={() => setShowDetails(true)}
            className="mt-5 flex w-full items-center justify-center gap-2 rounded-xl bg-white/[0.06] px-4 py-3 text-sm font-semibold text-white transition-all duration-300 hover:bg-blue-600"
          >
            View Technician
            <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
          </button>
        </div>
      </div>

      {/* Modal - Card এর বাইরে */}
      {showDetails && (
        <TechnicianDetailsModal
          technician={technician}
          onClose={() => setShowDetails(false)}
        />
      )}
    </>
  );
};

export default TechnicianCard;
