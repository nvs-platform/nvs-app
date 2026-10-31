import { StyleSheet } from 'react-native'
import { Link } from 'expo-router'
import { useColors, typography, spacing } from '../../constants/theme'

//themed components
import ThemedView from '../../components/ThemedView'
import ThemedText from '../../components/ThemedText'
import ThemedButton from '../../components/ThemedButton'
import ThemedCard from '../../components/ThemedCard'
import { Play } from 'lucide-react-native'

const HomeScreen = () => {
  const styles = getStyles(useColors())
  return (
    <ThemedView style={styles.container}>
      <ThemedCard style={styles.todayCard}>
        <ThemedText style={styles.todayTitle} title={true}>
          Dnes
        </ThemedText>
        <ThemedText style={styles.todayDay}>3. den z cyklu</ThemedText>

        <Link href="/workout" asChild>
          <ThemedButton title="Cvičíme dnes" icon={Play} />
        </Link>
      </ThemedCard>
    </ThemedView>
  )
}

export default HomeScreen

const getStyles = (palette) =>
  StyleSheet.create({
    container: {
      flex: 1,
      paddingHorizontal: 20,
      paddingTop: spacing.lg,
    },
    todayCard: {
      backgroundColor: palette.greySurface,
    },
    todayTitle: {
      ...typography.headlineMd,
    },
    todayDay: {
      ...typography.bodyMd,
      marginBottom: spacing.md,
    },
  })
