"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

// Simple sidebar context to manage sidebar state
type SidebarContextType = {
  open: boolean;
  setOpen: (open: boolean) => void;
  isMobile: boolean;
};

const SidebarContext = React.createContext<SidebarContextType | undefined>(
  undefined
);

export function useSidebar() {
  const context = React.useContext(SidebarContext);
  if (!context) {
    throw new Error("useSidebar must be used within a SidebarProvider");
  }
  return context;
}

interface SidebarProviderProps extends React.HTMLAttributes<HTMLDivElement> {
  defaultOpen?: boolean;
  children: React.ReactNode;
}

export function SidebarProvider({
  defaultOpen = true,
  children,
  className,
  ...props
}: SidebarProviderProps) {
  const [open, setOpen] = React.useState(defaultOpen);
  const [isMobile, setIsMobile] = React.useState(false);

  // Check if we're on mobile
  React.useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  return (
    <SidebarContext.Provider value={{ open, setOpen, isMobile }}>
      <div className={cn("flex min-h-screen", className)} {...props}>
        {children}
      </div>
    </SidebarContext.Provider>
  );
}

interface SidebarProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

export function Sidebar({ children, className, ...props }: SidebarProps) {
  const { open, isMobile } = useSidebar();

  if (isMobile) {
    return open ? (
      <div
        className={cn(
          "fixed inset-y-0 left-0 z-50 w-64 bg-white shadow-lg transition-transform",
          className
        )}
        {...props}
      >
        {children}
      </div>
    ) : null;
  }

  return (
    <div
      className={cn(
        "w-64 bg-white transition-all duration-300 ease-in-out",
        open ? "block" : "hidden md:block",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}

export function SidebarHeader({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn("p-4 border-b", className)} {...props} />;
}

export function SidebarContent({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={cn("p-4 flex-1 overflow-auto", className)} {...props} />
  );
}

export function SidebarFooter({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn("p-4 border-t", className)} {...props} />;
}

export function SidebarMenu({
  className,
  ...props
}: React.HTMLAttributes<HTMLUListElement>) {
  return <ul className={cn("space-y-2", className)} {...props} />;
}

export function SidebarMenuItem({
  className,
  ...props
}: React.HTMLAttributes<HTMLLIElement>) {
  return <li className={cn("", className)} {...props} />;
}

interface SidebarMenuButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  asChild?: boolean;
  isActive?: boolean;
}

export function SidebarMenuButton({
  className,
  asChild = false,
  isActive = false,
  children,
  ...props
}: SidebarMenuButtonProps) {
  const Comp = asChild ? React.Fragment : "button";

  return (
    <Comp
      className={cn(
        "flex w-full items-center rounded-md px-3 py-2 text-sm font-medium",
        isActive
          ? "bg-blue-50 text-blue-700"
          : "text-gray-900 hover:bg-blue-50 hover:text-blue-700",
        className
      )}
      {...props}
    >
      {children}
    </Comp>
  );
}

export function SidebarTrigger({
  className,
  ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement>) {
  const { setOpen } = useSidebar();

  return (
    <button
      className={cn("p-2 rounded-md hover:bg-gray-100", className)}
      onClick={() => setOpen(!open)}
      {...props}
    />
  );
}
