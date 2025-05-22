
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { personalInfoFormSchema, PersonalInfoFormValues } from "./schemas";
import { Form } from "@/components/ui/form";
import NameField from "./personal-info/NameField";
import GenderField from "./personal-info/GenderField";
import BirthdateField from "./personal-info/BirthdateField";
import PhoneField from "./personal-info/PhoneField";
import FormButtons from "./personal-info/FormButtons";

interface SignupPersonalInfoProps {
  defaultValues?: Partial<PersonalInfoFormValues>;
  isLoading: boolean;
  onSubmit: (data: PersonalInfoFormValues) => void;
  onBack: () => void;
}

const SignupPersonalInfo = ({
  defaultValues = {
    name: "",
    gender: "",
    birthdate: undefined as unknown as Date,
    phone: ""
  },
  isLoading,
  onSubmit,
  onBack,
}: SignupPersonalInfoProps) => {
  
  const form = useForm<PersonalInfoFormValues>({
    resolver: zodResolver(personalInfoFormSchema),
    defaultValues,
    mode: "onChange"
  });

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 sm:space-y-5">
        <NameField control={form.control} isLoading={isLoading} />
        <GenderField control={form.control} isLoading={isLoading} />
        <BirthdateField control={form.control} isLoading={isLoading} />
        <PhoneField control={form.control} isLoading={isLoading} />
        <FormButtons isLoading={isLoading} onBack={onBack} />
      </form>
    </Form>
  );
};

export default SignupPersonalInfo;
