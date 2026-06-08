export const mockYougile = {
  email: 'user@example.com',
  status: 'active',
  boards: [
    { name: 'Проект Альфа', url: 'https://yougile.com/board/alpha' },
    { name: 'Хакатон 2026', url: 'https://yougile.com/board/hackathon' },
  ],
};

export type IntegrationStatus = 'connected' | 'available' | 'coming_soon';
export type IntegrationCategory = 'social' | 'wallet' | 'productivity' | 'gaming';

export interface Integration {
  id: string;
  name: string;
  description: string;
  icon: string;
  category: IntegrationCategory;
  status: IntegrationStatus;
  xpBonus?: number;
  connectedAt?: string;
  username?: string;
}

export const mockIntegrations: Integration[] = [
  {
    id: 'int_telegram',
    name: 'Telegram',
    description: 'Your primary account — already linked',
    icon: '✈️',
    category: 'social',
    status: 'connected',
    xpBonus: 0,
    connectedAt: '2024-01-15',
    username: '@alexdev',
  },
  {
    id: 'int_twitter',
    name: 'Twitter / X',
    description: 'Connect to unlock social tasks and bonus XP',
    icon: '🐦',
    category: 'social',
    status: 'available',
    xpBonus: 200,
  },
  {
    id: 'int_discord',
    name: 'Discord',
    description: 'Join our server and verify for exclusive rewards',
    icon: '💬',
    category: 'social',
    status: 'available',
    xpBonus: 150,
  },
  {
    id: 'int_metamask',
    name: 'MetaMask',
    description: 'Connect your wallet to receive token rewards',
    icon: '🦊',
    category: 'wallet',
    status: 'connected',
    connectedAt: '2024-02-01',
    username: '0x1a2b...ef12',
  },
  {
    id: 'int_tonkeeper',
    name: 'TON Keeper',
    description: 'Link TON wallet for TON-based rewards',
    icon: '💎',
    category: 'wallet',
    status: 'available',
    xpBonus: 250,
  },
  {
    id: 'int_github',
    name: 'GitHub',
    description: 'Verify developer status and unlock builder tasks',
    icon: '🐙',
    category: 'productivity',
    status: 'coming_soon',
  },
  {
    id: 'int_steam',
    name: 'Steam',
    description: 'Connect your gaming profile for gaming quests',
    icon: '🎮',
    category: 'gaming',
    status: 'coming_soon',
  },
  {
    id: 'int_notion',
    name: 'Notion',
    description: 'Sync your productivity data for bonus tasks',
    icon: '📝',
    category: 'productivity',
    status: 'coming_soon',
  },
];
