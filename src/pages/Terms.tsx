
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import LoginHeader from "@/components/login/LoginHeader";
import LoginFooter from "@/components/login/LoginFooter";

const Terms = () => {
  return (
    <div className="min-h-screen w-full flex flex-col bg-black text-white" dir="rtl">
      <LoginHeader />
      
      <div className="flex-1 container mx-auto px-6 py-12">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-[#C77DFF] to-[#E0AAFF] bg-clip-text text-transparent">
              תקנון השימוש
            </h1>
            <p className="text-xl text-white/70">
              ברוכים הבאים לאתר ההכרויות החינמי של ישראל
            </p>
          </div>

          {/* Back to home link */}
          <div className="mb-8" dir="ltr">
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
              <h2 className="text-2xl font-semibold mb-4 text-[#C77DFF]">קבלת התקנון</h2>
              <p className="text-white/70 leading-relaxed">
                השימוש באתר AkhlaDate מהווה הסכמה מלאה לתנאי השימוש המפורטים כאן. 
                אם אינכם מסכימים לתנאים אלה, אנא הימנעו משימוש באתר.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4 text-[#C77DFF]">שירות חינמי</h2>
              <p className="text-white/70 leading-relaxed">
                AkhlaDate הוא אתר הכרויות חינמי לחלוטין עבור כל המשתמשים בישראל. 
                אנו מתחייבים לשמור על השירות חינמי ונגיש לכולם.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4 text-[#C77DFF]">התנהגות ראויה</h2>
              <p className="text-white/70 leading-relaxed">
                משתמשי האתר מתחייבים להתנהג בכבוד ובתרבותיות. אסור לפרסם תוכן פוגעני, 
                מיני מפורש או כל תוכן אחר שעלול לפגוע במשתמשים אחרים.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4 text-[#C77DFF]">אמיתות המידע</h2>
              <p className="text-white/70 leading-relaxed">
                המשתמשים מתחייבים לספק מידע אמיתי ומדויק בפרופיל שלהם. 
                השימוש בזהות בדויה או מידע שקרי עלול להוביל לחסימת החשבון.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4 text-[#C77DFF]">גיל מינימום</h2>
              <p className="text-white/70 leading-relaxed">
                השימוש באתר מותר רק למשתמשים בני 18 ומעלה. 
                אנו שומרים לעצמנו את הזכות לבדוק גיל המשתמשים ולחסום חשבונות של קטינים.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4 text-[#C77DFF]">אחריות</h2>
              <p className="text-white/70 leading-relaxed">
                האתר אינו נושא באחריות למפגשים או לקשרים שנוצרים באמצעותו. 
                המשתמשים נושאים באחריות מלאה על הפעולות שלהם ועל הבטיחות האישית שלהם.
              </p>
            </section>
          </div>
        </div>
      </div>
      
      <LoginFooter />
    </div>
  );
};

export default Terms;
