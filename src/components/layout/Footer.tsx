
import { Link } from "react-router-dom";
import { useState } from "react";
import TermsModal from "../modals/TermsModal";

const Footer = () => {
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
            <p className="text-sm text-custom-lighter">© 2025 AkhlaDate. All rights reserved.</p>
          </div>
          <div className="flex gap-6">
            <button 
              onClick={() => openModal('privacy')}
              className="text-sm text-custom-lighter hover:text-white transition-colors cursor-pointer"
            >
              מדיניות פרטיות
            </button>
            <button 
              onClick={() => openModal('terms')}
              className="text-sm text-custom-lighter hover:text-white transition-colors cursor-pointer"
            >
              תקנון השימוש
            </button>
            <Link to="/about" className="text-sm text-custom-lighter hover:text-white transition-colors">אודותינו</Link>
            <Link to="/contact" className="text-sm text-custom-lighter hover:text-white transition-colors">צור קשר</Link>
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
