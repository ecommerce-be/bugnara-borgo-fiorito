import { useTranslation } from 'react-i18next';

/**
 * Minimal language switcher.
 * Pure text, no flags (flag emojis are noisy and often inaccurate).
 */
export function LanguageSwitcher() {
  const { i18n } = useTranslation();
  const current = i18n.language.startsWith('en') ? 'en' : 'it';

  const setLang = (lang: 'it' | 'en') => {
    void i18n.changeLanguage(lang);
  };

  return (
    <div className="flex items-center gap-2 font-sans text-xs uppercase tracking-eyebrow">
      <button
        type="button"
        onClick={() => setLang('it')}
        className={`transition-colors ${
          current === 'it' ? 'text-ink font-semibold' : 'text-ink-faint hover:text-ink'
        }`}
        aria-label="Italiano"
      >
        IT
      </button>
      <span className="text-stone-deep">·</span>
      <button
        type="button"
        onClick={() => setLang('en')}
        className={`transition-colors ${
          current === 'en' ? 'text-ink font-semibold' : 'text-ink-faint hover:text-ink'
        }`}
        aria-label="English"
      >
        EN
      </button>
    </div>
  );
}
