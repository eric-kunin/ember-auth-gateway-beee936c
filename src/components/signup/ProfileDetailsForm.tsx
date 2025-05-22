
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form } from "@/components/ui/form";
import { PersonalInfoFormValues } from "./schemas";
import { ProfileDetailsFormValues, profileDetailsSchema } from "./profile-details/types";
import BioSection from "./profile-details/BioSection";
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
    profession: ""
  },
  personalData,
  isLoading,
  onSubmit,
  onBack,
  onComplete
}: ProfileDetailsFormProps) => {
  const form = useForm<ProfileDetailsFormValues>({
    resolver: zodResolver(profileDetailsSchema),
    defaultValues: {
      bio: defaultValues.bio || "",
      profession: defaultValues.profession || ""
    },
    mode: "onChange"
  });

  const handleSubmit = (data: ProfileDetailsFormValues) => {
    onSubmit(data);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
        <h3 className="text-lg font-medium text-[#240046] dark:text-white mb-4">
          Complete your profile
        </h3>

        {/* Bio and Profession Section */}
        <BioSection form={form} isLoading={isLoading} />

        {/* Form Action Buttons */}
        <FormActions isLoading={isLoading} onBack={onBack} />
      </form>
    </Form>
  );
};

export default ProfileDetailsForm;
