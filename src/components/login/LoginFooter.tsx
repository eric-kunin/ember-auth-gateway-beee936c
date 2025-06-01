import { Link } from "react-router-dom";
import logo2 from "../../assets/images/logo2.png";
import { useTranslation } from "react-i18next";
import React from "react";

const LoginFooter = () => {
  const { t, i18n } = useTranslation();
  const isHebrew = i18n.language === "he";
  const direction = isHebrew ? "rtl" : "ltr";

  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full py-1 px-6 dark:bg-black text-gray-800 dark:text-white border-t border-purple-300/30 dark:border-purple-300/20 backdrop-blur-md dark:backdrop-blur-none shadow-sm dark:shadow-none z-50">
      <div
        className={`max-w-screen-xl mx-auto text-center flex flex-col items-center gap-2 text-xs`}
        dir={direction}
      >
        {/* Navigation Links */}
        <p className="flex flex-wrap justify-center gap-4 font-medium">
          <Link to="/privacy" className="text-purple-700 dark:text-white hover:text-purple-900 dark:hover:text-purple-300 transition-all duration-300">
            {t("footerPrivacy")}
          </Link>
          <Link to="/terms" className="text-purple-700 dark:text-white hover:text-purple-900 dark:hover:text-purple-300 transition-all duration-300">
            {t("footerTerms")}
          </Link>
          <Link to="/contact" className="text-purple-700 dark:text-white hover:text-purple-900 dark:hover:text-purple-300 transition-all duration-300">
            {t("footerContact")}
          </Link>
          <Link to="/about" className="text-purple-700 dark:text-white hover:text-purple-900 dark:hover:text-purple-300 transition-all duration-300">
            {t("footerAbout")}
          </Link>
        </p>

        {/* Copyright */}
        <p className={`text-xs text-gray-700 dark:text-white flex items-center justify-center gap-1`}>
          {isHebrew ? (
            <>
              <span>© {currentYear} {t("footerRights")}</span>
              <span className="font-semibold">AKHLADATE</span>
              <img src={logo2} alt="Logo" className="h-4 w-4 object-contain drop-shadow-sm" />
            </>
          ) : (
            <>
              <span>© {currentYear} {t("footerRights")}</span>
              <span className="font-semibold">AKHLADATE</span>
              <img src={logo2} alt="Logo" className="h-4 w-4 object-contain drop-shadow-sm" />
            </>
          )}
        </p>
      </div>
    </footer>
  );
};

export default LoginFooter;
