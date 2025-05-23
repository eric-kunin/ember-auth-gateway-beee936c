
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
import { Alert, AlertDescription } from "@/components/ui/alert";

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
  
  const [emailError, setEmailError] = useState<string | null>(null);

  const handleSubmit = async (data: AccountFormValues) => {
    // Reset any previous email error
    setEmailError(null);
    
    try {
      // Check if email already exists using Supabase
      const { data: existingUsers, error } = await supabase
        .from('profiles')
        .select('id')
        .eq('email', data.email)
        .limit(1);
      
      if (error) {
        console.error('Error checking email:', error);
        setEmailError('Error verifying email availability. Please try again.');
        return;
      }
      
      // If we found a user with this email, show an error
      if (existingUsers && existingUsers.length > 0) {
        setEmailError('This email is already registered. Please use a different email or try logging in.');
        return;
      }
      
      // If email doesn't exist, proceed with the signup
      onSubmit(data);
    } catch (err) {
      console.error('Error during email validation:', err);
      setEmailError('An unexpected error occurred. Please try again.');
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
        {emailError && (
          <Alert variant="destructive" className="py-2">
            <AlertDescription>{emailError}</AlertDescription>
          </Alert>
        )}
        
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
