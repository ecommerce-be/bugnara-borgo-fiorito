import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { Container } from '../components/ui/Container';
import { BloomDivider } from '../components/decorative/Botanical';
import { useStories } from '../hooks/useApi';

/**
 * Listing of all published stories.
 *
 * Visual treatment: editorial magazine-style cards with cover photo,
 * eyebrow with publication date, big serif headline, excerpt, author.
 */
export default function StoriesPage() {
  const { t } = useTranslation();
  const { data: stories, isLoading, error } = useStories();

  return (
    <section className="py-16 md:py-24">
      <Container width="wide">
        <header className="text-center mb-16 md:mb-20">
          <div className="eyebrow mb-4">{t('nav.stories')}</div>
          <h1 className="font-display text-display-lg text-ink leading-tight mb-6">
            Le voci<br />
            <span className="italic text-bloom-deep">di Bugnara</span>
          </h1>
          <p className="font-serif text-xl text-ink-soft max-w-2xl mx-auto leading-relaxed">
            Le storie di chi ha messo le mani nella terra. Come è nata l'idea, perché è cresciuta, dove sta andando.
          </p>
        </header>

        <BloomDivider className="mb-16" />

        {isLoading && (
          <p className="text-center font-serif italic text-ink-faint">{t('common.loading')}</p>
        )}

        {error && (
          <p className="text-center font-serif text-red-700">{t('common.error_generic')}</p>
        )}

        {stories && stories.length === 0 && (
          <p className="text-center font-serif italic text-ink-faint">
            Le prime storie arriveranno presto.
          </p>
        )}

        {stories && stories.length > 0 && (
          <div className="grid gap-16 md:gap-20">
            {stories.map((story, i) => (
              <motion.article
                key={story.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-100px' }}
                transition={{ duration: 0.8, delay: i * 0.05, ease: [0.16, 1, 0.3, 1] }}
                className="grid md:grid-cols-12 gap-8 md:gap-12 items-center"
              >
                {/* Cover */}
                <div className={`md:col-span-6 ${i % 2 === 1 ? 'md:order-2' : ''}`}>
                  <Link to={`/storie/${story.slug}`} className="block group">
                    <div className="aspect-[4/3] overflow-hidden bg-stone-soft border border-stone-deep/30 shadow-paper">
                      {story.coverImageUrl ? (
                        <img
                          src={story.coverImageUrl}
                          alt={story.title}
                          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center font-display text-6xl text-stone-deep italic">
                          {String(i + 1).padStart(2, '0')}
                        </div>
                      )}
                    </div>
                  </Link>
                </div>

                {/* Text */}
                <div className="md:col-span-6">
                  <div className="font-mono text-xs uppercase tracking-eyebrow text-bloom-deep mb-3">
                    {story.publishedAt
                      ? new Date(story.publishedAt).toLocaleDateString('it-IT', {
                          day: 'numeric', month: 'long', year: 'numeric'
                        })
                      : 'Bozza'} · Storia {String(i + 1).padStart(2, '0')}
                  </div>

                  <h2 className="font-display text-3xl md:text-4xl leading-tight text-ink mb-4">
                    <Link
                      to={`/storie/${story.slug}`}
                      className="hover:text-bloom-deep transition-colors"
                    >
                      {story.title}
                    </Link>
                  </h2>

                  {story.excerpt && (
                    <p className="font-serif text-lg text-ink-soft leading-relaxed mb-6">
                      {story.excerpt}
                    </p>
                  )}

                  {story.authorName && (
                    <p className="font-sans text-xs uppercase tracking-eyebrow text-ink-faint mb-6">
                      di {story.authorName}
                    </p>
                  )}

                  <Link
                    to={`/storie/${story.slug}`}
                    className="link-editorial font-sans text-sm"
                  >
                    {t('common.read_more')} →
                  </Link>
                </div>
              </motion.article>
            ))}
          </div>
        )}
      </Container>
    </section>
  );
}
