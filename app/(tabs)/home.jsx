import { Pressable, ScrollView, StyleSheet, View } from 'react-native'
import { Link } from 'expo-router'
import { useColors, typography, spacing, radius } from '../../constants/theme'

//themed components
import ThemedView from '../../components/ThemedView'
import ThemedText from '../../components/ThemedText'
import ThemedButton from '../../components/ThemedButton'
import ThemedCard from '../../components/ThemedCard'
import { CalendarPlus, Play } from 'lucide-react-native'
import SeriesCard from '../../components/SeriesCard'

const HomeScreen = () => {
  const palette = useColors()
  const styles = getStyles(palette)
  const currentDay = 3

  return (
    <ThemedView style={styles.screen}>
      <ScrollView
        contentContainerStyle={styles.container}
        alwaysBounceVertical={false}
      >
        <ThemedCard style={styles.todayCard}>
          <View style={styles.todayHeader}>
            <ThemedText style={styles.todayTitle} title={true}>
              Dnes
            </ThemedText>

            <Pressable
              style={styles.recordButton}
              hitSlop={6}
              accessibilityRole="button"
              accessibilityState={{ disabled: true }}
              accessibilityLabel="Zaznamenat cvičení"
            >
              <CalendarPlus size={20} color={palette.text} strokeWidth={2} />
            </Pressable>
          </View>

          <ThemedText style={styles.todayDay}>3. den z cyklu</ThemedText>

          <Link href="/workout" asChild>
            <ThemedButton title="Cvičíme dnes" icon={Play} />
          </Link>
        </ThemedCard>

        <SeriesCard series={1} currentDay={currentDay} />
      </ScrollView>
    </ThemedView>
  )
}

export default HomeScreen

const getStyles = (palette) =>
  StyleSheet.create({
    screen: {
      flex: 1,
    },
    container: {
      paddingHorizontal: spacing.screen,
      paddingTop: spacing.lg,
      paddingBottom: spacing.lg,
      gap: spacing.md,
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
    todayHeader: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    recordButton: {
      width: 36,
      height: 36,
      borderRadius: radius.pill,
      backgroundColor: palette.mutedSurface,
      borderWidth: 1,
      borderColor: palette.secondary,
      alignItems: 'center',
      justifyContent: 'center',
    },
  })
