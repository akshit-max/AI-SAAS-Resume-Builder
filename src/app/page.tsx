// import Image from "next/image";

export default function Home() {
   return (
    <div className="min-h-screen bg-gray-50">
      {/* NAVBAR */}
      <nav className="sticky top-0 z-50 border-b border-gray-200 bg-white/80 backdrop-blur">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            <p className="text-sm font-semibold text-gray-900">MyApp</p>
            <div className="flex items-center gap-6">
              <a className="text-sm font-medium text-gray-700 hover:text-gray-900">
                Features
              </a>
              <a className="text-sm font-medium text-gray-700 hover:text-gray-900">
                Pricing
              </a>
              <button className="rounded-md bg-gray-900 px-4 py-2 text-sm text-white hover:bg-gray-800 transition">
                Sign in
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* HERO SECTION */}
      <section className="py-24 sm:py-28 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-semibold tracking-tight text-gray-900">
            Build Professional UIs Faster
          </h1>
          <p className="mt-6 max-w-2xl mx-auto text-lg text-gray-600">
            A clean Tailwind system used by real-world SaaS products. No
            overdesign. Just clarity.
          </p>

          <div className="mt-10 flex justify-center gap-4">
            <button className="rounded-md bg-gray-900 px-6 py-3 text-sm font-medium text-white hover:bg-gray-800 transition">
              Get Started
            </button>
            <button className="rounded-md border border-gray-300 px-6 py-3 text-sm font-medium text-gray-900 hover:bg-gray-50 transition">
              Learn More
            </button>
          </div>
        </div>
      </section>

      {/* FEATURES GRID */}
      <section className="py-16 sm:py-20 lg:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl sm:text-3xl font-semibold text-gray-900">
            Features
          </h2>
          <p className="mt-4 max-w-2xl text-base text-gray-600">
            Everything you need to build clean, scalable interfaces.
          </p>

          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {["Fast", "Clean", "Reusable"].map((item) => (
              <div
                key={item}
                className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm hover:shadow-md transition"
              >
                <span className="inline-flex items-center rounded-full bg-gray-100 px-3 py-1 text-xs font-medium text-gray-700">
                  {item}
                </span>
                <h3 className="mt-4 text-base font-semibold text-gray-900">
                  {item} Design
                </h3>
                <p className="mt-2 text-sm text-gray-600">
                  Professional spacing, typography, and layout patterns that
                  scale.
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FORM SECTION */}
      <section className="py-16 sm:py-20 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-md">
            <h2 className="text-2xl font-semibold text-gray-900">
              Subscribe for updates
            </h2>
            <p className="mt-2 text-sm text-gray-600">
              No spam. Just clean UI tips.
            </p>

            <form className="mt-6 space-y-4">
              <div className="space-y-1">
                <label className="text-sm font-medium text-gray-700">
                  Email address
                </label>
                <input
                  type="email"
                  placeholder="you@example.com"
                  className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-gray-900 focus:outline-none focus:ring-1 focus:ring-gray-900"
                />
              </div>

              <button className="w-full rounded-md bg-gray-900 px-4 py-2 text-sm text-white hover:bg-gray-800 transition">
                Subscribe
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* EMPTY STATE */}
      <section className="py-20">
        <div className="flex flex-col items-center justify-center text-center">
          <p className="text-sm text-gray-500">No more sections below 👋</p>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-gray-200 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
          <p className="text-sm text-gray-500">
            © 2026 MyApp. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );

}
