import { useCallback, useState } from 'react'
import { format } from 'date-fns'
import { Pressable, ScrollView, StyleSheet, View } from 'react-native'
import { Link, useFocusEffect } from 'expo-router'
import { useColors, typography, spacing, radius } from '../../constants/theme'

//themed components
import ThemedView from '../../components/ThemedView'
import ThemedText from '../../components/ThemedText'
import ThemedButton from '../../components/ThemedButton'
import ThemedCard from '../../components/ThemedCard'
import { CalendarPlus, Check, Play } from 'lucide-react-native'
import SeriesCard from '../../components/SeriesCard'
import { getCurrentSeriesRecords } from '../../storage/records'

const HomeScreen = () => {
  const palette = useColors()
  const styles = getStyles(palette)
  const [records, setRecords] = useState([])

  const loadRecords = async () => {
    setRecords(await getCurrentSeriesRecords())
  }

  // Home is a tab and stays mounted, so it loads again every time it gets focus
  useFocusEffect(
    useCallback(() => {
      loadRecords()
    }, []),
  )

  const today = format(new Date(), 'yyyy-MM-dd')
  // Has today already been exercised (in the app or recorded by hand)?
  const todayDone = records.some((record) => record.date === today)
  // How many exercises of the series are done
  const doneCount = records.length

  return (
    <ThemedView style={styles.screen}>
      <ScrollView
        contentContainerStyle={styles.container}
        alwaysBounceVertical={false}
      >
        <ThemedCard
          style={[styles.todayCard, todayDone && styles.todayCardDone]}
        >
          {todayDone ? (
            <View style={styles.todayDone}>
              <View style={styles.todayDoneCircle}>
                <Check size={30} color={palette.text} strokeWidth={2} />
              </View>
              <ThemedText style={styles.todayDoneTitle} title={true}>
                Dnes máte hotovo
              </ThemedText>
              <ThemedText style={styles.todayDoneText}>
                Další cvičení série na vás počká.
              </ThemedText>
            </View>
          ) : (
            <>
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
                  <CalendarPlus
                    size={20}
                    color={palette.text}
                    strokeWidth={2}
                  />
                </Pressable>
              </View>

              <ThemedText style={styles.todayDay}>
                {doneCount + 1}. cvičení série
              </ThemedText>
              <Link href="/workout" asChild>
                <ThemedButton title="Cvičíme dnes" icon={Play} />
              </Link>
            </>
          )}
        </ThemedCard>

        <SeriesCard series={1} doneCount={doneCount} todayDone={todayDone} />
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
      // Fills the screen, so the day rows can stretch into the free space
      flexGrow: 1,
      paddingHorizontal: spacing.screen,
      paddingTop: spacing.md,
      paddingBottom: spacing.lg,
      gap: spacing.lg,
    },

    todayCard: {
      backgroundColor: palette.greySurface,
      // The height of the ready card (header 36 + day line 22 + 16 + button 56
      // + padding 2 × 24), so the done card is just as tall and the series doesn't jump
      minHeight: 178,
    },
    // Done state: the cream card with a soft border, as in the mockup
    todayCardDone: {
      backgroundColor: palette.card,
      borderWidth: 1,
      borderColor: palette.beige,
    },
    todayTitle: {
      ...typography.headlineMd,
    },
    todayDay: {
      ...typography.bodyMd,
      marginBottom: spacing.md,
    },
    // Done state: everything centred in the card, both ways
    todayDone: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
    },
    todayDoneCircle: {
      width: 56,
      height: 56,
      borderRadius: radius.pill,
      // The same soft green as „odcvičeno" in the calendar
      backgroundColor: palette.mutedSurface,
      alignItems: 'center',
      justifyContent: 'center',
      marginBottom: spacing.sm,
    },
    // The same size as the „Dnes" heading of the ready card
    todayDoneTitle: {
      ...typography.headlineMd,
      textAlign: 'center',
    },
    // Smaller than the title and right under it, as in the mockup
    todayDoneText: {
      ...typography.bodyMd,
      textAlign: 'center',
      marginTop: 2,
    },
    todayHeader: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      minHeight: 36,
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
