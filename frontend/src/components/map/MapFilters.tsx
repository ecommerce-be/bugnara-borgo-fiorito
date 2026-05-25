import type { SpotType } from '../../types/api';

interface MapFiltersProps {
  current: SpotType | 'ALL';
  onChange: (type: SpotType | 'ALL') => void;
  counts: { total: number; private: number; public: number };
}

export function MapFilters({ current, onChange, counts }: MapFiltersProps) {
  const options: Array<{ key: SpotType | 'ALL'; label: string; count: number; dot: string }> = [
    { key: 'ALL', label: 'Tutti', count: counts.total, dot: 'bg-ink' },
    { key: 'PRIVATE_HOUSE', label: 'Case', count: counts.private, dot: 'bg-bloom-deep' },
    { key: 'PUBLIC_SPACE', label: 'Spazi pubblici', count: counts.public, dot: 'bg-leaf' },
  ];

  return (
    <div className="flex flex-wrap items-center gap-2">
      {options.map(opt => {
        const active = current === opt.key;
        return (
          <button
            key={opt.key}
            type="button"
            onClick={() => onChange(opt.key)}
            className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-sans transition-all
              ${active
                ? 'bg-ink text-paper border-ink'
                : 'bg-paper text-ink border border-stone-deep/40 hover:border-ink'}`}
          >
            <span className={`w-2 h-2 rounded-full ${opt.dot}`} />
            {opt.label}
            <span className={`text-xs ${active ? 'text-paper/70' : 'text-ink-faint'}`}>
              {opt.count}
            </span>
          </button>
        );
      })}
    </div>
  );
}
