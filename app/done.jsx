import { Animated, StyleSheet } from 'react-native'
import { useEffect, useRef, useState } from 'react'
import { format } from 'date-fns'
import { Link } from 'expo-router'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { useColors, spacing } from '../constants/theme'

//themed components
import ThemedView from '../components/ThemedView'
import ThemedButton from '../components/ThemedButton'
import Spacer from '../components/Spacer'

//celebration
import Celebration from '../components/celebration/Celebration'
import { celebrations } from '../components/celebration/celebrations'

//storage
import { addExerciseRecord } from '../storage/records'

const DoneScreen = () => {
  const palette = useColors()
  // The screen has no header, so keep the button above the system navigation bar
  const insets = useSafeAreaInsets()

  // One random celebration, picked once when the screen opens
  const [celebration] = useState(
    () => celebrations[Math.floor(Math.random() * celebrations.length)],
  )

  // 0 → 1: the button fades in once the title is there
  const buttonIn = useRef(new Animated.Value(0)).current
  // The button can't be tapped before it is visible
  const [buttonReady, setButtonReady] = useState(false)

  useEffect(() => {
    addExerciseRecord(format(new Date(), 'yyyy-MM-dd'))

    Animated.timing(buttonIn, {
      toValue: 1,
      duration: 800,
      delay: 1800,
      useNativeDriver: true,
    }).start(() => setButtonReady(true))
  }, [])

  return (
    <ThemedView style={[styles.container, { paddingBottom: insets.bottom }]}>
      <Spacer flex={4} />

      <Celebration
        icon={celebration.icon}
        iconRotate={celebration.iconRotate}
        motion={celebration.motion}
        color={palette[celebration.color]}
        raysColor={palette[celebration.raysColor]}
        confettiColors={celebration.confettiColors.map((name) => palette[name])}
        title={celebration.title}
      />

      <Spacer flex={1} minHeight={24} />

      <Animated.View
        style={{ opacity: buttonIn }}
        pointerEvents={buttonReady ? 'auto' : 'none'}
        accessibilityElementsHidden={!buttonReady}
        importantForAccessibility={buttonReady ? 'auto' : 'no-hide-descendants'}
      >
        <Link href="/calendar" dismissTo asChild>
          <ThemedButton title="Hotovo" style={styles.button} />
        </Link>
      </Animated.View>

      <Spacer flex={2} />
    </ThemedView>
  )
}

export default DoneScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: spacing.screen,
  },
  button: {
    width: 220,
    alignSelf: 'center',
  },
})
