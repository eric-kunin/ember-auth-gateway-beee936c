
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import PhysicalSection from "./PhysicalSection";
import ReligiousSection from "./ReligiousSection";
import HabitsSection from "./HabitsSection";
import PreferencesSection from "./PreferencesSection";
import { ArrowLeft, ArrowRight } from "lucide-react";

// Schema for Lifestyle Information
const lifestyleSchema = z.object({
  height: z.number().min(100, "Height must be at least 100 cm").max(250, "Height must be at most 250 cm").optional().or(z.literal('')),
  eyeColor: z.string().optional(),
  religion: z.string().optional(),
  religiousLevel: z.string().optional(),
  smokingStatus: z.string().optional(),
  drinkingStatus: z.string().optional(),
  lookingFor: z.string().optional(),
  lookingForGender: z.string().optional(),
  hobbies: z.array(z.string()).default([]),
  pets: z.string().optional(),
  exercise: z.string().optional(),
  diet: z.string().optional(),
});

export type LifestyleFormValues = z.infer<typeof lifestyleSchema>;

interface SignupLifestyleInfoProps {
  defaultValues?: Partial<LifestyleFormValues> & { hobbies?: string[] };
  isLoading: boolean;
  onSubmit: (data: LifestyleFormValues & { hobbies: string[] }) => void;
  onBack: () => void;
}

const SignupLifestyleInfo = ({
  defaultValues = {
    height: undefined,
    eyeColor: "",
    religion: "",
    religiousLevel: "",
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
}: SignupLifestyleInfoProps) => {
  const form = useForm<LifestyleFormValues>({
    resolver: zodResolver(lifestyleSchema),
    defaultValues,
    mode: "onChange"
  });

  const handleSubmit = (data: LifestyleFormValues) => {
    // Even though we removed the UI for hobbies, we need to keep the empty array
    // to maintain the API contract
    onSubmit({ ...data, hobbies: data.hobbies || [] });
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4 sm:space-y-5">
        {/* Physical Attributes Section */}
        <PhysicalSection form={form} isLoading={isLoading} />
        
        {/* Religious Information Section */}
        <ReligiousSection form={form} isLoading={isLoading} />
        
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
            <span>Back</span>
          </Button>
          <Button
            type="submit"
            className="flex-1 bg-[#9D4EDD] hover:bg-[#7B2CBF] text-white border-0 h-11 sm:h-12 
                     signin-button-hover transition-all duration-300 group"
            disabled={isLoading}
            title="Continue to next step"
          >
            <span>Next</span>
            <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default SignupLifestyleInfo;
