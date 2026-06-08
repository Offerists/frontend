import { motion } from 'framer-motion';
import { Trophy } from 'lucide-react';
import WebApp from '@twa-dev/sdk';
import GlassCard from '../ui/GlassCard';
import Badge from '../ui/Badge';
import { mockProfile } from '../../mock/profile';
import { mockTasks } from '../../mock/tasks';

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
};

export default function Profile() {
  const tgUser = WebApp.initDataUnsafe?.user;
  const photoUrl = tgUser?.photo_url;
  const name = tgUser?.first_name
    ? `${tgUser.first_name} ${tgUser.last_name ?? ''}`.trim()
    : mockProfile.name;
  const username = tgUser?.username ? `@${tgUser.username}` : mockProfile.username;

  const activeTasks = mockTasks.filter((t) => t.status === 'active').length;
  const completedTasks = mockTasks.filter((t) => t.status === 'completed').length;
  const overdueTasks = mockTasks.filter((t) => t.status === 'overdue').length;

  const stats = [
    { label: 'Активных', value: activeTasks, color: 'var(--accent-primary)' },
    { label: 'Выполнено', value: completedTasks, color: 'var(--success)' },
    { label: 'Просрочено', value: overdueTasks, color: 'var(--danger)' },
  ];

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
      {/* Header */}
      <motion.div
        variants={containerVariants}
        initial="initial"
        animate="animate"
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: 8,
          marginBottom: 24,
          paddingTop: 16,
        }}
      >
        <motion.div variants={cardVariants} transition={{ duration: 0.2 }}>
          {photoUrl ? (
            <img
              src={photoUrl}
              alt={name}
              style={{ width: 64, height: 64, borderRadius: '50%', objectFit: 'cover' }}
            />
          ) : (
            <div
              style={{
                width: 64,
                height: 64,
                borderRadius: '50%',
                background: 'var(--accent-gradient)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: 26,
                fontWeight: 700,
                color: '#fff',
                fontFamily: 'Syne, sans-serif',
              }}
            >
              {name.charAt(0).toUpperCase()}
            </div>
          )}
        </motion.div>

        <motion.div
          variants={cardVariants}
          transition={{ duration: 0.2 }}
          style={{ textAlign: 'center' }}
        >
          <div
            style={{
              fontFamily: 'Syne, sans-serif',
              fontSize: 20,
              fontWeight: 700,
              color: 'var(--text-primary)',
              lineHeight: 1.2,
            }}
          >
            {name}
          </div>
          <div style={{ fontSize: 14, color: 'var(--text-secondary)', marginTop: 4 }}>
            {username}
          </div>
        </motion.div>
      </motion.div>

      {/* Stats */}
      <motion.div
        variants={containerVariants}
        initial="initial"
        animate="animate"
        style={{ display: 'flex', gap: 12, marginBottom: 16 }}
      >
        {stats.map(({ label, value, color }) => (
          <motion.div
            key={label}
            variants={cardVariants}
            transition={{ duration: 0.2 }}
            style={{ flex: 1 }}
          >
            <GlassCard style={{ textAlign: 'center', padding: '14px 8px' }}>
              <div
                style={{
                  fontFamily: 'Syne, sans-serif',
                  fontSize: 28,
                  fontWeight: 700,
                  color,
                  lineHeight: 1,
                }}
              >
                {value}
              </div>
              <div style={{ fontSize: 12, color: 'var(--text-muted)', marginTop: 6 }}>
                {label}
              </div>
            </GlassCard>
          </motion.div>
        ))}
      </motion.div>

      {/* Gamification */}
      <motion.div
        variants={cardVariants}
        initial="initial"
        animate="animate"
        transition={{ duration: 0.2, delay: 0.18 }}
      >
        <GlassCard gradient style={{ position: 'relative', overflow: 'hidden', padding: 0 }}>
          {/* Blurred background content */}
          <div
            style={{
              padding: 16,
              filter: 'blur(4px)',
              opacity: 0.25,
              pointerEvents: 'none',
              userSelect: 'none',
            }}
          >
            <div style={{ display: 'flex', gap: 8, marginBottom: 12 }}>
              {['🏅', '⚡', '🔥'].map((icon) => (
                <div
                  key={icon}
                  style={{
                    flex: 1,
                    height: 48,
                    borderRadius: 12,
                    background: 'var(--bg-surface)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: 22,
                  }}
                >
                  {icon}
                </div>
              ))}
            </div>
            <div
              style={{
                height: 8,
                borderRadius: 4,
                background: 'var(--accent-gradient)',
                width: '60%',
                marginBottom: 8,
              }}
            />
            <div
              style={{
                height: 8,
                borderRadius: 4,
                background: 'var(--bg-surface)',
                width: '100%',
              }}
            />
          </div>

          {/* Overlay */}
          <div
            style={{
              position: 'absolute',
              inset: 0,
              backdropFilter: 'blur(4px)',
              WebkitBackdropFilter: 'blur(4px)',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 8,
              padding: 16,
            }}
          >
            <Trophy size={28} color="var(--accent-primary)" />
            <div
              style={{
                fontFamily: 'Syne, sans-serif',
                fontSize: 16,
                fontWeight: 700,
                color: 'var(--text-primary)',
              }}
            >
              Геймификация
            </div>
            <div
              style={{
                fontSize: 14,
                color: 'var(--text-secondary)',
                marginBottom: 4,
                textAlign: 'center',
              }}
            >
              Уровни, XP и ачивки — скоро
            </div>
            <Badge status="soon" />
          </div>
        </GlassCard>
      </motion.div>
    </motion.div>
  );
}
