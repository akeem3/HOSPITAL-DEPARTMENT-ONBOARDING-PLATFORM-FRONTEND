import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Menu } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

export function MainNav() {
  return (
    <div className="relative flex w-full items-center justify-between px-4 md:px-8 h-16">
      {/* Logo */}
      <div className="flex items-center gap-2">
        <Link href="/" className="flex items-center space-x-2">
          <div className="flex items-center gap-2 px-2 py-1">
            <div className="w-9 h-9 rounded-full bg-blue-500 flex items-center justify-center">
              <span className="text-white font-bold text-xs">MCH</span>
            </div>
            <div className="text-lg font-semibold text-blue-500 tracking-tight">
              MCH
            </div>
          </div>
        </Link>
      </div>

      {/* Centered Desktop Navigation */}
      <nav className="hidden md:flex absolute left-1/2 -translate-x-1/2 gap-10">
        <Link
          href="/"
          className="text-sm font-medium text-gray-700 hover:text-blue-500 transition-colors hover:underline underline-offset-4"
        >
          HOME
        </Link>

        <Link
          href="/tutorials"
          className="text-sm font-medium text-gray-700 hover:text-blue-500 transition-colors hover:underline underline-offset-4"
        >
          DEPARTMENTS
        </Link>
        {/* <Link
          href="/about"
          className="text-sm font-medium text-gray-700 hover:text-blue-700 transition-colors hover:underline underline-offset-4"
        >
          Our Hospital
        </Link>
        <Link
          href="/contact"
          className="text-sm font-medium text-gray-700 hover:text-blue-700 transition-colors hover:underline underline-offset-4"
        >
          Application
        </Link> */}
      </nav>

      {/* Mobile Nav Trigger */}
      <div className="md:hidden">
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon">
              <Menu className="h-5 w-5" />
              <span className="sr-only">Toggle menu</span>
            </Button>
          </SheetTrigger>

          <SheetContent
            side="right"
            className="bg-white border-l border-gray-200 shadow-lg w-3/4 sm:w-2/5 p-6"
          >
            <nav className="flex flex-col gap-5 pt-6 text-gray-700 text-base font-medium">
              <Link href="/" className="hover:text-blue-500 transition-colors">
                HOME
              </Link>

              <Link
                href="/tutorials"
                className="hover:text-blue-500 transition-colors"
              >
                DEPARTMENTS
              </Link>

              {/* <Link
                href="/about"
                className="hover:text-blue-700 transition-colors"
              >
                Our Hospital
              </Link>
              <Link
                href="/contact"
                className="hover:text-blue-700 transition-colors"
              >
                Application
              </Link> */}
              <Link
                href="/login"
                className="hover:text-blue-700 transition-colors"
              >
                Admin
              </Link>
            </nav>
          </SheetContent>
        </Sheet>
      </div>

      {/* Desktop Admin Button */}
      <div className="hidden md:flex items-center">
        <Link href="/login">
          <Button
            variant="outline"
            size="sm"
            className="border-blue-500 text-blue-500 hover:bg-blue-50 hover:border-blue-600 hover:text-blue-600 rounded-md px-4 py-2"
          >
            Admin
          </Button>
        </Link>
      </div>
    </div>
  );
}
