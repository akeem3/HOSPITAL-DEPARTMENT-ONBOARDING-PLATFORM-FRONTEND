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
            className="flex items-center justify-between hover:bg-blue-700 px-4 py-2 rounded transition"
          >
            <div className="flex items-center gap-3">
              <Home className="w-5 h-5" />
              <span>Back to Site</span>
            </div>
            <span className="text-sm opacity-80">العودة إلى الموقع</span>
          </Link>

          <Link
            href="/admin/tutorials"
            className="flex items-center justify-between hover:bg-blue-700 px-4 py-2 rounded transition"
          >
            <div className="flex items-center gap-3">
              <BookOpen className="w-5 h-5" />
              <span>Tutorials</span>
            </div>
            <span className="text-sm opacity-80">الدروس</span>
          </Link>

          <Link
            href="/admin/blog"
            className="flex items-center justify-between hover:bg-blue-700 px-4 py-2 rounded transition"
          >
            <div className="flex items-center gap-3">
              <Newspaper className="w-5 h-5" />
              <span>Blog Content</span>
            </div>
            <span className="text-sm opacity-80">محتوى المدونة</span>
          </Link>

          <Link
            href="/admin/users"
            className="flex items-center justify-between hover:bg-blue-700 px-4 py-2 rounded transition"
          >
            <div className="flex items-center gap-3">
              <UserCog className="w-5 h-5" />
              <span>Admin Users</span>
            </div>
            <span className="text-sm opacity-80">المستخدمين الإداريين</span>
          </Link>
        </nav>
      </div>
    </aside>
  );
}
