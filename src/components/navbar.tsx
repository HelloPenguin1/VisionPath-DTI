"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Compass, Lightbulb, LineChart, User } from "lucide-react";

export function Navbar() {
  const pathname = usePathname();

  const isActive = (path: string) => {
    return pathname === path;
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-gray-200 dark:border-gray-800 bg-white/95 dark:bg-gray-950/95 backdrop-blur supports-[backdrop-filter]:bg-white/80 dark:supports-[backdrop-filter]:bg-gray-950/80">
      <div className="container mx-auto px-4 md:px-6 flex h-16 items-center justify-between">
        <div className="flex items-center">
          <Link href="/" className="flex items-center space-x-2">
            <span className="font-serif font-medium text-xl text-gray-900 dark:text-white">
              Vision
              <span className="text-blue-600 dark:text-blue-400">Path</span>
            </span>
          </Link>

          <div className="h-4 w-px mx-6 bg-gradient-to-b from-transparent via-gray-300 dark:via-gray-700 to-transparent"></div>

          <nav className="hidden md:flex items-center space-x-6">
            <Link
              href="/explore"
              className={cn(
                "flex items-center text-sm transition-colors hover:text-blue-600 dark:hover:text-blue-400",
                isActive("/explore")
                  ? "text-blue-600 dark:text-blue-400"
                  : "text-gray-600 dark:text-gray-300"
              )}
            >
              <Compass className="w-4 h-4 mr-1.5" />
              <span>Explore Careers</span>
            </Link>
            <Link
              href="/skills"
              className={cn(
                "flex items-center text-sm transition-colors hover:text-amber-600 dark:hover:text-amber-400",
                isActive("/skills")
                  ? "text-amber-600 dark:text-amber-400"
                  : "text-gray-600 dark:text-gray-300"
              )}
            >
              <Lightbulb className="w-4 h-4 mr-1.5" />
              <span>Skill Analysis</span>
            </Link>
            <Link
              href="/simulate"
              className={cn(
                "flex items-center text-sm transition-colors hover:text-emerald-600 dark:hover:text-emerald-400",
                isActive("/simulate")
                  ? "text-emerald-600 dark:text-emerald-400"
                  : "text-gray-600 dark:text-gray-300"
              )}
            >
              <LineChart className="w-4 h-4 mr-1.5" />
              <span>Career Simulation</span>
            </Link>
          </nav>
        </div>

        <div className="flex items-center space-x-3">
          <Link href="/profile">
            <Button
              variant="ghost"
              className="text-sm text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white"
            >
              <User className="w-4 h-4 mr-1.5" />
              <span>Profile</span>
            </Button>
          </Link>
          <div className="h-4 w-px bg-gray-200 dark:bg-gray-800"></div>
          <Link href="/login">
            <Button
              variant="outline"
              className="text-sm border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 text-gray-900 dark:text-white hover:bg-gray-50 dark:hover:bg-gray-800"
            >
              Sign In
            </Button>
          </Link>
          <Link href="/login">
            <Button
              variant="default"
              className="text-sm bg-blue-600 hover:bg-blue-700 dark:bg-blue-600 dark:hover:bg-blue-700"
            >
              Join Now
            </Button>
          </Link>
        </div>
      </div>

      {/* Mobile menu button - shown on smaller screens */}
      <div className="md:hidden fixed bottom-4 inset-x-0 flex justify-center">
        <Button
          variant="default"
          className="rounded-full px-4 py-2 bg-blue-600 text-white shadow-lg"
        >
          Menu
        </Button>
      </div>
    </header>
  );
}
