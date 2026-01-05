"use client";

import { EditorFormProps } from "@/lib/types";
import { useForm, UseFormReturn, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";

import { educationSchema, EducationValues } from "@/lib/validation";
import { GripHorizontal, Plus } from "lucide-react";

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
import { Button } from "@/components/ui/button";

export default function EducationForm({
  resumeData,
  setResumeData,
}: EditorFormProps) {
  const form = useForm<EducationValues>({
    resolver: zodResolver(educationSchema),
    defaultValues: {
      educations: resumeData.educations || [],
    },
  });

  useEffect(() => {
    const { unsubscribe } = form.watch(async (values) => {
      const isValid = await form.trigger();
      if (!isValid) return;
      setResumeData({
        ...resumeData,
        educations: values.educations?.filter((exp) => exp !== undefined) || [],
      });
    });
    return unsubscribe;
  }, [form, resumeData, setResumeData]);

  const { fields, append, remove, move } = useFieldArray({
    control: form.control,
    name: "educations",
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

    const oldIndex = fields.findIndex((f) => f.id === active.id);
    const newIndex = fields.findIndex((f) => f.id === over.id);

    move(oldIndex, newIndex);
  }

  return (
    <div className="mx-auto max-w-xl space-y-6">
      <div className="space-y-1.5 text-center">
        <h2 className="text-2xl font-semibold">Education</h2>
        <p className="text-muted-foreground text-sm">
          Add as many educations as you like.
        </p>
      </div>

      <Form {...form}>
        <form className="space-y-6">
          <DndContext
            sensors={sensors}
            collisionDetection={closestCenter}
            onDragEnd={handleDragEnd}
            modifiers={[restrictToVerticalAxis]}
          >
            <SortableContext
              items={fields.map((f) => f.id)}
              strategy={verticalListSortingStrategy}
            >
              {fields.map((field, index) => (
                <EducationItem
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
                  degree: "",
                  school: "",
                  startDate: "",
                  endDate: "",
                })
              }
            >
              <span className="flex items-center gap-2">
                <Plus /> Add Education
              </span>
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}

/* ---------------- EDUCATION ITEM ---------------- */

interface EducationItemProps {
  id: string;
  form: UseFormReturn<EducationValues>;
  index: number;
  remove: (index: number) => void;
}

function EducationItem({ id, form, index, remove }: EducationItemProps) {
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
      className={`bg-background space-y-3 rounded-md border p-3 ${
        isDragging ? "relative z-50 cursor-grab shadow-xl" : ""
      }`}
      style={{
        transform: CSS.Transform.toString(transform),
        transition,
      }}
    >
      <div className="flex justify-between gap-2">
        <span className="font-semibold">Education {index + 1}</span>
        <GripHorizontal
          className="text-muted-foreground size-5 cursor-grab"
          {...attributes}
          {...listeners}
        />
      </div>

      <FormField
        control={form.control}
        name={`educations.${index}.degree`}
        render={({ field }) => (
          <FormItem>
            <FormLabel>Degree</FormLabel>
            <FormControl>
              <Input {...field} autoFocus />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name={`educations.${index}.school`}
        render={({ field }) => (
          <FormItem>
            <FormLabel>School</FormLabel>
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
          name={`educations.${index}.startDate`}
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
          name={`educations.${index}.endDate`}
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
        Leave <span className="font-semibold">end date</span> empty if you are
        currently working here.
      </FormDescription>

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


// import { EditorFormProps } from "@/lib/types";
// import { useForm } from "react-hook-form";
// import { zodResolver } from "@hookform/resolvers/zod";
// import { useEffect } from "react";
// import { useFieldArray } from "react-hook-form";

// import { educationSchema, EducationValues } from "@/lib/validation";
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
// import { Textarea } from "@/components/ui/textarea";
// import { Button } from "@/components/ui/button";

// export default function EducationForm({
//   resumeData,
//   setResumeData,
// }: EditorFormProps) {
//   const form = useForm<EducationValues>({
//     resolver: zodResolver(educationSchema),
//     defaultValues: {
//       educations: resumeData.educations || [],
//     },
//   });

//   useEffect(() => {
//     const { unsubscribe } = form.watch(async (values) => {
//       const isValid = await form.trigger();
//       if (!isValid) return;
//       setResumeData({
//         ...resumeData,
//         educations: values.educations?.filter((exp) => exp !== undefined) || [],
//       });
//     });
//     return unsubscribe;
//   }, [form, resumeData, setResumeData]);

//   // It lets you manage a dynamic array of form fields (workExperiences) — add, remove, and reorder items — while keeping validation and form state in sync.
//   const { fields, append, remove, move } = useFieldArray({
//     control: form.control,
//     name: "educations",
//   });

//   return (
//     <div className="mx-auto max-w-xl space-y-6">
//       <div className="space-y-1.5 text-center">
//         <h2 className="text-2xl font-semibold">Education</h2>
//         <p className="text-muted-foreground text-sm">
//           Add as many educations as you like.
//         </p>
//       </div>


//       {/* render  EducationItems */}


//       <Form {...form}>
//         <form className="space-y-6">
//           {fields.map((field, index) => (
//             <EducationItem
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
//                   degree: "",
//                   school: "",
//                   startDate: "",
//                   endDate: "",
//                 })
//               }
              
//             >
//              <span className="flex gap-2 justify-center items-center"> <Plus/> Add Education</span>
//             </Button>
//           </div>
//         </form>
//       </Form>
//     </div>
//   );
// }

// interface EducationItemProps {
//   form: UseFormReturn<EducationValues>;
//   index: number;
//   remove: (index: number) => void;
// }

// function EducationItem({ form, index, remove }: EducationItemProps) {
//   return (
//     <div className="bg-background space-y-3 rounded-md border p-3">
//       <div className="flex justify-between gap-2">
//         <span className="font-semibold">Education {index + 1}</span>
//         <GripHorizontal className="text-muted-foreground size-5 cursor-grab" />
//       </div>
//       <FormField
//         control={form.control}
//         name={`educations.${index}.degree`}
//         render={({ field }) => (
//           <FormItem>
//             <FormLabel>Degree</FormLabel>
//             <FormControl>
//               <Input {...field} autoFocus />
//             </FormControl>
//             <FormMessage />
//           </FormItem>
//         )}
//       />
//       <FormField
//         control={form.control}
//         name={`educations.${index}.school`}
//         render={({ field }) => (
//           <FormItem>
//             <FormLabel>School</FormLabel>
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
//           name={`educations.${index}.startDate`}
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
//           name={`educations.${index}.endDate`}
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

//       <Button
//         variant="destructive"
//         type="button"
//         onClick={() => {
//           remove(index);
//         }}
//       >
//         Remove
//       </Button>
//     </div>
//   );
// }
