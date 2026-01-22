"use server";

import prisma from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";
import { del } from "@vercel/blob";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function deleteResume(id: string) {
  const { userId } = await auth();

  if (!userId) {
    throw new Error("User not authenticated");
  }

  const resume = await prisma.resume.findUnique({
    where: { id, userId },
  });

  if (!resume) {
    throw new Error("Resume not found");
  }

  if (resume.photoUrl) {
    await del(resume.photoUrl);
  }

  //  Delete resume
  await prisma.resume.delete({
    where: { id },
  });

  //  Re-count remaining resumes
  const totalCount = await prisma.resume.count({
    where: { userId },
  });

 
  revalidatePath("/resumes");

  if (totalCount === 0) {
    revalidatePath("/editor");
    redirect("/editor"); 
  }
}
