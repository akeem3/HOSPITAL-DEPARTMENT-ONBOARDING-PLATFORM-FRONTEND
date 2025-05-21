// app/admin/layout.tsx
import Link from "next/link";
import { ReactNode } from "react";

export default function AdminLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen flex">
      <aside className="w-64 bg-gray-100 p-4 border-r">
        <nav className="space-y-2">
          <Link
            href="/admin/tutorials"
            className="block text-blue-700 hover:underline"
          >
            Tutorials
          </Link>
          <Link
            href="/admin/users"
            className="block text-blue-700 hover:underline"
          >
            Admin Users
          </Link>
        </nav>
      </aside>
      <main className="flex-1 p-6">{children}</main>
    </div>
  );
}
