// app/admin/users/[userId]/edit/page.tsx
"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";

export default function EditAdminUserPage() {
  const { userId } = useParams();
  const router = useRouter();
  const [user, setUser] = useState({ username: "", email: "", password: "" });

  useEffect(() => {
    fetch(`http://localhost/mch-api/admin/users/?id=${userId}`)
      .then((res) => res.json())
      .then((data) => setUser((prev) => ({ ...prev, ...data })))
      .catch(console.error);
  }, [userId]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const res = await fetch(
        `http://localhost/mch-api/admin/users/?id=${userId}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(user),
        }
      );

      if (res.ok) {
        router.push("/admin/users");
      } else {
        const error = await res.json();
        alert(error.error || "Failed to update user");
      }
    } catch {
      alert("Error updating user");
    }
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4 text-blue-500">Edit Admin User</h1>
      <form onSubmit={handleSubmit} className="grid gap-4 max-w-md">
        <input
          title="username: "
          className="border p-2"
          value={user.username}
          onChange={(e) => setUser({ ...user, username: e.target.value })}
          required
        />
        <input
          title="email: "
          className="border p-2"
          type="email"
          value={user.email}
          onChange={(e) => setUser({ ...user, email: e.target.value })}
          required
        />
        <input
          className="border p-2"
          type="password"
          placeholder="New password (leave blank to keep current)"
          onChange={(e) => setUser({ ...user, password: e.target.value })}
        />
        <button className="bg-blue-500 text-white px-4 py-2 rounded">
          Update User
        </button>
      </form>
    </div>
  );
}
