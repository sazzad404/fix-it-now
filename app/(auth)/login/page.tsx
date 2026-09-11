import Link from "next/link";
import LoginForm from "../_components/LoginForm";

export default function LoginPage() {
  return (
    <>
      <div className="min-h-screen flex items-center  justify-center  px-4">
        <div className="w-full max-w-md rounded-2xl bg-white p-8 shadow-md">
          <div className="mb-6 text-center">
            <h1 className="text-3xl font-bold text-gray-900">Welcome Back</h1>

            <p className="mt-2 text-sm text-gray-500">
              Login to your FixItNow account
            </p>
          </div>

          <LoginForm />

          <p className="mt-6 text-center text-sm text-gray-500">
            Don&apos;t have an account?{" "}
            <Link href={"/register"} className="cursor-pointer font-medium text-black hover:underline">
              Register
            </Link>
          </p>
        </div>
      </div>
    </>
  );
}
