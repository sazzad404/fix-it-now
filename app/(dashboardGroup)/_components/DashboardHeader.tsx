"use client";

import { Bell } from "lucide-react";

const DashboardHeader = () => {
  return (
    <header className="flex h-16 items-center justify-between border-b border-zinc-800 bg-zinc-900/80 px-4 backdrop-blur md:px-6">
      <div>
        <p className="text-sm text-zinc-400">
          Welcome back 👋
        </p>

        <p className="font-semibold">
          FixItNow Dashboard
        </p>
      </div>

      <button className="relative rounded-full p-2 text-zinc-400 hover:bg-zinc-800 hover:text-white">
        <Bell size={20} />

        <span className="absolute right-1 top-1 h-2 w-2 rounded-full bg-red-500" />
      </button>
    </header>
  );
};

export default DashboardHeader;