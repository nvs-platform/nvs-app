import { Linking, Pressable, ScrollView, StyleSheet, View } from 'react-native'
import React from 'react'
import { useColors, typography, spacing, radius } from '../constants/theme'

//themed components
import ThemedView from '../components/ThemedView'
import ThemedText from '../components/ThemedText'
import ThemedCard from '../components/ThemedCard'

// „Vaše cesta": an overview of all 12 series, opened from the series card on Home
const JourneyScreen = () => {
  const palette = useColors()
  const styles = getStyles(palette)

  // For now a fixed value, like currentDay on Home; later it comes from the records
  const currentSeries = 1

  // The program has 12 series
  const allSeries = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]

  // State of a series: before the current one = done, current = current, after = upcoming
  const seriesStatus = (series) => {
    if (series < currentSeries) return 'done'
    if (series === currentSeries) return 'current'
    return 'upcoming'
  }

  return (
    <ThemedView style={styles.screen}>
      <ScrollView contentContainerStyle={styles.container}>
        <ThemedText style={styles.intro}>
          Každé společné cvičení je malý krok na vaší cestě. Nejde o rychlost,
          ale o to na cestě zůstat. 
        </ThemedText>

        {/* A small joke for development builds only (__DEV__), parents never see it */}
        {__DEV__ && (
          <Pressable
            onPress={() =>
              Linking.openURL('https://www.youtube.com/watch?v=dQw4w9WgXcQ')
            }
            hitSlop={12}
            accessibilityRole="link"
            accessibilityLabel="Co bude dál?"
            style={({ pressed }) => [
              styles.teaserButton,
              pressed && styles.pressed,
            ]}
          >
            <ThemedText style={styles.teaser}>Co bude dál? ›</ThemedText>
          </Pressable>
        )}
      </ScrollView>
    </ThemedView>
  )
}

export default JourneyScreen

const getStyles = (palette) =>
  StyleSheet.create({
    screen: {
      flex: 1,
    },
    container: {
      paddingHorizontal: spacing.screen,
      paddingTop: spacing.lg,
      paddingBottom: spacing.lg,
      gap: spacing.lg,
    },
    intro: {
      ...typography.bodyMd,
    },

    // Same look as the day rows in the series card on Home
    seriesList: {
      gap: spacing['2xs'],
      padding: spacing.sm,
      backgroundColor: palette.background,
      borderWidth: 1,
      borderColor: palette.hairline,
    },
    seriesRow: {
      minHeight: 48,
      paddingHorizontal: spacing.md,
      borderRadius: radius.default,
      backgroundColor: palette.pinkSurface,
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    // White like the card, so the border shows where the row is
    seriesDone: {
      backgroundColor: palette.background,
      borderWidth: 1,
      borderColor: palette.beige,
    },
    seriesCurrent: {
      backgroundColor: palette.mutedSurface,
      borderWidth: 1,
      borderColor: palette.secondary,
    },
    seriesLabel: {
      ...typography.bodyMd,
      color: palette.text,
    },
    seriesStatus: {
      ...typography.bodyMd,
    },

    teaserButton: {
      alignSelf: 'center',
      paddingVertical: spacing['2xs'],
    },
    teaser: {
      ...typography.labelLg,
      color: palette.primary,
    },
    pressed: {
      opacity: 0.7,
    },
  })
