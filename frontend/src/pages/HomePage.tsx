import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Container } from '../components/ui/Container';
import { Button } from '../components/ui/Button';
import { Sprig, Leaf, BloomDivider } from '../components/decorative/Botanical';
import { usePublicStats, useStories } from '../hooks/useApi';

/**
 * Home page — the editorial cover of the site.
 *
 * Now fetches:
 *  - public stats from /api/v1/stats (for the stats strip)
 *  - latest stories from /api/v1/stories (for the stories teaser)
 *
 * Falls back to graceful placeholders if the data hasn't loaded yet,
 * so the page never flashes broken.
 */
export default function HomePage() {
  const { t } = useTranslation();
  const { data: stats } = usePublicStats();
  const { data: stories } = useStories();

  const latestStories = (stories ?? []).slice(0, 3);

  const fadeUp = {
    hidden: { opacity: 0, y: 18 },
    show:   { opacity: 1, y: 0 },
  };
  const stagger = (delay = 0) => ({
    initial: 'hidden',
    animate: 'show',
    variants: fadeUp,
    transition: { duration: 0.9, ease: [0.16, 1, 0.3, 1] as const, delay },
  });

  return (
    <>
      {/* ============= HERO ============= */}
      <section className="relative pt-16 md:pt-24 pb-24 md:pb-32 overflow-hidden">
        <Sprig className="hidden md:block absolute top-20 right-[8%] w-12 h-24 text-leaf opacity-30" />
        <Leaf className="hidden md:block absolute bottom-32 left-[6%] w-16 h-16 text-leaf-soft opacity-30 -rotate-12" />

        <Container width="wide" className="relative">
          <div className="grid lg:grid-cols-12 gap-10 items-end">
            <div className="lg:col-span-8">
              <motion.div {...stagger(0)} className="eyebrow mb-8">
                <span className="inline-block w-8 h-px bg-bloom-deep align-middle mr-3" />
                {t('home.eyebrow')}
              </motion.div>

              <motion.h1
                {...stagger(0.1)}
                className="font-display text-display-xl text-ink mb-2"
              >
                <span className="block">{t('home.title_line_1')}</span>
                <span className="block italic text-bloom-deep">
                  {t('home.title_line_2')}
                </span>
              </motion.h1>

              <motion.p
                {...stagger(0.3)}
                className="mt-10 max-w-xl font-serif text-xl md:text-2xl leading-relaxed text-ink-soft"
              >
                {t('home.subtitle')}
              </motion.p>

              <motion.div {...stagger(0.5)} className="mt-12 flex flex-wrap items-center gap-4">
                <Button to="/mappa" variant="primary">
                  {t('home.cta_map')} <span aria-hidden>→</span>
                </Button>
                <Button to="/storie" variant="link">
                  {t('home.cta_stories')}
                </Button>
              </motion.div>
            </div>

            <motion.div
              {...stagger(0.7)}
              className="lg:col-span-4 hidden lg:flex flex-col items-end justify-end gap-6 pb-4"
            >
              <div className="text-right">
                <div className="font-mono text-xs uppercase tracking-eyebrow text-ink-faint mb-2">
                  Anno primo
                </div>
                <div className="font-display text-7xl text-bloom-deep leading-none italic">
                  '26
                </div>
              </div>
              <div className="w-px h-24 bg-stone-deep/40" />
              <p className="font-serif italic text-ink-faint text-right max-w-[12rem] leading-snug">
                "Un fiore, un vaso, un pensiero — e poi tutto il borgo."
              </p>
            </motion.div>
          </div>
        </Container>
      </section>

      {/* ============= STATS STRIP (real data) ============= */}
      <section className="border-y border-stone-deep/30 bg-paper-soft/60">
        <Container width="wide">
          <div className="grid grid-cols-3 divide-x divide-stone-deep/30">
            {[
              { value: stats?.publishedSpots ?? '—', label: t('home.stat_spots_label') },
              { value: stats?.participants    ?? '—', label: t('home.stat_participants_label') },
              { value: new Date().getFullYear(),     label: t('home.stat_year_label') },
            ].map((stat, i) => (
              <motion.div
                key={String(stat.label)}
                {...stagger(0.2 + i * 0.1)}
                className="py-10 px-6 first:pl-0 last:pr-0 text-center"
              >
                <div className="font-display text-5xl md:text-6xl text-ink mb-2">
                  {stat.value}
                </div>
                <div className="eyebrow">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </Container>
      </section>

      {/* ============= MANIFESTO ============= */}
      <section className="py-24 md:py-32 relative">
        <Container width="narrow">
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: '-100px' }}
            variants={fadeUp}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="eyebrow mb-6 text-center">{t('home.intro_eyebrow')}</div>
            <h2 className="font-display text-display-lg text-center text-ink mb-12 leading-tight">
              {t('home.intro_title')}
            </h2>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: '-50px' }}
            variants={fadeUp}
            transition={{ duration: 0.9, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="font-serif text-lg md:text-xl leading-relaxed text-ink-soft space-y-6"
          >
            <p className="drop-cap">{t('home.intro_body_1')}</p>
            <p>{t('home.intro_body_2')}</p>
          </motion.div>

          <BloomDivider className="mt-20" />
        </Container>
      </section>

      {/* ============= MAP TEASER ============= */}
      <section className="py-20 md:py-28">
        <Container width="wide">
          <div className="grid lg:grid-cols-12 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
              className="lg:col-span-5"
            >
              <div className="eyebrow mb-6">{t('home.section_map_eyebrow')}</div>
              <h2 className="font-display text-display-md mb-6 leading-tight text-ink">
                {t('home.section_map_title')}
              </h2>
              <p className="font-serif text-lg leading-relaxed text-ink-soft mb-8">
                {t('home.section_map_body')}
              </p>
              <Button to="/mappa" variant="ghost">
                {t('home.cta_map')} <span aria-hidden>→</span>
              </Button>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
              className="lg:col-span-7"
            >
              <MapPreview />
            </motion.div>
          </div>
        </Container>
      </section>

      {/* ============= STORIES TEASER (real data) ============= */}
      <section className="py-20 md:py-28 bg-paper-soft/60 border-y border-stone-deep/30">
        <Container width="wide">
          <div className="grid lg:grid-cols-12 gap-12">
            <div className="lg:col-span-5">
              <div className="eyebrow mb-6">{t('home.section_stories_eyebrow')}</div>
              <h2 className="font-display text-display-md mb-6 leading-tight text-ink">
                {t('home.section_stories_title')}
              </h2>
              <p className="font-serif text-lg leading-relaxed text-ink-soft mb-8">
                {t('home.section_stories_body')}
              </p>
              <Button to="/storie" variant="ghost">
                {t('common.read_more')} <span aria-hidden>→</span>
              </Button>
            </div>

            <div className="lg:col-span-7 space-y-6">
              {latestStories.length === 0 && (
                <p className="font-serif italic text-ink-faint">Le prime storie arriveranno presto.</p>
              )}
              {latestStories.map((story, i) => (
                <motion.article
                  key={story.id}
                  initial={{ opacity: 0, y: 12 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-50px' }}
                  transition={{ duration: 0.7, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
                  className="group cursor-pointer py-6 border-b border-stone-deep/30 last:border-0 flex gap-6 items-start hover:bg-paper/40 transition-colors px-4 -mx-4 rounded-sm"
                >
                  <div className="font-mono text-xs text-bloom-deep tracking-wider pt-2 w-8 shrink-0">
                    {String(i + 1).padStart(2, '0')}
                  </div>
                  <Link to={`/storie/${story.slug}`} className="flex-1">
                    <h3 className="font-display text-2xl text-ink mb-2 group-hover:text-bloom-deep transition-colors">
                      {story.title}
                    </h3>
                    {story.excerpt && (
                      <p className="font-serif text-ink-soft leading-relaxed mb-2">
                        {story.excerpt}
                      </p>
                    )}
                    {story.authorName && (
                      <p className="font-sans text-xs uppercase tracking-eyebrow text-ink-faint">
                        {story.authorName}
                      </p>
                    )}
                  </Link>
                </motion.article>
              ))}
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}

/**
 * Stylized SVG preview of Bugnara on the hill — same as Phase 3A.
 * The real interactive map lives at /mappa.
 */
function MapPreview() {
  return (
    <div className="relative aspect-[4/3] rounded-sm overflow-hidden shadow-paper-lg border border-stone-deep/40 bg-paper-soft">
      <svg viewBox="0 0 400 300" className="absolute inset-0 w-full h-full" xmlns="http://www.w3.org/2000/svg">
        <rect width="400" height="300" fill="#fbf6ec" />
        <path d="M 0 180 Q 60 150, 120 165 T 240 170 T 400 160 L 400 300 L 0 300 Z" fill="#d9cdb8" opacity="0.55" />
        <path d="M 0 210 Q 80 185, 160 195 T 320 200 T 400 195 L 400 300 L 0 300 Z" fill="#bfae93" opacity="0.5" />
        <g stroke="#2b2620" strokeWidth="0.8" fill="#ede2cc">
          <rect x="140" y="170" width="22" height="18" />
          <polygon points="140,170 151,160 162,170" fill="#bfae93" />
          <rect x="165" y="165" width="18" height="22" />
          <polygon points="165,165 174,156 183,165" fill="#bfae93" />
          <rect x="186" y="170" width="16" height="18" />
          <polygon points="186,170 194,162 202,170" fill="#bfae93" />
          <rect x="205" y="163" width="20" height="25" />
          <polygon points="205,163 215,153 225,163" fill="#bfae93" />
          <rect x="120" y="178" width="18" height="14" />
          <polygon points="120,178 129,170 138,178" fill="#bfae93" />
          <rect x="228" y="175" width="14" height="14" />
          <polygon points="228,175 235,168 242,175" fill="#bfae93" />
        </g>
        <g stroke="#2b2620" strokeWidth="0.8" fill="#ede2cc">
          <rect x="175" y="140" width="10" height="28" />
          <polygon points="175,140 180,132 185,140" fill="#bfae93" />
          <circle cx="180" cy="152" r="1.5" fill="#2b2620" />
        </g>
        <g fill="#4a6741" opacity="0.85">
          <ellipse cx="100" cy="195" rx="4" ry="12" />
          <ellipse cx="260" cy="190" rx="4" ry="14" />
          <ellipse cx="280" cy="192" rx="3.5" ry="10" />
        </g>
        <path d="M 0 240 Q 100 230, 200 235 T 400 245 L 400 300 L 0 300 Z" fill="#c9b88f" opacity="0.5" />
        <g>
          {[
            [148, 188], [172, 184], [194, 188], [217, 184],
            [125, 192], [240, 188], [180, 165], [205, 175],
            [105, 215], [275, 218], [200, 225], [155, 220],
          ].map(([cx, cy], i) => (
            <g key={i}>
              <circle cx={cx} cy={cy} r="3.2" fill="#c87f6f" stroke="#fbf6ec" strokeWidth="1.2" />
              <circle cx={cx} cy={cy} r="1" fill="#fbf6ec" />
            </g>
          ))}
        </g>
        <g transform="translate(360, 270)" fill="#7a6e62" fontFamily="serif" fontSize="9" fontStyle="italic">
          <text textAnchor="end">Bugnara · 580 m</text>
        </g>
      </svg>
      <div className="absolute bottom-3 left-4 right-4 flex items-end justify-between text-ink-faint pointer-events-none">
        <span className="font-mono text-[10px] uppercase tracking-eyebrow bg-paper/90 px-2 py-1 rounded-sm">
          Anteprima · Valle Peligna
        </span>
      </div>
    </div>
  );
}
