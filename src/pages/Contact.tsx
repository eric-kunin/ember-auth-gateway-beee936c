
import { Link } from "react-router-dom";
import { ArrowRight, Mail, Phone, MapPin } from "lucide-react";
import LoginHeader from "@/components/login/LoginHeader";
import LoginFooter from "@/components/login/LoginFooter";

const Contact = () => {
  return (
    <div className="min-h-screen w-full flex flex-col bg-black text-white" dir="rtl">
      <LoginHeader />
      
      <div className="flex-1 container mx-auto px-6 py-12">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-[#C77DFF] to-[#E0AAFF] bg-clip-text text-transparent">
              צור קשר
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
              <h2 className="text-2xl font-semibold mb-6 text-[#C77DFF]">נשמח לשמוע מכם!</h2>
              <p className="text-white/70 leading-relaxed mb-8">
                AkhlaDate הוא אתר ההכרויות החינמי של ישראל. אנו כאן כדי לעזור לכם למצוא את האהבה 
                ולענות על כל שאלה שיש לכם. צרו איתנו קשר בכל דרך שנוחה לכם.
              </p>
            </section>

            <div className="grid md:grid-cols-2 gap-8">
              <section>
                <h3 className="text-xl font-semibold mb-4 text-[#C77DFF]">פרטי התקשרות</h3>
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <Mail className="h-5 w-5 text-[#C77DFF]" />
                    <div>
                      <p className="font-medium">דוא"ל</p>
                      <p className="text-white/70">support@akhladate.com</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-3">
                    <Phone className="h-5 w-5 text-[#C77DFF]" />
                    <div>
                      <p className="font-medium">טלפון</p>
                      <p className="text-white/70">03-1234567</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-3">
                    <MapPin className="h-5 w-5 text-[#C77DFF]" />
                    <div>
                      <p className="font-medium">כתובת</p>
                      <p className="text-white/70">תל אביב, ישראל</p>
                    </div>
                  </div>
                </div>
              </section>

              <section>
                <h3 className="text-xl font-semibold mb-4 text-[#C77DFF]">שעות פעילות</h3>
                <div className="space-y-2 text-white/70">
                  <p>ראשון - חמישי: 9:00 - 18:00</p>
                  <p>שישי: 9:00 - 14:00</p>
                  <p>שבת: סגור</p>
                </div>
              </section>
            </div>

            <section>
              <h3 className="text-xl font-semibold mb-4 text-[#C77DFF]">שאלות נפוצות</h3>
              <div className="space-y-4 text-white/70">
                <div>
                  <p className="font-medium text-white mb-2">האם השירות באמת חינמי?</p>
                  <p>כן! AkhlaDate הוא אתר הכרויות חינמי לחלוטין לכל המשתמשים בישראל.</p>
                </div>
                
                <div>
                  <p className="font-medium text-white mb-2">איך אני יכול למחוק את החשבון שלי?</p>
                  <p>ניתן למחוק את החשבון בכל עת דרך הגדרות הפרופיל או על ידי פניה אלינו.</p>
                </div>
                
                <div>
                  <p className="font-medium text-white mb-2">האם המידע שלי מוגן?</p>
                  <p>בהחלט! אנו משתמשים בטכנולוגיות הצפנה מתקדמות כדי להגן על הפרטיות שלכם.</p>
                </div>
              </div>
            </section>
          </div>
        </div>
      </div>
      
      <LoginFooter />
    </div>
  );
};

export default Contact;
