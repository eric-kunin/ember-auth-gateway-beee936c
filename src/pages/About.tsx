
import { Link } from "react-router-dom";
import { ArrowRight, Heart, Users, Shield, Zap, ArrowLeft } from "lucide-react";
import LoginHeader from "@/components/login/LoginHeader";
import LoginFooter from "@/components/login/LoginFooter";
import { useTranslation } from "react-i18next";

const About = () => {
   const { t, i18n } = useTranslation();
     const isHebrew = i18n.language === "he";
     const direction = isHebrew ? "rtl" : "ltr";
  
  return (
    <div className="min-h-screen w-full flex flex-col bg-black text-white" dir="rtl">
      <LoginHeader />
      
      <div className="flex-1 container mx-auto px-6 py-12">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-[#C77DFF] to-[#E0AAFF] bg-clip-text text-transparent">
              {t("about.title")}
            </h1>
            <p className="text-xl text-white/70">
              {t("about.subtitle")}
            </p>
          </div>

          {/* Back to home link */}
          <div className="mb-8" dir={direction != 'rtl' ? 'rtl' : 'ltr'}>
            <Link 
              to="/login" 
              className="inline-flex items-center gap-2 text-[#C77DFF] hover:text-white transition-colors"
            >
              {direction == 'rtl' ? <ArrowRight className="h-4 w-4 rotate-180" /> : <ArrowLeft className="h-4 w-4 rotate-180" />}
              {t("contact.backToHome")}
            </Link>
          </div>

          {/* Content */}
          <div className="bg-white/5 backdrop-blur-sm rounded-xl p-8 space-y-8" dir={direction == 'rtl' ? 'rtl' : 'ltr'}>
            <section>
              <h2 className="text-2xl font-semibold mb-4 text-[#C77DFF]">{t("about.sections.mission.title")}</h2>
              <p className="text-white/70 leading-relaxed">
                {t("about.sections.mission.content")}
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-6 text-[#C77DFF]">{t("about.sections.features.title")}</h2>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-[#9D4EDD] to-[#7B2CBF] rounded-full flex items-center justify-center flex-shrink-0">
                    <Heart className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-white mb-2">{t("about.sections.features.free.title")}</h3>
                    <p className="text-white/70">{t("about.sections.features.free.content")}</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-[#9D4EDD] to-[#7B2CBF] rounded-full flex items-center justify-center flex-shrink-0">
                    <Shield className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-white mb-2">{t("about.sections.features.safety.title")}</h3>
                    <p className="text-white/70">{t("about.sections.features.safety.content")}</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-[#9D4EDD] to-[#7B2CBF] rounded-full flex items-center justify-center flex-shrink-0">
                    <Users className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-white mb-2">{t("about.sections.features.community.title")}</h3>
                    <p className="text-white/70">{t("about.sections.features.community.content")}</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-[#9D4EDD] to-[#7B2CBF] rounded-full flex items-center justify-center flex-shrink-0">
                    <Zap className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-white mb-2">{t("about.sections.features.technology.title")}</h3>
                    <p className="text-white/70">{t("about.sections.features.technology.content")}</p>
                  </div>
                </div>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4 text-[#C77DFF]">{t("about.sections.story.title")}</h2>
              <p className="text-white/70 leading-relaxed">
                {t("about.sections.story.content")}
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4 text-[#C77DFF]">{t("about.sections.values.title")}</h2>
              <ul className="space-y-3 text-white/70">
                <li className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-[#C77DFF] rounded-full"></div>
                  <span>{t("about.sections.values.list.respect")}</span>
                </li>
                <li className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-[#C77DFF] rounded-full"></div>
                  <span>{t("about.sections.values.list.transparency")}</span>
                </li>
                <li className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-[#C77DFF] rounded-full"></div>
                  <span>{t("about.sections.values.list.privacy")}</span>
                </li>
                <li className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-[#C77DFF] rounded-full"></div>
                  <span>{t("about.sections.values.list.service")}</span>
                </li>
              </ul>
            </section>
          </div>
        </div>
      </div>
      
      <LoginFooter />
    </div>
  );
};

export default About;
