import React from 'react'
import { getAllTechnician } from './_action/getAllTechnician';
import TechnicianCard, { Technician } from './_components/TechnicianCard';

const TechnicianPage = async() => {
    const result = await getAllTechnician();

     const technicians = (result?.data || []) as Technician[];
  return (
      <div className="min-h-screen text-white">
      <div className="mx-auto max-w-7xl space-y-8 px-6 py-8 lg:px-10">
        {/* Header */}
        <div>
          <p className="text-sm font-medium text-blue-400">
            Find Professionals
          </p>

          <h1 className="mt-1 text-3xl font-bold">
            Our Technicians
          </h1>

          <p className="mt-2 text-sm text-zinc-500">
            Find skilled and experienced technicians for your
            service needs.
          </p>
        </div>

        {/* Count */}
        <div className="flex items-center justify-between rounded-2xl border border-zinc-800 bg-zinc-900/60 px-5 py-4">
          <div>
            <p className="text-sm font-medium text-white">
              Available Technicians
            </p>

            <p className="mt-1 text-xs text-zinc-500">
              Browse and choose the right professional for you.
            </p>
          </div>

          <div className="rounded-xl bg-blue-500/10 px-4 py-2 text-sm font-semibold text-blue-400">
            {technicians.length} Found
          </div>
        </div>

        {/* Cards */}
        {technicians.length > 0 ? (
          <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
            {technicians.map((technician) => (
              <TechnicianCard
                key={technician.id}
                technician={technician}
              />
            ))}
          </div>
        ) : (
          <div className="rounded-2xl border border-zinc-800 bg-zinc-900 p-12 text-center">
            <h2 className="text-lg font-semibold text-white">
              No Technicians Found
            </h2>

            <p className="mt-2 text-sm text-zinc-500">
              There are currently no technicians available.
            </p>
          </div>
        )}
      </div>
    </div>
  )
}

export default TechnicianPage