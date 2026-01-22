"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { steps } from "./steps";
import Breadcrumbs from "./Breadcrumbs";
import Footer from "./Footer";
import { useState } from "react";
import { ResumeValues } from "@/lib/validation";
import ResumePreviewSection from "./ResumePreviewSection";
import { cn, mapToResumeValues } from "@/lib/utils";
import useUnloadWarning from "@/hooks/useUnloadWarning";
import useAutoSaveResume from "./useAutoSaveResume";
import { ResumeServerData } from "@/lib/types";


interface ResumeEditorProps {
  resumeToEdit: ResumeServerData | null;
}

export default function ResumeEditor({ resumeToEdit }: ResumeEditorProps) {


  const[showSmResumePreview,setshowSmResumePreview]=useState(false);
  

  
  const [resumeData, setResumeData] = useState<ResumeValues>(
    resumeToEdit? mapToResumeValues(resumeToEdit) :{
    title: "",
    description: "",
    firstName: "",
    lastName: "",
    jobTitle: "",
    city: "",
    country: "",
    phone: "",
    email: "",
    photo: undefined,
    workExperiences: [],
    educations: [],
    summary: "",
  });
 

  // ------------------------------->for auto saving<-------------------------------------------------
  const{isSaving,hasUnsavedChanges}=useAutoSaveResume(resumeData)
  useUnloadWarning(hasUnsavedChanges);

  
  // search from url
  const searchParams = useSearchParams();

  const currentStep = searchParams.get("step") || steps[0].key;
  function setCurrentStep(step: string) {
    setStep(step);
  }
  // set the step in url
  function setStep(key: string) {
    const newSearchParams = new URLSearchParams(searchParams);
    newSearchParams.set("step", key);
    window.history.pushState(null, "", `?${newSearchParams.toString()}`);
  }

  const FormComponent = steps.find(
    (step) => step.key === currentStep,
  )?.component;


 

  // --------------->preview data----------------------------------->

  return (
    <>
      <header className="flex flex-col px-5 py-3 text-center">
        <div className="space-y-1.5 border-b px-5 pb-3 text-center">
          <h1 className="text-2xl font-bold">Design your resume</h1>
          <p className="text-muted-foreground text-sm">
            Follow the steps below to create your resume. Your progress will be
            saved automatically.
          </p>
        </div>
      </header>

      <main className="relative grow">
        <div className="absolute top-0 bottom-0 flex w-full">
          <div className={cn("w-full space-y-6 overflow-y-auto md:w-1/2 md:border-r md:block",showSmResumePreview && "hidden")}>
           
            <Breadcrumbs currentStep={currentStep} setCurrentStep={setStep} />
            {FormComponent && (
              <FormComponent
                resumeData={resumeData}
                setResumeData={setResumeData}
              />
            )}
          </div>

          <div className="grow md:border-r" />
          <ResumePreviewSection
            resumeData={resumeData}
            setResumeData={setResumeData}
            className={cn(showSmResumePreview && "flex")}
            
           
          />
        </div>
         
       
      </main>

      <Footer currentStep={currentStep} setCurrentStep={setCurrentStep}
       showSmResumePreview={showSmResumePreview}setshowSmResumePreview={setshowSmResumePreview} isSaving={isSaving}/> 
    </>
  );
}
