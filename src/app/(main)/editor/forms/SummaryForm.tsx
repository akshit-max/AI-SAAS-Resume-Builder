import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { useFieldArray } from "react-hook-form";

import { summarySchema, SummaryValues } from "@/lib/validation";
import { GripHorizontal, Plus } from "lucide-react";
import type { UseFormReturn } from "react-hook-form";
import GenerateSummaryButton from "./GenerateSummaryButton";

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import { Input } from "@/components/ui/input";
import { EditorFormProps } from "@/lib/types";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { resume } from "react-dom/server";

export default function Summaryform({
  resumeData,
  setResumeData,
}: EditorFormProps) {
  const form = useForm<SummaryValues>({
    resolver: zodResolver(summarySchema),
    defaultValues: {
      summary: resumeData.summary || "",
    },
  });

  useEffect(() => {
    const { unsubscribe } = form.watch(async (values) => {
      const isValid = await form.trigger();
      if (!isValid) return;
      setResumeData({
        ...resumeData,
        summary: values.summary,
      });
    });
    return unsubscribe;
  }, [form, resumeData, setResumeData]);

  // It lets you manage a dynamic array of form fields (workExperiences) — add, remove, and reorder items — while keeping validation and form state in sync.

  return (
    <div className="mx-auto max-w-xl space-y-6">
      <div className="space-y-1.5 text-center">
        <h2 className="text-2xl font-semibold">Professional summary</h2>
        <p className="text-muted-foreground text-sm">
          Write a short introduction for your resume or let the AI generate one
          from your entered data.
        </p>
      </div>
      <Form {...form}>
        <form>
          <FormField
            control={form.control}
            name="summary"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="sr-only">Professional summary</FormLabel>
                <FormControl>
                  <Textarea
                    {...field}
                    placeholder="A brief, engaging text about yourself"
                    autoFocus
                    onChange={(e) => {
                      const s = e.target.value;
                      field.onChange(s);
                    }}
                  />
                </FormControl>

                <FormMessage />
                <GenerateSummaryButton  resumeData={resumeData} 
                onSummaryGenerated={summary=> form.setValue("summary",summary)} />
              </FormItem>
            )}
          />
        </form>
      </Form>
    </div>
  );
}
