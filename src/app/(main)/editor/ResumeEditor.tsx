"use client"

import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function ResumeEditor() {
  return (
    <>
      <header className="flex  flex-col py-3 px-5 text-center">
        <div className="space-y-1.5 border-b pb-3 px-5 text-center">
          <h1 className="text-2xl font-bold">Design your resume</h1>
          <p className="text-sm text-muted-foreground">
            Follow the steps below to create your resume. Your progress will be
            saved automatically.
          </p>
        </div>
      </header>

      <main className="relative grow">
        <div className="absolute bottom-0 top-0 flex w-full">
          <div className="w-full md:w-1/2 md:border-r">
             <div className="grow p-4">left content</div>
          </div>
          
          <div className="hidden w-1/2 md:flex p-4">
            right content
          </div>
        </div>
      </main>

      <footer className="w-full border-t py-3 px-5">
        <div className="mx-auto flex max-w-8xl flex-wrap justify-between gap-2">
          <div className="flex items-center gap-3">
            <Button variant="secondary">Previous step</Button>
            <Button>Next step</Button>
          </div>
          
          <div className="flex items-center gap-3">
            <Button variant="secondary" asChild>
              <Link href="/resumes">Close</Link>
            </Button>
          </div>
        </div>
      </footer>
    </>
  );
}