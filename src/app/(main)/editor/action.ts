"use server";


import  prisma  from "@/lib/prisma";
// import  {getUserSubscriptionLevel } from "@/lib/subscription";
import { resumeSchema, ResumeValues } from "@/lib/validation";
import { auth } from "@clerk/nextjs/server";
import { del, put } from "@vercel/blob";
import path from "path";
import crypto from "crypto";

//----------------------------------------------------------------------
//  its just like mongodb crud
// “This function runs ONLY on the server and can be called directly from the client.”
export async function saveResume(values: ResumeValues) {
  // No API route
  // No fetch
  // No axios
  // fetching id from combined resume
  const { id } = values;

  console.log("received values", values);

  // fetching all from combined resume
  //  we have just take photo and work experience and education seperate from combined resume as
  //  photo is a file and other 2 are array

  // resumeSchema.parse()
  // → validates the incoming data (Zod)
  const { photo, workExperiences, educations, ...resumeValues } =
    resumeSchema.parse(values);

  // authentication

  // “Only logged-in users can save resumes.”
  const { userId } = await auth();

  if (!userId) {
    throw new Error("User not authenticated");
  }
  // -----------------------------------------------------------------------------

  //   const subscriptionLevel = await getUserSubscriptionLevel(userId);

  //   if (!id) {
  //     const resumeCount = await prisma.resume.count({ where: { userId } });

  //     if (!canCreateResume(subscriptionLevel, resumeCount)) {
  //       throw new Error(
  //         "Maximum resume count reached for this subscription level",
  //       );
  //     }
  //   }

  // Meaning:

  // If ID exists → make sure:

  // Resume exists

  // Resume belongs to THIS user

  // 🔥 This prevents users from editing other people’s resumes.

  const existingResume = id
    ? await prisma.resume.findUnique({ where: { id, userId } })
    : null;

  if (id && !existingResume) {
    throw new Error("Resume not found");
  }

  //   const hasCustomizations =
  //     (resumeValues.borderStyle &&
  //       resumeValues.borderStyle !== existingResume?.borderStyle) ||
  //     (resumeValues.colorHex &&
  //       resumeValues.colorHex !== existingResume?.colorHex);

  //   if (hasCustomizations && !canUseCustomizations(subscriptionLevel)) {
  //     throw new Error("Customizations not allowed for this subscription level");
  //   }

  //

  // storing Photo in Block storage get it from internet

  //
  // Meaning:

  // “User uploaded a new image”

  // Then:

  // Delete old photo (if exists)

  // Upload new photo to Vercel Blob

  // Store the URL

  let newPhotoUrl: string | undefined | null = undefined;

  if (photo instanceof File) {
    if (existingResume?.photoUrl) {
      await del(existingResume.photoUrl);
    }

    // const blob = await put(`resume_photos/${path.extname(photo.name)}`, photo, {
    //   access: "public",
    // });
    const extension = path.extname(photo.name);
    const fileName = `${crypto.randomUUID()}${extension}`;

    const blob = await put(`resume_photos/${id ?? "new"}/${fileName}`, photo, {
      access: "public",
    });

    // Meaning:

    // “User removed photo”

    // So:

    // Delete old photo

    // Save null to D
    newPhotoUrl = blob.url;
  } else if (photo === null) {
    if (existingResume?.photoUrl) {
      await del(existingResume.photoUrl);
    }
    newPhotoUrl = null;
  }

  // update resume
  // “If resume already exists, update it.”
  if (id) {
    return prisma.resume.update({
      where: { id },
      data: {
        ...resumeValues,
        photoUrl: newPhotoUrl,
        workExperiences: {
          // “Delete ALL old work experiences and insert the new list.”
          deleteMany: {},
          // create new by deleting old
          create: workExperiences?.map((exp) => ({
            ...exp,
            startDate: exp.startDate ? new Date(exp.startDate) : undefined,
            endDate: exp.endDate ? new Date(exp.endDate) : undefined,
          })),
        },
        educations: {
          deleteMany: {},
          create: educations?.map((edu) => ({
            ...edu,
            startDate: edu.startDate ? new Date(edu.startDate) : undefined,
            endDate: edu.endDate ? new Date(edu.endDate) : undefined,
          })),
        },
        updatedAt: new Date(),
      },
    });
  }

  //   create new one  resume
  // “First time save → create resume.”
  else {
    return prisma.resume.create({
      data: {
        ...resumeValues,
        userId,
        photoUrl: newPhotoUrl,
        workExperiences: {
          create: workExperiences?.map((exp) => ({
            ...exp,
            startDate: exp.startDate ? new Date(exp.startDate) : undefined,
            endDate: exp.endDate ? new Date(exp.endDate) : undefined,
          })),
        },
        educations: {
          create: educations?.map((edu) => ({
            ...edu,
            startDate: edu.startDate ? new Date(edu.startDate) : undefined,
            endDate: edu.endDate ? new Date(edu.endDate) : undefined,
          })),
        },
      },
    });
  }
}
