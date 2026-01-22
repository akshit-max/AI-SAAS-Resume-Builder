import {
  ArrowRight,
  CheckCircle,
  Sparkles,
  Zap,
  FileCheck,
  Briefcase,
  GraduationCap,
} from "lucide-react";

import Link from "next/link";

export function HeroSection() {
  return (
    <main className="relative overflow-hidden bg-white">

      {/* Background gradients */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute -top-20 -left-20 h-72 w-72 rounded-full bg-blue-200/40 blur-3xl" />
        <div className="absolute top-1/3 -right-20 h-72 w-72 rounded-full bg-indigo-200/40 blur-3xl" />
      </div>

      <section className="relative mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid items-center gap-16 lg:grid-cols-2">

          {/* LEFT CONTENT */}
          <div className="max-w-xl space-y-6">

            {/* SaaS Badge */}
            <div className="inline-flex items-center gap-2 rounded-full bg-blue-50 px-4 py-2 text-xs font-semibold uppercase tracking-wide text-blue-700">
              <Sparkles className="h-4 w-4" />
              AI Resume Builder
            </div>

            {/* Heading */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight text-gray-900">
              Create a{" "}
              <span className="text-blue-600">Professional CV</span>{" "}
              in Minutes
            </h1>

            {/* Description */}
            <p className="text-base sm:text-lg text-gray-600 max-w-lg">
              Build{" "}
              <span className="font-medium text-gray-900">
                ATS-optimized resumes
              </span>{" "}
              with AI-powered suggestions and ready-to-use templates.
            </p>

            {/* Feature badges */}
            <div className="flex flex-wrap gap-2 pt-3">
              {[
                { icon: Zap, label: "AI-Optimised" },
                { icon: FileCheck, label: "ATS-Friendly" },
                { icon: CheckCircle, label: "Instant PDF Export" },
              ].map(({ icon: Icon, label }) => (
                <div
                  key={label}
                  className="flex items-center gap-2 rounded-full border border-gray-200 bg-white px-4 py-2 text-xs font-medium text-gray-700 shadow-sm"
                >
                  <Icon className="h-4 w-4 text-blue-600" />
                  {label}
                </div>
              ))}
            </div>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row gap-4 pt-6">
              <Link
                href="/resumes"
                className="group inline-flex items-center justify-center gap-2 rounded-lg bg-blue-600 px-8 py-4 text-sm font-semibold text-white shadow-lg transition hover:bg-blue-700"
              >
                Get Started Free
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>

              
            </div>

            {/* Trust micro-copy */}
            <div className="flex items-center gap-6 pt-3 text-sm text-gray-500">
              <div className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-blue-600" />
                Simple to use
              </div>
              <div className="flex items-center gap-2">
                <FileCheck className="h-4 w-4 text-blue-600" />
                Clean output
              </div>
            </div>
          </div>

          {/* RIGHT VISUAL */}
          <div className="hidden lg:flex justify-center">
            <div className="relative h-[420px] w-[380px]">

              {/* Back card */}
              <div className="absolute top-10 left-6 h-[340px] w-[260px] rounded-xl border bg-gray-100 p-4 shadow-sm rotate-[-10deg]">
                <div className="flex items-center gap-2 text-xs text-gray-500">
                  <Briefcase className="h-4 w-4 text-blue-600" />
                  Experience
                </div>
              </div>

              {/* Middle card */}
              <div className="absolute top-5 left-12 h-[340px] w-[260px] rounded-xl border bg-gray-50 p-4 shadow-md rotate-[-4deg]">
                <div className="flex items-center gap-2 text-xs text-gray-500">
                  <GraduationCap className="h-4 w-4 text-blue-600" />
                  Education
                </div>
              </div>

              {/* Front card */}
              <div className="absolute top-0 left-20 h-[340px] w-[260px] rounded-xl border bg-white p-6 shadow-xl rotate-[6deg] transition-transform duration-300 hover:-translate-y-1 hover:rotate-[4deg]">
                <div className="space-y-4">
                  <div className="flex items-center gap-2 text-xs text-gray-500">
                    <FileCheck className="h-4 w-4 text-blue-600" />
                    Resume Preview
                  </div>

                  <div className="h-4 w-3/4 rounded bg-gray-900" />
                  <div className="h-3 w-1/2 rounded bg-gray-300" />

                  <div className="mt-6 space-y-2">
                    <div className="h-3 rounded bg-gray-200" />
                    <div className="h-3 w-5/6 rounded bg-gray-200" />
                    <div className="h-3 w-4/6 rounded bg-gray-200" />
                  </div>

                  <div className="mt-4 space-y-2">
                    <div className="h-3 rounded bg-gray-200" />
                    <div className="h-3 w-3/4 rounded bg-gray-200" />
                  </div>
                </div>
              </div>

            </div>
          </div>

        </div>
      </section>
    </main>
  );
}
