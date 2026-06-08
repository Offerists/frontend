export const mockProfile = {
  id: 'usr_001',
  name: 'Alex Petrov',
  username: '@alexdev',
  avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=alex',
  level: 12,
  xp: 3450,
  xpToNext: 5000,
  rank: 'Senior Builder',
  joinedAt: '2024-01-15',
  bio: 'Full-stack dev building cool stuff in Web3 & AI',
  stats: {
    tasksCompleted: 142,
    streakDays: 23,
    totalXpEarned: 18200,
    referrals: 7,
  },
  badges: [
    { id: 'b1', name: 'Early Adopter', icon: '🚀', rarity: 'legendary' },
    { id: 'b2', name: 'Streak Master', icon: '🔥', rarity: 'epic' },
    { id: 'b3', name: 'Task Champion', icon: '🏆', rarity: 'rare' },
    { id: 'b4', name: 'Social Butterfly', icon: '🦋', rarity: 'common' },
  ],
  walletAddress: '0x1a2b3c4d5e6f7890abcdef1234567890abcdef12',
  tokens: 1250,
};

export type Profile = typeof mockProfile;
export type Badge = typeof mockProfile.badges[number];
