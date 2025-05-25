
import { Link } from "react-router-dom";
import { Heart, Shield, Users, Mail } from "lucide-react";

const LoginFooter = () => {
  return (
    <footer className="w-full mt-auto bg-gradient-to-r from-white/5 to-transparent backdrop-blur-sm border-t border-white/10">
      <div className="container mx-auto px-6 py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo and Description */}
          <div className="md:col-span-1">
            <div className="flex items-center mb-4">
              <img 
                src="/lovable-uploads/ce632b31-2764-479a-b377-2e93484bb8f1.png" 
                alt="Logo" 
                className="h-8 w-8 object-contain drop-shadow-lg"
              />
              <span className="ml-2 text-lg font-bold text-white">AkhlaDate</span>
            </div>
            <p className="text-white/70 text-sm leading-relaxed">
              פלטפורמת הכרויות מובילה למציאת קשרים אמיתיים ומשמעותיים. 
              הצטרפו לקהילה של אלפי רווקים המחפשים אהבה אמיתית.
            </p>
          </div>

          {/* About Us */}
          <div>
            <h3 className="text-white font-semibold mb-4 flex items-center gap-2">
              <Heart className="w-4 h-4 text-[#FFD1E3]" />
              אודותינו
            </h3>
            <ul className="space-y-2">
              <li>
                <Link to="/about" className="text-white/70 hover:text-white transition-colors text-sm">
                  הסיפור שלנו
                </Link>
              </li>
              <li>
                <Link to="/team" className="text-white/70 hover:text-white transition-colors text-sm">
                  הצוות שלנו
                </Link>
              </li>
              <li>
                <Link to="/careers" className="text-white/70 hover:text-white transition-colors text-sm">
                  קריירה
                </Link>
              </li>
              <li>
                <Link to="/press" className="text-white/70 hover:text-white transition-colors text-sm">
                  עיתונות
                </Link>
              </li>
            </ul>
          </div>

          {/* Safety & Support */}
          <div>
            <h3 className="text-white font-semibold mb-4 flex items-center gap-2">
              <Shield className="w-4 h-4 text-[#FFD1E3]" />
              בטיחות ותמיכה
            </h3>
            <ul className="space-y-2">
              <li>
                <Link to="/safety" className="text-white/70 hover:text-white transition-colors text-sm">
                  מדיניות בטיחות
                </Link>
              </li>
              <li>
                <Link to="/community-guidelines" className="text-white/70 hover:text-white transition-colors text-sm">
                  כללי קהילה
                </Link>
              </li>
              <li>
                <Link to="/help" className="text-white/70 hover:text-white transition-colors text-sm">
                  מרכז עזרה
                </Link>
              </li>
              <li>
                <Link to="/report" className="text-white/70 hover:text-white transition-colors text-sm">
                  דיווח על בעיה
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact & Legal */}
          <div>
            <h3 className="text-white font-semibold mb-4 flex items-center gap-2">
              <Mail className="w-4 h-4 text-[#FFD1E3]" />
              צור קשר ומשפטי
            </h3>
            <ul className="space-y-2">
              <li>
                <Link to="/contact" className="text-white/70 hover:text-white transition-colors text-sm">
                  צור קשר
                </Link>
              </li>
              <li>
                <Link to="/privacy" className="text-white/70 hover:text-white transition-colors text-sm">
                  מדיניות פרטיות
                </Link>
              </li>
              <li>
                <Link to="/terms" className="text-white/70 hover:text-white transition-colors text-sm">
                  תנאי שימוש
                </Link>
              </li>
              <li>
                <Link to="/cookies" className="text-white/70 hover:text-white transition-colors text-sm">
                  מדיניות עוגיות
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-white/10 mt-8 pt-6 flex flex-col md:flex-row justify-between items-center">
          <div className="flex items-center gap-4 mb-4 md:mb-0">
            <div className="flex items-center gap-2">
              <Users className="w-4 h-4 text-[#FFD1E3]" />
              <span className="text-white/70 text-sm">למעלה מ-100,000 משתמשים פעילים</span>
            </div>
          </div>
          
          <div className="text-center md:text-left">
            <p className="text-white/70 text-sm">
              © 2025 AkhlaDate. כל הזכויות שמורות.
            </p>
            <p className="text-white/50 text-xs mt-1">
              נבנה באהבה בישראל 🇮🇱
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default LoginFooter;
