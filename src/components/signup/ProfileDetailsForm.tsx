
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { PersonalInfoFormValues } from "./schemas";

// Schema for profile details
const profileDetailsSchema = z.object({
  bio: z.string().optional(),
  profession: z.string().optional(),
  eyeColor: z.string().optional(),
  height: z.number().min(100, "Height must be at least 100 cm").max(250, "Height must be at most 250 cm").optional().or(z.literal('')),
  religion: z.string().optional(),
  religiousLevel: z.string().optional(),
  smokingStatus: z.string().optional(),
  drinkingStatus: z.string().optional(),
  lookingFor: z.string().optional(),
  lookingForGender: z.string().optional()
});

type ProfileDetailsFormValues = z.infer<typeof profileDetailsSchema>;

interface ProfileDetailsFormProps {
  defaultValues?: Partial<ProfileDetailsFormValues>;
  personalData: PersonalInfoFormValues;
  isLoading: boolean;
  onSubmit: (data: ProfileDetailsFormValues) => void;
  onBack: () => void;
  onComplete: () => void;
}

const ProfileDetailsForm = ({
  defaultValues = {
    bio: "",
    profession: "",
    eyeColor: "",
    height: undefined,
    religion: "",
    religiousLevel: "",
    smokingStatus: "",
    drinkingStatus: "",
    lookingFor: "",
    lookingForGender: ""
  },
  personalData,
  isLoading,
  onSubmit,
  onBack,
  onComplete
}: ProfileDetailsFormProps) => {
  const form = useForm<ProfileDetailsFormValues>({
    resolver: zodResolver(profileDetailsSchema),
    defaultValues,
    mode: "onChange"
  });

  const handleSubmit = (data: ProfileDetailsFormValues) => {
    onSubmit(data);
    onComplete();
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
        <h3 className="text-lg font-medium text-[#240046] dark:text-white mb-4">
          Complete your profile
        </h3>

        <FormField
          control={form.control}
          name="bio"
          render={({ field }) => (
            <FormItem className="space-y-2">
              <FormLabel className="text-[#240046] dark:text-white text-sm transition-colors duration-300">
                Bio
              </FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Tell us about yourself..."
                  className="bg-[#f8f2ff]/70 dark:bg-[#240046]/80 border border-[#E0AAFF]/30 dark:border-0 
                           text-[#240046] dark:text-white placeholder:text-[#9D4EDD]/60 dark:placeholder:text-white/60 
                           h-24 transition-colors duration-300 focus-visible:ring-[#9D4EDD]"
                  disabled={isLoading}
                  {...field}
                />
              </FormControl>
              <FormMessage className="text-xs text-red-500" />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="profession"
          render={({ field }) => (
            <FormItem className="space-y-2">
              <FormLabel className="text-[#240046] dark:text-white text-sm transition-colors duration-300">
                Profession
              </FormLabel>
              <FormControl>
                <Input
                  placeholder="Your profession"
                  className="bg-[#f8f2ff]/70 dark:bg-[#240046]/80 border border-[#E0AAFF]/30 dark:border-0 
                           text-[#240046] dark:text-white placeholder:text-[#9D4EDD]/60 dark:placeholder:text-white/60 
                           h-11 py-2 transition-colors duration-300 focus-visible:ring-[#9D4EDD]"
                  disabled={isLoading}
                  {...field}
                />
              </FormControl>
              <FormMessage className="text-xs text-red-500" />
            </FormItem>
          )}
        />

        <div className="grid grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="height"
            render={({ field }) => (
              <FormItem className="space-y-2">
                <FormLabel className="text-[#240046] dark:text-white text-sm transition-colors duration-300">
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
                <FormLabel className="text-[#240046] dark:text-white text-sm transition-colors duration-300">
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
                  <SelectContent>
                    <SelectItem value="brown">Brown</SelectItem>
                    <SelectItem value="blue">Blue</SelectItem>
                    <SelectItem value="green">Green</SelectItem>
                    <SelectItem value="hazel">Hazel</SelectItem>
                    <SelectItem value="gray">Gray</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage className="text-xs text-red-500" />
              </FormItem>
            )}
          />
        </div>

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
                  <SelectContent>
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
                <FormLabel className="text-[#240046] dark:text-white text-sm transition-colors duration-300">
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
                  <SelectContent>
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
                  <SelectContent>
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
                <FormLabel className="text-[#240046] dark:text-white text-sm transition-colors duration-300">
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
                  <SelectContent>
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

        <div className="grid grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="lookingFor"
            render={({ field }) => (
              <FormItem className="space-y-2">
                <FormLabel className="text-[#240046] dark:text-white text-sm transition-colors duration-300">
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
                  <SelectContent>
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
                <FormLabel className="text-[#240046] dark:text-white text-sm transition-colors duration-300">
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
                  <SelectContent>
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

        <div className="flex gap-2 pt-2">
          <Button
            type="button"
            onClick={onBack}
            variant="outline"
            className="flex-1 dark:bg-[#10002B] dark:hover:bg-[#240046] dark:text-white border-[#E0AAFF]/30"
          >
            Back
          </Button>
          <Button
            type="submit"
            className="flex-1 bg-[#9D4EDD] hover:bg-[#7B2CBF] text-white border-0 h-12 
                     signin-button-hover transition-all duration-300"
            disabled={isLoading}
          >
            {isLoading ? (
              <div className="flex items-center gap-2">
                <div className="h-4 w-4 rounded-full border-2 border-white/20 border-t-white animate-spin"></div>
                <span>Creating Account...</span>
              </div>
            ) : (
              "Next"
            )}
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default ProfileDetailsForm;
