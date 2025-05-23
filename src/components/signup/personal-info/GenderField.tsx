
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { UserRound, Users } from "lucide-react";
import { Control } from "react-hook-form";
import { PersonalInfoFormValues } from "../schemas";

interface GenderFieldProps {
  control: Control<PersonalInfoFormValues>;
  isLoading: boolean;
}

const GenderField = ({ control, isLoading }: GenderFieldProps) => {
  // Custom gender options with icons
  const genderOptions = [
    { value: "Male", label: "Male", icon: <UserRound className="mr-2 h-4 w-4" /> },
    { value: "Female", label: "Female", icon: <UserRound className="mr-2 h-4 w-4" /> },
    { value: "Other", label: "Other", icon: <Users className="mr-2 h-4 w-4" /> },
    { value: "prefer-not-to-say", label: "Prefer not to say", icon: <Users className="mr-2 h-4 w-4" /> }
  ];

  return (
    <FormField
      control={control}
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
  );
};

export default GenderField;
