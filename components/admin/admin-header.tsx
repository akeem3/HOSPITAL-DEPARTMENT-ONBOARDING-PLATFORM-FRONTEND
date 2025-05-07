"use client";

import { useState, useEffect } from "react";
import { Menu, Home } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import Link from "next/link";

export function AdminHeader() {
  const [username, setUsername] = useState("");

  useEffect(() => {
    // Get username from localStorage
    const storedUsername = localStorage.getItem("username") || "Admin";
    setUsername(storedUsername);
  }, []);

  return (
    <header className="z-10 border-b border-gray-300 bg-white shadow-sm">
      <div className="container-custom flex h-16 items-center justify-between">
        <div className="flex items-center md:hidden">
          <Button
            variant="outline"
            size="icon"
            className="mr-2 border-gray-300 text-gray-900"
          >
            <Menu className="h-5 w-5" />
            <span className="sr-only">Toggle menu</span>
          </Button>
        </div>
        <Link href="/" className="hidden md:block">
          <Button
            variant="outline"
            size="sm"
            className="flex items-center gap-2 border-gray-300 text-gray-900 hover:bg-gray-100 hover:text-blue-700"
          >
            <Home className="h-4 w-4" />
            Back to Website
          </Button>
        </Link>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <Avatar className="h-8 w-8 bg-blue-700 text-white">
              <AvatarFallback>
                {username.charAt(0).toUpperCase()}
              </AvatarFallback>
            </Avatar>
            <span className="hidden text-sm font-medium text-gray-900 md:inline-block">
              {username}
            </span>
          </div>
        </div>
      </div>
    </header>
  );
}
