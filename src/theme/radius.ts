export const radius = {
  none: 0,
  xs: 4,
  sm: 8,
  md: 12,
  base: 16,
  lg: 20,
  xl: 24,
  '2xl': 32,
  full: 9999,
} as const;

export type RadiusType = typeof radius;
