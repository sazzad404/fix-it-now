"use client";

import {
  Mail,
  MapPin,
  CalendarDays,
  Pencil,
  ShieldCheck,
  UserRound,
  Briefcase,
  Star,
  Clock,
} from "lucide-react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import TechnicianUpdateModal from "./TechnicianUpdateModal";

export type User = {
  id: string;
  name: string;
  email: string;
  role: string;
  status: string;
  createdAt: string;
  updatedAt: string;

  technicianProfile: {
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
  } | null;
};

const ProfileCard = ({ profile }: { profile: User }) => {
  const [showTechnicianModal, setShowTechnicianModal] = useState(false);

  const router = useRouter();

  const user = profile;

  const technician = user.technicianProfile;

  const joinedDate = user.createdAt
    ? new Date(user.createdAt).toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      })
    : "Not available";

  const handleModalClose = () => {
    setShowTechnicianModal(false);

    // Refresh server data after update
    router.refresh();
  };

  return (
    <div className="min-h-screen bg-[#0b1120] text-white">
      {/* Hero Section */}
      <div className="relative overflow-hidden border-b border-white/10">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-purple-500/10 to-transparent" />

        <div className="relative mx-auto max-w-7xl px-6 py-12 lg:px-10">
          <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
            <div className="flex items-center gap-5">
              {/* Avatar */}
              <div className="flex h-24 w-24 shrink-0 items-center justify-center rounded-3xl bg-gradient-to-br from-primary to-purple-600 text-4xl font-bold shadow-xl">
                {user.name?.charAt(0).toUpperCase() || "U"}
              </div>

              <div>
                <p className="mb-1 text-sm text-primary">
                  {user.role === "TECHNICIAN"
                    ? "Technician Profile"
                    : "Customer Profile"}
                </p>

                <h1 className="text-3xl font-bold sm:text-4xl">{user.name}</h1>

                <div className="mt-2 flex flex-wrap items-center gap-3 text-sm text-gray-400">
                  <span className="flex items-center gap-1.5">
                    <Mail className="h-4 w-4" />
                    {user.email}
                  </span>

                  <span className="rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold uppercase text-primary">
                    {user.role}
                  </span>
                </div>
              </div>
            </div>

            {user.role === "TECHNICIAN" && (
              <button
                onClick={() => setShowTechnicianModal(true)}
                className="flex w-fit items-center gap-2 rounded-xl bg-primary px-5 py-3 font-medium text-primary-foreground transition hover:opacity-90"
              >
                <Pencil className="h-4 w-4" />
                Edit Profile
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <main className="mx-auto max-w-7xl px-6 py-10 lg:px-10">
        {/* Personal Information */}
        <div className="grid gap-6 lg:grid-cols-3">
          <section className="rounded-3xl border border-white/10 bg-[#111827] p-6 shadow-xl sm:p-8 lg:col-span-2">
            <div className="mb-7">
              <h2 className="text-xl font-bold">Personal Information</h2>

              <p className="mt-1 text-sm text-gray-400">
                Your basic account information
              </p>
            </div>

            <div className="grid gap-5 sm:grid-cols-2">
              {/* Name */}
              <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-5">
                <p className="text-xs uppercase tracking-wider text-gray-500">
                  Full Name
                </p>

                <p className="mt-2 text-lg font-semibold">{user.name}</p>
              </div>

              {/* Email */}
              <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-5">
                <p className="text-xs uppercase tracking-wider text-gray-500">
                  Email Address
                </p>

                <p className="mt-2 break-all text-lg font-semibold">
                  {user.email}
                </p>
              </div>

              {/* Role */}
              <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-5">
                <p className="text-xs uppercase tracking-wider text-gray-500">
                  Account Role
                </p>

                <div className="mt-2 flex items-center gap-2 text-lg font-semibold">
                  <UserRound className="h-5 w-5 text-purple-400" />
                  {user.role}
                </div>
              </div>

              {/* Location */}
              <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-5">
                <p className="text-xs uppercase tracking-wider text-gray-500">
                  Location
                </p>

                <div className="mt-2 flex items-center gap-2 text-lg font-semibold">
                  <MapPin className="h-5 w-5 text-primary" />

                  {technician?.location || "Not added"}
                </div>
              </div>
            </div>
          </section>

          {/* Account Overview */}
          <section className="rounded-3xl border border-white/10 bg-[#111827] p-6 shadow-xl sm:p-8">
            <div className="mb-7">
              <h2 className="text-xl font-bold">Account Overview</h2>

              <p className="mt-1 text-sm text-gray-400">
                Your account activity
              </p>
            </div>

            <div className="space-y-5">
              {/* Member Since */}
              <div className="rounded-2xl bg-white/[0.03] p-5">
                <CalendarDays className="mb-3 h-6 w-6 text-purple-400" />

                <p className="text-xs uppercase tracking-wider text-gray-500">
                  Member Since
                </p>

                <p className="mt-2 font-semibold">{joinedDate}</p>
              </div>

              {/* Status */}
              <div className="rounded-2xl border border-emerald-500/20 bg-emerald-500/5 p-5">
                <ShieldCheck className="mb-3 h-6 w-6 text-emerald-400" />

                <p className="text-xs uppercase tracking-wider text-gray-500">
                  Account Status
                </p>

                <div className="mt-2 flex items-center gap-2">
                  <span className="h-2.5 w-2.5 rounded-full bg-emerald-400" />

                  <span className="font-semibold text-emerald-400">
                    {user.status}
                  </span>
                </div>
              </div>
            </div>
          </section>
        </div>

        {/* Technician Profile */}
        {user.role === "TECHNICIAN" && technician && (
          <section className="mt-6 rounded-3xl border border-white/10 bg-[#111827] p-6 shadow-xl sm:p-8">
            <div className="mb-7">
              <h2 className="text-xl font-bold">Technician Information</h2>

              <p className="mt-1 text-sm text-gray-400">
                Your professional profile and availability
              </p>
            </div>

            {/* Stats */}
            <div className="grid gap-4 sm:grid-cols-3">
              {/* Experience */}
              <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-5">
                <Briefcase className="mb-3 h-6 w-6 text-blue-400" />

                <p className="text-xs uppercase tracking-wider text-gray-500">
                  Experience
                </p>

                <p className="mt-2 text-2xl font-bold">
                  {technician.experience}

                  <span className="ml-1 text-sm font-normal text-gray-500">
                    years
                  </span>
                </p>
              </div>

              {/* Rating */}
              <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-5">
                <Star className="mb-3 h-6 w-6 fill-yellow-400 text-yellow-400" />

                <p className="text-xs uppercase tracking-wider text-gray-500">
                  Rating
                </p>

                <p className="mt-2 text-2xl font-bold">
                  {technician.rating || 0}

                  <span className="ml-1 text-sm font-normal text-gray-500">
                    / 5
                  </span>
                </p>
              </div>

              {/* Location */}
              <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-5">
                <MapPin className="mb-3 h-6 w-6 text-primary" />

                <p className="text-xs uppercase tracking-wider text-gray-500">
                  Service Location
                </p>

                <p className="mt-2 text-lg font-bold">
                  {technician.location || "Not added"}
                </p>
              </div>
            </div>

            {/* Bio */}
            <div className="mt-5 rounded-2xl border border-white/10 bg-white/[0.03] p-5">
              <p className="text-xs uppercase tracking-wider text-gray-500">
                Professional Bio
              </p>

              <p className="mt-3 leading-7 text-gray-300">
                {technician.bio || "No bio added yet."}
              </p>
            </div>

            {/* Skills */}
            <div className="mt-5 rounded-2xl border border-white/10 bg-white/[0.03] p-5">
              <p className="mb-4 text-sm font-semibold uppercase tracking-wider text-gray-300">
                Skills
              </p>

              <div className="flex flex-wrap gap-3">
                {technician.skills?.length > 0 ? (
                  technician.skills.map((skill) => (
                    <span
                      key={skill}
                      className="rounded-lg bg-zinc-800 px-4 py-2 text-sm font-medium text-white"
                    >
                      {skill}
                    </span>
                  ))
                ) : (
                  <p className="text-sm text-gray-500">No skills added yet.</p>
                )}
              </div>
            </div>

            {/* Availability */}
            <div className="mt-5 rounded-2xl border border-white/10 bg-white/[0.03] p-5">
              <div className="flex items-center gap-2">
                <Clock className="h-5 w-5 text-purple-400" />

                <p className="text-xs uppercase tracking-wider text-gray-500">
                  Availability
                </p>
              </div>

              <div className="mt-3 flex flex-wrap gap-2">
                {technician.availability?.length > 0 ? (
                  technician.availability.map((time) => (
                    <span
                      key={time}
                      className="rounded-lg border border-purple-500/20 bg-purple-500/10 px-4 py-2 text-sm text-purple-300"
                    >
                      {time}
                    </span>
                  ))
                ) : (
                  <p className="text-sm text-gray-500">
                    No availability added yet.
                  </p>
                )}
              </div>
            </div>
          </section>
        )}

        {/* Bottom Section */}
        <section className="mt-6 rounded-3xl border border-white/10 bg-gradient-to-r from-primary/10 via-purple-500/5 to-transparent p-6 sm:p-8">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h2 className="text-xl font-bold">Keep your profile updated</h2>

              <p className="mt-1 text-sm text-gray-400">
                Make sure your personal information is always up to date.
              </p>
            </div>

            <button
              onClick={() => setShowTechnicianModal(true)}
              className="rounded-xl border border-white/10 bg-white/5 px-5 py-3 text-sm font-medium transition hover:bg-white/10"
            >
              Update Information
            </button>
          </div>
        </section>
      </main>

      {/* Technician Update Modal */}
      {showTechnicianModal && technician && (
        <TechnicianUpdateModal
          technician={technician}
          onClose={handleModalClose}
        />
      )}
    </div>
  );
};

export default ProfileCard;
