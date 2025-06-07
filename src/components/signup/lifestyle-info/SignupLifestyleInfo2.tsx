
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import HabitsSection from "./HabitsSection";
import PreferencesSection from "./PreferencesSection";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { useTranslation } from "react-i18next";

// Schema for Second Lifestyle Information (Habits & Preferences)
const lifestyle2Schema = z.object({
  smokingStatus: z.string().optional(),
  drinkingStatus: z.string().optional(),
  lookingFor: z.string().optional(),
  lookingForGender: z.string().optional(),
  hobbies: z.array(z.string()).default([]),
  pets: z.string().optional(),
  exercise: z.string().optional(),
  diet: z.string().optional(),
});

export type Lifestyle2FormValues = z.infer<typeof lifestyle2Schema>;

interface SignupLifestyleInfo2Props {
  defaultValues?: Partial<Lifestyle2FormValues> & { hobbies?: string[] };
  isLoading: boolean;
  onSubmit: (data: Lifestyle2FormValues & { hobbies: string[] }) => void;
  onBack: () => void;
}

const SignupLifestyleInfo2 = ({
  defaultValues = {
    smokingStatus: "",
    drinkingStatus: "",
    lookingFor: "",
    lookingForGender: "",
    pets: "",
    exercise: "",
    diet: "",
    hobbies: [],
  },
  isLoading,
  onSubmit,
  onBack,
}: SignupLifestyleInfo2Props) => {
  const { t } = useTranslation();
  
  const form = useForm<Lifestyle2FormValues>({
    resolver: zodResolver(lifestyle2Schema),
    defaultValues,
    mode: "onChange"
  });

  const handleSubmit = (data: Lifestyle2FormValues) => {
    // Include hobbies as empty array to maintain API contract
    onSubmit({ ...data, hobbies: data.hobbies || [] });
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4 sm:space-y-5">
        {/* Habits Section */}
        <HabitsSection form={form} isLoading={isLoading} />
        
        {/* Preferences Section */}
        <PreferencesSection form={form} isLoading={isLoading} />

        <div className="flex gap-2 pt-2">
          <Button
            type="button"
            onClick={onBack}
            variant="outline"
            className="flex-1 dark:bg-[#10002B] dark:hover:bg-[#240046] dark:text-white border-[#E0AAFF]/30 group"
            title="Go back to previous step"
          >
            <ArrowLeft className="mr-2 h-4 w-4 transition-transform group-hover:-translate-x-1" />
            <span>{t("back")}</span>
          </Button>
          <Button
            type="submit"
            className="flex-1 bg-[#9D4EDD] hover:bg-[#7B2CBF] text-white border-0 h-11 sm:h-12 
                     signin-button-hover transition-all duration-300 group"
            disabled={isLoading}
            title="Continue to next step"
          >
            <span>{t("next")}</span>
            <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default SignupLifestyleInfo2;
