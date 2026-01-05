"use client";

import { useState } from "react";
import { WandSparklesIcon } from "lucide-react";
import { toast } from "sonner";
import LoadingButton from "@/components/LoadingButton";
import type { ResumeValues } from "@/lib/validation";
import { generateSummary } from "./action";

interface GenerateSummaryButtonProps {
  resumeData: ResumeValues;
  onSummaryGenerated: (summary: string) => void;
}

export default function GenerateSummaryButton({
  resumeData,
  onSummaryGenerated,
}: GenerateSummaryButtonProps) {
  const [loading, setLoading] = useState(false);

  async function handleClick() {
    try {
      setLoading(true);

      const aiResponse = await generateSummary(resumeData);
      onSummaryGenerated(aiResponse);

      toast.success("Summary generated successfully");
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <LoadingButton
      variant="outline"
      type="button"
      onClick={handleClick}
      loading={loading}
    >
      <WandSparklesIcon className="size-4" />
      Generate (AI)
    </LoadingButton>
  );
}
