
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form } from "@/components/ui/form";
import { PersonalInfoFormValues } from "./schemas";
import { ProfileDetailsFormValues, profileDetailsSchema } from "./profile-details/types";
import NameField from "./profile-details/NameField";
import BioSection from "./profile-details/BioSection";
import FormActions from "./profile-details/FormActions";
import { useTranslation } from "react-i18next";

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
    name: "",
    bio: "",
    profession: ""
  },
  personalData,
  isLoading,
  onSubmit,
  onBack,
  onComplete
}: ProfileDetailsFormProps) => {
  const { t } = useTranslation();
  
  const form = useForm<ProfileDetailsFormValues>({
    resolver: zodResolver(profileDetailsSchema),
    defaultValues: {
      name: defaultValues.name || "",
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
          {t("profile.title")}
        </h3>

        {/* Name Field */}
        <NameField control={form.control} isLoading={isLoading} />

        {/* Bio and Profession Section */}
        <BioSection form={form} isLoading={isLoading} />

        {/* Form Action Buttons */}
        <FormActions isLoading={isLoading} onBack={onBack} />
      </form>
    </Form>
  );
};

export default ProfileDetailsForm;
