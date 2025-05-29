
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";

interface TermsModalProps {
  isOpen: boolean;
  onClose: () => void;
  type: 'terms' | 'privacy';
}

const TermsModal = ({ isOpen, onClose, type }: TermsModalProps) => {
  const isTerms = type === 'terms';

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[80vh] bg-white dark:bg-[#0B0205] border border-[#A367B1]/20">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold bg-gradient-to-r from-[#C77DFF] to-[#E0AAFF] bg-clip-text text-transparent text-center" dir="rtl">
            {isTerms ? 'תקנון השימוש' : 'מדיניות פרטיות'}
          </DialogTitle>
        </DialogHeader>
        
        <ScrollArea className="max-h-[60vh] pr-6" dir="rtl">
          <div className="space-y-6 text-right">
            {isTerms ? (
              // Terms of Service Content
              <>
                <section>
                  <h3 className="text-lg font-semibold mb-3 text-[#C77DFF]">קבלת התקנון</h3>
                  <p className="text-gray-700 dark:text-white/70 leading-relaxed">
                    השימוש באתר AkhlaDate מהווה הסכמה מלאה לתנאי השימוש המפורטים כאן. 
                    אם אינכם מסכימים לתנאים אלה, אנא הימנעו משימוש באתר.
                  </p>
                </section>

                <section>
                  <h3 className="text-lg font-semibold mb-3 text-[#C77DFF]">שירות חינמי</h3>
                  <p className="text-gray-700 dark:text-white/70 leading-relaxed">
                    AkhlaDate הוא אתר הכרויות חינמי לחלוטין עבור כל המשתמשים בישראל. 
                    אנו מתחייבים לשמור על השירות חינמי ונגיש לכולם.
                  </p>
                </section>

                <section>
                  <h3 className="text-lg font-semibold mb-3 text-[#C77DFF]">התנהגות ראויה</h3>
                  <p className="text-gray-700 dark:text-white/70 leading-relaxed">
                    משתמשי האתר מתחייבים להתנהג בכבוד ובתרבותיות. אסור לפרסם תוכן פוגעני, 
                    מיני מפורש או כל תוכן אחר שעלול לפגוע במשתמשים אחרים.
                  </p>
                </section>

                <section>
                  <h3 className="text-lg font-semibold mb-3 text-[#C77DFF]">אמיתות המידע</h3>
                  <p className="text-gray-700 dark:text-white/70 leading-relaxed">
                    המשתמשים מתחייבים לספק מידע אמיתי ומדויק בפרופיל שלהם. 
                    השימוש בזהות בדויה או מידע שקרי עלול להוביל לחסימת החשבון.
                  </p>
                </section>

                <section>
                  <h3 className="text-lg font-semibold mb-3 text-[#C77DFF]">גיל מינימום</h3>
                  <p className="text-gray-700 dark:text-white/70 leading-relaxed">
                    השימוש באתר מותר רק למשתמשים בני 18 ומעלה. 
                    אנו שומרים לעצמנו את הזכות לבדוק גיל המשתמשים ולחסום חשבונות של קטינים.
                  </p>
                </section>

                <section>
                  <h3 className="text-lg font-semibold mb-3 text-[#C77DFF]">אחריות</h3>
                  <p className="text-gray-700 dark:text-white/70 leading-relaxed">
                    האתר אינו נושא באחריות למפגשים או לקשרים שנוצרים באמצעותו. 
                    המשתמשים נושאים באחריות מלאה על הפעולות שלהם ועל הבטיחות האישית שלהם.
                  </p>
                </section>
              </>
            ) : (
              // Privacy Policy Content
              <>
                <section>
                  <h3 className="text-lg font-semibold mb-3 text-[#C77DFF]">איסוף מידע</h3>
                  <p className="text-gray-700 dark:text-white/70 leading-relaxed">
                    אנו אוספים מידע שאתם מספקים בעת הרשמה לאתר, כולל שם, כתובת דוא"ל, תאריך לידה ותמונות פרופיל. 
                    המידע נאסף במטרה לספק לכם חווית היכרויות מותאמת ובטוחה.
                  </p>
                </section>

                <section>
                  <h3 className="text-lg font-semibold mb-3 text-[#C77DFF]">שימוש במידע</h3>
                  <p className="text-gray-700 dark:text-white/70 leading-relaxed">
                    המידע שלכם משמש להתאמת פרופילים, שיפור השירות ושמירה על בטיחות האתר. 
                    אנו לא נשתף את המידע האישי שלכם עם צדדים שלישיים ללא הסכמתכם המפורשת.
                  </p>
                </section>

                <section>
                  <h3 className="text-lg font-semibold mb-3 text-[#C77DFF]">אבטחת מידע</h3>
                  <p className="text-gray-700 dark:text-white/70 leading-relaxed">
                    אנו משתמשים בטכנולוגיות הצפנה מתקדמות כדי להגן על המידע האישי שלכם. 
                    כל הנתונים מוצפנים ומאוחסנים בשרתים מאובטחים.
                  </p>
                </section>

                <section>
                  <h3 className="text-lg font-semibold mb-3 text-[#C77DFF]">זכויותיכם</h3>
                  <p className="text-gray-700 dark:text-white/70 leading-relaxed">
                    יש לכם זכות לגשת למידע האישי שלכם, לעדכן אותו או למחוק את החשבון בכל עת. 
                    ניתן לפנות אלינו בכל שאלה הנוגעת לפרטיותכם.
                  </p>
                </section>

                <section>
                  <h3 className="text-lg font-semibold mb-3 text-[#C77DFF]">צור קשר</h3>
                  <p className="text-gray-700 dark:text-white/70 leading-relaxed">
                    לשאלות נוספות על מדיניות הפרטיות, ניתן לפנות אלינו בדוא"ל: privacy@akhladate.com
                  </p>
                </section>
              </>
            )}
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
};

export default TermsModal;
