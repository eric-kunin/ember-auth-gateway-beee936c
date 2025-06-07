
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import PhysicalSection from "./PhysicalSection";
import ReligiousSection from "./ReligiousSection";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { useTranslation } from "react-i18next";

// Schema for First Lifestyle Information (Physical & Religious)
const lifestyle1Schema = z.object({
  height: z.number().min(100, "Height must be at least 100 cm").max(250, "Height must be at most 250 cm").optional().or(z.literal('')),
  eyeColor: z.string().optional(),
  religion: z.string().optional(),
  religiousLevel: z.string().optional(),
});

export type Lifestyle1FormValues = z.infer<typeof lifestyle1Schema>;

interface SignupLifestyleInfo1Props {
  defaultValues?: Partial<Lifestyle1FormValues>;
  isLoading: boolean;
  onSubmit: (data: Lifestyle1FormValues) => void;
  onBack: () => void;
}

const SignupLifestyleInfo1 = ({
  defaultValues = {
    height: undefined,
    eyeColor: "",
    religion: "",
    religiousLevel: "",
  },
  isLoading,
  onSubmit,
  onBack,
}: SignupLifestyleInfo1Props) => {
  const { t, i18n } = useTranslation();
    const isHebrew = i18n.language === "he";
    const direction = isHebrew ? "rtl" : "ltr";
  
  const form = useForm<Lifestyle1FormValues>({
    resolver: zodResolver(lifestyle1Schema),
    defaultValues,
    mode: "onChange"
  });

  const handleSubmit = (data: Lifestyle1FormValues) => {
    onSubmit(data);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4 sm:space-y-5">
        {/* Physical Attributes Section */}
        <PhysicalSection form={form} isLoading={isLoading} />
        
        {/* Religious Information Section */}
        <ReligiousSection form={form} isLoading={isLoading} />

        <div className="flex gap-2 pt-2">
          <Button
            type="button"
            onClick={onBack}
            variant="outline"
            className="flex-1 dark:bg-[#10002B] dark:hover:bg-[#240046] dark:text-white border-[#E0AAFF]/30 group"
            title="Go back to previous step"
          >
            {isHebrew ? (
      <>
        <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
        <span>{t("back")}</span>
      </>
    ) : (
      <>
        <ArrowLeft className="mr-2 h-4 w-4 transition-transform group-hover:-translate-x-1" />
        <span>{t("back")}</span>
      </>
    )}
          </Button>
          <Button
            type="submit"
            className="flex-1 bg-[#9D4EDD] hover:bg-[#7B2CBF] text-white border-0 h-11 sm:h-12 
                     signin-button-hover transition-all duration-300 group"
            disabled={isLoading}
            title="Continue to next step"
          >
            {isHebrew ? (
      <>
        <span>{t("next")}</span>
        <ArrowLeft className="mr-2 h-4 w-4 transition-transform group-hover:-translate-x-1" />
      </>
    ) : (
      <>
        <span>{t("next")}</span>
        <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
      </>
    )}
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default SignupLifestyleInfo1;
