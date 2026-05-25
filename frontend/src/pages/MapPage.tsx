import { useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Container } from '../components/ui/Container';
import { BugnaraMap } from '../components/map/BugnaraMap';
import { MapFilters } from '../components/map/MapFilters';
import { SpotDetailPanel } from '../components/map/SpotDetailPanel';
import { useMapMarkers } from '../hooks/useApi';
import type { SpotType } from '../types/api';

/**
 * The interactive map page — heart of the site.
 *
 * Layout:
 *  - Editorial intro at top (title + eyebrow + short manifesto)
 *  - Filter chips (Tutti / Case / Spazi pubblici) with counts
 *  - Full-width map with watercolor tiles and flower markers
 *  - Side panel that slides in when a marker is clicked
 *  - Legend below the map
 */
export default function MapPage() {
  const { t } = useTranslation();
  const { data: markers, isLoading, error } = useMapMarkers();
  const [filter, setFilter] = useState<SpotType | 'ALL'>('ALL');
  const [selectedId, setSelectedId] = useState<number | null>(null);

  const counts = useMemo(() => {
    const m = markers ?? [];
    return {
      total: m.length,
      private: m.filter(s => s.type === 'PRIVATE_HOUSE').length,
      public:  m.filter(s => s.type === 'PUBLIC_SPACE').length,
    };
  }, [markers]);

  return (
    <>
      {/* Intro */}
      <section className="pt-16 md:pt-20 pb-10">
        <Container width="wide">
          <div className="grid lg:grid-cols-12 gap-8 items-end">
            <div className="lg:col-span-7">
              <div className="eyebrow mb-4">{t('nav.map')}</div>
              <h1 className="font-display text-display-lg text-ink leading-tight mb-4">
                La mappa <span className="italic text-bloom-deep">del borgo che sboccia</span>
              </h1>
              <p className="font-serif text-lg text-ink-soft leading-relaxed max-w-xl">
                Ogni puntino è una casa, un balcone, un piccolo spazio pubblico curato da una famiglia o da un gruppo di volontari. Cliccaci sopra per scoprire le foto, la storia, e chi se ne prende cura.
              </p>
            </div>

            <div className="lg:col-span-5 lg:text-right space-y-3">
              <MapFilters current={filter} onChange={setFilter} counts={counts} />
            </div>
          </div>
        </Container>
      </section>

      {/* Map */}
      <section className="pb-12">
        <Container width="full">
          <div className="relative h-[70vh] min-h-[500px] rounded-sm overflow-hidden border border-stone-deep/40 shadow-paper-lg bg-paper-soft">
            {isLoading && (
              <div className="absolute inset-0 flex items-center justify-center z-10 bg-paper-soft">
                <p className="font-serif italic text-ink-faint">{t('common.loading')}</p>
              </div>
            )}
            {error && (
              <div className="absolute inset-0 flex items-center justify-center z-10 bg-paper-soft">
                <p className="font-serif text-red-700">{t('common.error_generic')}</p>
              </div>
            )}
            {markers && (
              <BugnaraMap
                markers={markers}
                selectedId={selectedId}
                onMarkerClick={setSelectedId}
                filterType={filter}
              />
            )}
          </div>
        </Container>
      </section>

      {/* Legend */}
      <section className="pb-24">
        <Container width="wide">
          <div className="grid md:grid-cols-2 gap-6 max-w-2xl">
            <LegendItem
              color="bg-bloom-deep"
              title="Abitazioni private"
              body="Case, balconi, terrazzi e ingressi abbelliti dalle famiglie del borgo."
            />
            <LegendItem
              color="bg-leaf"
              title="Spazi pubblici"
              body="Piazze, vicoli, fontane e angoli condivisi curati da gruppi di volontari."
            />
          </div>
        </Container>
      </section>

      {/* Detail side panel */}
      <SpotDetailPanel
        spotId={selectedId}
        onClose={() => setSelectedId(null)}
      />
    </>
  );
}

function LegendItem({ color, title, body }: { color: string; title: string; body: string }) {
  return (
    <div className="flex gap-4 items-start">
      <div className={`w-3 h-3 rounded-full mt-2 shrink-0 ${color}`} />
      <div>
        <h3 className="font-display text-lg text-ink mb-1">{title}</h3>
        <p className="font-serif text-ink-soft text-sm leading-relaxed">{body}</p>
      </div>
    </div>
  );
}
