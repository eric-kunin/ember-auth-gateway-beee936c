import { Link } from "react-router-dom";
import { Heart, Shield, Users, Mail, Star, Award, Globe } from "lucide-react";

const LoginFooter = () => {
  return (
    <footer className="w-full mt-auto 
                     bg-gradient-to-br from-[#fcfaff] via-[#f5eeff] to-[#efe5ff] dark:from-[#0B0205] dark:via-[#10002B] dark:to-black
                     backdrop-blur-lg border-t border-purple-300/20 transition-colors duration-500">
      <div className="container mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          {/* Logo and Description */}
          <div className="md:col-span-1 text-center md:text-left">
            <div className="flex items-center justify-center md:justify-start mb-6">
              <div className="p-2 rounded-xl bg-gradient-to-br from-[#9D4EDD] to-[#C77DFF] shadow-xl">
                <img 
                  src="/lovable-uploads/ce632b31-2764-479a-b377-2e93484bb8f1.png" 
                  alt="Logo" 
                  className="h-6 w-6 object-contain drop-shadow-lg"
                />
              </div>
              <span className="ml-3 text-lg font-bold bg-gradient-to-r from-white to-purple-200 bg-clip-text text-transparent">
                AkhlaDate
              </span>
            </div>
            <p className="text-purple-200/80 text-sm leading-relaxed mb-4">
              פלטפורמת הכרויות מובילה למציאת קשרים אמיתיים ומשמעותיים. 
              הצטרפו לקהילה של אלפי רווקים המחפשים אהבה אמיתית.
            </p>
            <div className="flex items-center justify-center md:justify-start gap-2 text-xs text-purple-300/70">
              <Award className="w-4 h-4" />
              <span>מאומת ובטוח</span>
            </div>
          </div>

          {/* About Us */}
          <div className="text-center md:text-left">
            <h3 className="text-white font-semibold mb-6 flex items-center gap-2">
              <div className="p-1.5 rounded-lg bg-gradient-to-br from-pink-400 to-pink-500">
                <Heart className="w-3 h-3 text-white" />
              </div>
              אודותינו
            </h3>
            <ul className="space-y-3">
              <li>
                <Link to="/about" className="text-purple-200/70 hover:text-white transition-all duration-300 text-sm
                               hover:translate-x-1 block hover:scale-105">
                  הסיפור שלנו
                </Link>
              </li>
              <li>
                <Link to="/team" className="text-purple-200/70 hover:text-white transition-all duration-300 text-sm
                               hover:translate-x-1 block hover:scale-105">
                  הצוות שלנו
                </Link>
              </li>
              <li>
                <Link to="/careers" className="text-purple-200/70 hover:text-white transition-all duration-300 text-sm
                                 hover:translate-x-1 block hover:scale-105">
                  קריירה
                </Link>
              </li>
              <li>
                <Link to="/press" className="text-purple-200/70 hover:text-white transition-all duration-300 text-sm
                               hover:translate-x-1 block hover:scale-105">
                  עיתונות
                </Link>
              </li>
            </ul>
          </div>

          {/* Safety & Support */}
          <div className="text-center md:text-left">
            <h3 className="text-white font-semibold mb-6 flex items-center gap-2">
              <div className="p-1.5 rounded-lg bg-gradient-to-br from-green-400 to-green-500">
                <Shield className="w-3 h-3 text-white" />
              </div>
              בטיחות ותמיכה
            </h3>
            <ul className="space-y-3">
              <li>
                <Link to="/safety" className="text-purple-200/70 hover:text-white transition-all duration-300 text-sm
                                 hover:translate-x-1 block hover:scale-105">
                  מדיניות בטיחות
                </Link>
              </li>
              <li>
                <Link to="/community-guidelines" className="text-purple-200/70 hover:text-white transition-all duration-300 text-sm
                                                         hover:translate-x-1 block hover:scale-105">
                  כללי קהילה
                </Link>
              </li>
              <li>
                <Link to="/help" className="text-purple-200/70 hover:text-white transition-all duration-300 text-sm
                                hover:translate-x-1 block hover:scale-105">
                  מרכז עזרה
                </Link>
              </li>
              <li>
                <Link to="/report" className="text-purple-200/70 hover:text-white transition-all duration-300 text-sm
                                 hover:translate-x-1 block hover:scale-105">
                  דיווח על בעיה
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact & Legal */}
          <div className="text-center md:text-left">
            <h3 className="text-white font-semibold mb-6 flex items-center gap-2">
              <div className="p-1.5 rounded-lg bg-gradient-to-br from-blue-400 to-blue-500">
                <Mail className="w-3 h-3 text-white" />
              </div>
              צור קשר ומשפטי
            </h3>
            <ul className="space-y-3">
              <li>
                <Link to="/contact" className="text-purple-200/70 hover:text-white transition-all duration-300 text-sm
                                   hover:translate-x-1 block hover:scale-105">
                  צור קשר
                </Link>
              </li>
              <li>
                <Link to="/privacy" className="text-purple-200/70 hover:text-white transition-all duration-300 text-sm
                                   hover:translate-x-1 block hover:scale-105">
                  מדיניות פרטיות
                </Link>
              </li>
              <li>
                <Link to="/terms" className="text-purple-200/70 hover:text-white transition-all duration-300 text-sm
                                 hover:translate-x-1 block hover:scale-105">
                  תנאי שימוש
                </Link>
              </li>
              <li>
                <Link to="/cookies" className="text-purple-200/70 hover:text-white transition-all duration-300 text-sm
                                   hover:translate-x-1 block hover:scale-105">
                  מדיניות עוגיות
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-purple-300/20 mt-10 pt-8 flex flex-col md:flex-row justify-between items-center text-center md:text-left">
          <div className="flex flex-col md:flex-row items-center gap-6 mb-6 md:mb-0">
            <div className="flex items-center gap-3 px-4 py-2 rounded-lg bg-gradient-to-r from-purple-500/20 to-pink-500/20 border border-purple-300/20">
              <Users className="w-4 h-4 text-purple-300" />
              <span className="text-purple-200/80 text-sm font-medium">למעלה מ-100,000 משתמשים פעילים</span>
            </div>
            <div className="flex items-center gap-3 px-4 py-2 rounded-lg bg-gradient-to-r from-green-500/20 to-blue-500/20 border border-green-300/20">
              <Globe className="w-4 h-4 text-green-300" />
              <span className="text-purple-200/80 text-sm font-medium">זמין בכל הארץ</span>
            </div>
          </div>
          
          <div className="text-center md:text-right">
            <p className="text-purple-200/70 text-sm mb-1">
              © 2025 AkhlaDate. כל הזכויות שמורות.
            </p>
            <p className="text-purple-300/60 text-xs flex items-center justify-center md:justify-end gap-1">
              <span>נבנה באהבה בישראל</span>
              <span className="text-sm">🇮🇱</span>
              <Star className="w-3 h-3 text-yellow-400 ml-1" />
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default LoginFooter;
