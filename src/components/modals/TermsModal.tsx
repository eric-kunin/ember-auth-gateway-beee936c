// ✅ Final Animated Close Button (X) Integration
// Combines your rich modal layout with animated X button from full version

import React, { useState, useEffect, useRef } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Shield, FileText, X, ChevronUp, Heart, Users, Lock, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { t } from "i18next";
import { useTranslation } from "react-i18next";

interface TermsModalProps {
  isOpen: boolean;
  onClose: () => void;
  type: "terms" | "privacy";
}

const TermsModal = ({ isOpen, onClose, type }: TermsModalProps) => {
    const { t, i18n } = useTranslation();
        const isHebrew = i18n.language === "he";
        const direction = isHebrew ? "rtl" : "ltr";
  const [isScrolled, setIsScrolled] = useState(false);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [isClosing, setIsClosing] = useState(false);
  const scrollAreaRef = useRef<HTMLDivElement>(null);
  const isTerms = type === "terms";

  const handleScroll = (event: React.UIEvent<HTMLDivElement>) => {
    const scrollTop = event.currentTarget.scrollTop;
    setIsScrolled(scrollTop > 50);
    setShowScrollTop(scrollTop > 300);
  };

  const scrollToTop = () => {
    if (scrollAreaRef.current) {
      scrollAreaRef.current.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const handleClose = () => {
    setIsClosing(true);
    setTimeout(() => {
      onClose();
      setIsClosing(false);
    }, 200);
  };

  useEffect(() => {
    if (isOpen) {
      setIsScrolled(false);
      setShowScrollTop(false);
      setIsClosing(false);
    }
  }, [isOpen]);

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent

  className={`max-w-2xl max-h-[85vh] p-0 overflow-hidden 
    [&>div>button]:opacity-0 [&>div>button]:pointer-events-none
    transition-all duration-300 ease-in-out
    ${isClosing ? "scale-95 opacity-0" : "scale-100 opacity-100"}
    animate-in fade-in-0 zoom-in-95 duration-300
    data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95`}
>

        {/* ✅ Animated Close Button */}
        <Button
          variant="ghost"
          size="icon"
          className="absolute right-3 top-3 z-50 h-10 w-10 rounded-full 
            transition-all duration-300 ease-in-out
            hover:bg-red-100 dark:hover:bg-red-900/20 
            hover:scale-110 hover:rotate-90
            active:scale-95
            flex items-center justify-center 
            shadow-lg border border-gray-300 dark:border-gray-700 
            bg-white/90 dark:bg-gray-900/90 backdrop-blur-sm
            group animate-in fade-in-0 slide-in-from-right-2 duration-500"
          onClick={handleClose}
        >
          <X className="h-6 w-6 text-gray-600 dark:text-gray-300 
            transition-all duration-300 ease-in-out
            group-hover:text-red-600 dark:group-hover:text-red-400
            group-hover:scale-110" />
          <span className="sr-only">{t("close")}</span>
        </Button>

        <DialogHeader className="p-6 pb-4 text-right">
  <DialogTitle>
    <div className={`flex items-center justify-center gap-3 text-2xl font-bold 
                    text-purple-500 dark:text-purple-300 
                    transition-colors duration-300 
                    hover:${isTerms ? 'text-blue-600' : 'text-green-400'} dark:hover:${isTerms ? 'text-blue-400' : 'text-green-400'}`}>
      {isTerms ? (
        <>
          {t("termsModal.terms.title")}
          <FileText className="h-6 w-6 text-blue-600 transition-transform duration-300 hover:scale-110" />
        </>
      ) : (
        <>
          {t("termsModal.privacy.title")}
          <Shield className="h-6 w-6 text-green-600 transition-transform duration-300 hover:scale-110" />
        </>
      )}
    </div>
  </DialogTitle>

  <DialogDescription className="text-sm text-gray-600 dark:text-gray-400 text-right">
    {isTerms
      ? t("termsModal.terms.description")
      : t("termsModal.privacy.description")}
  </DialogDescription>
  {/* <Button
  className="mt-4 text-sm font-medium text-blue-600 dark:text-blue-400 hover:underline"
  onClick={() =>
    scrollAreaRef.current?.querySelector("#section-7")?.scrollIntoView({ behavior: "smooth" })
  }
>
  קפוץ לסעיף 7
</Button> */}

</DialogHeader>



        <ScrollArea className="px-6 pb-6 max-h-[60vh]">
          <div
            className="space-y-6 text-sm leading-relaxed text-right"
            dir="rtl"
          >
            {isTerms ? (
              <>
                {/* Terms Content with Staggered Animation */}
                <section className="animate-in slide-in-from-right-4 duration-700 delay-100">
                  <h3 className="font-semibold text-lg mb-3 flex items-center justify-start gap-2 text-right text-purple-400 dark:text-purple-200
                               transition-colors duration-300 hover:text-blue-600 dark:hover:text-blue-400">
                    1. {t("termsModal.terms.sections.1.title")}
                    <FileText className="h-5 w-5 text-blue-600 transition-transform duration-300 hover:scale-110" />
                  </h3>
                  <p className="text-gray-700 dark:text-gray-300 transition-colors duration-300">
                    {t("termsModal.terms.sections.1.content")}</p>
                </section>

                <section className="animate-in slide-in-from-right-4 duration-700 delay-200">
                  <h3 className="font-semibold text-lg mb-3 flex items-center justify-start gap-2 text-right text-purple-400 dark:text-purple-200
                               transition-colors duration-300 hover:text-green-600 dark:hover:text-green-400">
                    2. {t("termsModal.terms.sections.2.title")}
                    <Heart className="h-5 w-5 text-green-600 transition-transform duration-300 hover:scale-110" />
                  </h3>
                  <p className="text-gray-700 dark:text-gray-300 transition-colors duration-300 mb-3">
                    {t("termsModal.terms.sections.2.content.0")}
                  </p>
                  <p className="text-gray-700 dark:text-gray-300 transition-colors duration-300">
                    {t("termsModal.terms.sections.2.content.1")}
                  </p>
                </section>

                <section id="section-3" className="animate-in slide-in-from-right-4 duration-700 delay-300">
                  <h3 className="font-semibold text-lg mb-3 flex items-center justify-start gap-2 text-right text-purple-400 dark:text-purple-200
                               transition-colors duration-300 hover:text-blue-600 dark:hover:text-blue-400">
                    3. {t("termsModal.terms.sections.3.title")}
                    <Users className="h-5 w-5 text-blue-600 transition-transform duration-300 hover:scale-110" />
                  </h3>
                  <ul className="space-y-3 text-gray-700 dark:text-gray-300">
                    <li className="flex items-center justify-start gap-2 transition-transform duration-300 hover:-translate-x-1">
                      <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                      <span>{t("termsModal.terms.sections.3.items.0")}</span>
                    </li>
                    <li className="flex items-center justify-start gap-2 transition-transform duration-300 hover:-translate-x-1">
                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                      <span>{t("termsModal.terms.sections.3.items.1")}</span>
                    </li>
                    <li className="flex items-center justify-start gap-2 transition-transform duration-300 hover:-translate-x-1">
                      <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                      <span>{t("termsModal.terms.sections.3.items.2")}</span>
                    </li>
                    <li className="flex items-center justify-start gap-2 transition-transform duration-300 hover:-translate-x-1">
                      <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                      <span>{t("termsModal.terms.sections.3.items.3")}</span>
                    </li>
                  </ul>
                </section>

                <section className="animate-in slide-in-from-right-4 duration-700 delay-400">
                  <h3 className="font-semibold text-lg mb-3 flex items-center justify-start gap-2 text-right text-purple-400 dark:text-purple-200
                               transition-colors duration-300 hover:text-green-600 dark:hover:text-green-400">
                    4. {t("termsModal.terms.sections.4.title")}
                    <Shield className="h-5 w-5 text-green-600 transition-transform duration-300 hover:scale-110" />
                  </h3>
                  <ul className="space-y-3 text-gray-700 dark:text-gray-300">
                    <li className="flex items-center justify-start gap-2 transition-transform duration-300 hover:-translate-x-1">
                      <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                      <span>{t("termsModal.terms.sections.4.items.0")}</span>
                    </li>
                    <li className="flex items-center justify-start gap-2 transition-transform duration-300 hover:-translate-x-1">
                      <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                      <span>{t("termsModal.terms.sections.4.items.1")}</span>
                    </li>
                    <li className="flex items-center justify-start gap-2 transition-transform duration-300 hover:-translate-x-1">
                      <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                      <span>{t("termsModal.terms.sections.4.items.2")}</span>
                    </li>
                    <li className="flex items-center justify-start gap-2 transition-transform duration-300 hover:-translate-x-1">
                      <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                      <span>{t("termsModal.terms.sections.4.items.3")}</span>
                    </li>
                  </ul>
                </section>

                <section className="animate-in slide-in-from-right-4 duration-700 delay-500">
                  <h3 className="font-semibold text-lg mb-3 flex items-center justify-start gap-2 text-right text-purple-400 dark:text-purple-200
                               transition-colors duration-300 hover:text-blue-600 dark:hover:text-blue-400">
                    5. {t("termsModal.terms.sections.5.title")}
                    <FileText className="h-5 w-5 text-blue-600 transition-transform duration-300 hover:scale-110" />
                  </h3>
                  <p className="text-gray-700 dark:text-gray-300 transition-colors duration-300 mb-3">
                    {t("termsModal.terms.sections.5.content.0")}
                  </p>
                  <p className="text-gray-700 dark:text-gray-300 transition-colors duration-300">
                    {t("termsModal.terms.sections.5.content.1")}
                  </p>
                </section>

                <section className="animate-in slide-in-from-right-4 duration-700 delay-600">
                  <h3 className="font-semibold text-lg mb-3 flex items-center justify-start gap-2 text-right text-purple-400 dark:text-purple-200
                               transition-colors duration-300 hover:text-yellow-600 dark:hover:text-yellow-400">
                    6. {t("termsModal.terms.sections.6.title")}
                    <Shield className="h-5 w-5 text-yellow-600 transition-transform duration-300 hover:scale-110" />
                  </h3>
                  <p className="text-gray-700 dark:text-gray-300 transition-colors duration-300 mb-3">
                    {t("termsModal.terms.sections.6.content.0")}
                  </p>
                  <p className="text-gray-700 dark:text-gray-300 transition-colors duration-300">
                    {t("termsModal.terms.sections.6.content.0")}
                  </p>
                </section>

                <section id="section-7" className="animate-in slide-in-from-right-4 duration-700 delay-700">
                  <h3 className="font-semibold text-lg mb-3 flex items-center justify-start gap-2 text-right text-purple-400 dark:text-purple-200
                               transition-colors duration-300 hover:text-indigo-600 dark:hover:text-indigo-400">
                    7. {t("termsModal.terms.sections.7.title")}
                    <FileText className="h-5 w-5 text-indigo-600 transition-transform duration-300 hover:scale-110" />
                  </h3>
                  <p className="text-gray-700 dark:text-gray-300 transition-colors duration-300 mb-3">
                    {t("termsModal.terms.sections.7.content.0")}
                  </p>
                  <p className="text-gray-700 dark:text-gray-300 transition-colors duration-300">
                    {t("termsModal.terms.sections.7.content.1")}
                  </p>
                </section>
              </>
            ) : (
              <>
{/* Privacy Policy Content with Staggered Animation */}
                <section className="animate-in slide-in-from-right-4 duration-700 delay-100">
                  <h3 className="font-semibold text-lg mb-3 flex items-center justify-start gap-2 text-purple-400 dark:text-purple-200 text-right
                               transition-colors duration-300 hover:text-green-600 dark:hover:text-green-400">
                    1. {t("termsModal.privacy.sections.1.title")}
                    <Shield className="h-5 w-5 text-green-600 transition-transform duration-300 hover:scale-110" />
                  </h3>
                  <p className="text-gray-700 dark:text-gray-300 transition-colors duration-300 mb-3">
                    {t("termsModal.privacy.sections.1.content.0")}
                  </p>
                  <p className="text-gray-700 dark:text-gray-300 transition-colors duration-300">
                    {t("termsModal.privacy.sections.1.content.1")}
                  </p>
                </section>

                <section className="animate-in slide-in-from-right-4 duration-700 delay-200">
                  <h3 className="font-semibold text-lg mb-3 flex items-center justify-start gap-2 text-purple-400 dark:text-purple-200 text-right
                               transition-colors duration-300 hover:text-blue-600 dark:hover:text-blue-400">
                    2. {t("termsModal.privacy.sections.2.title")}
                    <FileText className="h-5 w-5 text-blue-600 transition-transform duration-300 hover:scale-110" />
                  </h3>
                  <ul className="space-y-3 text-gray-700 dark:text-gray-300 text-right">
                    <li className="flex items-center justify-start gap-2 transition-transform duration-300 hover:-translate-x-1">
                      <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                      <span>{t("termsModal.privacy.sections.2.items.0")}</span>
                    </li>
                    <li className="flex items-center justify-start gap-2 transition-transform duration-300 hover:-translate-x-1">
                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                      <span>{t("termsModal.privacy.sections.2.items.1")}</span>
                    </li>
                    <li className="flex items-center justify-start gap-2 transition-transform duration-300 hover:-translate-x-1">
                      <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                      <span>{t("termsModal.privacy.sections.2.items.2")}</span>
                    </li>
                    <li className="flex items-center justify-start gap-2 transition-transform duration-300 hover:-translate-x-1">
                      <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                      <span>{t("termsModal.privacy.sections.2.items.3")}</span>
                    </li>
                  </ul>
                </section>

                <section className="animate-in slide-in-from-right-4 duration-700 delay-300">
                  <h3 className="font-semibold text-lg mb-3 flex items-center justify-start gap-2 text-purple-400 dark:text-purple-200 text-right
                               transition-colors duration-300 hover:text-green-600 dark:hover:text-green-400">
                    3. {t("termsModal.privacy.sections.3.title")}
                    <Shield className="h-5 w-5 text-green-600 transition-transform duration-300 hover:scale-110" />
                  </h3>
                  <p className="text-gray-700 dark:text-gray-300 transition-colors duration-300 mb-3">
                    {t("termsModal.privacy.sections.3.content.0")}
                  </p>
                  <p className="text-gray-700 dark:text-gray-300 transition-colors duration-300">
                    {t("termsModal.privacy.sections.3.content.1")}
                  </p>
                </section>

                <section className="animate-in slide-in-from-right-4 duration-700 delay-400">
                  <h3 className="font-semibold text-lg mb-3 flex items-center justify-start gap-2 text-purple-400 dark:text-purple-200 text-right
                               transition-colors duration-300 hover:text-blue-600 dark:hover:text-blue-400">
                    4. {t("termsModal.privacy.sections.4.title")}
                    <Lock className="h-5 w-5 text-blue-600 transition-transform duration-300 hover:scale-110" />
                  </h3>
                  <p className="text-gray-700 dark:text-gray-300 transition-colors duration-300 mb-3">
                    {t("termsModal.privacy.sections.4.content.0")}
                  </p>
                  <p className="text-gray-700 dark:text-gray-300 transition-colors duration-300">
                    {t("termsModal.privacy.sections.4.content.1")}
                  </p>
                </section>

                <section className="animate-in slide-in-from-right-4 duration-700 delay-500">
                <h3 className="font-semibold text-lg mb-3 flex items-center justify-start gap-2 text-purple-400 dark:text-purple-200 text-right
                transition-colors duration-300 hover:text-green-600 dark:hover:text-green-400">
                    5. {t("termsModal.privacy.sections.5.title")}
                    <Shield className="h-5 w-5 text-green-500" />
                </h3>

                <ul className="space-y-3 text-gray-700 dark:text-gray-300 text-right">
                    <li className="flex items-center justify-start gap-2 transition-transform duration-300 hover:-translate-x-1">
                    <div className="w-2 h-2 bg-blue-500 rounded-full" />
                    <span>{t("termsModal.privacy.sections.5.items.0")}</span>
                    </li>
                    <li className="flex items-center justify-start gap-2 transition-transform duration-300 hover:-translate-x-1">
                    <div className="w-2 h-2 bg-yellow-500 rounded-full" />
                    <span>{t("termsModal.privacy.sections.5.items.1")}</span>
                    </li>
                    <li className="flex items-center justify-start gap-2 transition-transform duration-300 hover:-translate-x-1">
                    <div className="w-2 h-2 bg-red-500 rounded-full" />
                    <span>{t("termsModal.privacy.sections.5.items.2")}</span>
                    </li>
                    <li className="flex items-center justify-start gap-2 transition-transform duration-300 hover:-translate-x-1">
                    <div className="w-2 h-2 bg-purple-500 rounded-full" />
                    <span>{t("termsModal.privacy.sections.5.items.3")}</span>
                    </li>
                </ul>
                </section>

                <section className="animate-in slide-in-from-right-4 duration-700 delay-600">
                  <h3 className="font-semibold text-lg mb-3 flex items-center justify-start gap-2 text-right text-purple-400 dark:text-purple-200
                               transition-colors duration-300 hover:text-orange-600 dark:hover:text-orange-400">
                    6. {t("termsModal.privacy.sections.6.title")}
                    <FileText className="h-5 w-5 text-orange-600 transition-transform duration-300 hover:scale-110" />
                  </h3>
                  <p className="text-gray-700 dark:text-gray-300 transition-colors duration-300 mb-3">
                    {t("termsModal.privacy.sections.6.content.0")}
                  </p>
                  <p className="text-gray-700 dark:text-gray-300 transition-colors duration-300">
                    {t("termsModal.privacy.sections.6.content.1")}
                  </p>
                </section>

                <section className="animate-in slide-in-from-right-4 duration-700 delay-700">
                  <h3 className="font-semibold text-lg mb-3 flex items-center justify-start text-purple-400 dark:text-purple-200 text-right gap-2
                               transition-colors duration-300 hover:text-indigo-600 dark:hover:text-indigo-400">
                    7. {t("termsModal.privacy.sections.7.title")}
                    <Mail className="h-5 w-5 text-indigo-600 transition-transform duration-300 hover:scale-110" />
                  </h3>
                  <p className="text-gray-700 dark:text-gray-300 transition-colors duration-300 mb-3">
                    {t("termsModal.privacy.sections.7.content.0")}
                  </p>
                  <p className="text-gray-700 dark:text-gray-300 transition-colors duration-300">
                    {t("termsModal.privacy.sections.7.content.1")}
                  </p>
                </section>
              </>
            )}
          </div>
        </ScrollArea>
        {showScrollTop && (
  <>
    {/* Scroll to Bottom Button */}
    <Button
      variant="secondary"
      size="icon"
      className="fixed right-6 bottom-6 z-50 h-12 w-12 rounded-full
                 shadow-lg border border-gray-300 dark:border-gray-700
                 bg-white/90 dark:bg-gray-900/90 backdrop-blur-sm
                 transition-all duration-300 ease-in-out
                 hover:scale-110 hover:bg-green-50 dark:hover:bg-green-900/20
                 animate-in fade-in-0 slide-in-from-bottom-4 duration-500"
      onClick={() => {
        if (scrollAreaRef.current) {
          scrollAreaRef.current.scrollTo({ top: scrollAreaRef.current.scrollHeight, behavior: "smooth" });
        }
      }}
    >
      <ChevronUp className="rotate-180 h-6 w-6 text-green-600 transition-transform duration-300 hover:scale-110" />
      <span className="sr-only">{t("scrollToBottom")}</span>
    </Button>
  </>
)}

      </DialogContent>
    </Dialog>
  );
};

export default TermsModal;
