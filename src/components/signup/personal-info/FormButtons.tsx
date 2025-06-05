
import { Button } from "@/components/ui/button";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { useTranslation } from "react-i18next";

interface FormButtonsProps {
  isLoading: boolean;
  onBack: () => void;
}

const FormButtons = ({ isLoading, onBack }: FormButtonsProps) => {
    const { t, i18n } = useTranslation();
    const isHebrew = i18n.language === "he";
    const direction = isHebrew ? "rtl" : "ltr";
  return (
    <div className="flex gap-2 pt-2" dir={direction}>
  <Button
    type="button"
    onClick={onBack}
    variant="outline"
    className="flex-1 dark:bg-[#10002B] dark:hover:bg-[#240046] dark:text-white border-[#E0AAFF]/30 group"
    title={t("back")}
  >
    {isHebrew ? (
      <>
        <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
        <span>{t("back")}</span>
      </>
    ) : (
      <>
        <ArrowLeft className="mr-2 h-4 w-4 transition-transform group-hover:-translate-x-1" />
        <span>{t("back")}</span>
      </>
    )}
  </Button>

  <Button
    type="submit"
    className="flex-1 bg-[#9D4EDD] hover:bg-[#7B2CBF] text-white border-0 h-11 sm:h-12 group transition-all duration-300"
    disabled={isLoading}
    title={t("next")}
  >
    {isHebrew ? (
      <>
        <span>{t("next")}</span>
        <ArrowLeft className="mr-2 h-4 w-4 transition-transform group-hover:-translate-x-1" />
      </>
    ) : (
      <>
        <span>{t("next")}</span>
        <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
      </>
    )}
  </Button>
</div>

  );
};

export default FormButtons;
