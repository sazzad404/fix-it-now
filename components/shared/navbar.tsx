"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  DropdownMenuGroup,
} from "@/components/ui/dropdown-menu";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetClose,
} from "@/components/ui/sheet";

import {
  Settings,
  LogOut,
  User,
  Menu,
  LayoutDashboard,
  ChevronDown,
} from "lucide-react";

import { logout } from "@/service/logout";
import { toast } from "sonner";

const NAV_ITEMS = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Services", href: "/services" },
  { label: "Contact", href: "/contact" },
  { label: "Premium", href: "/premium" },
];

const USER_OPTIONS = [
  {
    label: "Profile",
    href: "/dashboard/profile",
    icon: User,
  },

];

type IUser = {
  success: boolean;
  message: string;
  data: {
    id: string;
    name: string;
    email: string;
    role: string;
    status: string;
    createdAt: string;
    updatedAt: string;
  };
};

type NavbarProps = {
  user: IUser;
};

export default function Navbar({ user }: NavbarProps) {
  const [open, setOpen] = useState(false);
  const router = useRouter();

  const userData = user?.data;

  const handleDashboard = () => {
    const role = userData?.role;

    if (role === "CUSTOMER") {
      router.push("/dashboard");
    } else if (role === "TECHNICIAN") {
      router.push("/technician-dashboard");
    } else if (role === "ADMIN") {
      router.push("/admin-dashboard");
    } else {
      router.push("/dashboard");
    }
  };

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

  return (
    <nav className="sticky top-0 z-50 w-full border-b border-white/10 bg-slate-950/95 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Logo + Brand */}
        <div className="flex items-center gap-8">
          <Link href="/" className="group flex items-center gap-2.5">
            <div className="relative flex size-9 items-center justify-center overflow-hidden rounded-xl bg-gradient-to-br from-blue-500 to-cyan-400 font-bold text-white shadow-lg shadow-blue-500/30 transition-all duration-300 group-hover:scale-105 group-hover:shadow-blue-500/50">
              <span className="relative z-10 text-sm">F</span>
              <div className="absolute inset-0 bg-gradient-to-tr from-white/20 to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
            </div>

            <span className="hidden font-bold tracking-tight text-white sm:inline-block">
              FIX IT <span className="text-blue-400">NOW</span>
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden items-center gap-1 md:flex">
            {NAV_ITEMS.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="relative px-3.5 py-2 text-sm font-medium text-slate-300 transition-colors hover:text-white after:absolute after:bottom-0 after:left-1/2 after:h-0.5 after:w-0 after:-translate-x-1/2 after:rounded-full after:bg-blue-400 after:transition-all after:duration-300 hover:after:w-4/5"
              >
                {item.label}
              </Link>
            ))}
          </div>
        </div>

        {/* Right Section */}
        <div className="flex items-center gap-3">
          {/* Mobile Menu */}
          <div className="md:hidden">
            <Sheet open={open} onOpenChange={setOpen}>
              <SheetTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="rounded-xl text-slate-300 hover:bg-white/10 hover:text-white"
                >
                  <Menu className="size-5" />
                </Button>
              </SheetTrigger>

              <SheetContent
                side="right"
                className="w-72 border-l border-white/10 bg-slate-950 text-white"
              >
                <div className="mt-10 flex flex-col gap-1">
                  {NAV_ITEMS.map((item) => (
                    <SheetClose asChild key={item.href}>
                      <Link
                        href={item.href}
                        className="rounded-xl px-4 py-3 text-sm font-medium text-slate-300 transition-all hover:bg-white/10 hover:text-white"
                      >
                        {item.label}
                      </Link>
                    </SheetClose>
                  ))}
                </div>
              </SheetContent>
            </Sheet>
          </div>

          {/* User Dropdown */}
          {user.success ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  className="flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-2.5 py-1.5 text-slate-300 transition-all hover:bg-white/10 hover:text-white"
                >
                  {/* Profile Icon (no letter) */}
                  <div className="flex size-8 items-center justify-center rounded-full bg-gradient-to-br from-blue-500 to-cyan-400 text-white shadow-md shadow-blue-500/20">
                    <User className="size-4" />
                  </div>
                  <ChevronDown className="size-4 opacity-60" />
                </Button>
              </DropdownMenuTrigger>

              <DropdownMenuContent
                align="end"
                className="w-64 rounded-xl border border-white/10 bg-slate-950 p-1.5 shadow-2xl"
              >
                {/* User Information */}
                <DropdownMenuLabel className="font-normal">
                  <div className="flex items-center gap-3 px-1 py-1.5">
                    <div className="flex size-11 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-blue-500 to-cyan-400 text-white shadow-md shadow-blue-500/20">
                      <User className="size-5" />
                    </div>

                    <div className="flex min-w-0 flex-col gap-0.5">
                      <p className="truncate text-sm font-semibold text-white">
                        {userData?.name || "Customer"}
                      </p>
                      <p className="truncate text-xs text-slate-400">
                        {userData?.email || "No email"}
                      </p>
                      <p className="mt-0.5 w-fit rounded-full bg-blue-500/20 px-2 py-0.5 text-[10px] font-medium capitalize text-blue-400">
                        {userData?.role || "Customer"}
                      </p>
                    </div>
                  </div>
                </DropdownMenuLabel>

                <DropdownMenuSeparator className="my-1.5 bg-white/10" />

                <DropdownMenuGroup>
                  {USER_OPTIONS.map((option) => {
                    const Icon = option.icon;

                    return (
                      <DropdownMenuItem
                        key={option.href}
                        onClick={() => router.push(option.href)}
                        className="cursor-pointer gap-2.5 rounded-lg px-3 py-2.5 text-sm text-slate-300 focus:bg-white/10 focus:text-white"
                      >
                        <Icon className="size-4" />
                        <span>{option.label}</span>
                      </DropdownMenuItem>
                    );
                  })}

                  <DropdownMenuItem
                    onClick={handleDashboard}
                    className="cursor-pointer gap-2.5 rounded-lg px-3 py-2.5 text-sm text-slate-300 focus:bg-white/10 focus:text-white"
                  >
                    <LayoutDashboard className="size-4" />
                    <span>Dashboard</span>
                  </DropdownMenuItem>
                </DropdownMenuGroup>

                <DropdownMenuSeparator className="my-1.5 bg-white/10" />

                <DropdownMenuItem
                  onClick={handleLogOut}
                  className="cursor-pointer gap-2.5 rounded-lg px-3 py-2.5 text-sm text-red-400 focus:bg-red-500/10 focus:text-red-400"
                >
                  <LogOut className="size-4" />
                  <span>Log out</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <Link href="/login">
              <Button className="rounded-xl bg-gradient-to-r from-blue-500 to-cyan-500 px-5 font-medium text-white shadow-md shadow-blue-500/25 transition-all hover:from-blue-600 hover:to-cyan-600 hover:shadow-blue-500/40">
                Login
              </Button>
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
}