
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { personalInfoFormSchema, PersonalInfoFormValues } from "./schemas";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Calendar } from "@/components/ui/calendar";
import { format } from "date-fns";
import { CalendarIcon, UserRound, Phone, Users } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useState } from "react";
import ValidationFeedback from "./ValidationFeedback";

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

  // Calculate a sensible default birth year (18 years ago)
  const defaultDate = new Date();
  defaultDate.setFullYear(defaultDate.getFullYear() - 18);
  
  // Set exact 80 years ago as minimum year
  const currentYear = new Date().getFullYear();
  const minYear = currentYear - 80;

  // Custom gender options with icons
  const genderOptions = [
    { value: "Male", label: "Male", icon: <UserRound className="mr-2 h-4 w-4" /> },
    { value: "Female", label: "Female", icon: <UserRound className="mr-2 h-4 w-4" /> },
    { value: "Other", label: "Other", icon: <Users className="mr-2 h-4 w-4" /> },
    { value: "prefer-not-to-say", label: "Prefer not to say", icon: <Users className="mr-2 h-4 w-4" /> }
  ];

  // Phone validation state
  const phoneValue = form.watch("phone");
  const phoneState = form.getFieldState("phone");
  const phoneIsValid = phoneValue && !phoneState.invalid && phoneState.isDirty;

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 sm:space-y-5">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem className="space-y-2">
              <FormLabel className="text-[#240046] dark:text-white text-sm transition-colors duration-300">
                Full Name
              </FormLabel>
              <div className="relative">
                <UserRound className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-[#9D4EDD]/70 dark:text-custom-lighter/70 transition-colors duration-300" />
                <FormControl>
                  <Input
                    placeholder="John Doe"
                    className="bg-[#f8f2ff]/70 dark:bg-[#240046]/80 border border-[#E0AAFF]/30 dark:border-0 
                             text-[#240046] dark:text-white placeholder:text-[#9D4EDD]/60 dark:placeholder:text-white/60 
                             pl-10 h-11 sm:h-12 py-2 transition-colors duration-300 focus-visible:ring-[#9D4EDD]"
                    disabled={isLoading}
                    {...field}
                  />
                </FormControl>
              </div>
              <div className="h-5 min-h-[1.25rem]">
                <FormMessage className="text-xs text-red-500" />
              </div>
            </FormItem>
          )}
        />
        
        <FormField
          control={form.control}
          name="gender"
          render={({ field }) => (
            <FormItem className="space-y-2">
              <FormLabel className="text-[#240046] dark:text-white text-sm transition-colors duration-300">
                Gender
              </FormLabel>
              <Select
                disabled={isLoading}
                onValueChange={field.onChange}
                defaultValue={field.value}
              >
                <FormControl>
                  <SelectTrigger 
                    className="bg-[#f8f2ff]/70 dark:bg-[#240046]/80 border border-[#E0AAFF]/30 dark:border-0 
                             text-[#240046] dark:text-white h-11 sm:h-12 transition-colors duration-300 focus:ring-[#9D4EDD]"
                  >
                    <SelectValue placeholder="Select your gender" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {genderOptions.map((option) => (
                    <SelectItem 
                      key={option.value} 
                      value={option.value} 
                      title={`Select ${option.label.toLowerCase()} gender`}
                      className="flex items-center"
                    >
                      <div className="flex items-center">
                        {option.icon}
                        <span>{option.label}</span>
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <div className="h-5 min-h-[1.25rem]">
                <FormMessage className="text-xs text-red-500" />
              </div>
            </FormItem>
          )}
        />
        
        <FormField
          control={form.control}
          name="birthdate"
          render={({ field }) => (
            <FormItem className="space-y-2">
              <FormLabel className="text-[#240046] dark:text-white text-sm transition-colors duration-300">
                Date of Birth
              </FormLabel>
              <Popover>
                <PopoverTrigger asChild>
                  <FormControl>
                    <Button
                      variant="outline"
                      className={cn(
                        "w-full justify-start text-left font-normal h-11 sm:h-12",
                        "bg-[#f8f2ff]/70 dark:bg-[#240046]/80 border border-[#E0AAFF]/30 dark:border-0",
                        "text-[#240046] dark:text-white transition-colors duration-300 focus:ring-[#9D4EDD]",
                        !field.value && "text-muted-foreground"
                      )}
                      disabled={isLoading}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {field.value ? (
                        format(field.value, "PPP")
                      ) : (
                        <span>Select your birth date</span>
                      )}
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0 min-w-[320px] pointer-events-auto" align="start">
                  <Calendar
                    mode="single"
                    selected={field.value}
                    onSelect={field.onChange}
                    defaultMonth={field.value || defaultDate}
                    disabled={(date) => date > new Date()}
                    initialFocus
                    fromYear={minYear}
                    toYear={currentYear}
                    className="pointer-events-auto"
                  />
                </PopoverContent>
              </Popover>
              <div className="h-5 min-h-[1.25rem]">
                <FormMessage className="text-xs text-red-500" />
              </div>
            </FormItem>
          )}
        />
        
        <FormField
          control={form.control}
          name="phone"
          render={({ field }) => (
            <FormItem className="space-y-2">
              <FormLabel className="text-[#240046] dark:text-white text-sm transition-colors duration-300">
                Phone Number (Optional)
              </FormLabel>
              <div className="relative">
                <Phone className="absolute left-3 top-3 h-5 w-5 text-[#9D4EDD]/70 dark:text-custom-lighter/70 transition-colors duration-300" />
                <FormControl>
                  <Input
                    placeholder="+1 (555) 123-4567"
                    type="tel"
                    maxLength={15}
                    className={`bg-[#f8f2ff]/70 dark:bg-[#240046]/80 border border-[#E0AAFF]/30 dark:border-0 
                             text-[#240046] dark:text-white placeholder:text-[#9D4EDD]/60 dark:placeholder:text-white/60 
                             pl-10 h-11 sm:h-12 py-2 transition-colors duration-300 focus-visible:ring-[#9D4EDD]
                             ${phoneState.invalid && phoneState.isDirty ? 'border-red-500 dark:border-red-500 ring-1 ring-red-500' : ''}
                             ${phoneIsValid ? 'border-green-500 dark:border-green-500 ring-1 ring-green-500' : ''}`}
                    disabled={isLoading}
                    {...field}
                  />
                </FormControl>
                {phoneValue && phoneValue.length > 0 && (
                  <ValidationFeedback message="Maximum 15 digits allowed" />
                )}
              </div>
              <div className="h-5 min-h-[1.25rem]">
                <FormMessage className="text-xs text-red-500" />
              </div>
            </FormItem>
          )}
        />

        <div className="flex gap-2 pt-2">
          <Button
            type="button"
            onClick={onBack}
            variant="outline"
            className="flex-1 dark:bg-[#10002B] dark:hover:bg-[#240046] dark:text-white border-[#E0AAFF]/30"
            title="Go back to previous step"
          >
            Back
          </Button>
          <Button
            type="submit"
            className="flex-1 bg-[#9D4EDD] hover:bg-[#7B2CBF] text-white border-0 h-11 sm:h-12 
                     signin-button-hover transition-all duration-300"
            disabled={isLoading}
            title="Continue to next step"
          >
            Next
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default SignupPersonalInfo;
