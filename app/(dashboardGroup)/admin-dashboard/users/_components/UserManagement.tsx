"use client";

import {
  Search,
  ShieldCheck,
  UserCheck,
  Users,
} from "lucide-react";
import { useMemo, useState } from "react";
import UserTable from "./UserTable";

type User = {
  id: string;
  name: string;
  email: string;
  role: string;
  status: string;
  createdAt: string;
  updatedAt: string;
};

const UserManagement = ({
  users: initialUsers,
}: {
  users: User[];
}) => {
  const [users, setUsers] = useState(initialUsers);
  const [search, setSearch] = useState("");
  const [role, setRole] = useState("ALL");

  const filteredUsers = useMemo(() => {
    return users.filter((user) => {
      const matchesSearch =
        user.name
          .toLowerCase()
          .includes(search.toLowerCase()) ||
        user.email
          .toLowerCase()
          .includes(search.toLowerCase());

      const matchesRole =
        role === "ALL" || user.role === role;

      return matchesSearch && matchesRole;
    });
  }, [users, search, role]);

  const totalUsers = users.length;

  const activeUsers = users.filter(
    (user) => user.status === "ACTIVE",
  ).length;

  const technicians = users.filter(
    (user) => user.role === "TECHNICIAN",
  ).length;

  const admins = users.filter(
    (user) => user.role === "ADMIN",
  ).length;

  return (
    <div className="min-h-screen bg-[#09090b] p-4 text-white md:p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold">
          User Management
        </h1>

        <p className="mt-1 text-sm text-gray-400">
          Manage all users of FixItNow
        </p>
      </div>

      {/* Stats */}
      <div className="mb-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <div className="rounded-xl border border-white/10 bg-white/[0.03] p-5">
          <div className="flex items-center gap-4">
            <Users size={22} />

            <div>
              <p className="text-sm text-gray-400">
                Total Users
              </p>

              <h2 className="text-2xl font-bold">
                {totalUsers}
              </h2>
            </div>
          </div>
        </div>

        <div className="rounded-xl border border-white/10 bg-white/[0.03] p-5">
          <div className="flex items-center gap-4">
            <UserCheck size={22} />

            <div>
              <p className="text-sm text-gray-400">
                Active Users
              </p>

              <h2 className="text-2xl font-bold">
                {activeUsers}
              </h2>
            </div>
          </div>
        </div>

        <div className="rounded-xl border border-white/10 bg-white/[0.03] p-5">
          <div className="flex items-center gap-4">
            <UserCheck size={22} />

            <div>
              <p className="text-sm text-gray-400">
                Technicians
              </p>

              <h2 className="text-2xl font-bold">
                {technicians}
              </h2>
            </div>
          </div>
        </div>

        <div className="rounded-xl border border-white/10 bg-white/[0.03] p-5">
          <div className="flex items-center gap-4">
            <ShieldCheck size={22} />

            <div>
              <p className="text-sm text-gray-400">
                Admins
              </p>

              <h2 className="text-2xl font-bold">
                {admins}
              </h2>
            </div>
          </div>
        </div>
      </div>

      {/* Search + Filter */}
      <div className="mb-5 flex flex-col gap-3 sm:flex-row">
        <div className="relative flex-1">
          <Search
            size={18}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500"
          />

          <input
            type="text"
            placeholder="Search by name or email..."
            value={search}
            onChange={(e) =>
              setSearch(e.target.value)
            }
            className="w-full rounded-lg border border-white/10 bg-white/[0.03] py-3 pl-10 pr-4 text-sm outline-none placeholder:text-gray-600 focus:border-white/30"
          />
        </div>

        <select
          value={role}
          onChange={(e) =>
            setRole(e.target.value)
          }
          className="rounded-lg border border-white/10 bg-[#111113] px-4 py-3 text-sm text-white outline-none"
        >
          <option value="ALL">All Roles</option>
          <option value="CUSTOMER">Customer</option>
          <option value="TECHNICIAN">
            Technician
          </option>
          <option value="ADMIN">Admin</option>
        </select>
      </div>

      <UserTable
        users={filteredUsers}
        setUsers={setUsers}
      />
    </div>
  );
};

export default UserManagement;