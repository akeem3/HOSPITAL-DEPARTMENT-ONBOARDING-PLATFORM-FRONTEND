// components/admin/admin-sidebar.tsx

"use client";

import Link from "next/link";

export function AdminSidebar() {
  return (
    <aside className="w-64 bg-blue-800 text-white h-full p-6 space-y-6">
      <div className="text-xl font-bold">Admin Panel</div>
      <nav className="flex flex-col space-y-2">
        <Link href="/admin" className="hover:underline">
          Dashboard
        </Link>
        <Link href="/admin/tutorials" className="hover:underline">
          Tutorials
        </Link>
        <Link href="/admin/users" className="hover:underline">
          Admin Users
        </Link>
      </nav>
    </aside>
  );
}
