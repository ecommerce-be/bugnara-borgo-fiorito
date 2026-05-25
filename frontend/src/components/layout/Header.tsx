import { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { LanguageSwitcher } from './LanguageSwitcher';
import { SmallBloom } from '../decorative/Botanical';

/**
 * Top navigation header.
 *
 * Visual signature:
 *  - Logotype on the left, set in our display serif, with a small bloom mark.
 *  - Inline nav links in sans-serif, lowercase, generous letter-spacing.
 *  - Active route gets an antique-rose underline.
 *  - Language switcher on the right.
 *  - On mobile collapses into a simple stacked menu.
 */
export function Header() {
  const { t } = useTranslation();
  const [menuOpen, setMenuOpen] = useState(false);

  const links = [
    { to: '/',             label: t('nav.home') },
    { to: '/mappa',        label: t('nav.map') },
    { to: '/storie',       label: t('nav.stories') },
    { to: '/partecipa',    label: t('nav.participate') },
    { to: '/chi-siamo',    label: t('nav.about') },
  ];

  return (
    <header className="relative z-40 border-b border-stone-deep/30 bg-paper/80 backdrop-blur-md">
      <div className="mx-auto max-w-[1400px] px-6 md:px-10 py-5 flex items-center justify-between gap-6">
        {/* Logotype */}
        <Link to="/" className="group flex items-center gap-3" aria-label="Bugnara Borgo Fiorito">
          <SmallBloom className="w-6 h-6 text-bloom-deep transition-transform duration-500 group-hover:rotate-12" />
          <div className="leading-none">
            <div className="font-display text-xl md:text-2xl tracking-tight">
              Bugnara
            </div>
            <div className="font-sans text-[10px] uppercase tracking-eyebrow text-ink-faint mt-0.5">
              Borgo Fiorito
            </div>
          </div>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden lg:flex items-center gap-8">
          {links.map(link => (
            <NavLink
              key={link.to}
              to={link.to}
              end={link.to === '/'}
              className={({ isActive }) =>
                `font-sans text-sm transition-colors duration-300 ` +
                `${isActive
                    ? 'text-ink underline decoration-bloom-deep decoration-2 underline-offset-8'
                    : 'text-ink-soft hover:text-ink'}`
              }
            >
              {link.label}
            </NavLink>
          ))}
        </nav>

        <div className="hidden lg:block">
          <LanguageSwitcher />
        </div>

        {/* Mobile toggle */}
        <button
          type="button"
          className="lg:hidden p-2 -mr-2 text-ink"
          onClick={() => setMenuOpen(v => !v)}
          aria-label="Menu"
          aria-expanded={menuOpen}
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor"
               strokeWidth="1.5" strokeLinecap="round">
            {menuOpen ? (
              <>
                <line x1="6" y1="6" x2="18" y2="18" />
                <line x1="6" y1="18" x2="18" y2="6" />
              </>
            ) : (
              <>
                <line x1="4" y1="8" x2="20" y2="8" />
                <line x1="4" y1="16" x2="20" y2="16" />
              </>
            )}
          </svg>
        </button>
      </div>

      {/* Mobile menu panel */}
      {menuOpen && (
        <div className="lg:hidden border-t border-stone-deep/30 bg-paper-soft">
          <div className="mx-auto max-w-[1400px] px-6 py-6 flex flex-col gap-4">
            {links.map(link => (
              <NavLink
                key={link.to}
                to={link.to}
                end={link.to === '/'}
                onClick={() => setMenuOpen(false)}
                className={({ isActive }) =>
                  `font-display text-2xl ${isActive ? 'text-bloom-deep' : 'text-ink'}`
                }
              >
                {link.label}
              </NavLink>
            ))}
            <div className="pt-4 mt-2 border-t border-stone-deep/30">
              <LanguageSwitcher />
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
