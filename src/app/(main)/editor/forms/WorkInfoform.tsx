"use client";

import { Button } from "@/components/ui/button";
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
import { Textarea } from "@/components/ui/textarea";
import { EditorFormProps } from "@/lib/types";
import { cn } from "@/lib/utils";
import {
  workExperienceSchema,
  WorkExperienceValues,
} from "@/lib/validation";
import {
  closestCenter,
  DndContext,
  DragEndEvent,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import { restrictToVerticalAxis } from "@dnd-kit/modifiers";
import {
  SortableContext,
  sortableKeyboardCoordinates,
  useSortable,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { zodResolver } from "@hookform/resolvers/zod";
import { GripHorizontal } from "lucide-react";
import { useEffect } from "react";
import { useFieldArray, useForm, UseFormReturn } from "react-hook-form";
import GenerateWorkExperienceButton from "./GenerateWorkExperienceButton";

export default function WorkExperienceForm({
  resumeData,
  setResumeData,
}: EditorFormProps) {
  const form = useForm<WorkExperienceValues>({
    resolver: zodResolver(workExperienceSchema),
    defaultValues: {
      workExperiences: resumeData.workExperiences || [],
    },
  });

 
  useEffect(() => {
    const { unsubscribe } = form.watch(async (values) => {
      const isValid = await form.trigger();
      if (!isValid) return;
      setResumeData({
        ...resumeData,
        workExperiences:
          values.workExperiences?.filter((exp) => exp !== undefined) || [],
      });
    });
    return unsubscribe;
  }, [form, resumeData, setResumeData]);

  

  const { fields, append, remove, move } = useFieldArray({
    control: form.control,
    name: "workExperiences",
  });

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    }),
  );

  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event;

    if (!over || active.id === over.id) return;

    const oldIndex = fields.findIndex(
      (field) => field.id === active.id,
    );
    const newIndex = fields.findIndex(
      (field) => field.id === over.id,
    );

    move(oldIndex, newIndex);
  }

  return (
    <div className="mx-auto max-w-xl space-y-6">
      <div className="space-y-1.5 text-center">
        <h2 className="text-2xl font-semibold">Work experience</h2>
        <p className="text-sm text-muted-foreground">
          Add as many work experiences as you like.
        </p>
      </div>

      <Form {...form}>
        <form className="space-y-3">
          <DndContext
            sensors={sensors}
            collisionDetection={closestCenter}
            onDragEnd={handleDragEnd}
            modifiers={[restrictToVerticalAxis]}
          >
            <SortableContext
              items={fields.map((field) => field.id)}
              strategy={verticalListSortingStrategy}
            >
              {fields.map((field, index) => (
                <WorkExperienceItem
                  key={field.id}
                  id={field.id}
                  index={index}
                  form={form}
                  remove={remove}
                />
              ))}
            </SortableContext>
          </DndContext>

          <div className="flex justify-center">
            <Button
              type="button"
              onClick={() =>
                append({
                  position: "",
                  company: "",
                  startDate: "",
                  endDate: "",
                  description: "",
                })
              }
            >
              Add work experience
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}

/* ---------------- WORK EXPERIENCE ITEM ---------------- */

interface WorkExperienceItemProps {
  id: string;
  form: UseFormReturn<WorkExperienceValues>;
  index: number;
  remove: (index: number) => void;
}

function WorkExperienceItem({
  id,
  form,
  index,
  remove,
}: WorkExperienceItemProps) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id });

  return (
    <div
      ref={setNodeRef}
      className={cn(
        "space-y-3 rounded-md border bg-background p-3",
        isDragging && "relative z-50 cursor-grab shadow-xl",
      )}
      style={{
        transform: CSS.Transform.toString(transform),
        transition,
      }}
    >
      <div className="flex justify-between gap-2">
        <span className="font-semibold">
          Work experience {index + 1}
        </span>
        <GripHorizontal
          className="size-5 cursor-grab text-muted-foreground focus:outline-none"
          {...attributes}
          {...listeners}
        />
      </div>

      <div className="flex justify-center">
        <GenerateWorkExperienceButton
          onWorkExperienceGenerated={(exp) =>
            form.setValue(`workExperiences.${index}`, exp)
          }
        />
      </div>

      <FormField
        control={form.control}
        name={`workExperiences.${index}.position`}
        render={({ field }) => (
          <FormItem>
            <FormLabel>Job title</FormLabel>
            <FormControl>
              <Input {...field} autoFocus />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name={`workExperiences.${index}.company`}
        render={({ field }) => (
          <FormItem>
            <FormLabel>Company</FormLabel>
            <FormControl>
              <Input {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <div className="grid grid-cols-2 gap-3">
        <FormField
          control={form.control}
          name={`workExperiences.${index}.startDate`}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Start date</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  type="date"
                  value={field.value?.slice(0, 10)}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name={`workExperiences.${index}.endDate`}
          render={({ field }) => (
            <FormItem>
              <FormLabel>End date</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  type="date"
                  value={field.value?.slice(0, 10)}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>

      <FormDescription>
        Leave <span className="font-semibold">end date</span> empty
        if you are currently working here.
      </FormDescription>

      <FormField
        control={form.control}
        name={`workExperiences.${index}.description`}
        render={({ field }) => (
          <FormItem>
            <FormLabel>Description</FormLabel>
            <FormControl>
              <Textarea {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <Button
        variant="destructive"
        type="button"
        onClick={() => remove(index)}
      >
        Remove
      </Button>
    </div>
  );
}


// import { useForm } from "react-hook-form";
// import { zodResolver } from "@hookform/resolvers/zod";
// import { useEffect } from "react";
// import { useFieldArray } from "react-hook-form";

// import { workExperienceSchema, WorkExperienceValues } from "@/lib/validation";
// import { GripHorizontal, Plus } from "lucide-react";
// import type { UseFormReturn } from "react-hook-form";

// import {
//   Form,
//   FormControl,
//   FormDescription,
//   FormField,
//   FormItem,
//   FormLabel,
//   FormMessage,
// } from "@/components/ui/form";

// import { Input } from "@/components/ui/input";
// import { EditorFormProps } from "@/lib/types";
// import { Textarea } from "@/components/ui/textarea";
// import { Button } from "@/components/ui/button";

// export default function WorkInfoform({
//   resumeData,
//   setResumeData,
// }: EditorFormProps) {
//   const form = useForm<WorkExperienceValues>({
//     resolver: zodResolver(workExperienceSchema),
//     defaultValues: {
//       workExperiences: resumeData.workExperiences || [],
//     },
//   });

//   useEffect(() => {
//     const { unsubscribe } = form.watch(async (values) => {
//       const isValid = await form.trigger();
//       if (!isValid) return;
//       setResumeData({
//         ...resumeData,
//         workExperiences:
//           values.workExperiences?.filter((exp) => exp !== undefined) || [],
//       });
//     });
//     return unsubscribe;
//   }, [form, resumeData, setResumeData]);

//   // It lets you manage a dynamic array of form fields (workExperiences) — add, remove, and reorder items — while keeping validation and form state in sync.
//   const { fields, append, remove, move } = useFieldArray({
//     control: form.control,
//     name: "workExperiences",
//   });

//   return (
//     <div className="mx-auto max-w-xl space-y-6">
//       <div className="space-y-1.5 text-center">
//         <h2 className="text-2xl font-semibold">Work experience</h2>
//         <p className="text-muted-foreground text-sm">
//            Add as many Work Experience as you like.
//         </p>
//       </div>

//       <Form {...form}>
//         <form className="space-y-6">
//           {fields.map((field, index) => (
//             <WorkExperienceItem
//               key={field.id}
//               index={index}
//               form={form}
//               remove={remove}
//             />
//           ))}

//           {/* ADD NEW EXPERIENCE */}
//           <div className="flex justify-center">
//             <Button
//               type="button"
//               onClick={() =>
//                 append({
//                   position: "",
//                   company: "",
//                   startDate: "",
//                   endDate: "",
//                   description: "",
//                 })
//               }
            
//             >
//               <span className="flex gap-2 justify-center items-center"> <Plus/> Add  Work Experience</span>
//             </Button>
//           </div>
//         </form>
//       </Form>
//     </div>
//   );
// }

// interface WorkExperienceItemProps {
//   form: UseFormReturn<WorkExperienceValues>;
//   index: number;
//   remove: (index: number) => void;
// }

// function WorkExperienceItem({ form, index, remove }: WorkExperienceItemProps) {
//   return (
//     <div className="bg-background space-y-3 rounded-md border p-3">
//       <div className="flex justify-between gap-2">
//         <span className="font-semibold">Work experience {index + 1}</span>
//         <GripHorizontal className="text-muted-foreground size-5 cursor-grab" />
//       </div>
//       <FormField
//         control={form.control}
//         name={`workExperiences.${index}.position`}
//         render={({ field }) => (
//           <FormItem>
//             <FormLabel>Job title</FormLabel>
//             <FormControl>
//               <Input {...field} autoFocus />
//             </FormControl>
//             <FormMessage />
//           </FormItem>
//         )}
//       />
//       <FormField
//         control={form.control}
//         name={`workExperiences.${index}.company`}
//         render={({ field }) => (
//           <FormItem>
//             <FormLabel>Company</FormLabel>
//             <FormControl>
//               <Input {...field} />
//             </FormControl>
//             <FormMessage />
//           </FormItem>
//         )}
//       />
//       <div className="grid grid-cols-2 gap-3">
//         <FormField
//           control={form.control}
//           name={`workExperiences.${index}.startDate`}
//           render={({ field }) => (
//             <FormItem>
//               <FormLabel>Start date</FormLabel>
//               <FormControl>
//                 <Input
//                   {...field}
//                   type="date"
//                   value={field.value?.slice(0, 10)}
//                 />
//               </FormControl>
//               <FormMessage />
//             </FormItem>
//           )}
//         />
//         <FormField
//           control={form.control}
//           name={`workExperiences.${index}.endDate`}
//           render={({ field }) => (
//             <FormItem>
//               <FormLabel>End date</FormLabel>
//               <FormControl>
//                 <Input
//                   {...field}
//                   type="date"
//                   value={field.value?.slice(0, 10)}
//                 />
//               </FormControl>
//               <FormMessage />
//             </FormItem>
//           )}
//         />
//       </div>
//       <FormDescription>
//         Leave <span className="font-semibold">end date</span> empty if you are
//         currently working here.
//       </FormDescription>

//       <FormField
//         control={form.control}
//         name={`workExperiences.${index}.description`}
//         render={({ field }) => (
//           <FormItem>
//             <FormLabel>Description</FormLabel>
//             <FormControl>
//               <Textarea {...field} />
//             </FormControl>
//             <FormMessage />
//           </FormItem>
//         )}
//       />

//       <Button variant="destructive" type="button" onClick={()=>{remove(index)}} >Remove</Button>
//     </div>
//   );
// }
