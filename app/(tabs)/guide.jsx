import { StyleSheet } from 'react-native'
import { spacing, typography } from '../../constants/theme'
import { Link } from 'expo-router'

//themed components
import ThemedView from '../../components/ThemedView'
import ThemedText from '../../components/ThemedText'
import ThemedButton from '../../components/ThemedButton'

const GuideScreen = () => {
  return (
    <ThemedView style={styles.container}>
      <ThemedText style={styles.title} title={true}>
        Průvodce
      </ThemedText>

      <Link href="/info-nvs" asChild>
        <ThemedButton title="Neurovývojová stimulace" style={styles.button} />
      </Link>

      <Link href="/reflexes" asChild>
        <ThemedButton title="Primární reflexy" style={styles.button} />
      </Link>

      <Link href="/library" asChild>
        <ThemedButton title="Knihovna cviků" style={styles.button} />
      </Link>
    </ThemedView>
  )
}

export default GuideScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    paddingHorizontal: spacing.screen,
    paddingTop: spacing.xl,
    gap: 15,
  },
  title: {
    ...typography.headlineLg,
    alignSelf: 'flex-start',
  },
  button: {
    alignSelf: 'stretch',
  },
})
