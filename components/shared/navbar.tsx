"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

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
} from "lucide-react";

import { logout } from "@/service/logout";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

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
  {
    label: "Settings",
    href: "/settings",
    icon: Settings,
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

  // Get user data
  const userData = user?.data;

  // Create initials from user's name
  const avatar =
    userData?.name
      ?.split(" ")
      .map((word) => word[0])
      .join("")
      .slice(0, 2)
      .toUpperCase() || "U";

  // =====================================================

  // =====================================================
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
    <nav className="border-b bg-background">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">

        {/* ==============================
            Logo + Brand
        ============================== */}

        <div className="flex items-center gap-8">
          <Link href="/" className="flex items-center gap-2">
            <div className="flex size-8 items-center justify-center rounded-lg bg-primary font-bold text-primary-foreground">
              F
            </div>

            <span className="hidden font-semibold sm:inline-block">
              FIX IT NOW
            </span>
          </Link>

          {/* ==============================
              Desktop Navigation
          ============================== */}

          <div className="hidden items-center gap-1 md:flex">
            {NAV_ITEMS.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
              >
                {item.label}
              </Link>
            ))}
          </div>
        </div>

        {/* ==============================
            Right Section
        ============================== */}

        <div className="flex items-center gap-4">

          {/* ==============================
              Mobile Menu
          ============================== */}

          <div className="md:hidden">
            <Sheet open={open} onOpenChange={setOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon">
                  <Menu className="size-5" />
                </Button>
              </SheetTrigger>

              <SheetContent side="right" className="w-64">
                <div className="mt-8 flex flex-col gap-4">
                  {NAV_ITEMS.map((item) => (
                    <SheetClose asChild key={item.href}>
                      <Link
                        href={item.href}
                        className="px-4 py-2 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
                      >
                        {item.label}
                      </Link>
                    </SheetClose>
                  ))}
                </div>
              </SheetContent>
            </Sheet>
          </div>

          {/* ==============================
              User Dropdown
          ============================== */}

          {user.success ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="rounded-full"
                >
                  <div className="flex size-8 items-center justify-center rounded-full bg-primary text-sm font-semibold text-primary-foreground">
                    {avatar}
                  </div>
                </Button>
              </DropdownMenuTrigger>

              <DropdownMenuContent align="end" className="w-64">

                {/* ==============================
                  User Information
                ============================== */}

                <DropdownMenuLabel className="font-normal">
                  <div className="flex items-center gap-3">

                    {/* Avatar */}
                    <div className="flex size-10 shrink-0 items-center justify-center rounded-full bg-primary/10 font-semibold text-primary">
                      {avatar}
                    </div>

                    {/* Name + Email */}
                    <div className="flex min-w-0 flex-col gap-1">
                      <p className="truncate text-sm font-semibold text-foreground">
                        {userData?.name || "Customer"}
                      </p>

                      <p className="truncate text-xs text-muted-foreground">
                        {userData?.email || "No email"}
                      </p>

                      <p className="text-xs capitalize text-muted-foreground">
                        {userData?.role || "Customer"}
                      </p>
                    </div>

                  </div>
                </DropdownMenuLabel>

                <DropdownMenuSeparator />

                {/* ==============================
                  User Options
                ============================== */}

                <DropdownMenuGroup>

                  {USER_OPTIONS.map((option) => {
                    const Icon = option.icon;

                    return (
                      <DropdownMenuItem
                        key={option.href}
                        onClick={() => {
                          // 🔴 CHANGE 2:
                          // window.location.href এর বদলে router.push()
                          router.push(option.href);
                        }}
                        className="flex items-center gap-2"
                      >
                        <Icon className="size-4" />
                        <span>{option.label}</span>
                      </DropdownMenuItem>
                    );
                  })}

                  {/* =================================================
                      🔴 CHANGE 3:
                      Dashboard আলাদা করে add করা হয়েছে
                      এবং role অনুযায়ী redirect হবে
                  ================================================= */}

                  <DropdownMenuItem
                    onClick={handleDashboard}
                    className="flex items-center gap-2"
                  >
                    <LayoutDashboard className="size-4" />
                    <span>Dashboard</span>
                  </DropdownMenuItem>

                </DropdownMenuGroup>

                <DropdownMenuSeparator />

                {/* ==============================
                  Logout
                ============================== */}

                <DropdownMenuItem
                  onClick={handleLogOut}
                  variant="destructive"
                  className="flex items-center gap-2"
                >
                  <LogOut className="size-4" />
                  <span>Log out</span>
                </DropdownMenuItem>

              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <Link href="/login">
              <Button className="cursor-pointer rounded-2xl">
                Login
              </Button>
            </Link>
          )}

        </div>
      </div>
    </nav>
  );
}