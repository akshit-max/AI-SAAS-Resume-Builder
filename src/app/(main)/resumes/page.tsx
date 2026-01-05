import prisma from "@/lib/prisma";
import { resumeDataInclude } from "@/lib/types";
import { auth } from "@clerk/nextjs/server";
import type { Metadata } from "next";
import ResumeItem from "./ResumeItem";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

export const metadata: Metadata = {
  title: "Your Resumes",
};

export default async function Page() {
  const { userId } = await auth();
  if (!userId) return null;

  const [resumes, totalCount] = await Promise.all([
    prisma.resume.findMany({
      where: { userId },
      orderBy: { updatedAt: "desc" },
      include: resumeDataInclude,
    }),
    prisma.resume.count({
      where: { userId },
    }),
  ]);

  return (
    <main className="mx-auto w-full max-w-7xl px-4 py-8">
      {/* ---------------- Header ---------------- */}
      <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Your Resumes</h1>
          <p className="text-sm text-muted-foreground">
            You have {totalCount} resume{totalCount !== 1 ? "s" : ""}
          </p>
        </div>

        {/* <Button asChild>
          <Link href="/editor" className="flex items-center gap-2">
            <Plus className="h-4 w-4" />
            New Resume
          </Link>
        </Button> */}
      </div>

      {/* ---------------- Content ---------------- */}
      {totalCount > 0 ? (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {resumes.map((resume) => (
            <ResumeItem key={resume.id} resume={resume} />
          ))}
        </div>
      ) : (
        <div className="flex min-h-[300px] flex-col items-center justify-center rounded-lg border border-dashed text-center">
          <h2 className="text-lg font-semibold">No resumes yet</h2>
          <p className="mt-1 text-sm text-muted-foreground">
            Create your first resume to get started.
          </p>

          <Button asChild className="mt-4">
            <Link href="/editor" className="flex items-center gap-2">
              <Plus className="h-4 w-4" />
              Create Resume
            </Link>
          </Button>
        </div>
      )}
    </main>
  );
}
