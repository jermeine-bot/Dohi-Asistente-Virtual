import { TextStyle } from 'react-native';

export const typography = {
  fontFamily: {
    regular: 'Poppins_400Regular',
    medium: 'Poppins_500Medium',
    semiBold: 'Poppins_600SemiBold',
    bold: 'Poppins_700Bold',
    system: 'System',
  },
  sizes: {
    xs: 11,
    sm: 13,
    base: 15,
    md: 16,
    lg: 18,
    xl: 20,
    '2xl': 24,
    '3xl': 28,
    '4xl': 32,
    '5xl': 40,
  },
  lineHeights: {
    xs: 16,
    sm: 18,
    base: 22,
    md: 24,
    lg: 26,
    xl: 28,
    '2xl': 32,
    '3xl': 36,
    '4xl': 42,
    '5xl': 50,
  },
  weights: {
    regular: '400' as TextStyle['fontWeight'],
    medium: '500' as TextStyle['fontWeight'],
    semiBold: '600' as TextStyle['fontWeight'],
    bold: '700' as TextStyle['fontWeight'],
  },
} as const;

export type TypographyType = typeof typography;
