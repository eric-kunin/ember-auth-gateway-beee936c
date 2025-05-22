
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Heart, Ruler, Eye, Church, Cigarette, Wine, Users, MessageCircle } from "lucide-react";
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

// Schema for Lifestyle Information
const lifestyleSchema = z.object({
  height: z.number().min(100, "Height must be at least 100 cm").max(250, "Height must be at most 250 cm").optional().or(z.literal('')),
  eyeColor: z.string().optional(),
  religion: z.string().optional(),
  religiousLevel: z.string().optional(),
  smokingStatus: z.string().optional(),
  drinkingStatus: z.string().optional(),
  lookingFor: z.string().optional(),
  lookingForGender: z.string().optional(),
  pets: z.string().optional(),
  exercise: z.string().optional(),
  diet: z.string().optional(),
});

type LifestyleFormValues = z.infer<typeof lifestyleSchema>;

interface SignupLifestyleInfoProps {
  defaultValues?: Partial<LifestyleFormValues> & { hobbies?: string[] };
  isLoading: boolean;
  onSubmit: (data: LifestyleFormValues & { hobbies: string[] }) => void;
  onBack: () => void;
}

const SignupLifestyleInfo = ({
  defaultValues = {
    height: undefined,
    eyeColor: "",
    religion: "",
    religiousLevel: "",
    smokingStatus: "",
    drinkingStatus: "",
    lookingFor: "",
    lookingForGender: "",
    pets: "",
    exercise: "",
    diet: "",
    hobbies: [],
  },
  isLoading,
  onSubmit,
  onBack,
}: SignupLifestyleInfoProps) => {
  const form = useForm<LifestyleFormValues>({
    resolver: zodResolver(lifestyleSchema),
    defaultValues,
    mode: "onChange"
  });

  const handleSubmit = (data: LifestyleFormValues) => {
    // Even though we removed the UI for hobbies, we need to keep the empty array
    // to maintain the API contract
    onSubmit({ ...data, hobbies: [] });
  };

  // Define eye colors with their corresponding color values
  const eyeColors = [
    { value: "brown", label: "Brown", color: "#8B4513" },
    { value: "blue", label: "Blue", color: "#0000FF" },
    { value: "green", label: "Green", color: "#008000" },
    { value: "hazel", label: "Hazel", color: "#A1782E" },
    { value: "gray", label: "Gray", color: "#808080" },
    { value: "other", label: "Other", color: "#F8F2FF" },
  ];

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4 sm:space-y-5">
        {/* Physical Attributes Section */}
        <div>
          <h4 className="text-sm font-medium text-[#240046] dark:text-white mb-3 flex items-center gap-2">
            <Heart className="h-4 w-4 text-[#9D4EDD]" />
            Physical Attributes
          </h4>
          
          <div className="grid grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="height"
              render={({ field }) => (
                <FormItem className="space-y-2">
                  <FormLabel className="text-[#240046] dark:text-white text-sm transition-colors duration-300 flex items-center gap-1">
                    <Ruler className="h-4 w-4 text-[#9D4EDD]" />
                    Height (cm)
                  </FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      placeholder="Height in cm"
                      className="bg-[#f8f2ff]/70 dark:bg-[#240046]/80 border border-[#E0AAFF]/30 dark:border-0 
                               text-[#240046] dark:text-white placeholder:text-[#9D4EDD]/60 dark:placeholder:text-white/60 
                               h-11 py-2 transition-colors duration-300 focus-visible:ring-[#9D4EDD]"
                      disabled={isLoading}
                      {...field}
                      onChange={event => field.onChange(event.target.value === '' ? undefined : Number(event.target.value))}
                    />
                  </FormControl>
                  <FormMessage className="text-xs text-red-500" />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="eyeColor"
              render={({ field }) => (
                <FormItem className="space-y-2">
                  <FormLabel className="text-[#240046] dark:text-white text-sm transition-colors duration-300 flex items-center gap-1">
                    <Eye className="h-4 w-4 text-[#9D4EDD]" />
                    Eye Color
                  </FormLabel>
                  <Select
                    disabled={isLoading}
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger 
                        className="bg-[#f8f2ff]/70 dark:bg-[#240046]/80 border border-[#E0AAFF]/30 dark:border-0 
                                 text-[#240046] dark:text-white h-11 transition-colors duration-300 focus:ring-[#9D4EDD]"
                      >
                        <SelectValue placeholder="Select eye color" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent className="bg-white dark:bg-[#240046] border-[#E0AAFF]/30 dark:border-[#9D4EDD]/20">
                      {eyeColors.map((eyeColor) => (
                        <SelectItem key={eyeColor.value} value={eyeColor.value}>
                          <div className="flex items-center justify-between w-full">
                            <span>{eyeColor.label}</span>
                            <span 
                              className="h-4 w-4 rounded-full ml-2"
                              style={{ backgroundColor: eyeColor.color }}
                            />
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage className="text-xs text-red-500" />
                </FormItem>
              )}
            />
          </div>
        </div>

        {/* Religious Information Section */}
        <div>
          <h4 className="text-sm font-medium text-[#240046] dark:text-white mb-3 flex items-center gap-2">
            <Church className="h-4 w-4 text-[#9D4EDD]" />
            Religious Information
          </h4>
          
          <div className="grid grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="religion"
              render={({ field }) => (
                <FormItem className="space-y-2">
                  <FormLabel className="text-[#240046] dark:text-white text-sm transition-colors duration-300">
                    Religion
                  </FormLabel>
                  <Select
                    disabled={isLoading}
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger 
                        className="bg-[#f8f2ff]/70 dark:bg-[#240046]/80 border border-[#E0AAFF]/30 dark:border-0 
                                 text-[#240046] dark:text-white h-11 transition-colors duration-300 focus:ring-[#9D4EDD]"
                      >
                        <SelectValue placeholder="Select religion" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent className="bg-white dark:bg-[#240046] border-[#E0AAFF]/30 dark:border-[#9D4EDD]/20">
                      <SelectItem value="orthodox">Orthodox</SelectItem>
                      <SelectItem value="conservative">Conservative</SelectItem>
                      <SelectItem value="reform">Reform</SelectItem>
                      <SelectItem value="secular">Secular</SelectItem>
                      <SelectItem value="traditional">Traditional</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage className="text-xs text-red-500" />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="religiousLevel"
              render={({ field }) => (
                <FormItem className="space-y-2">
                  <FormLabel className="text-[#240046] dark:text-white text-sm transition-colors duration-300 flex items-center gap-1">
                    <Church className="h-4 w-4 text-[#9D4EDD]" />
                    Religious Level
                  </FormLabel>
                  <Select
                    disabled={isLoading}
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger 
                        className="bg-[#f8f2ff]/70 dark:bg-[#240046]/80 border border-[#E0AAFF]/30 dark:border-0 
                                 text-[#240046] dark:text-white h-11 transition-colors duration-300 focus:ring-[#9D4EDD]"
                      >
                        <SelectValue placeholder="Select level" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent className="bg-white dark:bg-[#240046] border-[#E0AAFF]/30 dark:border-[#9D4EDD]/20">
                      <SelectItem value="not religious">Not Religious</SelectItem>
                      <SelectItem value="somewhat religious">Somewhat Religious</SelectItem>
                      <SelectItem value="religious">Religious</SelectItem>
                      <SelectItem value="very religious">Very Religious</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage className="text-xs text-red-500" />
                </FormItem>
              )}
            />
          </div>
        </div>
        
        {/* Habits Section */}
        <div>
          <h4 className="text-sm font-medium text-[#240046] dark:text-white mb-3 flex items-center gap-2">
            <Cigarette className="h-4 w-4 text-[#9D4EDD]" />
            Habits & Lifestyle
          </h4>
          
          <div className="grid grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="smokingStatus"
              render={({ field }) => (
                <FormItem className="space-y-2">
                  <FormLabel className="text-[#240046] dark:text-white text-sm transition-colors duration-300">
                    Smoking Status
                  </FormLabel>
                  <Select
                    disabled={isLoading}
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger 
                        className="bg-[#f8f2ff]/70 dark:bg-[#240046]/80 border border-[#E0AAFF]/30 dark:border-0 
                                 text-[#240046] dark:text-white h-11 transition-colors duration-300 focus:ring-[#9D4EDD]"
                      >
                        <SelectValue placeholder="Select status" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent className="bg-white dark:bg-[#240046] border-[#E0AAFF]/30 dark:border-[#9D4EDD]/20">
                      <SelectItem value="non-smoker">Non-Smoker</SelectItem>
                      <SelectItem value="occasional">Occasional</SelectItem>
                      <SelectItem value="regular">Regular</SelectItem>
                      <SelectItem value="quitting">Quitting</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage className="text-xs text-red-500" />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="drinkingStatus"
              render={({ field }) => (
                <FormItem className="space-y-2">
                  <FormLabel className="text-[#240046] dark:text-white text-sm transition-colors duration-300 flex items-center gap-1">
                    <Wine className="h-4 w-4 text-[#9D4EDD]" />
                    Drinking Status
                  </FormLabel>
                  <Select
                    disabled={isLoading}
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger 
                        className="bg-[#f8f2ff]/70 dark:bg-[#240046]/80 border border-[#E0AAFF]/30 dark:border-0 
                                 text-[#240046] dark:text-white h-11 transition-colors duration-300 focus:ring-[#9D4EDD]"
                      >
                        <SelectValue placeholder="Select status" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent className="bg-white dark:bg-[#240046] border-[#E0AAFF]/30 dark:border-[#9D4EDD]/20">
                      <SelectItem value="non-drinker">Non-Drinker</SelectItem>
                      <SelectItem value="social">Social</SelectItem>
                      <SelectItem value="regular">Regular</SelectItem>
                      <SelectItem value="rarely">Rarely</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage className="text-xs text-red-500" />
                </FormItem>
              )}
            />
          </div>
        </div>
        
        {/* Preferences Section */}
        <div>
          <h4 className="text-sm font-medium text-[#240046] dark:text-white mb-3 flex items-center gap-2">
            <Heart className="h-4 w-4 text-[#9D4EDD]" />
            Preferences
          </h4>
          
          <div className="grid grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="lookingFor"
              render={({ field }) => (
                <FormItem className="space-y-2">
                  <FormLabel className="text-[#240046] dark:text-white text-sm transition-colors duration-300 flex items-center gap-1">
                    <MessageCircle className="h-4 w-4 text-[#9D4EDD]" />
                    Looking For
                  </FormLabel>
                  <Select
                    disabled={isLoading}
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger 
                        className="bg-[#f8f2ff]/70 dark:bg-[#240046]/80 border border-[#E0AAFF]/30 dark:border-0 
                                 text-[#240046] dark:text-white h-11 transition-colors duration-300 focus:ring-[#9D4EDD]"
                      >
                        <SelectValue placeholder="Select relationship type" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent className="bg-white dark:bg-[#240046] border-[#E0AAFF]/30 dark:border-[#9D4EDD]/20">
                      <SelectItem value="serious relationship">Serious Relationship</SelectItem>
                      <SelectItem value="casual">Casual</SelectItem>
                      <SelectItem value="friendship">Friendship</SelectItem>
                      <SelectItem value="marriage">Marriage</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage className="text-xs text-red-500" />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="lookingForGender"
              render={({ field }) => (
                <FormItem className="space-y-2">
                  <FormLabel className="text-[#240046] dark:text-white text-sm transition-colors duration-300 flex items-center gap-1">
                    <Users className="h-4 w-4 text-[#9D4EDD]" />
                    Interested In
                  </FormLabel>
                  <Select
                    disabled={isLoading}
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger 
                        className="bg-[#f8f2ff]/70 dark:bg-[#240046]/80 border border-[#E0AAFF]/30 dark:border-0 
                                 text-[#240046] dark:text-white h-11 transition-colors duration-300 focus:ring-[#9D4EDD]"
                      >
                        <SelectValue placeholder="Select gender preference" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent className="bg-white dark:bg-[#240046] border-[#E0AAFF]/30 dark:border-[#9D4EDD]/20">
                      <SelectItem value="Male">Men</SelectItem>
                      <SelectItem value="Female">Women</SelectItem>
                      <SelectItem value="Both">Both</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage className="text-xs text-red-500" />
                </FormItem>
              )}
            />
          </div>
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

export default SignupLifestyleInfo;
