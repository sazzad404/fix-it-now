import Link from "next/link";
import { ArrowLeft, Home, Wrench } from "lucide-react";

export default function NotFound() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-background px-6">
      <div className="w-full max-w-lg text-center">

        {/* Icon */}
        <div className="mx-auto mb-6 flex size-20 items-center justify-center rounded-3xl bg-primary/10">
          <Wrench className="size-10 text-primary" />
        </div>

        {/* 404 */}
        <h1 className="text-8xl font-black tracking-tight text-primary sm:text-9xl">
          404
        </h1>

        {/* Heading */}
        <h2 className="mt-4 text-2xl font-bold tracking-tight sm:text-3xl">
          Oops! Page Not Found
        </h2>

        {/* Description */}
        <p className="mx-auto mt-3 max-w-md text-sm leading-6 text-muted-foreground sm:text-base">
          Looks like this page needs a little fixing. The page you are
          looking for doesn&apos;t exist or may have been moved.
        </p>

        {/* Buttons */}
        <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">

          {/* Home */}
          <Link
            href="/"
            className="inline-flex h-11 items-center justify-center gap-2 rounded-lg bg-primary px-6 text-sm font-medium text-primary-foreground transition-all hover:opacity-90"
          >
            <Home className="size-4" />
            Back to Home
          </Link>

          {/* Go to Services */}
          <Link
            href="/services"
            className="inline-flex h-11 items-center justify-center gap-2 rounded-lg border bg-background px-6 text-sm font-medium transition-colors hover:bg-muted"
          >
            <ArrowLeft className="size-4" />
            Explore Services
          </Link>

        </div>

        {/* Brand */}
        <p className="mt-10 text-xs font-medium tracking-widest text-muted-foreground">
          FIX IT NOW
        </p>
      </div>
    </main>
  );
}