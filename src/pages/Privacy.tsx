
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import LoginHeader from "@/components/login/LoginHeader";
import LoginFooter from "@/components/login/LoginFooter";

const Privacy = () => {
  return (
    <div className="min-h-screen w-full flex flex-col bg-black text-white" dir="rtl">
      <LoginHeader />
      
      <div className="flex-1 container mx-auto px-6 py-12">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-[#C77DFF] to-[#E0AAFF] bg-clip-text text-transparent">
              מדיניות פרטיות
            </h1>
            <p className="text-xl text-white/70">
              ברוכים הבאים לאתר ההכרויות החינמי של ישראל
            </p>
          </div>

          {/* Back to home link */}
          <div className="mb-8">
            <Link 
              to="/login" 
              className="inline-flex items-center gap-2 text-[#C77DFF] hover:text-white transition-colors"
            >
              <ArrowRight className="h-4 w-4 rotate-180" />
              חזרה לעמוד הבית
            </Link>
          </div>

          {/* Content */}
          <div className="bg-white/5 backdrop-blur-sm rounded-xl p-8 space-y-8">
            <section>
              <h2 className="text-2xl font-semibold mb-4 text-[#C77DFF]">איסוף מידע</h2>
              <p className="text-white/70 leading-relaxed">
                אנו אוספים מידע שאתם מספקים בעת הרשמה לאתר, כולל שם, כתובת דוא"ל, תאריך לידה ותמונות פרופיל. 
                המידע נאסף במטרה לספק לכם חווית היכרויות מותאמת ובטוחה.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4 text-[#C77DFF]">שימוש במידע</h2>
              <p className="text-white/70 leading-relaxed">
                המידע שלכם משמש להתאמת פרופילים, שיפור השירות ושמירה על בטיחות האתר. 
                אנו לא נשתף את המידע האישי שלכם עם צדדים שלישיים ללא הסכמתכם המפורשת.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4 text-[#C77DFF]">אבטחת מידע</h2>
              <p className="text-white/70 leading-relaxed">
                אנו משתמשים בטכנולוגיות הצפנה מתקדמות כדי להגן על המידע האישי שלכם. 
                כל הנתונים מוצפנים ומאוחסנים בשרתים מאובטחים.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4 text-[#C77DFF]">זכויותיכם</h2>
              <p className="text-white/70 leading-relaxed">
                יש לכם זכות לגשת למידע האישי שלכם, לעדכן אותו או למחוק את החשבון בכל עת. 
                ניתן לפנות אלינו בכל שאלה הנוגעת לפרטיותכם.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4 text-[#C77DFF]">צור קשר</h2>
              <p className="text-white/70 leading-relaxed">
                לשאלות נוספות על מדיניות הפרטיות, ניתן לפנות אלינו בדוא"ל: privacy@akhladate.com
              </p>
            </section>
          </div>
        </div>
      </div>
      
      <LoginFooter />
    </div>
  );
};

export default Privacy;
