
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { birthdateFormSchema, BirthdateFormValues } from "./schemas";
import { Form } from "@/components/ui/form";
import BirthdateField from "./personal-info/BirthdateField";
import FormButtons from "./personal-info/FormButtons";

interface SignupBirthdateProps {
  defaultValues?: Partial<BirthdateFormValues>;
  isLoading: boolean;
  onSubmit: (data: BirthdateFormValues) => void;
  onBack: () => void;
}

const SignupBirthdate = ({
  defaultValues = {
    birthdate: undefined as unknown as Date,
  },
  isLoading,
  onSubmit,
  onBack,
}: SignupBirthdateProps) => {
  
  const form = useForm<BirthdateFormValues>({
    resolver: zodResolver(birthdateFormSchema),
    defaultValues,
    mode: "onChange"
  });

  return (
    <div className="space-y-4">
      <div className="text-center mb-6">
        <h2 className="text-lg font-semibold text-[#240046] dark:text-white mb-2">
          When is your birthday?
        </h2>
        <p className="text-sm text-[#3B185F] dark:text-custom-lighter">
          Your age will be calculated from this date
        </p>
      </div>
      
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <BirthdateField control={form.control} isLoading={isLoading} />
          <FormButtons isLoading={isLoading} onBack={onBack} />
        </form>
      </Form>
    </div>
  );
};

export default SignupBirthdate;
