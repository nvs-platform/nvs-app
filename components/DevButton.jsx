import { Pressable, StyleSheet, Text } from 'react-native'
import { useNavigation } from 'expo-router'
import { Skull } from 'lucide-react-native'
import { useColors, typography, radius } from '../constants/theme'
import { clearExerciseRecords } from '../storage/records'

// Development only: small round button in the tabs header, next to the settings.
// It deletes the saved exercise records (the mock ones in storage/records.js stay)
// and opens Home again. On purpose an exception to "components don't touch storage":
// everything is in this one file, so it's easy to delete before release.
const DevButton = () => {
  const palette = useColors()
  const styles = getStyles(palette)
  // The header belongs to the tabs screen, so this is the navigation of the tabs
  const navigation = useNavigation()

  // Swaps the whole tabs screen for a brand new one, so Home is created again
  // and loads the records (much faster than reloading the whole app).
  // router.replace('/home') isn't enough: when Home is already open, nothing happens.
  const reopenTabs = () => {
    navigation.dispatch({ type: 'REPLACE', payload: { name: '(tabs)' } })
  }

  const resetRecords = async () => {
    await clearExerciseRecords()
    reopenTabs()
  }

  return (
    <Pressable
      onPress={resetRecords}
      style={({ pressed }) => [styles.button, pressed && styles.pressed]}
      accessibilityRole="button"
      accessibilityLabel="Vývoj: vymazat záznamy cvičení"
    >
      <Skull size={14} color={palette.background} strokeWidth={2} />
      <Text style={styles.label}>dev</Text>
    </Pressable>
  )
}

export default DevButton

const getStyles = (palette) =>
  StyleSheet.create({
    button: {
      width: 36,
      height: 36,
      borderRadius: radius.pill,
      backgroundColor: palette.text,
      alignItems: 'center',
      justifyContent: 'center',
    },
    label: {
      ...typography.labelSm,
      color: palette.background,
    },
    pressed: {
      opacity: 0.7,
    },
  })
