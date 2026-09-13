"use client";

export type User = {
  id: string;
  name: string;
  email: string;
  role: string;
};

import Link from "next/link";
import {
  LayoutDashboard,
  User,
  CalendarCheck,
  Wrench,
  Users,
  Settings,
  LogOut,
  Menu,
  X,
  Hammer,
} from "lucide-react";
import { useState } from "react";
import { JwtPayload } from "jsonwebtoken";
import { logout } from "@/service/logout";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

const DashboardSidebar = ({ user }: { user: JwtPayload }) => {
  const router = useRouter();
  const handleLogOut = async () => {
    try {
      const result = await logout();

      if (result?.success) {
        toast.success("Logged out successfully");
        router.replace("/login");
        router.refresh();
      } else {
        toast.error("Logout failed");
      }
    } catch (error) {
      console.error("Logout error", error);

      toast.error("Logout failed", {
        description: "Something went wrong. Please try again!",
      });
    }
  };

  const role = user?.role;

  const [open, setOpen] = useState(false);

  const menuItems = [
    {
      title: "Overview",
      href: "/dashboard",
      icon: LayoutDashboard,
      roles: ["CUSTOMER"],
    },
    {
      title: "Profile",
      href: "/dashboard/profile",
      icon: User,
      roles: ["CUSTOMER", "TECHNICIAN", "ADMIN"],
    },
    {
      title: "My Bookings",
      href: "/dashboard/bookings",
      icon: CalendarCheck,
      roles: ["CUSTOMER"],
    },
    {
      title: "My Services",
      href: "/technician-dashboard",
      icon: Wrench,
      roles: ["TECHNICIAN"],
    },
    {
      title: "Manage Users",
      href: "/admin-dashboard",
      icon: Users,
      roles: ["ADMIN"],
    },
    // {
    //   title: "Settings",
    //   href: "/dashboard/settings",
    //   icon: Settings,
    //   roles: ["CUSTOMER", "TECHNICIAN", "ADMIN"],
    // },
    {
      title: "Technicians",
      href: "/technicians",
      icon: Hammer,
      roles: ["CUSTOMER", "TECHNICIAN", "ADMIN"],
    },
  ];

  const visibleMenuItems = menuItems.filter((item) =>
    item.roles.includes(role),
  );

  return (
    <>
      {/* Mobile Menu Button */}
      <button
        onClick={() => setOpen(true)}
        className="fixed left-4 top-4 z-40 rounded-lg bg-zinc-900 p-2 text-white shadow md:hidden"
      >
        <Menu size={22} />
      </button>

      {/* Mobile Overlay */}
      {open && (
        <div
          onClick={() => setOpen(false)}
          className="fixed inset-0 z-40 bg-black/60 md:hidden"
        />
      )}

      {/* Sidebar */}
      <aside
        className={`
          fixed left-0 top-0 z-50 h-screen w-64
          border-r border-zinc-800 bg-zinc-900
          transition-transform duration-300
          md:sticky md:z-auto md:block
          md:translate-x-0
          ${open ? "translate-x-0" : "-translate-x-full"}
        `}
      >
        <div className="flex h-full flex-col">
          {/* Logo */}
          <div className="flex items-center justify-between border-b border-zinc-800 p-6">
            <div>
              <Link href="/" className="text-xl font-bold">
                Fix<span className="text-blue-500">It</span>Now
              </Link>

              <p className="mt-1 text-xs text-zinc-500">{role} Dashboard</p>
            </div>

            {/* Mobile Close Button */}
            <button
              onClick={() => setOpen(false)}
              className="rounded-lg p-2 text-zinc-400 hover:bg-zinc-800 hover:text-white md:hidden"
            >
              <X size={20} />
            </button>
          </div>

          {/* Navigation */}
          <nav className="flex-1 space-y-1 p-4">
            {visibleMenuItems.map((item) => {
              const Icon = item.icon;

              return (
                <Link
                  key={item.title}
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className="flex items-center gap-3 rounded-lg px-4 py-3 text-sm text-zinc-400 transition hover:bg-zinc-800 hover:text-white"
                >
                  <Icon size={18} />

                  <span>{item.title}</span>
                </Link>
              );
            })}
          </nav>

          {/* Logout */}
          <div className="border-t border-zinc-800 p-4">
            <button
              onClick={handleLogOut}
              className="flex w-full items-center gap-3 rounded-lg px-4 py-3 text-sm text-red-400 transition hover:bg-red-500/10"
            >
              <LogOut size={18} />
              Logout
            </button>
          </div>
        </div>
      </aside>
    </>
  );
};

export default DashboardSidebar;
