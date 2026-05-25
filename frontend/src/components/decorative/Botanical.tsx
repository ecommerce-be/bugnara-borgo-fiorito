/**
 * Decorative botanical SVG ornaments.
 *
 * Used sparingly as editorial decoration in the margins and dividers,
 * to give the site the feel of an illustrated book rather than a tech product.
 *
 * Each shape is drawn with a single ink color — let the parent control
 * it via the `text-*` color utility (the SVG uses currentColor).
 */
import type { SVGProps } from 'react';

export function SmallBloom(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2"
         strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" {...props}>
      <path d="M12 6c1.5-1.5 4-1.5 4 1s-2 2-4 2" />
      <path d="M12 6c-1.5-1.5-4-1.5-4 1s2 2 4 2" />
      <path d="M12 9c1.5 0 3 1.2 3 3s-1.5 3-3 3-3-1.2-3-3 1.5-3 3-3z" />
      <path d="M12 15v4M10 18l2 1 2-1" />
      <circle cx="12" cy="12" r="0.6" fill="currentColor" />
    </svg>
  );
}

export function Sprig(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 40 80" fill="none" stroke="currentColor" strokeWidth="1.1"
         strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" {...props}>
      <path d="M20 76 Q 20 40 20 4" />
      <path d="M20 60 Q 8 56 4 46" />
      <path d="M20 50 Q 32 46 36 36" />
      <path d="M20 38 Q 8 34 4 24" />
      <path d="M20 28 Q 32 24 36 14" />
      <ellipse cx="6" cy="46" rx="4" ry="2" transform="rotate(-30 6 46)" />
      <ellipse cx="34" cy="36" rx="4" ry="2" transform="rotate(30 34 36)" />
      <ellipse cx="6" cy="24" rx="4" ry="2" transform="rotate(-30 6 24)" />
      <ellipse cx="34" cy="14" rx="4" ry="2" transform="rotate(30 34 14)" />
    </svg>
  );
}

export function Leaf(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="1.2"
         strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" {...props}>
      <path d="M4 28 Q 16 24 26 6" />
      <path d="M4 28 Q 18 26 28 18 Q 24 8 6 4 Q 2 18 4 28 Z" />
    </svg>
  );
}

/**
 * Ornate divider used between major sections. Thin horizontal line
 * with a small bloom in the middle.
 */
export function BloomDivider({ className }: { className?: string }) {
  return (
    <div className={`flex items-center gap-6 text-stone-deep ${className ?? ''}`}>
      <div className="flex-1 h-px bg-current opacity-40" />
      <SmallBloom className="w-5 h-5 text-bloom-deep" />
      <div className="flex-1 h-px bg-current opacity-40" />
    </div>
  );
}
