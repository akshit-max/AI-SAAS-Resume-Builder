import GeneralInfoForm from "./forms/GeneralInfoform";
import PersonalInfoForm from "./forms/PersonalInfoform";
import { EditorFormProps } from "@/lib/types";
import WorkInfoform from "./forms/WorkInfoform";
import EducationForm from "./forms/EducationForm";
import SkillForm from "./forms/SkillForm";
import SummaryForm from "./forms/SummaryForm";
export const steps: {
  title: string;
  component: React.ComponentType<EditorFormProps>;
  key: string;
}[] = [
  { title: "General info", component: GeneralInfoForm, key: "general-info" },
  { title: "Personal info", component: PersonalInfoForm, key: "personal-info" },
  { title: "WorkExperience", component: WorkInfoform, key: "work-experience" },
  { title: "Education", component: EducationForm, key: "education" },
  { title: "Skills", component: SkillForm, key: "skills" },
  { title: "Summary", component: SummaryForm, key: "summary" },
];
