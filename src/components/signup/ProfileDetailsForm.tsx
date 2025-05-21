
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { PersonalInfoFormValues } from "./schemas";
import { ProfileDetailsFormValues, profileDetailsSchema } from "./profile-details/types";
import BioSection from "./profile-details/BioSection";
import PhysicalSection from "./profile-details/PhysicalSection";
import ReligionSection from "./profile-details/ReligionSection";
import HabitSection from "./profile-details/HabitSection";
import PreferenceSection from "./profile-details/PreferenceSection";
import FormActions from "./profile-details/FormActions";

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

        {/* Bio and Profession Section */}
        <BioSection form={form} isLoading={isLoading} />

        {/* Physical Attributes Section */}
        <PhysicalSection form={form} isLoading={isLoading} />

        {/* Religious Information Section */}
        <ReligionSection form={form} isLoading={isLoading} />

        {/* Habits Section */}
        <HabitSection form={form} isLoading={isLoading} />

        {/* Preferences Section */}
        <PreferenceSection form={form} isLoading={isLoading} />

        {/* Form Action Buttons */}
        <FormActions isLoading={isLoading} onBack={onBack} />
      </form>
    </Form>
  );
};

export default ProfileDetailsForm;
