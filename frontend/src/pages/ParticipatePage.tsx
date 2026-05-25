import { useTranslation } from 'react-i18next';
import { Container } from '../components/ui/Container';
import { BloomDivider } from '../components/decorative/Botanical';
import { ContactForm } from '../components/forms/ContactForm';

/**
 * Take-part / contacts page.
 * Three reasons to write: join, suggest a spot, generic info.
 */
export default function ParticipatePage() {
  const { t } = useTranslation();

  return (
    <section className="py-16 md:py-24">
      <Container width="narrow">
        {/* Header */}
        <header className="text-center mb-12">
          <div className="eyebrow mb-4">{t('nav.participate')}</div>
          <h1 className="font-display text-display-lg text-ink leading-tight mb-6">
            Anche tu<br />
            <span className="italic text-bloom-deep">puoi far sbocciare</span><br />
            il borgo.
          </h1>
          <p className="font-serif text-lg text-ink-soft max-w-xl mx-auto leading-relaxed">
            Che tu abbia un balcone, un vicolo, una piazza vicino casa, o anche solo una buona idea: questo progetto cresce con chi lo abita. Scrivici.
          </p>
        </header>

        <BloomDivider className="mb-12" />

        {/* Form */}
        <ContactForm />
      </Container>
    </section>
  );
}
