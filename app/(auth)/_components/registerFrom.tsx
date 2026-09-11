"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useActionState, useEffect } from "react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { registerAction } from "../_actions/authAction";

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
    <form action={action} className="space-y-4">
      <Card className="space-y-4 p-5">
        <Input
          className="rounded-2xl"
          name="name"
          type="text"
          placeholder="Enter your name"
        />

        <Input
          className="rounded-2xl"
          name="email"
          type="email"
          placeholder="Enter your email"
        />

        <Input
          className="rounded-2xl"
          name="password"
          type="password"
          placeholder="Enter your password"
        />

        <Button type="submit" className="w-full">
          {pending ? "Submitting..." : "Register"}
        </Button>
      </Card>
    </form>
  );
};

export default RegisterForm;
