import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { motion, AnimatePresence } from 'framer-motion';

const LanguageSwitcher = () => {
  const { i18n } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);

  const languages = [
    { code: 'en', name: 'English', short: 'En', countryCode: 'gb' },
    { code: 'he', name: 'עברית', short: 'He', countryCode: 'il' },
    { code: 'de', name: 'Deutsch', short: 'De', countryCode: 'de' },
    { code: 'fr', name: 'Français', short: 'Fr', countryCode: 'fr' },
    { code: 'it', name: 'Italiano', short: 'It', countryCode: 'it' },
    { code: 'no', name: 'Norsk', short: 'No', countryCode: 'no' },
    { code: 'pl', name: 'Polski', short: 'Pl', countryCode: 'pl' },
    { code: 'sv', name: 'Svenska', short: 'Sv', countryCode: 'se' },
    { code: 'uk', name: 'Українська', short: 'Uk', countryCode: 'ua' },
  ];

  const currentLanguage = languages.find(lang => lang.code === i18n.language) || languages[0];

  const handleLanguageSelect = (langCode: string) => {
    i18n.changeLanguage(langCode);
    document.documentElement.lang = langCode;
    document.documentElement.dir = langCode === 'he' ? 'rtl' : 'ltr';
    setIsOpen(false);
  };

  useEffect(() => {
    const close = (e: MouseEvent) => {
      if (!(e.target as HTMLElement)?.closest('#language-switcher')) setIsOpen(false);
    };
    document.addEventListener('click', close);
    return () => document.removeEventListener('click', close);
  }, []);

  return (
    <div id="language-switcher" className="relative z-50">
      {/* Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-3 py-2 rounded-md border transition-all duration-300 min-w-[100px] justify-between
        shadow-sm dark:border-[#3B185F] border-[#E0AAFF]/30 bg-white dark:bg-[#240046] 
        hover:bg-[#f3eaff] dark:hover:bg-[#3C096C] hover:shadow-lg dark:hover:shadow-purple-900/50 hover:scale-[1.03]"
      >
        <div className="flex items-center gap-2">
          <span className={`fi fi-${currentLanguage.countryCode} fis rounded-full w-5 h-5`}></span>
          <span className="hidden md:block font-medium text-[#240046] dark:text-white">
            {currentLanguage.name}
          </span>
          <span className="block md:hidden font-medium text-[#240046] dark:text-white">
            {currentLanguage.short}
          </span>
        </div>
        <svg
          className={`w-4 h-4 text-[#7B2CBF] dark:text-[#E0AAFF] transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {/* Dropdown - animated */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2 }}
            className="absolute right-0 mt-2 w-64 rounded-lg shadow-xl border border-[#E0AAFF]/30 dark:border-[#3B185F] bg-white dark:bg-[#1E0B36] overflow-hidden"
          >
            <div className="grid grid-cols-2 gap-0">
              {languages.map((lang, index) => (
                <button
                  key={lang.code}
                  onClick={() => handleLanguageSelect(lang.code)}
                  className={`flex items-center gap-3 px-4 py-3 text-left transition-all duration-200 group
                    ${i18n.language === lang.code
                      ? 'bg-[#E0AAFF]/30 dark:bg-[#3C096C] text-[#5A189A] dark:text-[#C77DFF]'
                      : 'text-[#240046] dark:text-white'}
                    hover:bg-[#E0AAFF]/20 dark:hover:bg-[#5A189A]/20 hover:shadow-md hover:scale-[1.02]
                    ${index % 2 === 1 ? 'border-l border-[#E0AAFF]/20 dark:border-[#3B185F]' : ''}
                    ${index >= 2 ? 'border-t border-[#E0AAFF]/20 dark:border-[#3B185F]' : ''}`}
                >
                  <span className={`fi fi-${lang.countryCode} fis rounded-full w-5 h-5`}></span>
                  <span className="font-medium truncate">{lang.name}</span>
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default LanguageSwitcher;
