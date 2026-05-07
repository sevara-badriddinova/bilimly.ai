import { useTranslation } from "react-i18next";
import { Languages } from "lucide-react";
import { changeLanguage } from "@/i18n";
import { supportedLanguages } from "@/i18n/resources";

const LABELS: Record<string, string> = {
  en: "EN",
  uz: "UZ",
  ru: "RU",
};

export function LanguageSwitcher({ className = "" }: { className?: string }) {
  const { i18n } = useTranslation();
  const current = (i18n.resolvedLanguage || i18n.language || "en").slice(0, 2);

  return (
    <div
      className={`inline-flex items-center gap-1 rounded-full border border-border/60 bg-background/70 p-1 backdrop-blur ${className}`}
      role="group"
      aria-label="Language"
    >
      <Languages className="ml-1 h-3.5 w-3.5 text-muted-foreground" strokeWidth={2} />
      {supportedLanguages.map((lng) => {
        const active = current === lng;
        return (
          <button
            key={lng}
            type="button"
            onClick={() => changeLanguage(lng)}
            className={`rounded-full px-2.5 py-1 text-xs font-medium transition-colors ${
              active
                ? "bg-primary text-primary-foreground"
                : "text-muted-foreground hover:text-foreground"
            }`}
            aria-pressed={active}
          >
            {LABELS[lng] ?? lng.toUpperCase()}
          </button>
        );
      })}
    </div>
  );
}
