
import { Link } from "react-router-dom";
import { ArrowRight, Mail, Phone, MapPin, ArrowLeft } from "lucide-react";
import LoginHeader from "@/components/login/LoginHeader";
import LoginFooter from "@/components/login/LoginFooter";
import { useTranslation } from "react-i18next";

const Contact = () => {
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
              {t("contact.title")}
            </h1>
            <p className="text-xl text-white/70">
              {t("contact.subtitle")}
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
          <div className="bg-white/5 backdrop-blur-sm rounded-xl p-8 space-y-8"  dir={direction == 'rtl' ? 'rtl' : 'ltr'}>
            <section>
              <h2 className="text-2xl font-semibold mb-6 text-[#C77DFF]">{t("contact.sections.welcome.title")}</h2>
              <p className="text-white/70 leading-relaxed mb-8">
                {t("contact.sections.welcome.content")}
              </p>
            </section>

            <div className="grid md:grid-cols-2 gap-8">
              <section>
                <h3 className="text-xl font-semibold mb-4 text-[#C77DFF]">{t("contact.sections.contactInfo.title")}</h3>
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <Mail className="h-5 w-5 text-[#C77DFF]" />
                    <div>
                      <p className="font-medium">{t("contact.sections.contactInfo.email.label")}</p>
                      <p className="text-white/70">{t("contact.sections.contactInfo.email.value")}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-3">
                    <Phone className="h-5 w-5 text-[#C77DFF]" />
                    <div>
                      <p className="font-medium">{t("contact.sections.contactInfo.phone.label")}</p>
                      <p className="text-white/70">{t("contact.sections.contactInfo.phone.value")}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-3">
                    <MapPin className="h-5 w-5 text-[#C77DFF]" />
                    <div>
                      <p className="font-medium">{t("contact.sections.contactInfo.address.label")}</p>
                      <p className="text-white/70">{t("contact.sections.contactInfo.address.value")}</p>
                    </div>
                  </div>
                </div>
              </section>

              <section>
                <h3 className="text-xl font-semibold mb-4 text-[#C77DFF]">{t("contact.sections.hours.title")}</h3>
                <div className="space-y-2 text-white/70">
                  <p>{t("contact.sections.hours.weekdays")}</p>
                  <p>{t("contact.sections.hours.friday")}</p>
                  <p>{t("contact.sections.hours.saturday")}</p>
                </div>
              </section>
            </div>

            <section>
              <h3 className="text-xl font-semibold mb-4 text-[#C77DFF]">{t("contact.sections.faq.title")}</h3>
              <div className="space-y-4 text-white/70">
                <div>
                  <p className="font-medium text-white mb-2">{t("contact.sections.faq.questions.free.question")}</p>
                  <p>{t("contact.sections.faq.questions.free.answer")}</p>
                </div>
                
                <div>
                  <p className="font-medium text-white mb-2">{t("contact.sections.faq.questions.deleteAccount.question")}</p>
                  <p>{t("contact.sections.faq.questions.deleteAccount.answer")}</p>
                </div>
                
                <div>
                  <p className="font-medium text-white mb-2">{t("contact.sections.faq.questions.dataProtection.question")}</p>
                  <p>{t("contact.sections.faq.questions.dataProtection.answer")}</p>
                </div>
              </div>
            </section>
          </div>
        </div>
      </div>
      
      <LoginFooter />
    </div>
  );
};

export default Contact;
