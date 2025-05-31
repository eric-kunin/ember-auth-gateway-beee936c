// ✅ Final Animated Close Button (X) Integration
// Combines your rich modal layout with animated X button from full version

import React, { useState, useEffect, useRef } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Shield, FileText, X, ChevronUp, Heart, Users, Lock, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";

interface TermsModalProps {
  isOpen: boolean;
  onClose: () => void;
  type: "terms" | "privacy";
}

const TermsModal = ({ isOpen, onClose, type }: TermsModalProps) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [isClosing, setIsClosing] = useState(false);
  const scrollAreaRef = useRef<HTMLDivElement>(null);
  const isTerms = type === "terms";

  const handleScroll = (event: React.UIEvent<HTMLDivElement>) => {
    const scrollTop = event.currentTarget.scrollTop;
    setIsScrolled(scrollTop > 50);
    setShowScrollTop(scrollTop > 300);
  };

  const scrollToTop = () => {
    if (scrollAreaRef.current) {
      scrollAreaRef.current.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const handleClose = () => {
    setIsClosing(true);
    setTimeout(() => {
      onClose();
      setIsClosing(false);
    }, 200);
  };

  useEffect(() => {
    if (isOpen) {
      setIsScrolled(false);
      setShowScrollTop(false);
      setIsClosing(false);
    }
  }, [isOpen]);

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent
        className={`max-w-2xl max-h-[85vh] p-0 overflow-hidden 
          [&>div>button]:opacity-0 [&>div>button]:pointer-events-none
          transition-all duration-300 ease-in-out
          ${isClosing ? "scale-95 opacity-0" : "scale-100 opacity-100"}
          animate-in fade-in-0 zoom-in-95 duration-300
          data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95`}
        dir="rtl"
      >
        {/* ✅ Animated Close Button */}
        <Button
          variant="ghost"
          size="icon"
          className="absolute right-3 top-3 z-50 h-10 w-10 rounded-full 
            transition-all duration-300 ease-in-out
            hover:bg-red-100 dark:hover:bg-red-900/20 
            hover:scale-110 hover:rotate-90
            active:scale-95
            flex items-center justify-center 
            shadow-lg border border-gray-300 dark:border-gray-700 
            bg-white/90 dark:bg-gray-900/90 backdrop-blur-sm
            group animate-in fade-in-0 slide-in-from-right-2 duration-500"
          onClick={handleClose}
        >
          <X className="h-6 w-6 text-gray-600 dark:text-gray-300 
            transition-all duration-300 ease-in-out
            group-hover:text-red-600 dark:group-hover:text-red-400
            group-hover:scale-110" />
          <span className="sr-only">סגור</span>
        </Button>

        <DialogHeader className="p-6 pb-4 text-right">
          <DialogTitle className="flex items-center justify-center gap-3 text-2xl font-bold text-purple-400">
            {isTerms ? (
              <>
                תקנון השימוש
                <FileText className="h-6 w-6 text-blue-600" />
              </>
            ) : (
              <>
                מדיניות פרטיות
                <Shield className="h-6 w-6 text-green-600" />
              </>
            )}
          </DialogTitle>
          <DialogDescription className="text-sm text-gray-600 dark:text-gray-400 text-right">
            {isTerms
              ? "התנאים וההגבלות לשימוש באפליקציה"
              : "מדיניות הפרטיות והגנת המידע שלנו"}
          </DialogDescription>
        </DialogHeader>

        <ScrollArea className="px-6 pb-6 max-h-[60vh]">
          <div
            className="space-y-6 text-sm leading-relaxed text-right"
            dir="rtl"
          >
            {isTerms ? (
              <>
                {/* Terms Content with Staggered Animation */}
                <section className="animate-in slide-in-from-right-4 duration-700 delay-100">
                  <h3 className="font-semibold text-lg mb-3 flex items-center justify-start gap-2 text-right text-purple-200
                               transition-colors duration-300 hover:text-blue-600">
                    1. קבלת התנאים
                    <FileText className="h-5 w-5 text-blue-600 transition-transform duration-300 hover:scale-110" />
                  </h3>
                  <p className="text-gray-700 dark:text-gray-300 transition-colors duration-300">
                    השימוש באפליקציה מהווה הסכמה מלאה לתנאים המפורטים כאן. אם אינך מסכים לתנאים אלו, אנא הפסק את השימוש באפליקציה.
                    התנאים נועדו להבטיח שימוש בטוח ונעים לכל המשתמשים ולשמור על הערכים הדתיים והמוסריים של הקהילה.
                  </p>
                </section>

                <section className="animate-in slide-in-from-right-4 duration-700 delay-200">
                  <h3 className="font-semibold text-lg mb-3 flex items-center justify-start gap-2 text-right text-purple-200
                               transition-colors duration-300 hover:text-green-600">
                    2. תיאור השירות
                    <Heart className="h-5 w-5 text-green-600 transition-transform duration-300 hover:scale-110" />
                  </h3>
                  <p className="text-gray-700 dark:text-gray-300 transition-colors duration-300 mb-3">
                    AkhlaDate היא פלטפורמה לכרות היכרויות המיועדת לציבור הדתי. השירות מאפשר למשתמשים ליצור פרופיל, לחפש אחר בני זוג פוטנציאליים ולקיים תקשורת.
                  </p>
                  <p className="text-gray-700 dark:text-gray-300 transition-colors duration-300">
                    הפלטפורמה מיועדת למי שמחפש יחסים רציניים ומחויבים תוך שמירה על ערכי הדת והמסורת.
                  </p>
                </section>

                <section className="animate-in slide-in-from-right-4 duration-700 delay-300">
                  <h3 className="font-semibold text-lg mb-3 flex items-center justify-start gap-2 text-right text-purple-200
                               transition-colors duration-300 hover:text-blue-600">
                    <Users className="h-5 w-5 text-blue-600 transition-transform duration-300 hover:scale-110" />
                    3. הרשמה וחשבון משתמש
                  </h3>
                  <ul className="space-y-3 text-gray-700 dark:text-gray-300">
                    <li className="flex items-center justify-start gap-2 transition-transform duration-300 hover:-translate-x-1">
                      <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                      <span>המשתמש מתחייב לספק מידע אמיתי ומדויק בהליך ההרשמה</span>
                    </li>
                    <li className="flex items-center justify-start gap-2 transition-transform duration-300 hover:-translate-x-1">
                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                      <span>גיל מינימלי לשימוש באפליקציה: 18 שנים</span>
                    </li>
                    <li className="flex items-center justify-start gap-2 transition-transform duration-300 hover:-translate-x-1">
                      <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                      <span>אסור ליצור יותר מחשבון אחד לכל משתמש</span>
                    </li>
                    <li className="flex items-center justify-start gap-2 transition-transform duration-300 hover:-translate-x-1">
                      <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                      <span>המשתמש אחראי לשמירה על סודיות הסיסמה ופרטי הגישה</span>
                    </li>
                  </ul>
                </section>

                <section className="animate-in slide-in-from-right-4 duration-700 delay-400">
                  <h3 className="font-semibold text-lg mb-3 flex items-center justify-start gap-2 text-right text-purple-200
                               transition-colors duration-300 hover:text-green-600">
                    <Shield className="h-5 w-5 text-green-600 transition-transform duration-300 hover:scale-110" />
                    4. כללי התנהגות
                  </h3>
                  <ul className="space-y-3 text-gray-700 dark:text-gray-300">
                    <li className="flex items-center justify-start gap-2 transition-transform duration-300 hover:-translate-x-1">
                      <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                      <span>יש להתנהג בכבוד ובהגינות כלפי משתמשים אחרים</span>
                    </li>
                    <li className="flex items-center justify-start gap-2 transition-transform duration-300 hover:-translate-x-1">
                      <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                      <span>אסור לפרסם תוכן פוגעני, מטעה או לא חוקי</span>
                    </li>
                    <li className="flex items-center justify-start gap-2 transition-transform duration-300 hover:-translate-x-1">
                      <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                      <span>אסור להציק או לפגוע במשתמשים אחרים בכל צורה שהיא</span>
                    </li>
                    <li className="flex items-center justify-start gap-2 transition-transform duration-300 hover:-translate-x-1">
                      <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                      <span>יש לשמור על ערכי הצניעות והמסורת בכל התקשורת</span>
                    </li>
                  </ul>
                </section>

                <section className="animate-in slide-in-from-right-4 duration-700 delay-500">
                  <h3 className="font-semibold text-lg mb-3 flex items-center justify-start gap-2 text-right text-purple-200
                               transition-colors duration-300 hover:text-blue-600">
                    5. זכויות יוצרים ותוכן
                    <FileText className="h-5 w-5 text-blue-600 transition-transform duration-300 hover:scale-110" />
                  </h3>
                  <p className="text-gray-700 dark:text-gray-300 transition-colors duration-300 mb-3">
                    כל התוכן באפליקציה מוגן בזכויות יוצרים. המשתמש מעניק רישיון להשתמש בתוכן שהוא מעלה לצורך הפעלת השירות.
                  </p>
                  <p className="text-gray-700 dark:text-gray-300 transition-colors duration-300">
                    המשתמש מתחייב שהתוכן שהוא מעלה אינו מפר זכויות יוצרים של אחרים ושהוא בבעלותו המלאה.
                  </p>
                </section>

                <section className="animate-in slide-in-from-right-4 duration-700 delay-600">
                  <h3 className="font-semibold text-lg mb-3 flex items-center justify-start gap-2 text-right text-purple-200
                               transition-colors duration-300 hover:text-yellow-600">
                    6. הגבלת אחריות
                    <Shield className="h-5 w-5 text-yellow-600 transition-transform duration-300 hover:scale-110" />
                  </h3>
                  <p className="text-gray-700 dark:text-gray-300 transition-colors duration-300 mb-3">
                    החברה אינה אחראית לתוצאות השימוש באפליקציה, לרבות היכרויות, פגישות או יחסים שנוצרים באמצעותה.
                  </p>
                  <p className="text-gray-700 dark:text-gray-300 transition-colors duration-300">
                    המשתמש נושא באחריות המלאה להתנהלותו ולהחלטותיו בעת השימוש בשירות.
                  </p>
                </section>

                <section className="animate-in slide-in-from-right-4 duration-700 delay-700">
                  <h3 className="font-semibold text-lg mb-3 flex items-center justify-start gap-2 text-right text-purple-200
                               transition-colors duration-300 hover:text-indigo-600">
                    7. שינויים בתנאים
                    <FileText className="h-5 w-5 text-indigo-600 transition-transform duration-300 hover:scale-110" />
                  </h3>
                  <p className="text-gray-700 dark:text-gray-300 transition-colors duration-300 mb-3">
                    החברה שומרת לעצמה את הזכות לעדכן את התנאים מעת לעת. המשתמשים יקבלו הודעה על שינויים מהותיים.
                  </p>
                  <p className="text-gray-700 dark:text-gray-300 transition-colors duration-300">
                    המשך השימוש באפליקציה לאחר קבלת ההודעה מהווה הסכמה לתנאים המעודכנים.
                  </p>
                </section>
              </>
            ) : (
              <>
{/* Privacy Policy Content with Staggered Animation */}
                <section className="animate-in slide-in-from-right-4 duration-700 delay-100">
                  <h3 className="font-semibold text-lg mb-3 flex items-center justify-start gap-2 text-purple-300 text-right
                               transition-colors duration-300 hover:text-green-600">
                    1. איסוף מידע
                    <Shield className="h-5 w-5 text-green-600 transition-transform duration-300 hover:scale-110" />
                  </h3>
                  <p className="text-gray-700 dark:text-gray-300 transition-colors duration-300 mb-3">
                    אנו אוספים מידע שאתה מספק בעת ההרשמה: שם, גיל, מיקום, תמונות ומידע נוסף לצורך יצירת הפרופיל.
                  </p>
                  <p className="text-gray-700 dark:text-gray-300 transition-colors duration-300">
                    כמו כן, אנו עשויים לאסוף מידע טכני כגון כתובת IP, סוג הדפדפן ונתוני שימוש באפליקציה.
                  </p>
                </section>

                <section className="animate-in slide-in-from-right-4 duration-700 delay-200">
                  <h3 className="font-semibold text-lg mb-3 flex items-center justify-start gap-2 text-purple-300 text-right
                               transition-colors duration-300 hover:text-blue-600">
                    2. שימוש במידע
                    <FileText className="h-5 w-5 text-blue-600 transition-transform duration-300 hover:scale-110" />
                  </h3>
                  <ul className="space-y-3 text-gray-700 dark:text-gray-300 text-right">
                    <li className="flex items-center justify-start gap-2 transition-transform duration-300 hover:-translate-x-1">
                      <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                      <span>הצגת הפרופיל למשתמשים אחרים במערכת</span>
                    </li>
                    <li className="flex items-center justify-start gap-2 transition-transform duration-300 hover:-translate-x-1">
                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                      <span>שיפור השירות והתאמת המלצות אישיות</span>
                    </li>
                    <li className="flex items-center justify-start gap-2 transition-transform duration-300 hover:-translate-x-1">
                      <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                      <span>תקשורת בנוגע לשירות ועדכונים חשובים</span>
                    </li>
                    <li className="flex items-center justify-start gap-2 transition-transform duration-300 hover:-translate-x-1">
                      <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                      <span>מניעת הונאות ושמירה על האבטחה</span>
                    </li>
                  </ul>
                </section>

                <section className="animate-in slide-in-from-right-4 duration-700 delay-300">
                  <h3 className="font-semibold text-lg mb-3 flex items-center justify-start gap-2 text-purple-300 text-right
                               transition-colors duration-300 hover:text-green-600">
                    3. שיתוף מידע
                    <Shield className="h-5 w-5 text-green-600 transition-transform duration-300 hover:scale-110" />
                  </h3>
                  <p className="text-gray-700 dark:text-gray-300 transition-colors duration-300 mb-3">
                    איננו משתפים מידע אישי עם צדדים שלישיים, למעט במקרים הנדרשים על פי חוק או לצורך הפעלת השירות.
                  </p>
                  <p className="text-gray-700 dark:text-gray-300 transition-colors duration-300">
                    במקרים חריגים בהם נידרש לשתף מידע, נעשה זאת בהתאם לדרישות החוק ותוך הגנה מקסימלית על הפרטיות.
                  </p>
                </section>

                <section className="animate-in slide-in-from-right-4 duration-700 delay-400">
                  <h3 className="font-semibold text-lg mb-3 flex items-center justify-start gap-2 text-purple-300 text-right
                               transition-colors duration-300 hover:text-blue-600">
                    4. אבטחת מידע
                    <Lock className="h-5 w-5 text-blue-600 transition-transform duration-300 hover:scale-110" />
                  </h3>
                  <p className="text-gray-700 dark:text-gray-300 transition-colors duration-300 mb-3">
                    אנו נוקטים באמצעי אבטחה מתקדמים להגנה על המידע שלך, כולל הצפנה ואימות דו-שלבי.
                  </p>
                  <p className="text-gray-700 dark:text-gray-300 transition-colors duration-300">
                    השרתים שלנו מוגנים בטכנולוגיות אבטחה מתקדמות ונמצאים במרכזי נתונים מאובטחים.
                  </p>
                </section>

                <section className="animate-in slide-in-from-right-4 duration-700 delay-500">
                <h3 className="font-semibold text-lg mb-3 flex items-center justify-start gap-2 text-purple-300 text-right
                transition-colors duration-300 hover:text-green-600">
                    5. זכויותיך
                    <Shield className="h-5 w-5 text-green-500" />
                </h3>

                <ul className="space-y-3 text-gray-700 dark:text-gray-300 text-right">
                    <li className="flex items-center justify-start gap-2">
                    <div className="w-2 h-2 bg-blue-500 rounded-full" />
                    <span>עיון במידע האישי שלך השמור במערכת</span>
                    </li>
                    <li className="flex items-center justify-start gap-2">
                    <div className="w-2 h-2 bg-yellow-500 rounded-full" />
                    <span>תיקון או עדכון מידע שאינו מדויק</span>
                    </li>
                    <li className="flex items-center justify-start gap-2">
                    <div className="w-2 h-2 bg-red-500 rounded-full" />
                    <span>מחיקת החשבון והמידע שלך לחלוטין</span>
                    </li>
                    <li className="flex items-center justify-start gap-2">
                    <div className="w-2 h-2 bg-purple-500 rounded-full" />
                    <span>הגבלת השימוש במידע לצרכים ספציפיים</span>
                    </li>
                </ul>
                </section>

                <section className="animate-in slide-in-from-right-4 duration-700 delay-600">
                  <h3 className="font-semibold text-lg mb-3 flex items-center justify-start gap-2 text-right text-purple-200
                               transition-colors duration-300 hover:text-orange-600">
                    6. עוגיות (Cookies)
                    <FileText className="h-5 w-5 text-orange-600 transition-transform duration-300 hover:scale-110" />
                  </h3>
                  <p className="text-gray-700 dark:text-gray-300 transition-colors duration-300 mb-3">
                    אנו משתמשים בעוגיות לשיפור חוויית המשתמש, שמירת העדפות ואנליטיקה.
                  </p>
                  <p className="text-gray-700 dark:text-gray-300 transition-colors duration-300">
                    ניתן להגדיר את הדפדפן לחסום עוגיות, אך הדבר עלול להשפיע על תפקוד האפליקציה.
                  </p>
                </section>

                <section className="animate-in slide-in-from-right-4 duration-700 delay-700">
                  <h3 className="font-semibold text-lg mb-3 flex items-center justify-start text-purple-300 text-right gap-2
                               transition-colors duration-300 hover:text-indigo-600">
                    7. יצירת קשר
                    <Mail className="h-5 w-5 text-indigo-600 transition-transform duration-300 hover:scale-110" />
                  </h3>
                  <p className="text-gray-700 dark:text-gray-300 transition-colors duration-300 mb-3">
                    לשאלות בנוגע לפרטיות, ניתן לפנות אלינו בכתובת: privacy@akhladate.com
                  </p>
                  <p className="text-gray-700 dark:text-gray-300 transition-colors duration-300">
                    אנו מתחייבים לענות על פניות בתוך 48 שעות ולטפל בכל בקשה בצורה מקצועית ומהירה.
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
