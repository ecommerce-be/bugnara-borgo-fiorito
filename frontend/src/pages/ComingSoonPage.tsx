import { useTranslation } from 'react-i18next';
import { Container } from '../components/ui/Container';
import { Button } from '../components/ui/Button';
import { BloomDivider, SmallBloom } from '../components/decorative/Botanical';

interface ComingSoonProps {
  section: 'map' | 'stories' | 'participate' | 'about';
}

export function ComingSoonPage({ section }: ComingSoonProps) {
  const { t } = useTranslation();
  const sectionLabel = t(`nav.${section === 'participate' ? 'participate'
                          : section === 'stories' ? 'stories'
                          : section === 'about' ? 'about'
                          : 'map'}`);

  return (
    <section className="py-24 md:py-40">
      <Container width="narrow" className="text-center">
        <SmallBloom className="mx-auto w-10 h-10 text-bloom-deep mb-8" />
        <div className="eyebrow mb-6">{sectionLabel}</div>
        <h1 className="font-display text-display-lg text-ink mb-8 leading-tight">
          Stiamo<br />
          <span className="italic text-bloom-deep">facendo sbocciare</span><br />
          questa pagina.
        </h1>
        <p className="font-serif text-xl text-ink-soft leading-relaxed mb-12 max-w-md mx-auto">
          Sarà disponibile a breve. Nel frattempo, esplora il resto del borgo dalla home.
        </p>
        <Button to="/" variant="primary">
          ← Torna alla home
        </Button>
        <BloomDivider className="mt-20" />
      </Container>
    </section>
  );
}
