export const colors = {
  // Brand & Primary
  primary: '#167FD1',
  primaryStrong: '#2875ED',
  primaryDark: '#0E5A96',
  blue: '#3D82F5',
  navy: '#172033',
  white: '#FFFFFF',

  // Blues & Accents
  lightBlue: '#EAF3FC',
  softBlue: '#C8DDF8',
  iceBlue: '#F4F8FD',

  // Grays & Neutrals
  gray50: '#F9FAFB',
  gray100: '#F3F4F6',
  gray200: '#E5E7EB',
  gray300: '#D1D5DB',
  gray400: '#9CA3AF',
  gray500: '#6B7280',
  gray600: '#4B5563',
  gray700: '#374151',
  gray800: '#1F2937',
  gray900: '#111827',

  // Functional & Semantic
  success: '#22C55E',
  successLight: '#DCFCE7',
  warning: '#F59E0B',
  warningLight: '#FEF3C7',
  error: '#EF4444',
  errorLight: '#FEE2E2',
  info: '#3B82F6',
  infoLight: '#DBEAFE',

  // Backgrounds & Surface
  background: '#F8FAFC',
  cardBackground: '#FFFFFF',
  cardBorder: '#E2E8F0',

  // Text
  textPrimary: '#172033',
  textSecondary: '#6B7280',
  textMuted: '#9CA3AF',
  textInverse: '#FFFFFF',
  textLink: '#167FD1',

  // Status Badge backgrounds
  statusTakenBg: '#DCFCE7',
  statusTakenText: '#16A34A',
  statusPendingBg: '#FEF3C7',
  statusPendingText: '#D97706',
  statusMissedBg: '#FEE2E2',
  statusMissedText: '#DC2626',
} as const;

export type ColorType = typeof colors;
