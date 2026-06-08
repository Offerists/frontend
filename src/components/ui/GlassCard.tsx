import type { CSSProperties, ReactNode } from 'react';

interface GlassCardProps {
  children: ReactNode;
  className?: string;
  style?: CSSProperties;
  gradient?: boolean;
}

export default function GlassCard({ children, className, style, gradient }: GlassCardProps) {
  return (
    <div
      className={className}
      style={{
        background: 'var(--bg-glass)',
        border: `1px solid ${gradient ? 'var(--border-accent)' : 'var(--border)'}`,
        borderRadius: 16,
        backdropFilter: 'blur(20px)',
        WebkitBackdropFilter: 'blur(20px)',
        padding: 16,
        ...style,
      }}
    >
      {children}
    </div>
  );
}
