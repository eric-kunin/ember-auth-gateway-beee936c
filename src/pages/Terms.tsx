
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import LoginHeader from "@/components/login/LoginHeader";
import LoginFooter from "@/components/login/LoginFooter";
import { useTranslation } from "react-i18next";

const Terms = () => {
  const { t } = useTranslation();
  
  return (
    <div className="min-h-screen w-full flex flex-col bg-black text-white" dir="rtl">
      <LoginHeader />
      
      <div className="flex-1 container mx-auto px-6 py-12">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-[#C77DFF] to-[#E0AAFF] bg-clip-text text-transparent">
              {t("terms.title")}
            </h1>
            <p className="text-xl text-white/70">
              {t("terms.subtitle")}
            </p>
          </div>

          {/* Back to home link */}
          <div className="mb-8" dir="ltr">
            <Link 
              to="/login" 
              className="inline-flex items-center gap-2 text-[#C77DFF] hover:text-white transition-colors"
            >
              <ArrowRight className="h-4 w-4 rotate-180" />
              {t("terms.backToHome")}
            </Link>
          </div>

          {/* Content */}
          <div className="bg-white/5 backdrop-blur-sm rounded-xl p-8 space-y-8">
            <section>
              <h2 className="text-2xl font-semibold mb-4 text-[#C77DFF]">{t("terms.sections.acceptance.title")}</h2>
              <p className="text-white/70 leading-relaxed">
                {t("terms.sections.acceptance.content")}
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4 text-[#C77DFF]">{t("terms.sections.freeService.title")}</h2>
              <p className="text-white/70 leading-relaxed">
                {t("terms.sections.freeService.content")}
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4 text-[#C77DFF]">{t("terms.sections.conduct.title")}</h2>
              <p className="text-white/70 leading-relaxed">
                {t("terms.sections.conduct.content")}
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4 text-[#C77DFF]">{t("terms.sections.accuracy.title")}</h2>
              <p className="text-white/70 leading-relaxed">
                {t("terms.sections.accuracy.content")}
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4 text-[#C77DFF]">{t("terms.sections.ageRequirement.title")}</h2>
              <p className="text-white/70 leading-relaxed">
                {t("terms.sections.ageRequirement.content")}
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4 text-[#C77DFF]">{t("terms.sections.liability.title")}</h2>
              <p className="text-white/70 leading-relaxed">
                {t("terms.sections.liability.content")}
              </p>
            </section>
          </div>
        </div>
      </div>
      
      <LoginFooter />
    </div>
  );
};

export default Terms;
