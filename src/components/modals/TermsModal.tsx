
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Shield, FileText, X } from "lucide-react";
import { Button } from "@/components/ui/button";

interface TermsModalProps {
  isOpen: boolean;
  onClose: () => void;
  type: 'terms' | 'privacy';
}

const TermsModal = ({ isOpen, onClose, type }: TermsModalProps) => {
  const isTerms = type === 'terms';
  
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[80vh] p-0 overflow-hidden">
        {/* Custom close button */}
        <Button
          variant="ghost"
          size="icon"
          className="absolute right-4 top-4 z-10 h-8 w-8 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800"
          onClick={onClose}
        >
          <X className="h-5 w-5" />
          <span className="sr-only">Close</span>
        </Button>
        
        <DialogHeader className="p-6 pb-4">
          <DialogTitle className="flex items-center gap-3 text-xl font-bold">
            {isTerms ? (
              <>
                <FileText className="h-6 w-6 text-blue-600" />
                תקנון השימוש
              </>
            ) : (
              <>
                <Shield className="h-6 w-6 text-green-600" />
                מדיניות פרטיות
              </>
            )}
          </DialogTitle>
          <DialogDescription className="text-sm text-gray-600 dark:text-gray-400">
            {isTerms 
              ? "התנאים וההגבלות לשימוש באפליקציה"
              : "מדיניות הפרטיות והגנת המידע שלנו"
            }
          </DialogDescription>
        </DialogHeader>
        
        <ScrollArea className="px-6 pb-6 max-h-[60vh]">
          <div className="space-y-4 text-sm leading-relaxed">
            {isTerms ? (
              // Terms of Service Content
              <>
                <section>
                  <h3 className="font-semibold text-lg mb-2 flex items-center gap-2">
                    <FileText className="h-4 w-4" />
                    1. קבלת התנאים
                  </h3>
                  <p className="text-gray-700 dark:text-gray-300">
                    השימוש באפליקציה מהווה הסכמה מלאה לתנאים המפורטים כאן. אם אינך מסכים לתנאים אלו, אנא הפסק את השימוש באפליקציה.
                  </p>
                </section>

                <section>
                  <h3 className="font-semibold text-lg mb-2">2. תיאור השירות</h3>
                  <p className="text-gray-700 dark:text-gray-300">
                    AkhlaDate היא פלטפורמה לכרות היכרויות המיועדת לציבור הדתי. השירות מאפשר למשתמשים ליצור פרופיל, לחפש אחר בני זוג פוטנציאליים ולקיים תקשורת.
                  </p>
                </section>

                <section>
                  <h3 className="font-semibold text-lg mb-2">3. הרשמה וחשבון משתמש</h3>
                  <ul className="list-disc list-inside space-y-1 text-gray-700 dark:text-gray-300">
                    <li>המשתמש מתחייב לספק מידע אמיתי ומדויק</li>
                    <li>גיל מינימלי לשימוש: 18 שנים</li>
                    <li>אסור ליצור יותר מחשבון אחד לכל משתמש</li>
                    <li>המשתמש אחראי לשמירה על סודיות הסיסמה</li>
                  </ul>
                </section>

                <section>
                  <h3 className="font-semibold text-lg mb-2">4. כללי התנהגות</h3>
                  <ul className="list-disc list-inside space-y-1 text-gray-700 dark:text-gray-300">
                    <li>יש להתנהג בכבוד ובהגינות כלפי משתמשים אחרים</li>
                    <li>אסור לפרסם תוכן פוגעני, מטעה או לא חוקי</li>
                    <li>אסור להציק או לפגוע במשתמשים אחרים</li>
                    <li>יש לשמור על ערכי הצניעות והמסורת</li>
                  </ul>
                </section>

                <section>
                  <h3 className="font-semibold text-lg mb-2">5. זכויות יוצרים</h3>
                  <p className="text-gray-700 dark:text-gray-300">
                    כל התוכן באפליקציה מוגן בזכויות יוצרים. המשתמש מעניק רישיון להשתמש בתוכן שהוא מעלה לצורך הפעלת השירות.
                  </p>
                </section>

                <section>
                  <h3 className="font-semibold text-lg mb-2">6. הגבלת אחריות</h3>
                  <p className="text-gray-700 dark:text-gray-300">
                    החברה אינה אחראית לתוצאות השימוש באפליקציה, לרבות היכרויות, פגישות או יחסים שנוצרים באמצעותה.
                  </p>
                </section>

                <section>
                  <h3 className="font-semibold text-lg mb-2">7. שינויים בתנאים</h3>
                  <p className="text-gray-700 dark:text-gray-300">
                    החברה שומרת לעצמה את הזכות לעדכן את התנאים מעת לעת. המשתמשים יקבלו הודעה על שינויים מהותיים.
                  </p>
                </section>
              </>
            ) : (
              // Privacy Policy Content
              <>
                <section>
                  <h3 className="font-semibold text-lg mb-2 flex items-center gap-2">
                    <Shield className="h-4 w-4" />
                    1. איסוף מידע
                  </h3>
                  <p className="text-gray-700 dark:text-gray-300">
                    אנו אוספים מידע שאתה מספק בעת ההרשמה: שם, גיל, מיקום, תמונות ומידע נוסף לצורך יצירת הפרופיל.
                  </p>
                </section>

                <section>
                  <h3 className="font-semibold text-lg mb-2">2. שימוש במידע</h3>
                  <ul className="list-disc list-inside space-y-1 text-gray-700 dark:text-gray-300">
                    <li>הצגת הפרופיל למשתמשים אחרים</li>
                    <li>שיפור השירות והתאמת המלצות</li>
                    <li>תקשורת בנוגע לשירות</li>
                    <li>מניעת הונאות ושמירה על האבטחה</li>
                  </ul>
                </section>

                <section>
                  <h3 className="font-semibold text-lg mb-2">3. שיתוף מידע</h3>
                  <p className="text-gray-700 dark:text-gray-300">
                    איננו משתפים מידע אישי עם צדדים שלישיים, למעט במקרים הנדרשים על פי חוק או לצורך הפעלת השירות.
                  </p>
                </section>

                <section>
                  <h3 className="font-semibold text-lg mb-2">4. אבטחת מידע</h3>
                  <p className="text-gray-700 dark:text-gray-300">
                    אנו נוקטים באמצעי אבטחה מתקדמים להגנה על המידע שלך, כולל הצפנה ואימות דו-שלבי.
                  </p>
                </section>

                <section>
                  <h3 className="font-semibold text-lg mb-2">5. זכויותיך</h3>
                  <ul className="list-disc list-inside space-y-1 text-gray-700 dark:text-gray-300">
                    <li>עיון במידע האישי שלך</li>
                    <li>תיקון או עדכון מידע</li>
                    <li>מחיקת החשבון והמידע</li>
                    <li>הגבלת השימוש במידע</li>
                  </ul>
                </section>

                <section>
                  <h3 className="font-semibold text-lg mb-2">6. עוגיות (Cookies)</h3>
                  <p className="text-gray-700 dark:text-gray-300">
                    אנו משתמשים בעוגיות לשיפור חוויית המשתמש, שמירת העדפות ואנליטיקה.
                  </p>
                </section>

                <section>
                  <h3 className="font-semibold text-lg mb-2">7. יצירת קשר</h3>
                  <p className="text-gray-700 dark:text-gray-300">
                    לשאלות בנוגע לפרטיות, ניתן לפנות אלינו בכתובת: privacy@akhladate.com
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
