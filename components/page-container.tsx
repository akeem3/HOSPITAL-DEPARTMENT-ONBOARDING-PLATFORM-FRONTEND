import type React from "react";
import { MainNav } from "@/components/main-nav";
import { SiteFooter } from "@/components/site-footer";

interface PageContainerProps {
  children: React.ReactNode;
  className?: string;
  fullWidth?: boolean;
}

export function PageContainer({
  children,
  className = "",
  fullWidth = false,
}: PageContainerProps) {
  return (
    <div className="flex min-h-screen flex-col bg-gray-50 text-gray-900">
      <header className="sticky top-0 z-40 bg-white shadow-sm border-b border-gray-200">
        <div className="h-16 flex items-center">
          <MainNav />
        </div>
      </header>

      <main className="flex-1">
        <div
          className={`${
            fullWidth ? "" : "max-w-7xl mx-auto px-4 py-8"
          } ${className}`}
        >
          {children}
        </div>
      </main>

      <SiteFooter />
    </div>
  );
}
