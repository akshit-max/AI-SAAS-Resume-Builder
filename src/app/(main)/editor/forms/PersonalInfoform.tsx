"use client";

import { use, useEffect, useEffectEvent, useRef } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { personalInfoSchema, PersonalInfoValues } from "@/lib/validation";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { unsubscribe } from "diagnostics_channel";
import { EditorFormProps } from "@/lib/types";
import { set } from "zod";

export default function PersonalInfoForm({ resumeData, setResumeData }:EditorFormProps) {
  
  const photoInputRef = useRef<HTMLInputElement | null>(null);

  
  const form = useForm<PersonalInfoValues>({
    resolver: zodResolver(personalInfoSchema),
    defaultValues: {
      firstName: resumeData.firstName || "",
      lastName: resumeData.lastName || "",
      jobTitle: resumeData.jobTitle || "",
      city: resumeData.city || "",
      country: resumeData.country || "",
      phone: resumeData.phone || "",
      email: resumeData.email || "",
    },
  });



  // ------------------------------>to update resumedata and values-------------------->
  useEffect(() => {
    const { unsubscribe } = form.watch(async (values) => {
      const isValid = await form.trigger();
      if (!isValid) return;
      setResumeData({...resumeData,...values })
      // update resume data
    });
    return unsubscribe; 
  }, [form,resumeData,setResumeData ]);

  


  return (
    <div className="mx-auto max-w-xl space-y-6">
      <div className="space-y-1.5 text-center">
        <h2 className="text-2xl font-semibold">Personal info</h2>
        <p className="text-muted-foreground text-sm">Tell us about yourself.</p>
      </div>

      <Form {...form}>
        <form className="space-y-3">
          {/* PHOTO */}
          {/*--------------- PHOTO ADD LOGIC ----------------- */}
          <FormField
            control={form.control}
            name="photo"
            render={({ field: { value, ...field } }) => (
              <FormItem>
                <FormLabel>Your photo</FormLabel>

                <div className="flex items-center gap-2">
                  <FormControl>
                    <Input
                      {...field}
                      ref={photoInputRef}
                      type="file"
                      accept="image/*"
                      onChange={(e) => {
                        const file = e.target.files?.[0];
                        field.onChange(file);
                      }}

                      
                     
                    />
                  </FormControl>
                  {/* ------- CANCEL BUTTON LOGIC---------*/}
                  <Button
                    type="button"
                    variant="secondary"
                    // most imp logic to remove file and input back to NULL
                    //  send to zod for validadtion
                    onClick={() => {
                      field.onChange(undefined);
                      if (photoInputRef.current) {
                        photoInputRef.current.value = "";
                      }
                      setResumeData({ ...resumeData, photo: undefined }); 
                    }}
                  >
                    Remove
                  </Button>
                </div>

                <FormMessage />
              </FormItem>
            )}
          />

          {/* FIRST + LAST NAME */}
          <div className="grid grid-cols-2 gap-3">
            <FormField
              control={form.control}
              name="firstName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>First name</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="lastName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Last name</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          {/* JOB TITLE */}
          <FormField
            control={form.control}
            name="jobTitle"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Job title</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* CITY + COUNTRY */}
          <div className="grid grid-cols-2 gap-3">
            <FormField
              control={form.control}
              name="city"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>City</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="country"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Country</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          {/* PHONE */}
          <FormField
            control={form.control}
            name="phone"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Phone</FormLabel>
                <FormControl>
                  <Input {...field} type="tel" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* EMAIL */}
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input {...field} type="email" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </form>
      </Form>
    </div>
  );
}
