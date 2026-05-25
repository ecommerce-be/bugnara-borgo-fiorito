import type { ReactNode } from 'react';
import { Link } from 'react-router-dom';

type Variant = 'primary' | 'ghost' | 'link';

interface BaseProps {
  children: ReactNode;
  variant?: Variant;
  className?: string;
}
interface ButtonAsButton extends BaseProps {
  to?: undefined;
  onClick?: () => void;
  type?: 'button' | 'submit';
}
interface ButtonAsLink extends BaseProps {
  to: string;
}
type ButtonProps = ButtonAsButton | ButtonAsLink;

/**
 * Editorial button.
 *
 * Three variants:
 *  - primary : solid bloom-rose pill — for the main call to action
 *  - ghost   : outlined ink — for secondary actions
 *  - link    : underlined inline link — for tertiary actions
 *
 * Renders as <Link> when `to` is provided, otherwise as <button>.
 */
export function Button(props: ButtonProps) {
  const variant: Variant = props.variant ?? 'primary';
  const base =
    'inline-flex items-center justify-center gap-2 font-sans text-sm font-medium ' +
    'tracking-wide transition-all duration-300 ease-out';

  const variants: Record<Variant, string> = {
    primary:
      'px-7 py-3.5 rounded-full bg-ink text-paper hover:bg-bloom-deep ' +
      'shadow-paper hover:shadow-paper-lg hover:-translate-y-0.5',
    ghost:
      'px-7 py-3.5 rounded-full border border-ink/30 text-ink ' +
      'hover:border-ink hover:bg-ink hover:text-paper hover:-translate-y-0.5',
    link:
      'text-ink underline decoration-bloom-deep/60 decoration-1 underline-offset-4 ' +
      'hover:text-bloom-deep hover:decoration-bloom-deep',
  };

  const classes = `${base} ${variants[variant]} ${props.className ?? ''}`;

  if ('to' in props && props.to) {
    return (
      <Link to={props.to} className={classes}>
        {props.children}
      </Link>
    );
  }

  return (
    <button
      type={('type' in props && props.type) || 'button'}
      onClick={'onClick' in props ? props.onClick : undefined}
      className={classes}
    >
      {props.children}
    </button>
  );
}
