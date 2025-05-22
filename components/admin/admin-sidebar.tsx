"use client";

import Link from "next/link";
import { Home, BookOpen, UserCog } from "lucide-react";

export function AdminSidebar() {
  return (
    <aside className="w-64 bg-blue-900 text-white h-screen p-6 flex flex-col justify-between shadow-md">
      <div>
        {/* Logo / Branding */}
        <div className="text-2xl font-bold mb-8 text-center tracking-wide">
          MCH Admin
        </div>

        {/* Navigation Links */}
        <nav className="space-y-4">
          <Link
            href="/"
            className="flex items-center gap-3 hover:bg-blue-800 px-4 py-2 rounded transition"
          >
            <Home className="w-5 h-5" />
            <span>Home</span>
          </Link>

          <Link
            href="/admin/tutorials"
            className="flex items-center gap-3 hover:bg-blue-800 px-4 py-2 rounded transition"
          >
            <BookOpen className="w-5 h-5" />
            <span>Tutorials</span>
          </Link>

          <Link
            href="/admin/users"
            className="flex items-center gap-3 hover:bg-blue-800 px-4 py-2 rounded transition"
          >
            <UserCog className="w-5 h-5" />
            <span>Admin Users</span>
          </Link>
        </nav>
      </div>
    </aside>
  );
}
