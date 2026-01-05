"use client";

import { FileText, Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import Link from "next/link";
import ModeToggle from "@/components/ui/ThemeToggle";
import { UserButton } from "@clerk/nextjs";
import { dark } from "@clerk/themes";
import { CreditCard } from "lucide-react";
import { useTheme } from "next-themes";
import Image from "next/image";
import logo from "../assets/logo.png";


export function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const{theme}=useTheme();

  return (
    <nav className="sticky top-0 z-50 w-full border-b bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60 dark:bg-gray-950/95 dark:supports-[backdrop-filter]:bg-gray-950/60">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        {/* Logo */}
        <div className="flex items-center gap-2">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-600">
            <FileText className="h-6 w-6 text-white" />
          </div>
          <span className="text-xl font-bold tracking-tight">
            AI Resume Builder
          </span>
        </div>


        {/* Desktop CTA */}
        <div className="hidden items-center gap-3 md:flex">
           <div className="flex items-center gap-3">
          <ModeToggle />
          {/* <UserButton
            appearance={{
              baseTheme: theme === "dark" ? dark : undefined,
              elements: {
                avatarBox: {
                  width: 35,
                  height: 35,
                },
              },
            }}
          >
            <UserButton.MenuItems>
              <UserButton.Link
                label="Billing"
                labelIcon={<CreditCard className="size-4" />}
                href="/billing"
              />
            </UserButton.MenuItems>
          </UserButton> */}
        </div>
          <Button  asChild variant="secondary">
            <Link href="/sign-in">Sign In</Link>
          </Button>
          <Button asChild  >
            <Link href="/sign-up">Sign Up</Link>
          </Button>
          {/* <Button>Sign Up</Button> */}
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setMobileMenuOpen((prev) => !prev)}
          className="p-2 text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white md:hidden"
          aria-label="Toggle menu"
        >
          <Menu className="h-6 w-6" />
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="border-t bg-white dark:bg-gray-950 md:hidden">
          <div className="container mx-auto space-y-3 px-4 py-4">
            <div className="space-y-2 pt-3 flex flex-col gap-2">
              <Button asChild variant="secondary" className="w-full">
                <Link
                  href="/sign-in"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Sign In
                </Link>
              </Button>
               <Button  asChild >
            <Link href="/sign-up">Sign Up</Link>
          </Button>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
