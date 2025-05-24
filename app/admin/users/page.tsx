// app/admin/users/page.tsx
"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { AdminUser } from "@/lib/types";

export default function AdminUsersPage() {
  const [users, setUsers] = useState<AdminUser[]>([]);
  const router = useRouter();

  const handleDelete = async (userId: string) => {
    const confirmed = confirm("Are you sure you want to delete this user?");
    if (!confirmed) return;

    try {
      const res = await fetch(
        `http://localhost/mch-api/admin/users/?id=${userId}`,
        {
          method: "DELETE",
        }
      );

      if (res.ok) {
        setUsers((prev) => prev.filter((user) => user.id !== userId));
      } else {
        console.error("Failed to delete user");
      }
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };

  useEffect(() => {
    fetch("http://localhost/mch-api/admin/users/")
      .then((res) => res.json())
      .then(setUsers)
      .catch(console.error);
  }, []);

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold text-blue-500">Admin Users</h1>
        <button
          onClick={() => router.push("/admin/users/create")}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          + Add Admin User
        </button>
      </div>

      <table className="min-w-full border">
        <thead className="bg-gray-200">
          <tr>
            <th className="p-2 border">Username</th>
            <th className="p-2 border">Email</th>
            <th className="p-2 border">Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td className="p-2 border">{user.username}</td>
              <td className="p-2 border">{user.email}</td>
              <td className="p-2 border space-x-2">
                <a
                  href={`/admin/users/${user.id}/edit`}
                  className="text-blue-500 hover:underline"
                >
                  Edit
                </a>
                <button
                  className="text-red-600 hover:underline"
                  onClick={() => handleDelete(user.id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
