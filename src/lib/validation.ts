import { z } from "zod";
export const commonString = z.string().trim().optional().or(z.literal(""));

// ------------------> GenerealInfoValues--------------------------->
export const generalInfoSchema = z.object({
  title: commonString,
  description: commonString,
});

export type GenerealInfoValues = z.infer<typeof generalInfoSchema>;

// ------------------> PersonalInfoValues--------------------------->
export const personalInfoSchema = z.object({
  photo: z
    .custom<File | undefined>()
    .refine((file) => !file || file.size <= 5 * 1024 * 1024, {
      message: "File can't be bigger than 5MB",
    })
    .refine(
      (file) =>
        !file || ["image/jpeg", "image/png", "image/jpg"].includes(file.type),
      {
        message: "File format must be jpg, jpeg, or png",
      },
    ),
  firstName: commonString,
  lastName: commonString,
  jobTitle: commonString,
  city: commonString,
  country: commonString,
  phone: commonString,
  email: commonString,
});

export type PersonalInfoValues = z.infer<typeof personalInfoSchema>;

// ------------------> workInfoValues--------------------------->

export const workExperienceSchema = z.object({
  workExperiences: z
    .array(
      z.object({
        position: commonString,
        company: commonString,
        startDate: commonString,
        endDate: commonString,
        description: commonString,
      }),
    )
    .optional(),
});

export type WorkExperienceValues = z.infer<typeof workExperienceSchema>;

// ------------------> Education InfoValues--------------------------->
export const educationSchema = z.object({
  educations: z
    .array(
      z.object({
        degree: commonString,
        school: commonString,
        startDate: commonString,
        endDate: commonString,
      }),
    )
    .optional(),
});

export type EducationValues = z.infer<typeof educationSchema>;


//  for open ai generate  by using single work experience not array
export type WorkExperience = NonNullable<
  z.infer<typeof workExperienceSchema>["workExperiences"]
>[number];

// ------------------> Skills Info Value--------------------------->
export const skillsSchema = z.object({
  skills: z.array(z.string().trim()).optional(),
});

export type SkillsValues = z.infer<typeof skillsSchema>;

// ------------------> Summary Info Value--------------------------->
export const summarySchema = z.object({
  summary: commonString,
});

export type SummaryValues = z.infer<typeof summarySchema>;

// ------------------> combined resumes InfoValues--------------------------->
export const resumeSchema = z.object({
  ...generalInfoSchema.shape,
  ...personalInfoSchema.shape,
  ...workExperienceSchema.shape,
  ...educationSchema.shape,
  ...skillsSchema.shape,
  ...summarySchema.shape,
    colorHex: commonString,
    borderStyle: commonString,
});

// omitz is used to remove photo from combined schema
export type ResumeValues = Omit<z.infer<typeof resumeSchema>, "photo"> & {
  id?: string;
  photo?: File | string | null;
};


// open ai

export const generateSummarySchema = z.object({
  jobTitle: commonString,
  ...workExperienceSchema.shape,
  ...educationSchema.shape,
  ...skillsSchema.shape,
});

export type GenerateSummaryInput = z.infer<typeof generateSummarySchema>;

export const generateWorkExperienceSchema = z.object({
  description: z
    .string()
    .trim()
    .min(1, "Required")
    .min(20, "Must be at least 20 characters"),
});

export type GenerateWorkExperienceInput = z.infer<
  typeof generateWorkExperienceSchema
>;
