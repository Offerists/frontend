import { useState } from 'react';
import { motion } from 'framer-motion';
import { ExternalLink, CheckCircle } from 'lucide-react';
import WebApp from '@twa-dev/sdk';
import GlassCard from '../ui/GlassCard';
import Badge from '../ui/Badge';
import { mockYougile } from '../../mock/integrations';

const SOON_SERVICES = [
  'Jira',
  'Trello',
  'Notion',
  'Яндекс Трекер',
  'Яндекс Телемост',
  'Zoom',
  'Google Meet',
  'Microsoft Teams',
  'Confluence',
];

function getInitials(name: string) {
  const words = name.trim().split(/\s+/);
  if (words.length === 1) return words[0].slice(0, 2).toUpperCase();
  return (words[0][0] + words[1][0]).toUpperCase();
}

const AVATAR_COLORS = [
  'linear-gradient(135deg, #63B3ED, #4299E1)',
  'linear-gradient(135deg, #9F7AEA, #805AD5)',
  'linear-gradient(135deg, #FC8181, #E53E3E)',
  'linear-gradient(135deg, #68D391, #38A169)',
  'linear-gradient(135deg, #F6AD55, #DD6B20)',
  'linear-gradient(135deg, #76E4F7, #0BC5EA)',
  'linear-gradient(135deg, #FBB6CE, #D53F8C)',
];

function avatarColor(name: string) {
  let hash = 0;
  for (let i = 0; i < name.length; i++) hash = (hash * 31 + name.charCodeAt(i)) >>> 0;
  return AVATAR_COLORS[hash % AVATAR_COLORS.length];
}

function openUrl(url: string) {
  try {
    WebApp.openLink(url);
  } catch {
    window.open(url, '_blank');
  }
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

function SoonCard({ name }: { name: string }) {
  const [hovered, setHovered] = useState(false);
  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{ cursor: 'default' }}
    >
      <GlassCard
        style={{
          opacity: hovered ? 1 : 0.6,
          borderColor: hovered ? 'var(--border-accent)' : undefined,
          transition: 'opacity 0.2s, border-color 0.2s',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: 8,
          padding: '14px 10px',
          textAlign: 'center',
        }}
      >
        <div
          style={{
            width: 40,
            height: 40,
            borderRadius: 10,
            background: avatarColor(name),
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: 13,
            fontWeight: 700,
            color: '#fff',
            fontFamily: 'DM Sans, sans-serif',
            flexShrink: 0,
          }}
        >
          {getInitials(name)}
        </div>
        <div
          style={{
            fontSize: 13,
            fontFamily: 'DM Sans, sans-serif',
            fontWeight: 500,
            color: 'var(--text-primary)',
            lineHeight: 1.3,
          }}
        >
          {name}
        </div>
        <Badge status="soon" />
      </GlassCard>
    </div>
  );
}

export default function Integrations() {
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
      <motion.div
        variants={containerVariants}
        initial="initial"
        animate="animate"
      >
        {/* Connected section */}
        <motion.div variants={itemVariants} transition={{ duration: 0.2 }}>
          <SectionLabel>Подключено</SectionLabel>
        </motion.div>

        <motion.div variants={itemVariants} transition={{ duration: 0.2 }} style={{ marginBottom: 24 }}>
          <GlassCard
            style={{
              border: '1px solid rgba(72,187,120,0.3)',
              padding: 0,
              overflow: 'hidden',
            }}
          >
            {/* YouGile header */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '14px 16px' }}>
              <div
                style={{
                  width: 40,
                  height: 40,
                  borderRadius: 10,
                  background: 'linear-gradient(135deg, #48BB78, #38A169)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: 13,
                  fontWeight: 700,
                  color: '#fff',
                  fontFamily: 'DM Sans, sans-serif',
                  flexShrink: 0,
                }}
              >
                YG
              </div>

              <div style={{ flex: 1, minWidth: 0 }}>
                <div
                  style={{
                    fontSize: 15,
                    fontWeight: 600,
                    fontFamily: 'DM Sans, sans-serif',
                    color: 'var(--text-primary)',
                    lineHeight: 1.2,
                  }}
                >
                  YouGile
                </div>
                <div
                  style={{
                    fontSize: 12,
                    color: 'var(--text-secondary)',
                    fontFamily: 'DM Sans, sans-serif',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    whiteSpace: 'nowrap',
                  }}
                >
                  {mockYougile.email}
                </div>
              </div>

              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 5,
                  flexShrink: 0,
                }}
              >
                <CheckCircle size={14} color="var(--success)" />
                <span
                  style={{
                    fontSize: 12,
                    fontWeight: 600,
                    color: 'var(--success)',
                    fontFamily: 'DM Sans, sans-serif',
                  }}
                >
                  Активно
                </span>
              </div>
            </div>

            {/* Divider */}
            <div style={{ height: 1, background: 'var(--border)', margin: '0 16px' }} />

            {/* Board list */}
            <div style={{ padding: '8px 0' }}>
              {mockYougile.boards.map((board) => (
                <button
                  key={board.url}
                  onClick={() => openUrl(board.url)}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    width: '100%',
                    padding: '10px 16px',
                    background: 'none',
                    border: 'none',
                    cursor: 'pointer',
                    fontFamily: 'DM Sans, sans-serif',
                    fontSize: 14,
                    color: 'var(--text-primary)',
                    textAlign: 'left',
                    transition: 'background 0.15s',
                  }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLButtonElement).style.background = 'var(--bg-surface-hover)';
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLButtonElement).style.background = 'none';
                  }}
                >
                  <span>{board.name}</span>
                  <ExternalLink size={14} color="var(--text-muted)" />
                </button>
              ))}
            </div>
          </GlassCard>
        </motion.div>

        {/* Soon section */}
        <motion.div variants={itemVariants} transition={{ duration: 0.2 }}>
          <SectionLabel>Скоро</SectionLabel>
        </motion.div>

        <motion.div
          variants={containerVariants}
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: 12,
          }}
        >
          {SOON_SERVICES.map((name) => (
            <motion.div key={name} variants={itemVariants} transition={{ duration: 0.2 }}>
              <SoonCard name={name} />
            </motion.div>
          ))}
        </motion.div>
      </motion.div>
    </motion.div>
  );
}
