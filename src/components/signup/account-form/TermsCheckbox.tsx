import { FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { Checkbox } from "@/components/ui/checkbox";
import { Control } from "react-hook-form";
import { AccountFormValues } from "../schemas";
import { useState } from "react";
import TermsModal from "../../modals/TermsModal";
import { useTranslation } from "react-i18next";

interface TermsCheckboxProps {
  control: Control<AccountFormValues>;
  isLoading: boolean;
}

const TermsCheckbox = ({ control, isLoading }: TermsCheckboxProps) => {
  const { t } = useTranslation();
  const [modalState, setModalState] = useState<{
    isOpen: boolean;
    type: "terms" | "privacy" | null;
  }>({
    isOpen: false,
    type: null,
  });

  const openModal = (type: "terms" | "privacy") => {
    setModalState({ isOpen: true, type });
  };

  const closeModal = () => {
    setModalState({ isOpen: false, type: null });
  };

  return (
    <>
      <FormField
        control={control}
        name="agreeToTerms"
        render={({ field }) => (
          <FormItem className="space-y-1">
  <label className="flex cursor-pointer select-none items-start space-x-3 rtl:space-x-reverse text-sm text-[#3B185F] dark:text-[#E0AAFF] transition-colors duration-300">
    <FormControl>
      <Checkbox
        checked={field.value}
        onCheckedChange={field.onChange}
        disabled={isLoading}
        className="data-[state=checked]:bg-[#9D4EDD] data-[state=checked]:border-[#9D4EDD] border-[#9D4EDD]/30 mt-1"
      />
    </FormControl>

    <span>
      <div className="space-y-2 leading-none">
        <div className="text-sm text-[#3B185F] dark:text-[#E0AAFF] transition-colors duration-300">
          {t("termsCheckbox.agreePrefix")}{" "}
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation(); // avoid toggling checkbox
              openModal("terms");
            }}
            className="underline decoration-1 underline-offset-2 text-[#9D4EDD] dark:text-[#C77DFF] hover:text-[#7B2CBF] dark:hover:text-white cursor-pointer transition-colors duration-200 font-medium"
          >
            {t("termsCheckbox.terms")}
          </button>{" "}
          {t("termsCheckbox.and")}{" "}
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation(); // avoid toggling checkbox
              openModal("privacy");
            }}
            className="underline decoration-1 underline-offset-2 text-[#9D4EDD] dark:text-[#C77DFF] hover:text-[#7B2CBF] dark:hover:text-white cursor-pointer transition-colors duration-200 font-medium"
          >
            {t("termsCheckbox.privacy")}
          </button>
        </div>
      </div>
    </span>
  </label>

  {/* 🛠 This part is now OUTSIDE the label, so cursor is normal and it's always below */}
  <FormMessage className="text-xs text-red-500" />
</FormItem>

          
        )}
      />

      {modalState.type && (
        <TermsModal
          isOpen={modalState.isOpen}
          onClose={closeModal}
          type={modalState.type}
        />
      )}
    </>
  );
};

export default TermsCheckbox;
