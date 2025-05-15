import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Menu } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

export function MainNav() {
  return (
    <div className=" flex w-full items-center justify-between">
      <div className=" flex items-center gap-6 md:gap-10">
        <Link href="/" className="flex items-center space-x-2">
          {/* <span className="font-bold">Hospital Onboarding</span> */}
          <div className="flex items-center gap-2 px-4 py-2">
            <div className="w-8 h-8 rounded-full bg-blue-700 flex items-center justify-center">
              <span className="text-white font-bold text-sm">MCH</span>
            </div>
            <div className="font-semibold text-blue-700">
              Hospital Onboarding
            </div>
          </div>
        </Link>
        <nav className="hidden gap-6 md:flex">
          <Link
            href="/"
            className="text-sm font-medium transition-colors hover:text-primary"
          >
            Home
          </Link>
          <Link
            href="/tutorials"
            className="text-sm font-medium transition-colors hover:text-primary"
          >
            Departments
          </Link>
        </nav>
      </div>

      {/* Mobile Navigation */}
      <div className="md:hidden">
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon">
              <Menu className="h-5 w-5" />
              <span className="sr-only">Toggle menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="right">
            <nav className="flex flex-col gap-4 pt-10">
              <Link
                href="/"
                className="text-base font-medium transition-colors hover:text-primary"
              >
                Home
              </Link>
              <Link
                href="/tutorials"
                className="text-base font-medium transition-colors hover:text-primary"
              >
                Departments
              </Link>
              <Link
                href="/about"
                className="text-base font-medium transition-colors hover:text-primary"
              >
                About
              </Link>
              <Link
                href="/contact"
                className="text-base font-medium transition-colors hover:text-primary"
              >
                Contact
              </Link>
              <Link
                href="/login"
                className="text-base font-medium transition-colors hover:text-primary"
              >
                Admin
              </Link>
            </nav>
          </SheetContent>
        </Sheet>
      </div>

      <div className="hidden items-center gap-2 md:flex">
        <Link href="/login">
          <Button variant="ghost" size="sm">
            Admin
          </Button>
        </Link>
      </div>
    </div>
  );
}
