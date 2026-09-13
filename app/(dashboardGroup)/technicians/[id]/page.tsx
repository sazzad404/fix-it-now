import { getTechnicianById } from "../_action/getTechnicianById";

const TechnicianDetailsPage = async ({
  params,
}: {
  params: Promise<{ id: string }>;
}) => {
  const { id } = await params;

  const result = await getTechnicianById(id as string);

  if (!result.success || !result.data) {
    return (
      <div className="flex min-h-[70vh] items-center justify-center">
        <div className="rounded-2xl border border-zinc-800 bg-zinc-900 px-8 py-10 text-center">
          <h1 className="text-xl font-bold text-white">Technician Not Found</h1>

          <p className="mt-2 text-sm text-zinc-500">
            This technician could not be found.
          </p>
        </div>
      </div>
    );
  }

  const technician = result.data;

  return (
    <div className="min-h-screen text-white">
      <div className="mx-auto max-w-5xl px-6 py-10 lg:px-10">
        <div className="overflow-hidden rounded-3xl border border-zinc-800 bg-zinc-900 shadow-2xl">
          {/* Header */}
          <div className="relative h-48 bg-gradient-to-br from-blue-600/30 via-indigo-600/20 to-purple-600/20">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(59,130,246,0.2),transparent_40%)]" />

            <div className="absolute -bottom-12 left-8">
              <div className="flex h-24 w-24 items-center justify-center rounded-3xl border-4 border-zinc-900 bg-gradient-to-br from-blue-500 to-indigo-600 text-3xl font-bold shadow-xl">
                {technician.user.name
                  ?.split(" ")
                  .map((word: string) => word[0])
                  .join("")
                  .slice(0, 2)
                  .toUpperCase()}
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="p-8 pt-16">
            <div>
              <h1 className="text-3xl font-bold">{technician.user.name}</h1>

              <p className="mt-1 text-sm text-zinc-500">
                {technician.user.email}
              </p>
            </div>

            {/* Stats */}
            <div className="mt-8 grid gap-4 sm:grid-cols-3">
              <div className="rounded-2xl border border-white/5 bg-white/[0.03] p-5">
                <p className="text-xs text-zinc-500">Experience</p>

                <p className="mt-2 text-xl font-bold">
                  {technician.experience || 0} Years
                </p>
              </div>

              <div className="rounded-2xl border border-white/5 bg-white/[0.03] p-5">
                <p className="text-xs text-zinc-500">Rating</p>

                <p className="mt-2 text-xl font-bold text-yellow-400">
                  ⭐ {technician.rating || 0}
                </p>
              </div>

              <div className="rounded-2xl border border-white/5 bg-white/[0.03] p-5">
                <p className="text-xs text-zinc-500">Location</p>

                <p className="mt-2 text-xl font-bold">
                  {technician.location || "Not added"}
                </p>
              </div>
            </div>

            {/* Bio */}
            <div className="mt-8">
              <h2 className="text-lg font-semibold">About Technician</h2>

              <p className="mt-3 leading-7 text-zinc-400">
                {technician.bio || "No professional bio available."}
              </p>
            </div>

            {/* Skills */}
            <div className="mt-8">
              <h2 className="text-lg font-semibold">Skills</h2>

              <div className="mt-4 flex flex-wrap gap-2">
                {technician.skills?.map((skill: string) => (
                  <span
                    key={skill}
                    className="rounded-xl border border-blue-500/20 bg-blue-500/10 px-4 py-2 text-sm font-medium text-blue-400"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            {/* Availability */}
            <div className="mt-8">
              <h2 className="text-lg font-semibold">Availability</h2>

              <div className="mt-4 flex flex-wrap gap-2">
                {technician.availability?.length ? (
                  technician.availability.map((slot: string) => (
                    <span
                      key={slot}
                      className="rounded-xl border border-emerald-500/20 bg-emerald-500/10 px-4 py-2 text-sm text-emerald-400"
                    >
                      {slot}
                    </span>
                  ))
                ) : (
                  <p className="text-sm text-zinc-500">
                    No availability added.
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TechnicianDetailsPage;
