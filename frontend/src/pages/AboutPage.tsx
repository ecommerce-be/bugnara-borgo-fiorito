import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { Container } from '../components/ui/Container';
import { BloomDivider, Sprig, SmallBloom } from '../components/decorative/Botanical';

/**
 * About page — the narrative of the initiative and its founders.
 *
 * Sections:
 *  1. Editorial intro: "Una storia di comunità"
 *  2. Manifesto: how it started, why it exists
 *  3. The two founders (placeholders — names and bios to be filled)
 *  4. Bugnara facts strip
 *  5. Acknowledgments / community
 */
export default function AboutPage() {
  const { t } = useTranslation();

  return (
    <section className="py-16 md:py-24">
      <Container width="wide">
        {/* Header */}
        <header className="text-center mb-20">
          <div className="eyebrow mb-4">{t('nav.about')}</div>
          <h1 className="font-display text-display-lg text-ink leading-tight mb-6">
            Una storia<br />
            <span className="italic text-bloom-deep">di comunità.</span>
          </h1>
        </header>

        {/* Manifesto */}
        <Container width="narrow" className="!px-0">
          <div className="font-serif text-lg md:text-xl leading-relaxed text-ink-soft space-y-6">
            <p className="drop-cap">
              Bugnara è un borgo di pietra calda, a 580 metri d'altitudine, ai piedi del Colle Rotondo, in Valle Peligna. Mille abitanti scarsi, le strade strette del centro storico, le finestre che si guardano da un vicolo all'altro. Un posto dove tutti si conoscono.
            </p>

            <p>
              <em className="italic text-bloom-deep">Bugnara Borgo Fiorito</em> non è un progetto del Comune, né di un'associazione, né di un'agenzia. È nato dall'idea di due ragazzi del paese, una mattina d'inverno, dopo aver passeggiato per i vicoli e averli visti — per la prima volta davvero — spogli, addormentati, in attesa di qualcosa.
            </p>

            <p>
              L'idea era semplice: chiedere alle famiglie di abbellire il proprio angolo. Una pianta, un vaso, una fioriera. Niente di costoso, niente di obbligatorio. Solo un gesto di cura visibile.
            </p>

            <blockquote className="pull-quote my-12 pl-6 border-l-2 border-bloom-deep">
              "Volevamo che chi attraversa Bugnara, anche solo per caso, sentisse che qui qualcuno ci tiene."
            </blockquote>

            <p>
              Pochi mesi dopo, l'intero borgo aveva risposto. Le famiglie storiche e i nuovi arrivati, gli anziani che curavano già da anni il vaso davanti casa e i giovani che hanno scoperto per la prima volta il piacere di piantare qualcosa.
            </p>

            <p>
              Questo sito è la mappa di quel gesto. È fatto in casa, gratis, ed è dei bugnaresi.
            </p>
          </div>
        </Container>

        <BloomDivider className="my-24" />

        {/* The two founders */}
        <div className="mb-24">
          <div className="text-center mb-12">
            <div className="eyebrow mb-3">L'inizio</div>
            <h2 className="font-display text-display-md text-ink leading-tight">
              I due ragazzi
            </h2>
          </div>

          <div className="grid md:grid-cols-2 gap-10 max-w-3xl mx-auto">
            <FounderCard
              initials="?"
              name="Nome Cognome"
              role="Co-fondatore"
              bio="Una breve descrizione di sé, di cosa fa nella vita, e perché ha deciso di iniziare questo progetto per il proprio paese."
            />
            <FounderCard
              initials="?"
              name="Nome Cognome"
              role="Co-fondatore"
              bio="Una breve descrizione di sé, di cosa fa nella vita, e perché ha deciso di iniziare questo progetto per il proprio paese."
            />
          </div>

          <p className="text-center font-serif italic text-ink-faint mt-8 text-sm">
            (le schede verranno completate con nomi, foto e biografie)
          </p>
        </div>

        <BloomDivider className="my-24" />

        {/* Bugnara facts */}
        <div className="mb-20">
          <div className="text-center mb-12">
            <div className="eyebrow mb-3">Il borgo</div>
            <h2 className="font-display text-display-md text-ink leading-tight">
              Bugnara, in breve
            </h2>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto">
            <Fact value="580 m" label="Altitudine" />
            <Fact value="1.014" label="Abitanti" />
            <Fact value="25.8 km²" label="Superficie" />
            <Fact value="2007" label="Borgo più bello d'Italia" />
          </div>
        </div>

        {/* Community thanks */}
        <Container width="narrow" className="!px-0 mt-24 text-center">
          <Sprig className="w-8 h-16 mx-auto text-leaf opacity-50 mb-8" />
          <h3 className="font-display text-2xl text-ink mb-6">
            Grazie a chi ha già acceso un colore.
          </h3>
          <p className="font-serif text-ink-soft leading-relaxed">
            Alle famiglie, ai gruppi di volontari, agli anziani che ogni mattina escono di casa col vaso in mano. A chi ha donato una pianta, a chi ne ha chiesta una in regalo. <em>Questo è il vostro sito.</em>
          </p>
        </Container>
      </Container>
    </section>
  );
}

function FounderCard({ initials, name, role, bio }: {
  initials: string;
  name: string;
  role: string;
  bio: string;
}) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
      className="bg-paper-soft border border-stone-deep/40 p-8 rounded-sm shadow-paper"
    >
      <div className="w-20 h-20 rounded-full bg-stone-soft border border-stone-deep/40 flex items-center justify-center mb-6">
        <SmallBloom className="w-8 h-8 text-bloom-deep" />
      </div>
      <div className="eyebrow mb-2">{role}</div>
      <h3 className="font-display text-2xl text-ink mb-3">{name}</h3>
      <p className="font-serif text-ink-soft leading-relaxed">{bio}</p>
    </motion.article>
  );
}

function Fact({ value, label }: { value: string; label: string }) {
  return (
    <div className="text-center">
      <div className="font-display text-3xl md:text-4xl text-ink mb-2">{value}</div>
      <div className="eyebrow">{label}</div>
    </div>
  );
}
