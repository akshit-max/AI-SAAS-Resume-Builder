import { Button } from "@/components/ui/button";
import Link from "next/link";
import React from "react";
import { steps } from "./steps";
import { FileUserIcon, PenIcon, PenLineIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface FooterProps {
  currentStep: string;
  setCurrentStep: (step: string) => void;
  showSmResumePreview: boolean;
  setshowSmResumePreview: (show: boolean) => void;
  isSaving: boolean;
  
}

export default function Footer({
  currentStep,
  setCurrentStep,

  showSmResumePreview,
  setshowSmResumePreview,


  isSaving,
}: FooterProps) {
  // previous step
  const prevstep = steps.find(
    (_, index) => steps[index + 1]?.key === currentStep,
  )?.key;

  // next step
  const nextstep = steps.find(
    (_, index) => steps[index - 1]?.key === currentStep,
  )?.key;

  return (
    <footer className="w-full border-t px-5 py-3">
      <div className="max-w-8xl mx-auto flex flex-wrap justify-between gap-2">
        <div className="flex items-center gap-3">
          <Button
            variant="secondary"
            onClick={() => prevstep && setCurrentStep(prevstep)}
            disabled={!prevstep}
          >
            Previous step
          </Button>

          <Button
            onClick={() => nextstep && setCurrentStep(nextstep)}
            disabled={!nextstep}
          >
            Next step
          </Button>
        </div>


        <Button 
        variant="outline"
          size="icon"
          onClick={()=>{setshowSmResumePreview(!showSmResumePreview)}}
      
          className="md:hidden"
          title={
            showSmResumePreview?"Show input form": "Show Resume Previw"
          }
          >
          {showSmResumePreview ? <PenLineIcon /> : <FileUserIcon />}
        </Button>


        <div className="flex items-center gap-3">
          <Button variant="secondary" asChild>
            <Link href="/resumes">Close</Link>
          </Button>
          {/*  if is saving is true  show is saving */}
          <p className={cn("text-muted-foreground opacity-0", isSaving && "opacity-100",)}>Saving...</p>
        </div>
      </div>
    </footer>
  );
}
