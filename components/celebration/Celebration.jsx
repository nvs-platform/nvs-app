import { useEffect, useRef } from 'react'
import { Animated, Easing, StyleSheet, View } from 'react-native'
import { fonts, spacing, useColors } from '../../constants/theme'

//themed components
import ThemedText from '../ThemedText'

//celebration
import Rays from './Rays'
import Confetti from './Confetti'

// How each motion comes in, and how fast it moves after that (ms).
// bounce: above 1 = it goes a bit too far, then settles back
const TIMING = {
  dance: { appear: 600, bounce: 1.7, move: 800 },
  spin: { appear: 1100, bounce: 1.4, move: 1600 },
  float: { appear: 1200, bounce: 1.4, move: 1400 },
  roll: { appear: 1100, bounce: 1.2, move: 1400 },
}

// One celebration on the „Hotovo" screen: rays, confetti, a circle with an icon that
// moves, and a big title. The screen picks the celebration; this component only plays it.
// motion: 'dance' (pops in, hops twice), 'spin' (spins in like a coin),
// 'float' (flies up from below) or 'roll' (rolls in from the right).
// After spin, float and roll the circle sways gently twice.
// iconRotate: turns an icon that is drawn at a slant (the paw) upright
const Celebration = ({
  icon: Icon,
  iconRotate = '0deg',
  motion,
  color,
  raysColor,
  confettiColors,
  title,
}) => {
  const palette = useColors()
  const timing = TIMING[motion]

  // 0 → 1: the circle comes in
  const appear = useRef(new Animated.Value(0)).current
  // 0 → 1, twice: the hops or the swaying after that
  const move = useRef(new Animated.Value(0)).current
  // 0 → 1: the title fades in once the circle has landed
  const titleIn = useRef(new Animated.Value(0)).current

  useEffect(() => {
    Animated.sequence([
      Animated.timing(appear, {
        toValue: 1,
        duration: timing.appear,
        easing: Easing.bezier(0.3, timing.bounce, 0.5, 1),
        useNativeDriver: true,
      }),
      Animated.loop(
        Animated.timing(move, {
          toValue: 1,
          duration: timing.move,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: true,
        }),
        { iterations: 2 },
      ),
    ]).start()

    Animated.timing(titleIn, {
      toValue: 1,
      duration: 500,
      delay: 1000,
      useNativeDriver: true,
    }).start()
  }, [])

  const scale = appear.interpolate({
    inputRange: [0, 1],
    outputRange: [0.2, 1],
  })
  const opacity = appear.interpolate({
    inputRange: [0, 0.3, 1],
    outputRange: [0, 1, 1],
  })

  // Dance: squat a little, jump up with a tilt, land
  const danceTransform = [
    {
      translateY: move.interpolate({
        inputRange: [0, 0.2, 0.5, 0.8, 1],
        outputRange: [0, 5, -34, 0, 0],
      }),
    },
    {
      rotate: move.interpolate({
        inputRange: [0, 0.5, 0.8, 1],
        outputRange: ['0deg', '-8deg', '6deg', '0deg'],
      }),
    },
    { scale },
    {
      scaleY: move.interpolate({
        inputRange: [0, 0.2, 0.5, 0.8, 1],
        outputRange: [1, 0.9, 1, 0.95, 1],
      }),
    },
  ]

  // The gentle sway after spin, float and roll: a little up with a tilt, and back
  const sway = [
    {
      translateY: move.interpolate({
        inputRange: [0, 0.5, 1],
        outputRange: [0, -12, 0],
      }),
    },
    {
      rotate: move.interpolate({
        inputRange: [0, 0.5, 1],
        outputRange: ['0deg', '-4deg', '0deg'],
      }),
    },
  ]

  // Spin: turn around twice like a coin
  const spinTransform = [
    { perspective: 800 },
    ...sway,
    {
      rotateY: appear.interpolate({
        inputRange: [0, 1],
        outputRange: ['0deg', '720deg'],
      }),
    },
    { scale },
  ]

  // Float: fly up from below the stage
  const floatTransform = [
    {
      translateY: appear.interpolate({
        inputRange: [0, 1],
        outputRange: [220, 0],
      }),
    },
    ...sway,
  ]

  // Roll: roll in from the right, one full turn
  const rollTransform = [
    {
      translateX: appear.interpolate({
        inputRange: [0, 1],
        outputRange: [260, 0],
      }),
    },
    {
      rotate: appear.interpolate({
        inputRange: [0, 1],
        outputRange: ['360deg', '0deg'],
      }),
    },
    ...sway,
  ]

  const transforms = {
    dance: danceTransform,
    spin: spinTransform,
    float: floatTransform,
    roll: rollTransform,
  }

  return (
    <View style={styles.container}>
      {/* Only decoration: screen readers skip it */}
      <View
        style={styles.stage}
        pointerEvents="none"
        importantForAccessibility="no-hide-descendants"
        accessibilityElementsHidden={true}
      >
        <Rays color={raysColor} />
        <Confetti colors={confettiColors} />
        <Animated.View
          style={[
            styles.circle,
            {
              backgroundColor: color,
              borderColor: palette.background,
              opacity,
              transform: transforms[motion],
            },
          ]}
        >
          <Icon
            size={88}
            color={palette.celebrationIcon}
            strokeWidth={2.5}
            style={{ transform: [{ rotate: iconRotate }] }}
          />
        </Animated.View>
      </View>

      <Animated.View
        style={{
          opacity: titleIn,
          transform: [
            {
              translateY: titleIn.interpolate({
                inputRange: [0, 1],
                outputRange: [14, 0],
              }),
            },
          ],
        }}
      >
        <ThemedText
          style={styles.title}
          title={true}
          accessibilityRole="header"
        >
          {title}
        </ThemedText>
      </Animated.View>
    </View>
  )
}

export default Celebration

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
  },
  // Lower than the rays on purpose: they reach over the edge, so the title sits
  // close under the circle, like in the mockup
  stage: {
    width: 300,
    height: 200,
    alignItems: 'center',
    justifyContent: 'center',
  },
  circle: {
    width: 160,
    height: 160,
    borderRadius: 80,
    borderWidth: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontFamily: fonts.extraBold,
    fontSize: 40,
    lineHeight: 48,
    letterSpacing: -0.8,
    textAlign: 'center',
    marginTop: spacing.md,
  },
})
