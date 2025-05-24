"use client";

import Link from "next/link";
import { Home, BookOpen, UserCog, Newspaper } from "lucide-react";

export function AdminSidebar() {
  return (
    <aside className="w-64 bg-blue-500 text-white h-screen p-6 flex flex-col justify-between shadow-md">
      <div>
        {/* Logo / Branding */}
        <div className="text-2xl font-bold mb-8 text-center tracking-wide">
          ADMIN PANEL
        </div>

        {/* Navigation Links */}
        <nav className="space-y-4">
          <Link
            href="/"
            className="flex items-center gap-3 hover:bg-blue-700 px-4 py-2 rounded transition"
          >
            <Home className="w-5 h-5" />
            <span>Back To Site</span>
          </Link>

          <Link
            href="/admin/tutorials"
            className="flex items-center gap-3 hover:bg-blue-700 px-4 py-2 rounded transition"
          >
            <BookOpen className="w-5 h-5" />
            <span>Tutorials</span>
          </Link>

          <Link
            href="/admin/blog"
            className="flex items-center gap-3 hover:bg-blue-700 px-4 py-2 rounded transition"
          >
            <Newspaper className="w-5 h-5" />
            <span>Blog Content</span>
          </Link>

          <Link
            href="/admin/users"
            className="flex items-center gap-3 hover:bg-blue-700 px-4 py-2 rounded transition"
          >
            <UserCog className="w-5 h-5" />
            <span>Admin Users</span>
          </Link>
        </nav>
      </div>
    </aside>
  );
}
