import Link from "next/link";

export function SiteFooter() {
  return (
    <footer className="border-t py-6 md:py-0">
      <div className="container-custom flex flex-col items-center justify-between gap-4 md:h-24 md:flex-row">
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 rounded-full bg-blue-700 flex items-center justify-center">
            <span className="text-white font-bold text-xs">MCH</span>
          </div>
          <p className="text-center text-sm leading-loose text-gray-600 md:text-left">
            © {new Date().getFullYear()} Hospital Onboarding System. All rights
            reserved.
          </p>
        </div>
        <div className="flex items-center gap-4">
          <Link
            href="/terms"
            className="text-sm text-gray-600 transition-colors hover:text-blue-700"
          >
            Terms
          </Link>
          <Link
            href="/privacy"
            className="text-sm text-gray-600 transition-colors hover:text-blue-700"
          >
            Privacy
          </Link>
        </div>
      </div>
    </footer>
  );
}
