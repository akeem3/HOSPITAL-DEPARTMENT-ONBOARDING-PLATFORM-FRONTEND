// app/admin/users/create/page.tsx
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function CreateAdminUserPage() {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const res = await fetch("http://localhost/mch-api/admin/users/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, email, password }),
      });

      if (res.ok) {
        router.push("/admin/users");
      } else {
        const error = await res.json();
        alert(error.error || "Failed to create user");
      }
    } catch {
      alert("Error creating user");
    }
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4 text-blue-700">Add Admin User</h1>
      <form onSubmit={handleSubmit} className="grid gap-4 max-w-md">
        <input
          className="border p-2"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
        <input
          className="border p-2"
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          className="border p-2"
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button className="bg-blue-700 text-white px-4 py-2 rounded">
          Add User
        </button>
      </form>
    </div>
  );
}
