"use client";



import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { loginAction } from "../_actions/authAction";
import { useActionState, useEffect } from "react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";




const LoginForm = () => {
  const [state, action, pending] = useActionState(loginAction, false);
  const router = useRouter()

 useEffect(()=>{
    if(!state) return;
    if(state.success){
        toast.success(state.message || "login successful")
       

    }
    if(!state.success){
        toast.success( "password in incorrect ")
    }
    
 }, [state, router])
  return (
    <form action={action} className="space-y-4 ">
      <Card className="p-5 space-y-4">
        <Input
          className="rounded-2xl"
          name="email"
          type="email"
          placeholder="enter your email"
        />
        <Input
          className="rounded-2xl"
          name="password"
          type="password"
          placeholder="enter your password"
        />
        <Button type="submit"> {pending ? "submitting..." : "login"}</Button>
      </Card>
    </form>
  );
};

export default LoginForm;
