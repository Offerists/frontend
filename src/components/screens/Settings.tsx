import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Globe, Bell, Moon, Sun, Check } from 'lucide-react';
import GlassCard from '../ui/GlassCard';
import AccentButton from '../ui/AccentButton';
import SegmentedControl from '../ui/SegmentedControl';

const POPULAR_TIMEZONES = [
  'Europe/Moscow',
  'Europe/London',
  'America/New_York',
  'Asia/Tokyo',
  'Asia/Yekaterinburg',
  'Asia/Novosibirsk',
];

function getAllTimezones(): string[] {
  try {
    return (Intl as any).supportedValuesOf('timeZone') as string[];
  } catch {
    return POPULAR_TIMEZONES;
  }
}

const ALL_TIMEZONES = getAllTimezones();
const EXTRA_TIMEZONES = ALL_TIMEZONES.filter((tz) => !POPULAR_TIMEZONES.includes(tz));

function SectionLabel({ children }: { children: string }) {
  return (
    <div
      style={{
        fontSize: 12,
        fontFamily: 'DM Sans, sans-serif',
        fontWeight: 600,
        color: 'var(--text-muted)',
        textTransform: 'uppercase',
        letterSpacing: '0.1em',
        marginBottom: 10,
      }}
    >
      {children}
    </div>
  );
}

function SettingRow({ icon, label }: { icon: React.ReactNode; label: string }) {
  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: 10,
        marginBottom: 12,
      }}
    >
      <span style={{ color: 'var(--accent-primary)', display: 'flex' }}>{icon}</span>
      <span
        style={{
          fontSize: 14,
          fontWeight: 600,
          fontFamily: 'DM Sans, sans-serif',
          color: 'var(--text-primary)',
        }}
      >
        {label}
      </span>
    </div>
  );
}

const pageVariants = {
  initial: { opacity: 0, y: 8 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -8 },
};

const containerVariants = {
  animate: { transition: { staggerChildren: 0.06 } },
};

const itemVariants = {
  initial: { opacity: 0, y: 12 },
  animate: { opacity: 1, y: 0 },
};

export default function Settings() {
  const [timezone, setTimezone] = useState(
    () => Intl.DateTimeFormat().resolvedOptions().timeZone,
  );
  const [reminderHours, setReminderHours] = useState('2 часа');
  const [theme, setTheme] = useState<'dark' | 'light'>(
    () => (localStorage.getItem('theme') as 'dark' | 'light') || 'dark',
  );
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    document.documentElement.classList.toggle('light', theme === 'light');
    localStorage.setItem('theme', theme);
  }, [theme]);

  function handleSave() {
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  }

  return (
    <motion.div
      variants={pageVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      transition={{ duration: 0.2 }}
      style={{
        minHeight: '100%',
        padding: 16,
        paddingBottom: 100,
        background: [
          'radial-gradient(ellipse at 20% 0%, rgba(99,179,237,0.12) 0%, transparent 60%)',
          'radial-gradient(ellipse at 80% 100%, rgba(159,122,234,0.10) 0%, transparent 60%)',
          'var(--bg-primary)',
        ].join(', '),
      }}
    >
      <motion.div variants={containerVariants} initial="initial" animate="animate">

        {/* Notifications section */}
        <motion.div variants={itemVariants} transition={{ duration: 0.2 }}>
          <SectionLabel>Уведомления</SectionLabel>
        </motion.div>

        {/* Timezone */}
        <motion.div variants={itemVariants} transition={{ duration: 0.2 }} style={{ marginBottom: 12 }}>
          <GlassCard>
            <SettingRow icon={<Globe size={16} />} label="Часовой пояс" />
            <select
              value={timezone}
              onChange={(e) => setTimezone(e.target.value)}
              style={{
                width: '100%',
                background: 'var(--bg-surface)',
                border: '1px solid var(--border)',
                color: 'var(--text-primary)',
                borderRadius: 12,
                padding: '10px 12px',
                fontFamily: 'DM Sans, sans-serif',
                fontSize: 14,
                outline: 'none',
                cursor: 'pointer',
                appearance: 'none',
                WebkitAppearance: 'none',
                backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 24 24' fill='none' stroke='rgba(240,244,255,0.5)' stroke-width='2'%3E%3Cpolyline points='6 9 12 15 18 9'%3E%3C/polyline%3E%3C/svg%3E")`,
                backgroundRepeat: 'no-repeat',
                backgroundPosition: 'right 12px center',
                paddingRight: 36,
              }}
            >
              <optgroup label="Популярные">
                {POPULAR_TIMEZONES.map((tz) => (
                  <option key={tz} value={tz} style={{ background: '#1a1b22' }}>
                    {tz.replace(/_/g, ' ')}
                  </option>
                ))}
              </optgroup>
              {EXTRA_TIMEZONES.length > 0 && (
                <optgroup label="Все">
                  {EXTRA_TIMEZONES.map((tz) => (
                    <option key={tz} value={tz} style={{ background: '#1a1b22' }}>
                      {tz.replace(/_/g, ' ')}
                    </option>
                  ))}
                </optgroup>
              )}
            </select>
          </GlassCard>
        </motion.div>

        {/* Reminder */}
        <motion.div variants={itemVariants} transition={{ duration: 0.2 }} style={{ marginBottom: 24 }}>
          <GlassCard>
            <SettingRow icon={<Bell size={16} />} label="Напомнить за" />
            <SegmentedControl
              options={['1 час', '2 часа', '24 часа']}
              value={reminderHours}
              onChange={setReminderHours}
            />
          </GlassCard>
        </motion.div>

        {/* Interface section */}
        <motion.div variants={itemVariants} transition={{ duration: 0.2 }}>
          <SectionLabel>Интерфейс</SectionLabel>
        </motion.div>

        {/* Theme */}
        <motion.div variants={itemVariants} transition={{ duration: 0.2 }} style={{ marginBottom: 24 }}>
          <GlassCard>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                <span style={{ color: 'var(--accent-primary)', display: 'flex' }}>
                  {theme === 'dark' ? <Moon size={16} /> : <Sun size={16} />}
                </span>
                <span
                  style={{
                    fontSize: 14,
                    fontWeight: 600,
                    fontFamily: 'DM Sans, sans-serif',
                    color: 'var(--text-primary)',
                  }}
                >
                  Тема
                </span>
              </div>

              <button
                onClick={() => setTheme((t) => (t === 'dark' ? 'light' : 'dark'))}
                style={{
                  padding: '7px 16px',
                  borderRadius: 10,
                  border: 'none',
                  cursor: 'pointer',
                  fontFamily: 'DM Sans, sans-serif',
                  fontSize: 13,
                  fontWeight: 600,
                  color: '#ffffff',
                  background:
                    theme === 'dark' ? 'var(--accent-gradient)' : 'rgba(255,255,255,0.1)',
                  transition: 'background 0.2s',
                }}
              >
                {theme === 'dark' ? 'Тёмная' : 'Светлая'}
              </button>
            </div>
          </GlassCard>
        </motion.div>

        {/* Save button */}
        <motion.div variants={itemVariants} transition={{ duration: 0.2 }}>
          <AccentButton fullWidth onClick={handleSave}>
            Сохранить настройки
          </AccentButton>
        </motion.div>
      </motion.div>

      {/* Toast */}
      <AnimatePresence>
        {saved && (
          <motion.div
            key="toast"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 8 }}
            transition={{ duration: 0.2 }}
            style={{
              position: 'fixed',
              bottom: 90,
              left: '50%',
              transform: 'translateX(-50%)',
              zIndex: 200,
              pointerEvents: 'none',
            }}
          >
            <GlassCard
              gradient
              style={{
                padding: '10px 20px',
                display: 'flex',
                alignItems: 'center',
                gap: 8,
                whiteSpace: 'nowrap',
              }}
            >
              <Check size={15} color="var(--success)" />
              <span
                style={{
                  fontSize: 14,
                  fontWeight: 600,
                  fontFamily: 'DM Sans, sans-serif',
                  color: 'var(--text-primary)',
                }}
              >
                Сохранено
              </span>
            </GlassCard>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
