import { useEffect, useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import WebApp from '@twa-dev/sdk';

import Profile from './components/screens/Profile';
import Tasks from './components/screens/Tasks';
import Integrations from './components/screens/Integrations';
import Settings from './components/screens/Settings';
import TabBar from './components/ui/TabBar';
import { getDebugAuthInfo } from './api/client';

import './styles/globals.css';

export type TabId = 'profile' | 'tasks' | 'integrations' | 'settings';

const ScreenComponents: Record<TabId, React.ComponentType> = {
  profile: Profile,
  tasks: Tasks,
  integrations: Integrations,
  settings: Settings,
};

const APP_BG = [
  'radial-gradient(ellipse at 20% 0%, rgba(99,179,237,0.12) 0%, transparent 60%)',
  'radial-gradient(ellipse at 80% 100%, rgba(159,122,234,0.10) 0%, transparent 60%)',
  '#08090E',
].join(', ');

export default function App() {
  const [activeTab, setActiveTab] = useState<TabId>('profile');

  useEffect(() => {
    try {
      WebApp.ready();
      WebApp.expand();
    } catch {
      // not in Telegram context
    }
  }, []);

  const Screen = ScreenComponents[activeTab];
  const debugInfo = getDebugAuthInfo();

  return (
    <div
      style={{
        minHeight: '100dvh',
        background: APP_BG,
        fontFamily: "'DM Sans', sans-serif",
        color: 'var(--text-primary)',
        overflowX: 'hidden',
        position: 'relative',
      }}
    >
      <main
        style={{
          height: '100dvh',
          overflowY: 'auto',
          overflowX: 'hidden',
          paddingBottom: 80,
        }}
      >
        <AnimatePresence mode="wait">
          <Screen key={activeTab} />
        </AnimatePresence>
      </main>

      <div style={{
        position: 'fixed', top: 0, left: 0, right: 0, zIndex: 9999,
        background: 'rgba(0,0,0,0.85)', color: '#0f0', fontSize: 10,
        padding: '4px 8px', wordBreak: 'break-all', fontFamily: 'monospace',
      }}>
        {debugInfo}
      </div>

      <TabBar activeTab={activeTab} onChange={setActiveTab} />
    </div>
  );
}
