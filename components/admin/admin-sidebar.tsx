"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  BookOpen,
  Home,
  Users,
  LogOut,
  LayoutDashboard,
  PlusCircle,
} from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
} from "@/components/ui/sidebar";

export function AdminSidebar() {
  const pathname = usePathname();
  const router = useRouter();

  const handleLogout = () => {
    // Clear the login state
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("username");
    // Redirect to login page
    router.push("/login");
  };

  return (
    <SidebarProvider>
      <Sidebar className="border-r border-gray-300">
        <SidebarHeader>
          <div className="flex items-center gap-2 px-4 py-2">
            <div className="w-8 h-8 rounded-full bg-blue-700 flex items-center justify-center">
              <span className="text-white font-bold text-sm">MCH</span>
            </div>
            <div className="font-semibold text-blue-700">Admin Portal</div>
          </div>
        </SidebarHeader>
        <SidebarContent>
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton
                asChild
                isActive={pathname === "/admin"}
                className="text-gray-900 hover:bg-blue-50 hover:text-blue-700"
              >
                <Link href="/admin">
                  <LayoutDashboard className="h-4 w-4" />
                  <span>Dashboard</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <SidebarMenuButton
                asChild
                isActive={
                  pathname.includes("/admin/tutorials") &&
                  !pathname.includes("/create")
                }
                className="text-gray-900 hover:bg-blue-50 hover:text-blue-700"
              >
                <Link href="/admin/tutorials">
                  <BookOpen className="h-4 w-4" />
                  <span>Tutorials</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <SidebarMenuButton
                asChild
                isActive={pathname === "/admin/tutorials/create"}
                className="text-gray-900 hover:bg-blue-50 hover:text-blue-700"
              >
                <Link href="/admin/tutorials/create">
                  <PlusCircle className="h-4 w-4" />
                  <span>New Tutorial</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <SidebarMenuButton
                asChild
                isActive={pathname === "/admin/users"}
                className="text-gray-900 hover:bg-blue-50 hover:text-blue-700"
              >
                <Link href="/admin/users">
                  <Users className="h-4 w-4" />
                  <span>Admin Users</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <SidebarMenuButton
                asChild
                className="text-gray-900 hover:bg-blue-50 hover:text-blue-700"
              >
                <Link href="/" target="_blank">
                  <Home className="h-4 w-4" />
                  <span>View Website</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarContent>
        <SidebarFooter>
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton
                onClick={handleLogout}
                className="text-gray-900 hover:bg-red-50 hover:text-red-700"
              >
                <LogOut className="h-4 w-4" />
                <span>Logout</span>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarFooter>
      </Sidebar>
    </SidebarProvider>
  );
}
