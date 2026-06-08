import GlassCard from './GlassCard';

interface SegmentedControlProps {
  options: string[];
  value: string;
  onChange: (v: string) => void;
}

export default function SegmentedControl({ options, value, onChange }: SegmentedControlProps) {
  return (
    <GlassCard style={{ padding: 4, display: 'flex', flexDirection: 'row', gap: 2 }}>
      {options.map((option) => {
        const isActive = option === value;
        return (
          <button
            key={option}
            onClick={() => onChange(option)}
            style={{
              flex: 1,
              padding: '8px 12px',
              borderRadius: 12,
              border: 'none',
              cursor: 'pointer',
              fontFamily: 'DM Sans, sans-serif',
              fontSize: 14,
              fontWeight: 600,
              transition: 'all 0.2s',
              background: isActive ? 'var(--accent-gradient)' : 'transparent',
              color: isActive ? '#ffffff' : 'var(--text-secondary)',
            }}
          >
            {option}
          </button>
        );
      })}
    </GlassCard>
  );
}
