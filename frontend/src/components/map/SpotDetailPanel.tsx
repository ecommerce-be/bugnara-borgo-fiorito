import { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { useSpotDetail } from '../../hooks/useApi';
import { SmallBloom } from '../decorative/Botanical';

interface SpotDetailPanelProps {
  spotId: number | null;
  onClose: () => void;
}

/**
 * Side panel that slides in from the right when a marker is clicked.
 *
 * Lazily fetches the full spot detail via the selected id.
 * Closes on backdrop click, Escape key, or close button.
 */
export function SpotDetailPanel({ spotId, onClose }: SpotDetailPanelProps) {
  const { t } = useTranslation();
  const { data, isLoading, error } = useSpotDetail(spotId);

  // Close on Escape key
  useEffect(() => {
    if (spotId === null) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [spotId, onClose]);

  return (
    <AnimatePresence>
      {spotId !== null && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 bg-ink/30 backdrop-blur-sm z-[1000]"
            onClick={onClose}
            aria-hidden="true"
          />

          {/* Panel */}
          <motion.aside
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 28, stiffness: 240 }}
            className="fixed top-0 right-0 bottom-0 z-[1001] w-full max-w-md bg-paper-soft overflow-y-auto shadow-paper-lg"
            role="dialog"
            aria-label={data?.title ?? 'Dettaglio'}
          >
            {/* Close */}
            <button
              type="button"
              onClick={onClose}
              className="absolute top-5 right-5 w-9 h-9 rounded-full bg-paper border border-stone-deep/40 flex items-center justify-center text-ink hover:bg-ink hover:text-paper transition-colors z-10"
              aria-label="Chiudi"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
                <line x1="6" y1="6" x2="18" y2="18" />
                <line x1="6" y1="18" x2="18" y2="6" />
              </svg>
            </button>

            <div className="p-8 md:p-10 pt-16">
              {isLoading && (
                <div className="text-ink-faint font-serif italic">{t('common.loading')}</div>
              )}

              {error && (
                <div className="text-red-700 font-serif">{t('common.error_generic')}</div>
              )}

              {data && (
                <>
                  {/* Cover photo */}
                  {data.photos.length > 0 && (
                    <div className="aspect-[4/3] -mx-8 md:-mx-10 -mt-16 mb-8 overflow-hidden bg-stone-soft">
                      <img
                        src={data.photos[0].imageUrl}
                        alt={data.photos[0].caption ?? data.title}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  )}

                  {/* Type pill */}
                  <div className="flex items-center gap-3 mb-4">
                    <SmallBloom className={`w-4 h-4 ${
                      data.type === 'PRIVATE_HOUSE' ? 'text-bloom-deep' : 'text-leaf'
                    }`} />
                    <span className="eyebrow">
                      {data.type === 'PRIVATE_HOUSE' ? 'Abitazione privata' : 'Spazio pubblico'}
                    </span>
                  </div>

                  {/* Title */}
                  <h2 className="font-display text-3xl md:text-4xl text-ink mb-3 leading-tight">
                    {data.title}
                  </h2>

                  {/* Address */}
                  {data.addressHint && (
                    <p className="font-serif italic text-ink-faint mb-6">{data.addressHint}</p>
                  )}

                  {/* Description */}
                  {data.description && (
                    <p className="font-serif text-lg text-ink-soft leading-relaxed mb-8">
                      {data.description}
                    </p>
                  )}

                  {/* Photo gallery (skip the cover already shown above) */}
                  {data.photos.length > 1 && (
                    <div className="mb-8">
                      <div className="eyebrow mb-4">Galleria</div>
                      <div className="grid grid-cols-2 gap-2">
                        {data.photos.slice(1).map(photo => (
                          <figure key={photo.id} className="relative">
                            <img
                              src={photo.imageUrl}
                              alt={photo.caption ?? ''}
                              className="w-full aspect-square object-cover"
                            />
                            {photo.isBeforePhoto && (
                              <figcaption className="absolute top-2 left-2 bg-paper/90 text-ink text-[10px] uppercase tracking-eyebrow px-2 py-1 font-mono">
                                Prima
                              </figcaption>
                            )}
                          </figure>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Participants */}
                  {data.participants.length > 0 && (
                    <div className="pt-6 border-t border-stone-deep/30">
                      <div className="eyebrow mb-3">Curato da</div>
                      <ul className="space-y-2 font-serif text-ink-soft">
                        {data.participants.map(p => (
                          <li key={p.id} className="flex items-center gap-3">
                            <div className="w-1.5 h-1.5 rounded-full bg-bloom-deep" />
                            {p.displayName}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </>
              )}
            </div>
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}
