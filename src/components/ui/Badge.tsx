type BadgeStatus = 'active' | 'completed' | 'overdue' | 'soon';

interface BadgeProps {
  status: BadgeStatus;
}

const config: Record<BadgeStatus, { label: string; style: React.CSSProperties }> = {
  active: {
    label: 'Активна',
    style: {
      background: 'rgba(99,179,237,0.15)',
      color: '#63B3ED',
    },
  },
  completed: {
    label: 'Выполнена',
    style: {
      background: 'rgba(72,187,120,0.15)',
      color: '#48BB78',
    },
  },
  overdue: {
    label: 'Просрочена',
    style: {
      background: 'rgba(252,129,129,0.15)',
      color: '#FC8181',
    },
  },
  soon: {
    label: 'Скоро',
    style: {
      background: 'var(--accent-gradient)',
      color: '#ffffff',
    },
  },
};

export default function Badge({ status }: BadgeProps) {
  const { label, style } = config[status];
  return (
    <span
      style={{
        ...style,
        borderRadius: 8,
        padding: '4px 10px',
        fontSize: 12,
        fontWeight: 600,
        display: 'inline-block',
        lineHeight: 1.4,
      }}
    >
      {label}
    </span>
  );
}
