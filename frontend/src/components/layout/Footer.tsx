import { useTranslation } from 'react-i18next';
import { Sprig, BloomDivider } from '../decorative/Botanical';
import { Container } from '../ui/Container';

export function Footer() {
  const { t } = useTranslation();
  const year = new Date().getFullYear();

  return (
    <footer className="relative mt-32 pt-20 pb-12 bg-paper-deep/40">
      {/* Decorative sprigs anchored at top corners */}
      <Sprig className="absolute top-0 left-6 md:left-12 w-8 h-16 text-leaf opacity-30 -translate-y-1/2" />
      <Sprig className="absolute top-0 right-6 md:right-12 w-8 h-16 text-leaf opacity-30 -translate-y-1/2 scale-x-[-1]" />

      <Container width="wide">
        <BloomDivider className="mb-12" />

        <div className="grid md:grid-cols-3 gap-10 items-start">
          <div>
            <div className="font-display text-3xl text-ink mb-2">Bugnara</div>
            <div className="eyebrow mb-4">Borgo Fiorito</div>
            <p className="font-serif text-ink-soft leading-relaxed max-w-sm">
              {t('footer.credits')}
            </p>
          </div>

          <div className="font-serif text-ink-soft text-sm leading-relaxed">
            <p>Valle Peligna</p>
            <p>Provincia dell'Aquila</p>
            <p>Abruzzo · Italia</p>
            <p className="mt-3 font-sans text-xs uppercase tracking-eyebrow text-ink-faint">
              42.02° N · 13.86° E
            </p>
          </div>

          <div className="font-serif text-ink-soft text-sm leading-relaxed md:text-right">
            <p>
              <a href="mailto:ciao@bugnarafiorito.it" className="link-editorial">
                ciao@bugnarafiorito.it
              </a>
            </p>
            <p className="mt-1 italic">Comune di Bugnara (AQ)</p>
          </div>
        </div>

        <div className="mt-16 pt-6 border-t border-stone-deep/30 flex flex-col md:flex-row items-start md:items-center justify-between gap-2 font-sans text-xs text-ink-faint">
          <p>© {year} Bugnara Borgo Fiorito · {t('footer.rights')}</p>
          <p className="italic">Made with care in Abruzzo.</p>
        </div>
      </Container>
    </footer>
  );
}
