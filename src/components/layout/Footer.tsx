
import { Link } from "react-router-dom";
import { useState } from "react";
import TermsModal from "../modals/TermsModal";
import { useTranslation } from "react-i18next";

const Footer = () => {
  const { t } = useTranslation();
  const [modalState, setModalState] = useState<{ isOpen: boolean; type: 'terms' | 'privacy' | null }>({
    isOpen: false,
    type: null
  });

  const openModal = (type: 'terms' | 'privacy') => {
    setModalState({ isOpen: true, type });
  };

  const closeModal = () => {
    setModalState({ isOpen: false, type: null });
  };

  return (
    <>
      <footer className="w-full py-4 px-6 mt-auto bg-gradient-to-r from-white/5 to-transparent backdrop-blur-sm border-t border-white/10">
        <div className="container mx-auto flex flex-col sm:flex-row justify-between items-center">
          <div className="mb-4 sm:mb-0">
            <p className="text-sm text-custom-lighter">{t("footerCopyright")}AkhlaDate.</p>
          </div>
          <div className="flex gap-6">
            <button 
              onClick={() => openModal('privacy')}
              className="text-sm text-custom-lighter hover:text-white transition-colors cursor-pointer"
            >
              {t("footerPrivacy")}
            </button>
            <button 
              onClick={() => openModal('terms')}
              className="text-sm text-custom-lighter hover:text-white transition-colors cursor-pointer"
            >
              {t("footerTerms")}
            </button>
            <Link to="/about" className="text-sm text-custom-lighter hover:text-white transition-colors">{t("footerAbout")}</Link>
            <Link to="/contact" className="text-sm text-custom-lighter hover:text-white transition-colors">{t("footerContact")}</Link>
          </div>
        </div>
      </footer>

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

export default Footer;
