import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { languages } from "@/i18n/translations";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Globe, X } from "lucide-react";
import { toast } from "sonner";

const LanguageAdvisor = () => {
  const { t, i18n } = useTranslation();
  const [show, setShow] = useState(false);
  const [detectedLang, setDetectedLang] = useState<{ code: string; name: string; nativeName: string } | null>(null);

  useEffect(() => {
    // Check if user has already manually set a language or dismissed this
    const hasManuallySet = localStorage.getItem("i18nextLng_manual") === "true";
    const hasDismissed = sessionStorage.getItem("lang_advisor_dismissed") === "true";

    if (hasManuallySet || hasDismissed) return;

    // Detect browser language
    const browserLang = navigator.language.split("-")[0];
    const currentLang = i18n.language;

    if (browserLang !== currentLang) {
      const targetLang = languages.find(l => l.code === browserLang);
      if (targetLang && targetLang.code !== currentLang) {
        setDetectedLang(targetLang);
        // Delay a bit for better UX
        const timer = setTimeout(() => setShow(true), 2000);
        return () => clearTimeout(timer);
      }
    }
  }, [i18n.language]);

  const handleSwitch = () => {
    if (detectedLang) {
      i18n.changeLanguage(detectedLang.code);
      localStorage.setItem("i18nextLng_manual", "true");
      setShow(false);
      toast.success(`Language switched to ${detectedLang.nativeName}`);
    }
  };

  const handleDismiss = () => {
    sessionStorage.setItem("lang_advisor_dismissed", "true");
    setShow(false);
  };

  if (!show || !detectedLang) return null;

  const currentLangName = languages.find(l => l.code === i18n.language)?.name || "English";

  return (
    <div className="fixed bottom-20 right-6 z-[60] max-w-sm animate-in fade-in slide-in-from-bottom-5 duration-500">
      <Card className="border-primary/20 shadow-2xl bg-card/95 backdrop-blur-md">
        <CardContent className="p-4">
          <div className="flex items-start gap-3">
            <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
              <Globe className="h-5 w-5 text-primary animate-pulse" />
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between">
                <h4 className="text-sm font-bold text-foreground">{t("lang_advisor_title")}</h4>
                <button onClick={handleDismiss} className="text-muted-foreground hover:text-foreground">
                  <X className="h-4 w-4" />
                </button>
              </div>
              <p className="text-xs text-muted-foreground mt-1 leading-relaxed">
                {t("lang_advisor_desc", { lang: detectedLang.name })}
              </p>
              <div className="flex gap-2 mt-4">
                <Button size="sm" className="text-[11px] h-8 font-bold" onClick={handleSwitch}>
                  {t("lang_advisor_switch", { native: detectedLang.nativeName })}
                </Button>
                <Button size="sm" variant="ghost" className="text-[11px] h-8" onClick={handleDismiss}>
                  {t("lang_advisor_dismiss", { current: currentLangName })}
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default LanguageAdvisor;
