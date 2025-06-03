import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Eye, EyeOff, Lock } from "lucide-react";
import { Control } from "react-hook-form";
import { AccountFormValues } from "../schemas";
import { useState } from "react";
import ValidationFeedback from "../personal-info/ValidationFeedback";
import { useTranslation } from "react-i18next";

interface PasswordFieldProps {
    control: Control<AccountFormValues>;
    isLoading: boolean;
    name: "password" | "confirmPassword";
    label: string;
    placeholder: string;
    showPasswordRequirements?: boolean;
}

const PasswordField = ({
    control,
    isLoading,
    name,
    label,
    placeholder,
    showPasswordRequirements = false,
}: PasswordFieldProps) => {
    const { t, i18n } = useTranslation();
    const isHebrew = i18n.language === "he";
    const direction = isHebrew ? "rtl" : "ltr";
    const [showPassword, setShowPassword] = useState(false);

    const toggleShowPassword = () => {
        setShowPassword((prev) => !prev);
    };

    return (
        <FormField
            control={control}
            name={name}
            render={({ field, fieldState }) => {
                const passwordValue = field.value;
                const passwordState = fieldState;
                const passwordIsValid =
                    passwordValue && !passwordState.invalid && passwordState.isDirty;

                return (
                    <FormItem className="space-y-2">
                        <FormLabel className="text-[#240046] dark:text-white text-sm transition-colors duration-300">
                            {label}
                        </FormLabel>
                        <div className="relative">
                            {direction === "rtl" ? (
                                <>
                                    <FormControl>
                                        <Input
                                            placeholder={placeholder}
                                            type={showPassword ? "text" : "password"}
                                            className={`bg-[#f8f2ff]/70 dark:bg-[#240046]/80 border border-[#E0AAFF]/30 dark:border-0 
                                                text-[#240046] dark:text-white placeholder:text-[#9D4EDD]/60 dark:placeholder:text-white/60 
                                                pr-10 pl-10 h-11 sm:h-12 py-2 transition-colors duration-300 focus-visible:ring-[#9D4EDD]
                                                ${passwordState.invalid && passwordState.isDirty ? 'border-red-500 dark:border-red-500 ring-1 ring-red-500' : ''}
                                                ${passwordIsValid ? 'border-green-500 dark:border-green-500 ring-1 ring-green-500' : ''}`}
                                            disabled={isLoading}
                                            {...field}
                                        />
                                    </FormControl>
                                    <Lock className="absolute right-3 top-1/2 -translate-y-1/2 h-5 w-5 text-[#9D4EDD]/70 dark:text-custom-lighter/70 transition-colors duration-300" />
                                </>
                            ) : (
                                <>
                                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-[#9D4EDD]/70 dark:text-custom-lighter/70 transition-colors duration-300" />
                                    <FormControl>
                                        <Input
                                            placeholder={placeholder}
                                            type={showPassword ? "text" : "password"}
                                            className={`bg-[#f8f2ff]/70 dark:bg-[#240046]/80 border border-[#E0AAFF]/30 dark:border-0 
                                                text-[#240046] dark:text-white placeholder:text-[#9D4EDD]/60 dark:placeholder:text-white/60 
                                                pl-[42px] pr-10 h-11 sm:h-12 py-2 transition-colors duration-300 focus-visible:ring-[#9D4EDD]
                                                ${passwordState.invalid && passwordState.isDirty ? 'border-red-500 dark:border-red-500 ring-1 ring-red-500' : ''}
                                                ${passwordIsValid ? 'border-green-500 dark:border-green-500 ring-1 ring-green-500' : ''}`}
                                            disabled={isLoading}
                                            {...field}
                                        />
                                    </FormControl>
                                </>
                            )}
                            <button
                                type="button"
                                className={`absolute ${direction === "rtl" ? "left-3" : "right-3"} top-1/2 -translate-y-1/2 
                                    text-[#9D4EDD]/70 dark:text-custom-lighter/70 hover:text-[#9D4EDD] 
                                    dark:hover:text-white transition-colors`}
                                onClick={toggleShowPassword}
                                tabIndex={-1}
                            >
                                {showPassword ? (
                                    <EyeOff className="h-5 w-5" />
                                ) : (
                                    <Eye className="h-5 w-5" />
                                )}
                            </button>
                        </div>
                        {showPasswordRequirements && (
                            <ValidationFeedback message="Password must have at least 8 characters with one uppercase letter and one number." />
                        )}
                        <div className="h-5 min-h-[1.25rem]">
                            <FormMessage className="text-xs text-red-500" />
                        </div>
                    </FormItem>
                );
            }}
        />
    );
};

export default PasswordField;
