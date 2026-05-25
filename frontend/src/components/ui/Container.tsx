import type { ReactNode } from 'react';

/**
 * Editorial container: limits content width and applies consistent padding.
 *
 * Three width variants:
 *  - "narrow" : long-form reading (prose)
 *  - "wide"   : default for sections
 *  - "full"   : layouts that need to reach edge-to-edge
 */
interface ContainerProps {
  children: ReactNode;
  width?: 'narrow' | 'wide' | 'full';
  className?: string;
}

const widthMap = {
  narrow: 'max-w-2xl',
  wide:   'max-w-6xl',
  full:   'max-w-[1400px]',
} as const;

export function Container({ children, width = 'wide', className = '' }: ContainerProps) {
  return (
    <div className={`mx-auto px-6 md:px-10 ${widthMap[width]} ${className}`}>
      {children}
    </div>
  );
}
