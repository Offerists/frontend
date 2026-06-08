import type { ReactNode } from 'react';

interface AccentButtonProps {
  children: ReactNode;
  onClick?: () => void;
  fullWidth?: boolean;
  disabled?: boolean;
}

export default function AccentButton({ children, onClick, fullWidth, disabled }: AccentButtonProps) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      style={{
        background: disabled ? 'rgba(255,255,255,0.08)' : 'var(--accent-gradient)',
        borderRadius: 12,
        padding: '12px 20px',
        fontWeight: 600,
        color: disabled ? 'var(--text-muted)' : '#ffffff',
        width: fullWidth ? '100%' : undefined,
        border: 'none',
        cursor: disabled ? 'not-allowed' : 'pointer',
        fontSize: 16,
        fontFamily: 'DM Sans, sans-serif',
        transition: 'opacity 0.2s',
        opacity: disabled ? 0.6 : 1,
      }}
    >
      {children}
    </button>
  );
}
