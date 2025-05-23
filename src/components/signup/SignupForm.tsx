
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
import { supabase } from "@/integrations/supabase/client";

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
  const [isCheckingEmail, setIsCheckingEmail] = useState(false);

  const checkEmailExists = async (email: string): Promise<boolean> => {
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('id')
        .eq('email', email)
        .single();
      
      if (error && error.code !== 'PGRST116') { // PGRST116 is "not found" error
        console.error('Error checking email:', error);
        return false;
      }
      
      return !!data; // Returns true if email exists
    } catch (error) {
      console.error('Error checking email:', error);
      return false;
    }
  };

  const handleSubmit = async (data: AccountFormValues) => {
    // Reset any previous email error
    setEmailError(null);
    setIsCheckingEmail(true);
    
    try {
      // Check if email already exists
      const emailExists = await checkEmailExists(data.email);
      
      if (emailExists) {
        setEmailError('This email is already registered. Please use a different email address or try signing in.');
        setIsCheckingEmail(false);
        return;
      }
      
      setIsCheckingEmail(false);
      onSubmit(data);
    } catch (err) {
      console.error('Error during form submission:', err);
      setEmailError('An unexpected error occurred. Please try again.');
      setIsCheckingEmail(false);
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
        
        <EmailField control={form.control} isLoading={isLoading || isCheckingEmail} />
        
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
        
        <SubmitButton 
          isLoading={isLoading || isCheckingEmail} 
          isValid={form.formState.isValid}
          loadingText={isCheckingEmail ? "Checking email..." : "Creating account..."}
        />
        
        <TermsNotice />
      </form>
    </Form>
  );
};

export default SignupForm;
