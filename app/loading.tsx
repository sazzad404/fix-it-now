import { Wrench } from "lucide-react";

const GlobalLoading = () => {
  return (
    <div className="flex min-h-[70vh] items-center justify-center bg-background">
      <div className="flex flex-col items-center gap-5">
        {/* Logo / Icon */}
        <div className="relative flex h-16 w-16 items-center justify-center rounded-2xl bg-primary shadow-lg">
          <Wrench className="h-8 w-8 animate-spin text-primary-foreground" />

          {/* Pulse effect */}
          <div className="absolute inset-0 animate-ping rounded-2xl bg-primary opacity-20" />
        </div>

        {/* Text */}
        <div className="text-center">
          <h2 className="text-lg font-semibold text-foreground">
            FixItNow
          </h2>

          <p className="mt-1 text-sm text-muted-foreground">
            Finding the best service for you...
          </p>
        </div>

        {/* Loading dots */}
        <div className="flex gap-1.5">
          <span className="h-2 w-2 animate-bounce rounded-full bg-primary [animation-delay:-0.3s]" />
          <span className="h-2 w-2 animate-bounce rounded-full bg-primary [animation-delay:-0.15s]" />
          <span className="h-2 w-2 animate-bounce rounded-full bg-primary" />
        </div>
      </div>
    </div>
  );
};

export default GlobalLoading;