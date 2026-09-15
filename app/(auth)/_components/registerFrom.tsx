"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useActionState, useEffect } from "react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { registerAction } from "../_actions/authAction";
import Link from "next/link";
import { User, Mail, Lock, ArrowRight } from "lucide-react";

const initialState = {
  success: false,
  message: "",
  data: undefined,
};

const RegisterForm = () => {
  const [state, action, pending] = useActionState(registerAction, initialState);
  const router = useRouter();

  useEffect(() => {
    if (!state?.message) return;

    if (state.success) {
      toast.success("Registration successful");
      setTimeout(() => {
        router.push("/login");
      }, 800);
    } else {
      toast.error(state.message);
    }
  }, [state, router]);

  return (
    <div className="w-full max-w-md">
      {/* Header */}
      <div className="mb-8 text-center">
        <div className="mx-auto mb-4 flex size-14 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-500 to-cyan-400 shadow-lg shadow-blue-500/25">
          <span className="text-xl font-bold text-white">F</span>
        </div>
        <h1 className="text-2xl font-bold tracking-tight text-foreground">
          Create your account
        </h1>
        <p className="mt-1.5 text-sm text-muted-foreground">
          Join FixItNow and get started today
        </p>
      </div>

      {/* Form Card */}
      <form action={action} className="space-y-5">
        <div className="overflow-hidden rounded-2xl border border-border/50 bg-card/80 p-6 shadow-xl shadow-blue-500/5 backdrop-blur-sm sm:p-8">
          {/* Name */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-foreground">
              Full Name
            </label>
            <div className="relative">
              <User className="absolute left-3.5 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                name="name"
                type="text"
                placeholder="John Doe"
                required
                className="h-11 rounded-xl border-border/50 bg-background pl-10 transition-all focus-visible:border-blue-500 focus-visible:ring-blue-500/20"
              />
            </div>
          </div>

          {/* Email */}
          <div className="mt-4 space-y-2">
            <label className="text-sm font-medium text-foreground">
              Email
            </label>
            <div className="relative">
              <Mail className="absolute left-3.5 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                name="email"
                type="email"
                placeholder="you@example.com"
                required
                className="h-11 rounded-xl border-border/50 bg-background pl-10 transition-all focus-visible:border-blue-500 focus-visible:ring-blue-500/20"
              />
            </div>
          </div>

          {/* Password */}
          <div className="mt-4 space-y-2">
            <label className="text-sm font-medium text-foreground">
              Password
            </label>
            <div className="relative">
              <Lock className="absolute left-3.5 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                name="password"
                type="password"
                placeholder="••••••••"
                required
                className="h-11 rounded-xl border-border/50 bg-background pl-10 transition-all focus-visible:border-blue-500 focus-visible:ring-blue-500/20"
              />
            </div>
          </div>

          {/* Submit */}
          <Button
            type="submit"
            disabled={pending}
            className="mt-6 h-11 w-full rounded-xl bg-gradient-to-r from-blue-500 to-cyan-500 text-sm font-semibold text-white shadow-md shadow-blue-500/20 transition-all hover:from-blue-600 hover:to-cyan-600 hover:shadow-blue-500/30 disabled:opacity-70"
          >
            {pending ? (
              "Creating account..."
            ) : (
              <span className="flex items-center justify-center gap-2">
                Create Account
                <ArrowRight className="size-4" />
              </span>
            )}
          </Button>
        </div>

        {/* Footer link */}
        <p className="text-center text-sm text-muted-foreground">
          Already have an account?{" "}
          <Link
            href="/login"
            className="font-medium text-blue-500 transition-colors hover:text-blue-600"
          >
            Sign in
          </Link>
        </p>
      </form>
    </div>
  );
};

export default RegisterForm;