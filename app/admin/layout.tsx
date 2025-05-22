// app/admin/layout.tsx

import { ReactNode } from "react";
import { AdminSidebar } from "@/components/admin/admin-sidebar";

export default function AdminLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen flex">
      {/* Sidebar stays fixed */}
      <div className="fixed top-0 left-0 h-screen z-50">
        <AdminSidebar />
      </div>

      {/* Main content shifts to the right of the fixed sidebar */}
      <main className="ml-64 flex-1 p-6 bg-gray-50 min-h-screen overflow-auto">
        {children}
      </main>
    </div>
  );
}
