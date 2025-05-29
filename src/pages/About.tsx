
import { Link } from "react-router-dom";
import { ArrowRight, Heart, Users, Shield, Zap } from "lucide-react";
import Footer from "@/components/layout/Footer";

const About = () => {
  return (
    <div className="min-h-screen w-full flex flex-col bg-gradient-to-br from-[#1E0B36] via-[#240046] to-[#10002B] text-white">
      <div className="flex-1 container mx-auto px-6 py-12">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-[#C77DFF] to-[#E0AAFF] bg-clip-text text-transparent">
              אודותינו
            </h1>
            <p className="text-xl text-custom-lighter">
              ברוכים הבאים לאתר ההכרויות החינמי של ישראל
            </p>
          </div>

          {/* Back to home link */}
          <div className="mb-8">
            <Link 
              to="/" 
              className="inline-flex items-center gap-2 text-[#C77DFF] hover:text-white transition-colors"
            >
              <ArrowRight className="h-4 w-4 rotate-180" />
              חזרה לעמוד הבית
            </Link>
          </div>

          {/* Content */}
          <div className="bg-white/5 backdrop-blur-sm rounded-xl p-8 space-y-8">
            <section>
              <h2 className="text-2xl font-semibold mb-4 text-[#C77DFF]">המשימה שלנו</h2>
              <p className="text-custom-lighter leading-relaxed">
                AkhlaDate נוסד במטרה לחבר בין לבבות בישראל ולספק פלטפורמה בטוחה, חינמית ונגישה 
                לכל מי שמחפש אהבה אמיתית. אנו מאמינים שכל אדם ראוי למצוא את בן או בת הזוג שלו, 
                ללא תלות במצב הכלכלי או הרקע החברתי.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-6 text-[#C77DFF]">מה שמייחד אותנו</h2>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-[#9D4EDD] to-[#7B2CBF] rounded-full flex items-center justify-center flex-shrink-0">
                    <Heart className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-white mb-2">חינמי לגמרי</h3>
                    <p className="text-custom-lighter">כל התכונות באתר זמינות בחינם, ללא עלויות נסתרות.</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-[#9D4EDD] to-[#7B2CBF] rounded-full flex items-center justify-center flex-shrink-0">
                    <Shield className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-white mb-2">בטיחות מקסימלית</h3>
                    <p className="text-custom-lighter">מערכת אבטחה מתקדמת להגנה על הפרטיות והבטיחות שלכם.</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-[#9D4EDD] to-[#7B2CBF] rounded-full flex items-center justify-center flex-shrink-0">
                    <Users className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-white mb-2">קהילה ישראלית</h3>
                    <p className="text-custom-lighter">מתמחים בהתאמות לקהל הישראלי עם הבנה של התרבות המקומית.</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-[#9D4EDD] to-[#7B2CBF] rounded-full flex items-center justify-center flex-shrink-0">
                    <Zap className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-white mb-2">טכנולוגיה מתקדמת</h3>
                    <p className="text-custom-lighter">אלגוריתמי התאמה חכמים למציאת ההתאמה המושלמת עבורכם.</p>
                  </div>
                </div>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4 text-[#C77DFF]">הסיפור שלנו</h2>
              <p className="text-custom-lighter leading-relaxed">
                AkhlaDate נוסד בשנת 2025 על ידי צוות של מפתחים ומעצבים ישראלים שהבינו שיש צורך 
                באתר הכרויות אמיתי וחינמי בישראל. אנו מאמינים שאהבה לא צריכה לעלות כסף, 
                ושכל אדם ראוי למצוא את האושר שלו.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4 text-[#C77DFF]">הערכים שלנו</h2>
              <ul className="space-y-3 text-custom-lighter">
                <li className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-[#C77DFF] rounded-full"></div>
                  <span>כבוד וכבוד הדדי בין כל המשתמשים</span>
                </li>
                <li className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-[#C77DFF] rounded-full"></div>
                  <span>שקיפות מלאה ללא עלויות נסתרות</span>
                </li>
                <li className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-[#C77DFF] rounded-full"></div>
                  <span>הגנה על הפרטיות והבטיחות של המשתמשים</span>
                </li>
                <li className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-[#C77DFF] rounded-full"></div>
                  <span>שירות לקוחות מעולה ותמיכה מתמשכת</span>
                </li>
              </ul>
            </section>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default About;
