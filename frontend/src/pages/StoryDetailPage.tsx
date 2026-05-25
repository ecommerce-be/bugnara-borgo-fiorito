import { Link, useParams } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import { useTranslation } from 'react-i18next';
import { Container } from '../components/ui/Container';
import { BloomDivider, Sprig } from '../components/decorative/Botanical';
import { useStory } from '../hooks/useApi';

/**
 * Single story page.
 *
 * Layout:
 *  - Editorial cover photo (full width or contained)
 *  - Metadata (date, author)
 *  - Big serif title
 *  - Excerpt as "lede"
 *  - Body rendered from Markdown with our editorial typography
 */
export default function StoryDetailPage() {
  const { slug } = useParams<{ slug: string }>();
  const { t } = useTranslation();
  const { data: story, isLoading, error } = useStory(slug);

  if (isLoading) {
    return (
      <Container width="narrow" className="py-32 text-center">
        <p className="font-serif italic text-ink-faint">{t('common.loading')}</p>
      </Container>
    );
  }

  if (error || !story) {
    return (
      <Container width="narrow" className="py-32 text-center">
        <p className="font-serif text-red-700 mb-6">Storia non trovata.</p>
        <Link to="/storie" className="link-editorial">← Tutte le storie</Link>
      </Container>
    );
  }

  return (
    <article className="pt-12 md:pt-16 pb-24">
      <Container width="narrow">
        {/* Back link */}
        <Link
          to="/storie"
          className="inline-flex items-center gap-2 font-sans text-xs uppercase tracking-eyebrow text-ink-faint hover:text-ink transition-colors mb-10"
        >
          ← Tutte le storie
        </Link>

        {/* Eyebrow / metadata */}
        <div className="text-center">
          <div className="eyebrow mb-4">
            {story.publishedAt
              ? new Date(story.publishedAt).toLocaleDateString('it-IT', {
                  day: 'numeric', month: 'long', year: 'numeric'
                })
              : 'Bozza'}
          </div>

          <h1 className="font-display text-display-lg text-ink leading-[1.05] mb-6">
            {story.title}
          </h1>

          {story.authorName && (
            <p className="font-sans text-xs uppercase tracking-eyebrow text-ink-faint mb-10">
              di {story.authorName}
            </p>
          )}
        </div>

        {/* Cover */}
        {story.coverImageUrl && (
          <div className="-mx-6 md:-mx-12 my-12 aspect-[16/9] overflow-hidden bg-stone-soft">
            <img
              src={story.coverImageUrl}
              alt={story.title}
              className="w-full h-full object-cover"
            />
          </div>
        )}

        {/* Excerpt as lede */}
        {story.excerpt && (
          <p className="font-display text-2xl md:text-3xl text-ink-soft leading-snug italic text-center my-12">
            {story.excerpt}
          </p>
        )}

        <BloomDivider className="my-12" />

        {/* Body */}
        {story.contentMarkdown && (
          <div className="prose-editorial">
            <ReactMarkdown
              components={{
                h2: ({ children }) => (
                  <h2 className="font-display text-3xl text-ink mt-12 mb-4">{children}</h2>
                ),
                h3: ({ children }) => (
                  <h3 className="font-display text-2xl text-ink mt-10 mb-3">{children}</h3>
                ),
                p: ({ children }) => (
                  <p className="font-serif text-lg leading-relaxed text-ink-soft mb-6 first:drop-cap">
                    {children}
                  </p>
                ),
                em: ({ children }) => (
                  <em className="italic text-bloom-deep">{children}</em>
                ),
                strong: ({ children }) => (
                  <strong className="font-semibold text-ink">{children}</strong>
                ),
                blockquote: ({ children }) => (
                  <blockquote className="pull-quote my-10 pl-6 border-l-2 border-bloom-deep">
                    {children}
                  </blockquote>
                ),
              }}
            >
              {story.contentMarkdown}
            </ReactMarkdown>
          </div>
        )}

        <div className="flex items-center justify-center mt-20">
          <Sprig className="w-8 h-16 text-leaf opacity-50" />
        </div>
      </Container>
    </article>
  );
}
