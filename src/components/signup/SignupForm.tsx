
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form } from "@/components/ui/form";
import { accountFormSchema, AccountFormValues } from "./schemas";
import { useState, useEffect } from "react";
import TermsNotice from "./TermsNotice";
import EmailField from "./account-form/EmailField";
import PasswordField from "./account-form/PasswordField";
import TermsCheckbox from "./account-form/TermsCheckbox";
import SubmitButton from "./account-form/SubmitButton";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { AuthService } from "@/services/auth-service";
import { useTranslation } from "react-i18next";

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

  const { t, i18n } = useTranslation();
    const isHebrew = i18n.language === "he";
    const direction = isHebrew ? "rtl" : "ltr";
  
  const [emailError, setEmailError] = useState<string | null>(null);
  const [isCheckingEmail, setIsCheckingEmail] = useState(false);

  // Watch email field for immediate validation
  const watchedEmail = form.watch("email");

  // Debounced email validation
  useEffect(() => {
    if (!watchedEmail || !watchedEmail.includes("@")) {
      setEmailError(null);
      return;
    }

    const timeoutId = setTimeout(async () => {
      setIsCheckingEmail(true);
      try {
        const emailExists = await AuthService.checkEmailExists(watchedEmail);
        if (emailExists) {
          setEmailError('This email is already registered. Please use a different email address or try signing in.');
          form.setError("email", {
            type: "manual",
            message: "Email already exists"
          });
        } else {
          setEmailError(null);
          form.clearErrors("email");
        }
      } catch (error) {
        console.error('Error checking email:', error);
      } finally {
        setIsCheckingEmail(false);
      }
    }, 1000); // 1 second debounce

    return () => clearTimeout(timeoutId);
  }, [watchedEmail, form]);

  const handleSubmit = async (data: AccountFormValues) => {
    // Reset any previous email error
    setEmailError(null);
    setIsCheckingEmail(true);
    
    try {
      // Final check if email already exists
      const emailExists = await AuthService.checkEmailExists(data.email);
      
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
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-0">
        {emailError && (
          <Alert variant="destructive" className="py-1">
            <AlertDescription>{emailError}</AlertDescription>
          </Alert>
        )}
        
        <EmailField 
          control={form.control} 
          isLoading={isLoading || isCheckingEmail} 
          isCheckingEmail={isCheckingEmail}
        />
        
        <PasswordField 
          control={form.control} 
          isLoading={isLoading} 
          name="password"
          label={t("password", "Password")}
          placeholder="••••••••"
          showPasswordRequirements={true}
        />
        
        <PasswordField 
          control={form.control} 
          isLoading={isLoading}
          name="confirmPassword"
          label={t("confirmPassword", "Confirm Password")}
          placeholder="••••••••"
        />
        
        <div className="pt-0">
          <TermsCheckbox control={form.control} isLoading={isLoading} />
        </div>
        
        <SubmitButton 
          isLoading={isLoading || isCheckingEmail} 
          isValid={form.formState.isValid && !emailError}
          loadingText={isCheckingEmail ? "Checking email..." : "Creating account..."}
        />
        
        <TermsNotice />
      </form>
    </Form>
  );
};

export default SignupForm;
