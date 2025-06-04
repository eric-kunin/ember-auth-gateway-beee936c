import { useTranslation } from "react-i18next";

const TermsNotice = () => {
  const { t } = useTranslation();

  return (
    <div className="text-center text-xs mt-1 text-[#3B185F] dark:text-[#E0AAFF] transition-colors duration-300">
      {t("termsNotice.agreement")}
    </div>
  );
};

export default TermsNotice;
