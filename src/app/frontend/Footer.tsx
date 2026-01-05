import {
  Mail,
  Instagram,
  Facebook,
  Linkedin,
  X,
  FileText,
  AlertTriangle,
  Cookie,
} from "lucide-react";
import Link from "next/link";

export function Footer() {
  return (
    <footer className="border-t border-white/10 bg-black text-gray-300">
      <div className="mx-auto max-w-8xl px-6 pt-14 pb-10">
        {/* TOP GRID */}
        <div className="grid gap-10 grid-cols:1  md:flex md:justify-between">
          {/* LEFT – BRAND + NEWSLETTER */}
          <div className="md:col-span-2">
            <h3 className="text-lg font-semibold text-white">ResumeAI</h3>
            <p className="mt-2 text-sm text-gray-400">
              Build clean, professional, ATS-friendly resumes using AI.
            </p>

            <p className="mt-6 text-sm font-medium text-white">
              Contact us
            </p>

            <div className="mt-3 flex max-w-sm gap-2">
              <input
                type="email"
                placeholder="support@resumeai.com"
                className="w-full rounded-md border border-white/10 bg-white/5 px-3 py-2 text-sm text-white placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-600"
              />
              <button className="inline-flex items-center gap-2 rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-500">
                <Mail className="h-4 w-4" />
                Send
              </button>
            </div>
          </div>

          {/* CENTER – LINKS */}
          {/* <div>
            <h4 className="mb-4 text-sm font-semibold text-white">
              About
            </h4>
            <ul className="space-y-2 text-sm text-gray-400">
              <li>Home</li>
              
              <li>Contact</li>
            </ul>
          </div> */}

          {/* <div>
            <h4 className="mb-4 text-sm font-semibold text-white">
              Product
            </h4>
            <ul className="space-y-2 text-sm text-gray-400">
              <li>AI Resume Writer</li>
              <li>Templates</li>
              <li>Resume Parser</li>
              <li>Cover Letters</li>
            </ul>
          </div> */}

          {/* RIGHT – FOLLOW + ADDRESS */}
          <div>
            <h4 className="mb-4 text-sm font-semibold text-white">
              Follow us
            </h4>

            <div className="mb-6 flex gap-3">
              {[Instagram, Facebook, Linkedin, X].map((Icon, i) => (
                <span
                  key={i}
                  className="flex h-9 w-9 items-center justify-center rounded-md border border-white/10 bg-white/5 hover:bg-white/10"
                >
                  <Icon className="h-4 w-4" />
                </span>
              ))}
            </div>

            
           
          </div>
        </div>

        {/* DIVIDER */}
        <div className="my-8 border-t border-white/10" />

        {/* BOTTOM BAR */}
        <div className="flex flex-col gap-4 text-xs text-gray-400 md:flex-row md:items-center md:justify-between">
          <p>
            © {new Date().getFullYear()} ResumeAI. All rights reserved.
          </p>

          <div className="flex items-center gap-6">
            <Link href="#" className="flex items-center gap-1.5 hover:text-white">
              <AlertTriangle className="h-3.5 w-3.5" />
              Disclaimer
            </Link>
            <Link href="#" className="flex items-center gap-1.5 hover:text-white">
              <Cookie className="h-3.5 w-3.5" />
              Cookies
            </Link>
            <Link href="#" className="flex items-center gap-1.5 hover:text-white">
              <FileText className="h-3.5 w-3.5" />
              T&C
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
