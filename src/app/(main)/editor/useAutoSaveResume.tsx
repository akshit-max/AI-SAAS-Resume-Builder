import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import useDebounce from "@/hooks/useDebounce";
import { fileReplacer } from "@/lib/utils";
import { ResumeValues } from "@/lib/validation";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { saveResume } from "./action";

export default function useAutoSaveResume(resumeData: ResumeValues) {
  const searchParams = useSearchParams();

  const { toast } = useToast();

 
  const debouncedResumeData = useDebounce(resumeData, 1500);


  const [resumeId, setResumeId] = useState(resumeData.id);

  
  const [lastSavedData, setLastSavedData] = useState(
    structuredClone(resumeData),
  );

  const [isSaving, setIsSaving] = useState(false);

  const [isError, setIsError] = useState(false);

  // ------------------ the above are 5 usestate core of this------>

 
  useEffect(() => {
    setIsError(false);
  }, [debouncedResumeData]);

 
  useEffect(() => {
    async function save() {
      try {
        setIsSaving(true);
        setIsError(false);
      
        const newData = structuredClone(debouncedResumeData);

        
        const updatedResume = await saveResume({
          //  spread existing new data
          ...newData,
          
           // 🔥 Very professional optimization.
          ...(JSON.stringify(lastSavedData.photo, fileReplacer) ===
            JSON.stringify(newData.photo, fileReplacer) && {
            photo: undefined,
          }),
          id: resumeId,
        });

        // set new id of new data resume only once not everytime
        setResumeId(updatedResume.id);
        // update last saved data
        setLastSavedData(newData);

        // if exisying resume id != to updated one just update the params

        if (searchParams.get("resumeId") !== updatedResume.id) {
          const newSearchParams = new URLSearchParams(searchParams);
          newSearchParams.set("resumeId", updatedResume.id);
          window.history.replaceState(
            null,
            "",
            `?${newSearchParams.toString()}`,
          );
        }
      } catch (error) {
        // error block

        setIsError(true);
        console.error(error);
        const { dismiss } = toast({
          variant: "destructive",
          description: (
            <div className="space-y-3">
              <p>Could not save changes.</p>
              <Button
                variant="secondary"
                onClick={() => {
                  dismiss();
                  save();
                }}
              >
                Retry
              </Button>
            </div>
          ),
        });
      } finally {
        setIsSaving(false);
      }
    }

    console.log(
      "debouncedResumeData",
      // JSON.stringify(debouncedResumeData),
      JSON.stringify(debouncedResumeData, fileReplacer),
    );
    // console.log("lastSavedData", JSON.stringify(lastSavedData));
    console.log("lastSavedData", JSON.stringify(lastSavedData, fileReplacer));

    const hasUnsavedChanges =
      // JSON.stringify(debouncedResumeData) !==
      // JSON.stringify(lastSavedData);
      JSON.stringify(debouncedResumeData, fileReplacer) !==
      JSON.stringify(lastSavedData, fileReplacer);

    if (hasUnsavedChanges && debouncedResumeData && !isSaving && !isError) {
      save();
    }
  }, [
    debouncedResumeData,
    isSaving,
    lastSavedData,
    isError,
    resumeId,
    searchParams,
    toast,
  ]);

  return {
    isSaving,
    hasUnsavedChanges:
      JSON.stringify(resumeData) !== JSON.stringify(lastSavedData),
  };
}
