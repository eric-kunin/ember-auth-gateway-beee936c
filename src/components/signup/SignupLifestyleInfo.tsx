
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Heart, Trophy, Utensils, Cat } from "lucide-react";
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
import { Badge } from "@/components/ui/badge";
import { useState } from "react";

// Schema for Lifestyle Information
const lifestyleSchema = z.object({
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
    pets: "",
    exercise: "",
    diet: "",
    hobbies: [],
  },
  isLoading,
  onSubmit,
  onBack,
}: SignupLifestyleInfoProps) => {
  const [hobbies, setHobbies] = useState<string[]>(defaultValues.hobbies || []);
  const [hobbyInput, setHobbyInput] = useState("");
  
  const form = useForm<LifestyleFormValues>({
    resolver: zodResolver(lifestyleSchema),
    defaultValues,
    mode: "onChange"
  });

  const handleSubmit = (data: LifestyleFormValues) => {
    onSubmit({ ...data, hobbies });
  };

  const addHobby = () => {
    if (hobbyInput.trim() && !hobbies.includes(hobbyInput.trim())) {
      setHobbies([...hobbies, hobbyInput.trim()]);
      setHobbyInput("");
    }
  };

  const removeHobby = (hobby: string) => {
    setHobbies(hobbies.filter(h => h !== hobby));
  };

  // Options for selects
  const petOptions = [
    { value: "dog", label: "Dog(s)" },
    { value: "cat", label: "Cat(s)" },
    { value: "fish", label: "Fish" },
    { value: "bird", label: "Bird(s)" },
    { value: "reptile", label: "Reptile(s)" },
    { value: "other", label: "Other" },
    { value: "none", label: "No Pets" },
  ];

  const exerciseOptions = [
    { value: "never", label: "Never" },
    { value: "rarely", label: "Rarely" },
    { value: "sometimes", label: "Sometimes" },
    { value: "often", label: "Often" },
    { value: "daily", label: "Daily" },
  ];

  const dietOptions = [
    { value: "omnivore", label: "Omnivore" },
    { value: "vegetarian", label: "Vegetarian" },
    { value: "vegan", label: "Vegan" },
    { value: "pescatarian", label: "Pescatarian" },
    { value: "keto", label: "Keto" },
    { value: "paleo", label: "Paleo" },
    { value: "other", label: "Other" },
  ];

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4 sm:space-y-5">
        <div className="space-y-2">
          <FormLabel className="text-[#240046] dark:text-white text-sm transition-colors duration-300 flex items-center">
            <Heart className="mr-2 h-4 w-4 text-[#9D4EDD]" />
            Hobbies & Interests
          </FormLabel>
          <div className="flex flex-wrap gap-2 mb-2">
            {hobbies.map((hobby) => (
              <Badge 
                key={hobby}
                variant="secondary" 
                className="bg-[#f8f2ff] dark:bg-[#3B185F] text-[#240046] dark:text-white"
              >
                {hobby}
                <button 
                  type="button" 
                  className="ml-1 text-[#9D4EDD] hover:text-[#7B2CBF]"
                  onClick={() => removeHobby(hobby)}
                >
                  ×
                </button>
              </Badge>
            ))}
          </div>
          <div className="flex gap-2">
            <Input
              placeholder="Add a hobby or interest"
              value={hobbyInput}
              onChange={(e) => setHobbyInput(e.target.value)}
              className="bg-[#f8f2ff]/70 dark:bg-[#240046]/80 border border-[#E0AAFF]/30 dark:border-0 
                       text-[#240046] dark:text-white placeholder:text-[#9D4EDD]/60 dark:placeholder:text-white/60"
              disabled={isLoading}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  e.preventDefault();
                  addHobby();
                }
              }}
            />
            <Button 
              type="button" 
              variant="outline"
              onClick={addHobby}
              disabled={isLoading || !hobbyInput.trim()}
              className="border-[#9D4EDD] text-[#9D4EDD] hover:bg-[#9D4EDD]/10"
            >
              Add
            </Button>
          </div>
        </div>
        
        <FormField
          control={form.control}
          name="pets"
          render={({ field }) => (
            <FormItem className="space-y-2">
              <FormLabel className="text-[#240046] dark:text-white text-sm transition-colors duration-300 flex items-center">
                <Cat className="mr-2 h-4 w-4 text-[#9D4EDD]" />
                Pets
              </FormLabel>
              <Select
                disabled={isLoading}
                onValueChange={field.onChange}
                defaultValue={field.value}
              >
                <FormControl>
                  <SelectTrigger 
                    className="bg-[#f8f2ff]/70 dark:bg-[#240046]/80 border border-[#E0AAFF]/30 dark:border-0 
                             text-[#240046] dark:text-white transition-colors duration-300 focus:ring-[#9D4EDD]"
                  >
                    <SelectValue placeholder="Do you have pets?" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {petOptions.map((option) => (
                    <SelectItem 
                      key={option.value} 
                      value={option.value}
                    >
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage className="text-xs text-red-500" />
            </FormItem>
          )}
        />
        
        <FormField
          control={form.control}
          name="exercise"
          render={({ field }) => (
            <FormItem className="space-y-2">
              <FormLabel className="text-[#240046] dark:text-white text-sm transition-colors duration-300 flex items-center">
                <Trophy className="mr-2 h-4 w-4 text-[#9D4EDD]" />
                Exercise Frequency
              </FormLabel>
              <Select
                disabled={isLoading}
                onValueChange={field.onChange}
                defaultValue={field.value}
              >
                <FormControl>
                  <SelectTrigger 
                    className="bg-[#f8f2ff]/70 dark:bg-[#240046]/80 border border-[#E0AAFF]/30 dark:border-0 
                             text-[#240046] dark:text-white transition-colors duration-300 focus:ring-[#9D4EDD]"
                  >
                    <SelectValue placeholder="How often do you exercise?" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {exerciseOptions.map((option) => (
                    <SelectItem 
                      key={option.value} 
                      value={option.value}
                    >
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage className="text-xs text-red-500" />
            </FormItem>
          )}
        />
        
        <FormField
          control={form.control}
          name="diet"
          render={({ field }) => (
            <FormItem className="space-y-2">
              <FormLabel className="text-[#240046] dark:text-white text-sm transition-colors duration-300 flex items-center">
                <Utensils className="mr-2 h-4 w-4 text-[#9D4EDD]" />
                Dietary Preference
              </FormLabel>
              <Select
                disabled={isLoading}
                onValueChange={field.onChange}
                defaultValue={field.value}
              >
                <FormControl>
                  <SelectTrigger 
                    className="bg-[#f8f2ff]/70 dark:bg-[#240046]/80 border border-[#E0AAFF]/30 dark:border-0 
                             text-[#240046] dark:text-white transition-colors duration-300 focus:ring-[#9D4EDD]"
                  >
                    <SelectValue placeholder="What is your diet like?" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {dietOptions.map((option) => (
                    <SelectItem 
                      key={option.value} 
                      value={option.value}
                    >
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage className="text-xs text-red-500" />
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

export default SignupLifestyleInfo;
