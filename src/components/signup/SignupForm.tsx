
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form } from "@/components/ui/form";
import { accountFormSchema, AccountFormValues } from "./schemas";
import { useState } from "react";
import TermsNotice from "./TermsNotice";
import EmailField from "./account-form/EmailField";
import PasswordField from "./account-form/PasswordField";
import TermsCheckbox from "./account-form/TermsCheckbox";
import SubmitButton from "./account-form/SubmitButton";

interface SignupFormProps {
  defaultValues?: Partial<AccountFormValues>;
  isLoading: boolean;
  onSubmit: (data: AccountFormValues) => void;
}

const SignupForm = ({
  defaultValues = {
    email: "",
    password: "",
    confirmPassword: "",
    agreeToTerms: false,
  },
  isLoading,
  onSubmit,
}: SignupFormProps) => {
  const form = useForm<AccountFormValues>({
    resolver: zodResolver(accountFormSchema),
    defaultValues,
    mode: "onChange"
  });

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <EmailField control={form.control} isLoading={isLoading} />
        
        <PasswordField 
          control={form.control} 
          isLoading={isLoading} 
          name="password"
          label="Password"
          placeholder="••••••••"
          showPasswordRequirements={true}
        />
        
        <PasswordField 
          control={form.control} 
          isLoading={isLoading}
          name="confirmPassword"
          label="Confirm Password"
          placeholder="••••••••"
        />
        
        <div className="pt-2">
          <TermsCheckbox control={form.control} isLoading={isLoading} />
        </div>
        
        <SubmitButton isLoading={isLoading} isValid={form.formState.isValid} />
        
        <TermsNotice />
      </form>
    </Form>
  );
};

export default SignupForm;
