import { User, CheckSquare, Plug, Settings } from 'lucide-react';
import type { TabId } from '../../App';

interface TabBarProps {
  activeTab: TabId;
  onChange: (tab: TabId) => void;
}

const tabs: { id: TabId; label: string; Icon: React.ComponentType<{ size?: number }> }[] = [
  { id: 'profile', label: 'Профиль', Icon: User },
  { id: 'tasks', label: 'Задачи', Icon: CheckSquare },
  { id: 'integrations', label: 'Связи', Icon: Plug },
  { id: 'settings', label: 'Настройки', Icon: Settings },
];

export default function TabBar({ activeTab, onChange }: TabBarProps) {
  return (
    <nav
      style={{
        display: 'flex',
        position: 'fixed',
        bottom: 0,
        left: 0,
        right: 0,
        background: 'rgba(8,9,14,0.8)',
        backdropFilter: 'blur(20px)',
        WebkitBackdropFilter: 'blur(20px)',
        borderTop: '1px solid var(--border)',
        paddingBottom: 'env(safe-area-inset-bottom, 0px)',
        zIndex: 100,
      }}
    >
      {tabs.map(({ id, label, Icon }) => {
        const isActive = id === activeTab;
        return (
          <button
            key={id}
            onClick={() => onChange(id)}
            style={{
              flex: 1,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 4,
              padding: '10px 0',
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              color: isActive ? 'var(--accent-primary)' : 'var(--text-muted)',
              fontSize: 10,
              fontFamily: 'DM Sans, sans-serif',
              fontWeight: 600,
              letterSpacing: '0.03em',
              transition: 'color 0.2s',
            }}
          >
            <Icon size={20} />
            {label}
          </button>
        );
      })}
    </nav>
  );
}
