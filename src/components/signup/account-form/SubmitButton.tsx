import { Button } from "@/components/ui/button";
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import { ArrowRight, ArrowLeft } from "lucide-react";

interface SubmitButtonProps {
  isLoading: boolean;
  isValid: boolean;
  loadingText?: string;
}

/**
 * SubmitButton — A reusable form submit button with i18n, animations, and RTL support.
 */
const SubmitButton = ({ isLoading, isValid, loadingText }: SubmitButtonProps) => {
  const { t, i18n } = useTranslation();
  const isHebrew = i18n.language === "he";
  const direction = isHebrew ? "rtl" : "ltr";

  const label = isLoading
    ? loadingText || t("submitButton.creating_account")
    : t("submitButton.next");

  const title = isLoading
    ? label
    : isValid
    ? label
    : t("submitButton.enter_details", "Please enter your details");

  return (
    <motion.div
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.97 }}
      transition={{ type: "spring", stiffness: 300 }}
    >
      <Button
        type="submit"
        title={title}
        disabled={isLoading || !isValid}
        className="w-full h-11 sm:h-12 bg-[#9D4EDD] hover:bg-[#7B2CBF] 
                   dark:bg-[#9D4EDD] dark:hover:bg-[#C77DFF] 
                   text-white font-semibold rounded-lg 
                   transition-colors duration-300 
                   disabled:opacity-50 disabled:cursor-not-allowed 
                   group flex items-center justify-center gap-2"
      >
        {isLoading ? (
          <div className="flex items-center gap-2">
            <span className="h-4 w-4 rounded-full border-2 border-white/20 border-t-white animate-spin"></span>
            <span>{label}</span>
          </div>
        ) : (
          <div className="flex items-center justify-center gap-2">
            {direction === "rtl" ? (
              <>
                <span>{label}</span>
                <ArrowLeft className="h-6 w-6 transition-transform group-hover:-translate-x-1" />
              </>
            ) : (
              <>
                <span>{label}</span>
                <ArrowRight className="h-6 w-6 transition-transform group-hover:translate-x-1" />
              </>
            )}
          </div>
        )}
      </Button>
    </motion.div>
  );
};

export default SubmitButton;
