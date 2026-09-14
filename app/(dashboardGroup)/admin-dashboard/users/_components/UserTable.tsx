"use client";

import {
  ShieldCheck,
  User,
  Wrench,
} from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { updateUserStatus } from "../../_action/updateUserStatus";

type User = {
  id: string;
  name: string;
  email: string;
  role: string;
  status: string;
  createdAt: string;
  updatedAt: string;
};

const UserTable = ({
  users,
  setUsers,
}: {
  users: User[];
  setUsers: React.Dispatch<
    React.SetStateAction<User[]>
  >;
}) => {
  const [updatingUserId, setUpdatingUserId] =
    useState<string | null>(null);

  const getRoleIcon = (role: string) => {
    if (role === "ADMIN") {
      return <ShieldCheck size={16} />;
    }

    if (role === "TECHNICIAN") {
      return <Wrench size={16} />;
    }

    return <User size={16} />;
  };

  const getRoleStyle = (role: string) => {
    if (role === "ADMIN") {
      return "bg-red-500/10 text-red-400";
    }

    if (role === "TECHNICIAN") {
      return "bg-blue-500/10 text-blue-400";
    }

    return "bg-gray-500/10 text-gray-400";
  };

  const getStatusStyle = (status: string) => {
    if (status === "ACTIVE") {
      return "bg-green-500/10 text-green-400";
    }

    return "bg-red-500/10 text-red-400";
  };

  const handleStatusChange = async (
    userId: string,
    status: string,
  ) => {
    try {
      setUpdatingUserId(userId);

      const result = await updateUserStatus({
        userId,
        status,
      });

      if (!result.success) {
        toast.error(result.message);
        return;
      }

      setUsers((prev) =>
        prev.map((user) =>
          user.id === userId
            ? {
                ...user,
                status: result.data.status,
                updatedAt:
                  result.data.updatedAt,
              }
            : user,
        ),
      );

      toast.success(result.message);
    } catch (error) {
      console.error(
        "Update user status error:",
        error,
      );

      toast.error(
        "Failed to update user status",
      );
    } finally {
      setUpdatingUserId(null);
    }
  };

  if (users.length === 0) {
    return (
      <div className="rounded-xl border border-white/10 bg-white/[0.03] p-10 text-center">
        <p className="text-sm text-gray-500">
          No users found
        </p>
      </div>
    );
  }

  return (
    <div className="overflow-hidden rounded-xl border border-white/10 bg-white/[0.03]">
      <div className="overflow-x-auto">
        <table className="w-full min-w-[800px] text-left">
          <thead className="border-b border-white/10 bg-white/[0.02]">
            <tr>
              <th className="px-5 py-4 text-sm font-medium text-gray-400">
                User
              </th>

              <th className="px-5 py-4 text-sm font-medium text-gray-400">
                Role
              </th>

              <th className="px-5 py-4 text-sm font-medium text-gray-400">
                Status
              </th>

              <th className="px-5 py-4 text-sm font-medium text-gray-400">
                Joined
              </th>
            </tr>
          </thead>

          <tbody>
            {users.map((user) => (
              <tr
                key={user.id}
                className="border-b border-white/5 last:border-0 hover:bg-white/[0.02]"
              >
                <td className="px-5 py-4">
                  <div>
                    <p className="font-medium text-white">
                      {user.name}
                    </p>

                    <p className="mt-1 text-sm text-gray-500">
                      {user.email}
                    </p>
                  </div>
                </td>

                <td className="px-5 py-4">
                  <span
                    className={`inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs font-medium ${getRoleStyle(
                      user.role,
                    )}`}
                  >
                    {getRoleIcon(user.role)}

                    {user.role}
                  </span>
                </td>

                <td className="px-5 py-4">
                  <select
                    value={user.status}
                    disabled={
                      updatingUserId === user.id
                    }
                    onChange={(e) =>
                      handleStatusChange(
                        user.id,
                        e.target.value,
                      )
                    }
                    className={`rounded-full border-none px-3 py-1.5 text-xs font-medium outline-none ${getStatusStyle(
                      user.status,
                    )} ${
                      updatingUserId === user.id
                        ? "cursor-not-allowed opacity-50"
                        : "cursor-pointer"
                    }`}
                  >
                    <option value="ACTIVE">
                      ACTIVE
                    </option>

                    <option value="BANNED">
                      BANNED
                    </option>
                  </select>
                </td>

                <td className="px-5 py-4 text-sm text-gray-400">
                  {new Date(
                    user.createdAt,
                  ).toLocaleDateString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UserTable;