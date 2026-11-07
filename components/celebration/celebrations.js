import { Balloon, PawPrint, Rocket, Star, Sun } from 'lucide-react-native'

// Celebrations for the „Hotovo" screen. done.jsx picks one at random each time.
// icon: the Lucide icon in the circle
// motion: 'dance', 'spin', 'float' or 'roll' (see Celebration.jsx)
// color, raysColor, confettiColors: names of colors in constants/theme.js
// title: the one big word under it
// More ideas are in docs/CELEBRATION_PLAN.md.
export const celebrations = [
  {
    icon: Sun,
    motion: 'dance',
    color: 'celebrationSun',
    raysColor: 'celebrationSunRays',
    confettiColors: ['celebrationSun', 'tertiary', 'primary'],
    title: 'Hurá!',
  },
  {
    icon: Star,
    motion: 'spin',
    color: 'celebrationStar',
    raysColor: 'celebrationStarRays',
    confettiColors: ['celebrationStar', 'primary', 'secondary'],
    title: 'Paráda!',
  },
  {
    icon: Balloon,
    motion: 'float',
    color: 'celebrationBalloon',
    raysColor: 'celebrationBalloonRays',
    confettiColors: ['celebrationBalloon', 'primary', 'celebrationSun'],
    title: 'Skvěle!',
  },
  {
    icon: Rocket,
    motion: 'float',
    color: 'celebrationRocket',
    raysColor: 'celebrationRocketRays',
    confettiColors: ['celebrationRocket', 'celebrationSun', 'tertiary'],
    title: 'Super!',
  },
  {
    icon: PawPrint,
    // The Lucide paw points to the top right; turn it so the toes point up
    iconRotate: '-50deg',
    motion: 'roll',
    color: 'celebrationPaw',
    raysColor: 'celebrationPawRays',
    confettiColors: ['celebrationPaw', 'primary', 'secondary'],
    title: 'Bravo!',
  },
]
