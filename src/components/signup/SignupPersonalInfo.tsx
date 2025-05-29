
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { personalInfoFormSchema, PersonalInfoFormValues } from "./schemas";
import { Form } from "@/components/ui/form";
import NicknameField from "./personal-info/NicknameField";
import UsernameField from "./personal-info/UsernameField";
import GenderField from "./personal-info/GenderField";
import FormButtons from "./personal-info/FormButtons";

interface SignupPersonalInfoProps {
  defaultValues?: Partial<PersonalInfoFormValues>;
  isLoading: boolean;
  onSubmit: (data: PersonalInfoFormValues) => void;
  onBack: () => void;
}

const SignupPersonalInfo = ({
  defaultValues = {
    nickname: "",
    username: "",
    gender: "",
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
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <NicknameField control={form.control} isLoading={isLoading} />
        <UsernameField control={form.control} isLoading={isLoading} />
        <GenderField control={form.control} isLoading={isLoading} />
        <FormButtons isLoading={isLoading} onBack={onBack} />
      </form>
    </Form>
  );
};

export default SignupPersonalInfo;
