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
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-40 bg-background shadow-sm">
        <div className="container-custom flex h-16 items-center bg-white">
          <MainNav />
        </div>
      </header>
      <main className="flex-1">
        <div
          className={`${fullWidth ? "" : "container-custom py-8"} ${className}`}
        >
          {children}
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}
