import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { personalInfoFormSchema, PersonalInfoFormValues } from "./schemas";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Calendar } from "@/components/ui/calendar";
import { format } from "date-fns";
import { CalendarIcon, User, Phone } from "lucide-react";
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
import { ProfileImageUpload } from "./ProfileImageUpload";
import { useState, useEffect } from "react";

interface ProfileImage {
  imageId?: string;
  filePath: string;
  publicUrl: string;
  file?: File;
  isUploading?: boolean;
  isPrivate?: boolean;
}

interface SignupPersonalInfoProps {
  defaultValues?: Partial<PersonalInfoFormValues>;
  isLoading: boolean;
  onSubmit: (data: PersonalInfoFormValues, images?: ProfileImage[]) => void;
  onBack: () => void;
  initialImages?: ProfileImage[];
}

const SignupPersonalInfo = ({
  defaultValues = {
    name: "",
    gender: "",
    phone: "",
  },
  isLoading,
  onSubmit,
  onBack,
  initialImages = [],
}: SignupPersonalInfoProps) => {
  const [profileImages, setProfileImages] = useState<ProfileImage[]>(initialImages);
  
  useEffect(() => {
    if (initialImages?.length > 0) {
      setProfileImages(initialImages);
    }
  }, [initialImages]);
  
  const form = useForm<PersonalInfoFormValues>({
    resolver: zodResolver(personalInfoFormSchema),
    defaultValues,
    mode: "onChange"
  });

  const handleSubmit = (data: PersonalInfoFormValues) => {
    onSubmit(data, profileImages);
  };

  // Calculate a sensible default birth year (18 years ago)
  const defaultDate = new Date();
  defaultDate.setFullYear(defaultDate.getFullYear() - 18);

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4 sm:space-y-5">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem className="space-y-2">
              <FormLabel className="text-[#240046] dark:text-white text-sm transition-colors duration-300">
                Full Name
              </FormLabel>
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-[#9D4EDD]/70 dark:text-custom-lighter/70 transition-colors duration-300" />
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
              <FormMessage className="text-xs text-red-500" />
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
                  <SelectItem value="Female" title="Select female gender">Female</SelectItem>
                  <SelectItem value="Male" title="Select male gender">Male</SelectItem>
                  <SelectItem value="Other" title="Select other gender identity">Other</SelectItem>
                  <SelectItem value="prefer-not-to-say" title="Prefer not to disclose gender">Prefer not to say</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage className="text-xs text-red-500" />
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
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={field.value}
                    onSelect={field.onChange}
                    defaultMonth={field.value || defaultDate}
                    disabled={(date) => date > new Date()}
                    initialFocus
                    fromYear={1900}
                    toYear={new Date().getFullYear()}
                  />
                </PopoverContent>
              </Popover>
              <FormMessage className="text-xs text-red-500" />
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
                <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-[#9D4EDD]/70 dark:text-custom-lighter/70 transition-colors duration-300" />
                <FormControl>
                  <Input
                    placeholder="+1 (555) 123-4567"
                    type="tel"
                    className="bg-[#f8f2ff]/70 dark:bg-[#240046]/80 border border-[#E0AAFF]/30 dark:border-0 
                             text-[#240046] dark:text-white placeholder:text-[#9D4EDD]/60 dark:placeholder:text-white/60 
                             pl-10 h-11 sm:h-12 py-2 transition-colors duration-300 focus-visible:ring-[#9D4EDD]"
                    disabled={isLoading}
                    {...field}
                  />
                </FormControl>
              </div>
              <FormMessage className="text-xs text-red-500" />
            </FormItem>
          )}
        />

        <div className="pt-2">
          <ProfileImageUpload 
            onImagesChange={setProfileImages}
            existingImages={initialImages}
            disabled={isLoading}
          />
        </div>

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
