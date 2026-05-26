import type { ReactNode } from 'react';

interface AdminPageHeaderProps {
  eyebrow?: string;
  title: string;
  description?: string;
  actions?: ReactNode;
}

export function AdminPageHeader({ eyebrow, title, description, actions }: AdminPageHeaderProps) {
  return (
    <header className="mb-10 pb-6 border-b border-stone-deep/30 flex flex-wrap items-end justify-between gap-4">
      <div>
        {eyebrow && <div className="eyebrow mb-2">{eyebrow}</div>}
        <h1 className="font-display text-display-md text-ink leading-tight">{title}</h1>
        {description && (
          <p className="mt-3 font-serif text-ink-soft max-w-2xl">{description}</p>
        )}
      </div>
      {actions && <div className="flex items-center gap-3">{actions}</div>}
    </header>
  );
}
