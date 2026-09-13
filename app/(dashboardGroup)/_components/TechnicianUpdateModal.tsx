"use client";

import {
  Briefcase,
  Clock,
  MapPin,
  Plus,
  Save,
  Trash2,
  X,
} from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { updateTechnicianProfile } from "../_actions/updateTechnicanProfile";
import { updateTechnicianAvailability } from "../_actions/updateTechnicianAvailability";


const days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

type AvailabilitySlot = {
  day: string;
  startTime: string;
  endTime: string;
};

type TechnicianUpdateModalProps = {
  technician: {
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
  };
  onClose: () => void;
};

const parseAvailability = (
  availability: string[]
): AvailabilitySlot[] => {
  if (!availability || availability.length === 0) {
    return [
      {
        day: "Sunday",
        startTime: "09:00",
        endTime: "12:00",
      },
    ];
  }

  return availability.map((item) => {
    const [day, time] = item.split(" ");
    const [startTime, endTime] = time.split("-");

    return {
      day,
      startTime,
      endTime,
    };
  });
};

const TechnicianUpdateModal = ({
  technician,
  onClose,
}: TechnicianUpdateModalProps) => {
  const [location, setLocation] = useState(
    technician.location || ""
  );

  const [experience, setExperience] = useState(
    String(technician.experience ?? "")
  );

  const [bio, setBio] = useState(
    technician.bio || ""
  );

  const [skills, setSkills] = useState(
    technician.skills?.join(", ") || ""
  );

  const [availabilitySlots, setAvailabilitySlots] = useState<
    AvailabilitySlot[]
  >(parseAvailability(technician.availability));

  const [isSaving, setIsSaving] = useState(false);

  const addAvailability = () => {
    setAvailabilitySlots([
      ...availabilitySlots,
      {
        day: "Monday",
        startTime: "09:00",
        endTime: "12:00",
      },
    ]);
  };

  const removeAvailability = (index: number) => {
    setAvailabilitySlots(
      availabilitySlots.filter((_, i) => i !== index)
    );
  };

  const updateAvailability = (
    index: number,
    field: keyof AvailabilitySlot,
    value: string
  ) => {
    const updated = [...availabilitySlots];

    updated[index] = {
      ...updated[index],
      [field]: value,
    };

    setAvailabilitySlots(updated);
  };

  const handleSave = async () => {
    try {
      setIsSaving(true);

      // Convert UI availability format
      // Sunday + 09:00 + 12:00
      // =>
      // Sunday 09:00-12:00
      const availability = availabilitySlots.map(
        (slot) =>
          `${slot.day} ${slot.startTime}-${slot.endTime}`
      );

      // Convert comma separated skills into array
      const skillsArray = skills
        .split(",")
        .map((skill) => skill.trim())
        .filter(Boolean);

      const profileData = {
        skills: skillsArray,
        experience: Number(experience),
        bio,
        location,
      };

      // Update technician profile
      const profileResult =
        await updateTechnicianProfile(profileData);

      if (!profileResult?.success) {
        throw new Error(
          profileResult?.message ||
            "Failed to update technician profile"
        );
      }

      // Update availability
      const availabilityResult =
        await updateTechnicianAvailability(availability);

      if (!availabilityResult?.success) {
        throw new Error(
          availabilityResult?.message ||
            "Failed to update availability"
        );
      }

      toast.success("Profile updated successfully!");

      onClose();
    } catch (error) {
      console.error("Profile update error:", error);

      toast.error(
        error instanceof Error
          ? error.message
          : "Something went wrong!"
      );
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 p-4 backdrop-blur-sm">
      <div className="w-full max-w-2xl overflow-hidden rounded-3xl border border-white/10 bg-[#111827] shadow-2xl">

        {/* Header */}
        <div className="flex items-center justify-between border-b border-white/10 px-6 py-5 sm:px-8">
          <div>
            <h2 className="text-xl font-bold text-white">
              Edit Technician Profile
            </h2>

            <p className="mt-1 text-sm text-gray-400">
              Update your professional information
            </p>
          </div>

          <button
            type="button"
            onClick={onClose}
            disabled={isSaving}
            className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-gray-400 transition hover:bg-white/10 hover:text-white disabled:cursor-not-allowed disabled:opacity-50"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Body */}
        <div className="max-h-[75vh] overflow-y-auto px-6 py-6 sm:px-8">
          <div className="space-y-6">

            {/* Location */}
            <div>
              <label className="mb-2 flex items-center gap-2 text-sm font-medium text-gray-300">
                <MapPin className="h-4 w-4 text-blue-400" />
                Service Location
              </label>

              <input
                type="text"
                value={location}
                onChange={(e) =>
                  setLocation(e.target.value)
                }
                placeholder="Enter your service location"
                className="w-full rounded-xl border border-white/10 bg-white/[0.04] px-4 py-3 text-sm text-white outline-none transition placeholder:text-gray-600 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
              />
            </div>

            {/* Experience */}
            <div>
              <label className="mb-2 flex items-center gap-2 text-sm font-medium text-gray-300">
                <Briefcase className="h-4 w-4 text-purple-400" />
                Experience
              </label>

              <input
                type="number"
                min="0"
                value={experience}
                onChange={(e) =>
                  setExperience(e.target.value)
                }
                placeholder="Experience in years"
                className="w-full rounded-xl border border-white/10 bg-white/[0.04] px-4 py-3 text-sm text-white outline-none transition placeholder:text-gray-600 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
              />
            </div>

            {/* Bio */}
            <div>
              <label className="mb-2 block text-sm font-medium text-gray-300">
                Professional Bio
              </label>

              <textarea
                rows={4}
                value={bio}
                onChange={(e) =>
                  setBio(e.target.value)
                }
                placeholder="Write something about your professional experience..."
                className="w-full resize-none rounded-xl border border-white/10 bg-white/[0.04] px-4 py-3 text-sm leading-6 text-white outline-none transition placeholder:text-gray-600 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
              />
            </div>

            {/* Skills */}
            <div>
              <label className="mb-2 block text-sm font-medium text-gray-300">
                Skills
              </label>

              <input
                type="text"
                value={skills}
                onChange={(e) =>
                  setSkills(e.target.value)
                }
                placeholder="Electrical, Plumbing, AC Repair..."
                className="w-full rounded-xl border border-white/10 bg-white/[0.04] px-4 py-3 text-sm text-white outline-none transition placeholder:text-gray-600 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
              />

              <p className="mt-2 text-xs text-gray-500">
                Separate skills with commas.
              </p>
            </div>

            {/* Availability */}
            <div>
              <div className="mb-4 flex items-center justify-between">
                <div>
                  <label className="flex items-center gap-2 text-sm font-medium text-gray-300">
                    <Clock className="h-4 w-4 text-emerald-400" />
                    Availability
                  </label>

                  <p className="mt-1 text-xs text-gray-500">
                    Select your available days and working hours.
                  </p>
                </div>

                <button
                  type="button"
                  onClick={addAvailability}
                  disabled={isSaving}
                  className="flex items-center gap-1.5 rounded-lg border border-emerald-500/20 bg-emerald-500/10 px-3 py-2 text-xs font-semibold text-emerald-400 transition hover:bg-emerald-500/20 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  <Plus className="h-4 w-4" />
                  Add Slot
                </button>
              </div>

              <div className="space-y-3">
                {availabilitySlots.map((slot, index) => (
                  <div
                    key={index}
                    className="rounded-2xl border border-white/10 bg-white/[0.03] p-4"
                  >
                    <div className="grid gap-3 sm:grid-cols-[1fr_1fr_1fr_auto] sm:items-end">

                      {/* Day */}
                      <div>
                        <label className="mb-2 block text-xs text-gray-500">
                          Day
                        </label>

                        <select
                          value={slot.day}
                          onChange={(e) =>
                            updateAvailability(
                              index,
                              "day",
                              e.target.value
                            )
                          }
                          disabled={isSaving}
                          className="w-full rounded-xl border border-white/10 bg-[#0f172a] px-3 py-3 text-sm text-white outline-none focus:border-emerald-500"
                        >
                          {days.map((day) => (
                            <option
                              key={day}
                              value={day}
                            >
                              {day}
                            </option>
                          ))}
                        </select>
                      </div>

                      {/* Start */}
                      <div>
                        <label className="mb-2 block text-xs text-gray-500">
                          Start Time
                        </label>

                        <input
                          type="time"
                          value={slot.startTime}
                          onChange={(e) =>
                            updateAvailability(
                              index,
                              "startTime",
                              e.target.value
                            )
                          }
                          disabled={isSaving}
                          className="w-full rounded-xl border border-white/10 bg-[#0f172a] px-3 py-3 text-sm text-white outline-none focus:border-emerald-500"
                        />
                      </div>

                      {/* End */}
                      <div>
                        <label className="mb-2 block text-xs text-gray-500">
                          End Time
                        </label>

                        <input
                          type="time"
                          value={slot.endTime}
                          onChange={(e) =>
                            updateAvailability(
                              index,
                              "endTime",
                              e.target.value
                            )
                          }
                          disabled={isSaving}
                          className="w-full rounded-xl border border-white/10 bg-[#0f172a] px-3 py-3 text-sm text-white outline-none focus:border-emerald-500"
                        />
                      </div>

                      {/* Delete */}
                      <button
                        type="button"
                        onClick={() =>
                          removeAvailability(index)
                        }
                        disabled={isSaving}
                        className="flex h-11 w-11 items-center justify-center rounded-xl border border-red-500/20 bg-red-500/10 text-red-400 transition hover:bg-red-500/20 disabled:cursor-not-allowed disabled:opacity-50"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>

                    {/* Preview */}
                    <div className="mt-3 rounded-lg bg-emerald-500/5 px-3 py-2">
                      <p className="text-xs text-emerald-400">
                        {slot.day} {slot.startTime}-
                        {slot.endTime}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-end gap-3 border-t border-white/10 px-6 py-5 sm:px-8">
          <button
            type="button"
            onClick={onClose}
            disabled={isSaving}
            className="rounded-xl border border-white/10 bg-white/5 px-5 py-3 text-sm font-medium text-gray-300 transition hover:bg-white/10 hover:text-white disabled:cursor-not-allowed disabled:opacity-50"
          >
            Cancel
          </button>

          <button
            type="button"
            onClick={handleSave}
            disabled={isSaving}
            className="flex items-center gap-2 rounded-xl bg-blue-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-blue-500 disabled:cursor-not-allowed disabled:opacity-50"
          >
            <Save className="h-4 w-4" />

            {isSaving ? "Saving..." : "Save Changes"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default TechnicianUpdateModal;