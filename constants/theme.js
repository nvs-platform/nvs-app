// Design tokens from docs/DESIGN.md. The palette is not final — change colors here only.

import { useColorScheme } from 'react-native'

// Both palettes have the same keys. `dark` is a first draft.
export const colors = {
  light: {
    // Darker than the first #35AFCB, so white button text has enough contrast (4.6 : 1)
    primary: '#1E7F96',
    secondary: '#788A6D',
    // Lighter sage for soft borders, e.g. today's row on Home
    secondarySoft: '#B4C0AC',
    tertiary: '#E9B69A',
    background: '#FFFFFF',
    card: '#FFFDF8',
    mutedSurface: '#E8EDE3',
    beige: '#E8E1D5',
    greySurface: '#F1F2F3',
    pinkSurface: '#F8E8E4',
    text: '#303F49',
    textAlt: '#42483E',
    onPrimary: '#FFFFFF',
    error: '#BA1A1A',
    hairline: 'rgba(120,138,109,0.15)',
    overlay: 'rgba(255,255,255,0.7)',
    glass: 'rgba(255,255,255,0.7)',
    glassBorder: 'rgba(48,63,73,0.12)',
    track: 'rgba(48,63,73,0.18)',
    // Celebration on the „Hotovo" screen only (components/celebration/).
    // Light circles as in the mockup; the big icon with a thick outline keeps its shape
    // readable, though white on yellow/apricot is under 3 : 1 (it is only decoration).
    celebrationSun: '#F2B84B',
    celebrationSunRays: '#FCEFD2',
    celebrationStar: '#E9B69A',
    celebrationStarRays: '#FBEDE4',
    celebrationBalloon: '#E58D63',
    celebrationBalloonRays: '#FBE6DA',
    celebrationRocket: '#1E7F96',
    celebrationRocketRays: '#DDF0F4',
    celebrationPaw: '#E9B69A',
    celebrationPawRays: '#FBEDE4',
    celebrationIcon: '#FFFFFF',
  },
  dark: {
    primary: '#5BC3DB',
    secondary: '#9BAD8F',
    secondarySoft: '#5F6E57',
    tertiary: '#D9A488',
    background: '#1C1F1D',
    card: '#262A27',
    mutedSurface: '#2F3530',
    beige: '#3A3630',
    greySurface: '#2A2D2E',
    pinkSurface: '#3A2F2D',
    text: '#EDEAE3',
    textAlt: '#C9CCC2',
    onPrimary: '#0F2B33',
    error: '#FFB4AB',
    hairline: 'rgba(155,173,143,0.2)',
    overlay: 'rgba(28,31,29,0.7)',
    glass: 'rgba(28,31,29,0.85)',
    glassBorder: 'rgba(255,255,255,0.15)',
    track: 'rgba(237,234,227,0.18)',
    celebrationSun: '#F2B84B',
    celebrationSunRays: 'rgba(242,184,75,0.18)',
    celebrationStar: '#E9B69A',
    celebrationStarRays: 'rgba(217,164,136,0.18)',
    celebrationBalloon: '#E58D63',
    celebrationBalloonRays: 'rgba(229,141,99,0.18)',
    celebrationRocket: '#1E7F96',
    celebrationRocketRays: 'rgba(91,195,219,0.18)',
    celebrationPaw: '#E9B69A',
    celebrationPawRays: 'rgba(217,164,136,0.18)',
    celebrationIcon: '#FFFFFF',
  },
}

// Returns the light or dark palette, depending on the phone's setting.
// Note: app.json has "userInterfaceStyle": "light" during development, so this is
// always light for now. In production it will be "automatic".
export const useColors = () => {
  const scheme = useColorScheme()
  return scheme === 'dark' ? colors.dark : colors.light
}

// On Android a custom font ignores fontWeight, so each weight is its own family.
export const fonts = {
  regular: 'NunitoSans_400Regular',
  medium: 'NunitoSans_500Medium',
  semiBold: 'NunitoSans_600SemiBold',
  bold: 'NunitoSans_700Bold',
  extraBold: 'NunitoSans_800ExtraBold',
}

export const typography = {
  displayLg: {
    fontFamily: fonts.extraBold,
    fontSize: 34,
    lineHeight: 42,
    letterSpacing: -0.68,
  },
  headlineLg: { fontFamily: fonts.bold, fontSize: 26, lineHeight: 34 },
  headlineMd: { fontFamily: fonts.bold, fontSize: 22, lineHeight: 28 },
  headlineSm: { fontFamily: fonts.semiBold, fontSize: 19, lineHeight: 26 },
  bodyLg: { fontFamily: fonts.regular, fontSize: 17, lineHeight: 26 },
  bodyMd: { fontFamily: fonts.regular, fontSize: 15, lineHeight: 22 },
  bodySm: { fontFamily: fonts.medium, fontSize: 13, lineHeight: 18 },
  labelLg: { fontFamily: fonts.bold, fontSize: 15, lineHeight: 20 },
  labelMd: { fontFamily: fonts.semiBold, fontSize: 13, lineHeight: 16 },
  labelSm: { fontFamily: fonts.semiBold, fontSize: 11, lineHeight: 14 },
}

export const spacing = {
  '2xs': 4,
  xs: 8,
  sm: 12,
  md: 16,
  lg: 24,
  xl: 32,
  '2xl': 48,
  screen: 20,
}

export const radius = {
  sm: 8,
  default: 16,
  card: 32,
  cardLg: 48,
  pill: 9999,
}
