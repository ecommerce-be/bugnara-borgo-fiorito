import { Link } from 'react-router-dom';
import { useAuthStore } from '../store/authStore';
import { usePublicStats } from '../../hooks/useApi';
import { useAdminMessages, useAdminSpots } from '../hooks/useAdminApi';
import { AdminPageHeader } from '../components/AdminPageHeader';

export default function AdminDashboardPage() {
  const user = useAuthStore((s) => s.user);
  const { data: stats } = usePublicStats();
  const { data: messages } = useAdminMessages();
  const { data: spots } = useAdminSpots();

  const unreadMessages = (messages ?? []).filter(m => !m.read).length;
  const draftSpots = (spots ?? []).filter(s => s.status === 'DRAFT').length;
  const recentMessages = (messages ?? []).slice(0, 3);
  const recentSpots = (spots ?? []).slice(0, 3);

  return (
    <>
      <AdminPageHeader
        eyebrow={`Benvenuto, ${user?.displayName ?? ''}`}
        title="Dashboard"
        description="Una panoramica veloce di quello che succede su Bugnara Borgo Fiorito."
      />

      {/* Stats grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
        <StatCard
          label="Spot pubblicati"
          value={stats?.publishedSpots ?? '—'}
          accent="bloom"
        />
        <StatCard
          label="Bozze in attesa"
          value={draftSpots}
          accent={draftSpots > 0 ? 'gold' : 'neutral'}
        />
        <StatCard
          label="Storie pubblicate"
          value={stats?.publishedStories ?? '—'}
          accent="leaf"
        />
        <StatCard
          label="Messaggi non letti"
          value={unreadMessages}
          accent={unreadMessages > 0 ? 'bloom' : 'neutral'}
        />
      </div>

      {/* Two columns: recent spots + recent messages */}
      <div className="grid lg:grid-cols-2 gap-8">
        <DashboardSection title="Ultimi spot" linkTo="/admin/spots" linkLabel="Tutti gli spot">
          {recentSpots.length === 0 ? (
            <EmptyState text="Nessuno spot ancora." />
          ) : (
            <ul className="space-y-3">
              {recentSpots.map((s) => (
                <li key={s.id}>
                  <Link
                    to={`/admin/spots/${s.id}`}
                    className="flex items-center justify-between gap-4 p-3 -mx-3 rounded-sm hover:bg-paper transition-colors"
                  >
                    <div className="min-w-0">
                      <div className="font-display text-lg text-ink truncate">{s.title}</div>
                      <div className="text-xs text-ink-faint mt-0.5">
                        {s.type === 'PRIVATE_HOUSE' ? 'Casa privata' : 'Spazio pubblico'}
                        {' · '}
                        {s.addressHint ?? '—'}
                      </div>
                    </div>
                    <StatusPill status={s.status} />
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </DashboardSection>

        <DashboardSection title="Messaggi recenti" linkTo="/admin/messages" linkLabel="Tutta la posta">
          {recentMessages.length === 0 ? (
            <EmptyState text="Nessun messaggio." />
          ) : (
            <ul className="space-y-3">
              {recentMessages.map((m) => (
                <li
                  key={m.id}
                  className="flex items-start gap-3 p-3 -mx-3 rounded-sm hover:bg-paper transition-colors"
                >
                  {!m.read && (
                    <span className="mt-2 w-1.5 h-1.5 rounded-full bg-bloom-deep shrink-0" />
                  )}
                  <div className="min-w-0 flex-1">
                    <div className="flex items-baseline justify-between gap-2">
                      <span className={`font-medium text-sm ${m.read ? 'text-ink-soft' : 'text-ink'}`}>
                        {m.name}
                      </span>
                      <span className="text-[10px] uppercase tracking-eyebrow text-ink-faint shrink-0">
                        {subjectLabel(m.subject)}
                      </span>
                    </div>
                    <p className="text-sm text-ink-soft mt-1 line-clamp-2">
                      {m.message}
                    </p>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </DashboardSection>
      </div>
    </>
  );
}

function StatCard({
  label,
  value,
  accent,
}: {
  label: string;
  value: number | string;
  accent: 'bloom' | 'leaf' | 'gold' | 'neutral';
}) {
  const accentClasses = {
    bloom:   'border-bloom-deep/30 bg-bloom/5',
    leaf:    'border-leaf/30 bg-leaf/5',
    gold:    'border-gold/40 bg-gold/5',
    neutral: 'border-stone-deep/30 bg-paper',
  }[accent];

  return (
    <div className={`p-5 rounded-sm border ${accentClasses}`}>
      <div className="font-display text-4xl text-ink mb-1">{value}</div>
      <div className="eyebrow">{label}</div>
    </div>
  );
}

function DashboardSection({
  title,
  linkTo,
  linkLabel,
  children,
}: {
  title: string;
  linkTo: string;
  linkLabel: string;
  children: React.ReactNode;
}) {
  return (
    <section className="bg-paper border border-stone-deep/30 rounded-sm p-6">
      <header className="flex items-center justify-between mb-4 pb-3 border-b border-stone-deep/20">
        <h2 className="font-display text-xl text-ink">{title}</h2>
        <Link to={linkTo} className="link-editorial text-xs uppercase tracking-eyebrow">
          {linkLabel} →
        </Link>
      </header>
      {children}
    </section>
  );
}

function StatusPill({ status }: { status: 'DRAFT' | 'PUBLISHED' | 'ARCHIVED' }) {
  const styles = {
    DRAFT:     'bg-gold/15 text-gold-deep border-gold/40',
    PUBLISHED: 'bg-leaf/15 text-leaf-deep border-leaf/40',
    ARCHIVED:  'bg-stone-deep/15 text-ink-faint border-stone-deep/40',
  }[status];

  const label = {
    DRAFT:     'Bozza',
    PUBLISHED: 'Pubblico',
    ARCHIVED:  'Archiviato',
  }[status];

  return (
    <span className={`text-[10px] uppercase tracking-eyebrow px-2 py-1 rounded-sm border ${styles}`}>
      {label}
    </span>
  );
}

function EmptyState({ text }: { text: string }) {
  return <p className="font-serif italic text-ink-faint text-center py-6">{text}</p>;
}

function subjectLabel(s: string) {
  return ({
    GENERIC_INFO: 'Info',
    JOIN_INITIATIVE: 'Adesione',
    SUGGEST_SPOT: 'Suggerimento',
    OTHER: 'Altro',
  } as Record<string, string>)[s] ?? s;
}
