
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { UseFormReturn } from "react-hook-form";
import { ProfileDetailsFormValues } from "../profile-details/types";
import { BookUser, Briefcase } from "lucide-react";
import { useState } from "react";

interface BioSectionProps {
  form: UseFormReturn<ProfileDetailsFormValues>;
  isLoading: boolean;
}

const BioSection = ({ form, isLoading }: BioSectionProps) => {
  const [bioCount, setBioCount] = useState(form.getValues().bio?.length || 0);
  const [professionCount, setProfessionCount] = useState(form.getValues().profession?.length || 0);
  
  // Maximum character limits
  const BIO_MAX_CHARS = 200;
  const PROFESSION_MAX_CHARS = 15;

  return (
    <>
      <FormField
        control={form.control}
        name="bio"
        render={({ field }) => (
          <FormItem className="space-y-2">
            <FormLabel className="text-[#240046] dark:text-white text-sm transition-colors duration-300 flex items-center gap-2">
              <BookUser className="h-4 w-4 text-[#9D4EDD]" />
              Bio
            </FormLabel>
            <FormControl>
              <div className="relative">
                <Textarea
                  placeholder="Tell us about yourself..."
                  className="bg-[#f8f2ff]/70 dark:bg-[#240046]/80 border border-[#E0AAFF]/30 dark:border-0 
                         text-[#240046] dark:text-white placeholder:text-[#9D4EDD]/60 dark:placeholder:text-white/60 
                         h-24 max-h-36 transition-colors duration-300 focus-visible:ring-[#9D4EDD]"
                  disabled={isLoading}
                  maxLength={BIO_MAX_CHARS}
                  {...field}
                  onChange={(e) => {
                    field.onChange(e);
                    setBioCount(e.target.value.length);
                  }}
                  value={field.value || ""}
                />
                <div className="text-xs text-[#9D4EDD] dark:text-[#E0AAFF] absolute bottom-2 right-2">
                  {bioCount}/{BIO_MAX_CHARS}
                </div>
              </div>
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
            <FormLabel className="text-[#240046] dark:text-white text-sm transition-colors duration-300 flex items-center gap-2">
              <Briefcase className="h-4 w-4 text-[#9D4EDD]" />
              Profession
            </FormLabel>
            <FormControl>
              <div className="relative">
                <Input
                  placeholder="Your profession"
                  className="bg-[#f8f2ff]/70 dark:bg-[#240046]/80 border border-[#E0AAFF]/30 dark:border-0 
                         text-[#240046] dark:text-white placeholder:text-[#9D4EDD]/60 dark:placeholder:text-white/60 
                         h-11 py-2 transition-colors duration-300 focus-visible:ring-[#9D4EDD]"
                  disabled={isLoading}
                  maxLength={PROFESSION_MAX_CHARS}
                  {...field}
                  onChange={(e) => {
                    field.onChange(e);
                    setProfessionCount(e.target.value.length);
                  }}
                  value={field.value || ""}
                />
                <div className="text-xs text-[#9D4EDD] dark:text-[#E0AAFF] absolute top-1/2 right-2 transform -translate-y-1/2">
                  {professionCount}/{PROFESSION_MAX_CHARS}
                </div>
              </div>
            </FormControl>
            <FormMessage className="text-xs text-red-500" />
          </FormItem>
        )}
      />
    </>
  );
};

export default BioSection;
