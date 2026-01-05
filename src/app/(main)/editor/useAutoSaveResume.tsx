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

  //   debounce store data after 1.5 sec
  // “I don’t care about fast typing.
  // Give me data only after 1.5s of silence.”
  const debouncedResumeData = useDebounce(resumeData, 1500);

  //New resume → ID might not exist yet
  // Backend may generate ID on first save
  const [resumeId, setResumeId] = useState(resumeData.id);

  //   this creates a clone of last saved data so that it debounce only save new changes after delay
  // 🧠 Mental model:

  // “This is what the database currently has.”

  // Why clone?

  // To avoid reference mutation

  // To compare safely later
  const [lastSavedData, setLastSavedData] = useState(
    structuredClone(resumeData),
  );

  const [isSaving, setIsSaving] = useState(false);

  const [isError, setIsError] = useState(false);

  // ------------------ the above are 5 usestate core of this------>

  // “If user edits again, give autosave another chance.”
  useEffect(() => {
    setIsError(false);
  }, [debouncedResumeData]);

  // 5️⃣ Main autosave engine (CORE EFFECT)

  // This is the heart of the hook.

  // Step A — Compare data
  // const hasUnsavedChanges =
  //   JSON.stringify(debouncedResumeData, fileReplacer) !==
  //   JSON.stringify(lastSavedData, fileReplacer);

  // Meaning:

  // “Is the paused data different from what we saved last time?”

  // If ❌ same → do nothing
  // If ✅ different → save

  // ⚠️ fileReplacer exists because:

  // Files can’t be stringified normally

  // You only want to upload file if changed
  useEffect(() => {
    async function save() {
      try {
        setIsSaving(true);
        setIsError(false);
        //new set of data after debounce return make a clone of it
        // Snapshot for saving.
        const newData = structuredClone(debouncedResumeData);

        // update the data
        // This:

       // Saves to DB

        // Returns updated resume (with ID)
        const updatedResume = await saveResume({
          //  spread existing new data
          ...newData,
          // ...(JSON.stringify(lastSavedData.photo) ===
          //   JSON.stringify(newData.photo) && {

          // if last time photo is same as this time ones then dont
          // update -->memory optimisation

          // “If photo didn’t change, don’t send it again.”

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
// Used by:

// UI (“Saving…” indicator)

// useUnloadWarning(hasUnsavedChanges)
  return {
    isSaving,
    hasUnsavedChanges:
      JSON.stringify(resumeData) !== JSON.stringify(lastSavedData),
  };
}
