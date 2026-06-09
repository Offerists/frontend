import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Clock, CheckSquare, ExternalLink } from 'lucide-react';
import WebApp from '@twa-dev/sdk';
import GlassCard from '../ui/GlassCard';
import Badge from '../ui/Badge';
import AccentButton from '../ui/AccentButton';
import { getTasks } from '../../api/tasks';
import type { TaskDto } from '../../types/api';

type Filter = 'all' | 'active' | 'overdue';
type DisplayStatus = 'active' | 'overdue' | 'completed';

const filters: { id: Filter; label: string }[] = [
  { id: 'all', label: 'Все' },
  { id: 'active', label: 'Активные' },
  { id: 'overdue', label: 'Просроченные' },
];

const statusColor: Record<DisplayStatus, string> = {
  active: 'var(--accent-primary)',
  overdue: 'var(--danger)',
  completed: 'var(--success)',
};

const pageVariants = {
  initial: { opacity: 0, y: 8 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -8 },
};

const containerVariants = {
  animate: { transition: { staggerChildren: 0.06 } },
};

const cardVariants = {
  initial: { opacity: 0, y: 12 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -8, transition: { duration: 0.15 } },
};

function startOfToday(): Date {
  const d = new Date();
  d.setHours(0, 0, 0, 0);
  return d;
}

function getDisplayStatus(task: TaskDto): DisplayStatus {
  if (task.status === 'DONE') return 'completed';
  if (task.deadline && new Date(task.deadline) < startOfToday()) return 'overdue';
  return 'active';
}

function formatDeadline(dateStr: string) {
  const d = new Date(dateStr);
  return d.toLocaleDateString('ru-RU', { day: 'numeric', month: 'short' });
}

function openYouGile() {
  const url = 'https://yougile.com';
  try {
    WebApp.openLink(url);
  } catch {
    window.open(url, '_blank');
  }
}

export default function Tasks() {
  const [activeFilter, setActiveFilter] = useState<Filter>('all');
  const [tasks, setTasks] = useState<TaskDto[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    getTasks('all')
      .then(setTasks)
      .catch((e: Error) => setError(e.message))
      .finally(() => setLoading(false));
  }, []);

  const filtered = tasks.filter((t) => {
    if (activeFilter === 'all') return true;
    const status = getDisplayStatus(t);
    if (activeFilter === 'overdue') return status === 'overdue';
    return status === 'active';
  });

  return (
    <motion.div
      variants={pageVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      transition={{ duration: 0.2 }}
      style={{
        minHeight: '100%',
        paddingBottom: 160,
        background: [
          'radial-gradient(ellipse at 20% 0%, rgba(99,179,237,0.12) 0%, transparent 60%)',
          'radial-gradient(ellipse at 80% 100%, rgba(159,122,234,0.10) 0%, transparent 60%)',
          'var(--bg-primary)',
        ].join(', '),
      }}
    >
      {/* Filter tabs */}
      <div style={{ display: 'flex', gap: 8, padding: '16px 16px 0' }}>
        {filters.map(({ id, label }) => {
          const isActive = activeFilter === id;
          return (
            <button
              key={id}
              onClick={() => setActiveFilter(id)}
              style={{
                padding: '7px 14px',
                borderRadius: 8,
                border: isActive ? 'none' : '1px solid var(--border)',
                background: isActive ? 'var(--accent-gradient)' : 'transparent',
                color: isActive ? '#ffffff' : 'var(--text-secondary)',
                fontFamily: 'DM Sans, sans-serif',
                fontSize: 13,
                fontWeight: 600,
                cursor: 'pointer',
                transition: 'all 0.2s',
                whiteSpace: 'nowrap',
              }}
            >
              {label}
            </button>
          );
        })}
      </div>

      {/* Task list */}
      <motion.div
        variants={containerVariants}
        initial="initial"
        animate="animate"
        style={{ padding: '12px 16px', display: 'flex', flexDirection: 'column', gap: 10 }}
      >
        <AnimatePresence mode="popLayout">
          {loading ? (
            <motion.div
              key="loading"
              variants={cardVariants}
              style={{ textAlign: 'center', padding: '48px 16px', color: 'var(--text-muted)', fontSize: 14 }}
            >
              Загрузка...
            </motion.div>
          ) : error ? (
            <motion.div
              key="error"
              variants={cardVariants}
              style={{ textAlign: 'center', padding: '48px 16px', color: 'var(--danger)', fontSize: 14 }}
            >
              {error}
            </motion.div>
          ) : filtered.length === 0 ? (
            <motion.div
              key="empty"
              variants={cardVariants}
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                gap: 12,
                padding: '48px 16px',
                color: 'var(--text-muted)',
                textAlign: 'center',
              }}
            >
              <CheckSquare size={48} color="var(--text-muted)" />
              <span style={{ fontSize: 14, fontFamily: 'DM Sans, sans-serif', lineHeight: 1.5 }}>
                Задач нет. Напишите боту чтобы создать первую
              </span>
            </motion.div>
          ) : (
            filtered.map((task) => {
              const displayStatus = getDisplayStatus(task);
              const deadlineColor =
                displayStatus === 'overdue' ? 'var(--danger)' : 'var(--text-secondary)';

              return (
                <motion.div
                  key={task.id}
                  variants={cardVariants}
                  layout
                  transition={{ duration: 0.2 }}
                >
                  <GlassCard style={{ padding: 0, overflow: 'hidden' }}>
                    <div style={{ display: 'flex', alignItems: 'stretch' }}>
                      <div
                        style={{
                          width: 3,
                          borderRadius: '3px 0 0 3px',
                          background: statusColor[displayStatus],
                          flexShrink: 0,
                        }}
                      />
                      <div style={{ flex: 1, padding: '12px 14px' }}>
                        <div
                          style={{
                            fontSize: 15,
                            fontFamily: 'DM Sans, sans-serif',
                            fontWeight: 500,
                            color: 'var(--text-primary)',
                            marginBottom: 8,
                            lineHeight: 1.3,
                          }}
                        >
                          {task.title}
                        </div>

                        <div
                          style={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                          }}
                        >
                          {task.deadline && (
                            <div
                              style={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: 5,
                                fontSize: 12,
                                color: deadlineColor,
                                fontFamily: 'DM Sans, sans-serif',
                              }}
                            >
                              <Clock size={13} color={deadlineColor} style={{ flexShrink: 0 }} />
                              <span>{formatDeadline(task.deadline)}</span>
                            </div>
                          )}

                          <Badge status={displayStatus} />
                        </div>
                      </div>
                    </div>
                  </GlassCard>
                </motion.div>
              );
            })
          )}
        </AnimatePresence>
      </motion.div>

      {/* Fixed bottom button */}
      <div style={{ position: 'fixed', bottom: 80, left: 16, right: 16, zIndex: 50 }}>
        <AccentButton fullWidth onClick={openYouGile}>
          <span style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8 }}>
            <ExternalLink size={16} />
            Открыть доску в YouGile
          </span>
        </AccentButton>
      </div>
    </motion.div>
  );
}
