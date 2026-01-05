import { ArrowRight, Sparkles, FileCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import { cn } from "@/lib/utils";

export function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-blue-50 to-white py-20 md:py-32 dark:from-gray-900 dark:to-gray-950">
      {/* Background gradient effect */}
      <div className="bg-grid-gray-900/[0.04] dark:bg-grid-white/[0.02] absolute inset-0" />
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="h-[40rem] w-[40rem] rounded-full bg-blue-400/20 blur-3xl dark:bg-blue-600/10" />
      </div>

      <div className="relative container mx-auto px-4">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          {/* Left Content */}
          <div className="space-y-8">
            <Badge className="w-fit">
              <Sparkles className="mr-1 h-3 w-3" />
              AI-Powered Resume Builder
            </Badge>

            <div className="space-y-4">
              <h1 className="text-4xl leading-tight font-bold text-gray-900 md:text-5xl lg:text-6xl dark:text-white">
                Build ATS-Optimized Resumes with AI
              </h1>
              <p className="max-w-xl text-lg text-gray-600 dark:text-gray-400">
                Create professional, ATS-friendly resumes in minutes with
                AI-powered suggestions. Improve your chances with a clean,
                professional resume.
              </p>
            </div>

            <div className="flex flex-col gap-4 sm:flex-row sm:justify-start sm:items-center max-w-2xl">
             <Link
  href="/resumes"
  className={cn(
    "group inline-flex items-center justify-center gap-2",
    "rounded-md px-7 py-3 text-sm font-semibold",
    "bg-primary text-primary-foreground",
    // "shadow-lg shadow-primary/25",
    // "hover:bg-primary/90 hover:shadow-xl hover:shadow-primary/30",
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
    // "transition-all duration-200 ease-out",
    "sm:w-auto"
  )}
>
  Create Resume
  <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" />
</Link>
            </div>

            <div className="flex items-center gap-6 pt-4">
              <div className="flex items-center gap-2">
                <FileCheck className="h-5 w-5 text-green-600" />
                <span className="text-sm text-gray-600 dark:text-gray-400">
                  ATS-friendly formatting
                </span>
              </div>
              <div className="h-6 w-px bg-gray-300 dark:bg-gray-700" />
              <span className="text-sm text-gray-600 dark:text-gray-400">
                Free forever plan
              </span>
            </div>
          </div>

          {/* Right Content - Resume Preview Mockup */}
          <div className="relative hidden lg:block">
            <div className="relative">
              {/* Floating cards effect */}
              <div className="absolute -top-8 -left-8 w-64 rotate-3 transform rounded-lg border border-gray-200 bg-white p-4 shadow-xl dark:border-gray-700 dark:bg-gray-800">
                <div className="mb-3 flex items-center gap-2">
                  <Sparkles className="h-4 w-4 text-blue-600" />
                  <span className="text-sm font-medium text-gray-900 dark:text-white">
                    AI Suggestion
                  </span>
                </div>
                <p className="text-xs text-gray-600 dark:text-gray-400">
                  Generate professional content instantly with our advanced AI..
                </p>
              </div>

              {/* Main Resume Preview */}
              <div className="rounded-xl border border-gray-200 bg-white p-8 shadow-2xl dark:border-gray-700 dark:bg-gray-800">
                <div className="space-y-4">
                  {/* Header */}
                  <div className="border-b border-gray-200 pb-4 dark:border-gray-700">
                    <div className="mb-2 h-6 w-48 rounded bg-gray-900 dark:bg-white" />
                    <div className="flex gap-3">
                      <div className="h-3 w-32 rounded bg-gray-300 dark:bg-gray-600" />
                      <div className="h-3 w-32 rounded bg-gray-300 dark:bg-gray-600" />
                    </div>
                  </div>

                  {/* Content sections */}
                  <div className="space-y-3">
                    <div className="h-4 w-32 rounded bg-gray-700 dark:bg-gray-300" />
                    <div className="space-y-2">
                      <div className="h-3 w-full rounded bg-gray-200 dark:bg-gray-700" />
                      <div className="h-3 w-full rounded bg-gray-200 dark:bg-gray-700" />
                      <div className="h-3 w-3/4 rounded bg-gray-200 dark:bg-gray-700" />
                    </div>
                  </div>

                  <div className="space-y-3">
                    <div className="h-4 w-40 rounded bg-gray-700 dark:bg-gray-300" />
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <div className="h-3 w-48 rounded bg-gray-300 dark:bg-gray-600" />
                        <div className="h-3 w-full rounded bg-gray-200 dark:bg-gray-700" />
                        <div className="h-3 w-full rounded bg-gray-200 dark:bg-gray-700" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Floating badge */}
              <div className="absolute -right-4 -bottom-4 rounded-full border-2 border-green-500 bg-green-50 px-4 py-2 dark:bg-green-900/30">
                <div className="flex items-center gap-2">
                  <div className="h-2 w-2 animate-pulse rounded-full bg-green-500" />
                  <span className="text-sm font-medium text-green-700 dark:text-green-400">
                    ATS Optimized
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
