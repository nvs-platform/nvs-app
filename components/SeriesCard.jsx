import { Pressable, StyleSheet, View } from 'react-native'
import React from 'react'
import { router } from 'expo-router'
import { useColors, typography, spacing, radius } from '../constants/theme'
import ThemedCard from './ThemedCard'
import ThemedText from './ThemedText'

// The series card on Home: heading, „Vaše cesta" and the 7 days, only the look
const SeriesCard = ({
  series, // which series it is, e.g. 1
  currentDay, // which day of the series is today (1–7)
}) => {
  const colors = useColors()
  const styles = getStyles(colors)

  // Every series has 7 days
  const days = [1, 2, 3, 4, 5, 6, 7]

  // State of a day: before today = done, today = today, after = upcoming
  const dayStatus = (day) => {
    if (day < currentDay) return 'done'
    if (day === currentDay) return 'today'
    return 'upcoming'
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <ThemedText style={styles.title} title={true}>
          Série {series}
        </ThemedText>
        <Pressable
          onPress={() => router.push('/journey')}
          hitSlop={12}
          accessibilityRole="link"
          accessibilityLabel="Vaše cesta"
          style={({ pressed }) => [
            styles.journeyButton,
            pressed && styles.pressed,
          ]}
        >
          <ThemedText style={styles.journeyLink}>Vaše cesta ›</ThemedText>
        </Pressable>
      </View>

      <ThemedCard style={styles.dayList}>
        {days.map((day) => {
          const status = dayStatus(day)

          return (
            <View
              key={day}
              style={[
                styles.dayRow,
                status === 'done' && styles.dayDone,
                status === 'today' && styles.dayToday,
              ]}
            >
              <ThemedText style={styles.dayLabel}>{day}. den</ThemedText>
              {status === 'done' && (
                <ThemedText style={styles.dayStatus}>odcvičeno</ThemedText>
              )}
              {status === 'today' && (
                <ThemedText style={styles.dayStatus}>dnes</ThemedText>
              )}
            </View>
          )
        })}
      </ThemedCard>
    </View>
  )
}

export default SeriesCard

const getStyles = (palette) =>
  StyleSheet.create({
    container: {
      flex: 1,
    },
    // A small label that belongs to the card below; it must not compete with „Dnes".
    // Indented so the text lines up with the text inside the rows.
    header: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      paddingHorizontal: spacing.lg,
      marginBottom: spacing.xs,
    },
    title: {
      ...typography.labelLg,
    },
    journeyLink: {
      ...typography.labelMd,
      color: palette.primary,
    },
    // Together with hitSlop the link is about 48 tall, easy to hit with a thumb
    journeyButton: {
      paddingVertical: spacing['2xs'],
    },
    pressed: {
      opacity: 0.7,
    },

    dayList: {
      flex: 1,
      gap: spacing['2xs'],
      padding: spacing.xs,
      // Outer radius = row radius + padding, so the corners run parallel
      borderRadius: radius.default + spacing.xs,
      backgroundColor: palette.background,
      borderWidth: 1,
      borderColor: palette.hairline,
    },
    // Rows share the free space equally, but stay between 40 and 64 tall
    dayRow: {
      flex: 1,
      minHeight: 40,
      maxHeight: 64,
      paddingHorizontal: spacing.md,
      borderRadius: radius.default,
      backgroundColor: palette.pinkSurface,
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    // White like the card, so the border shows where the row is
    dayDone: {
      backgroundColor: palette.background,
      borderWidth: 1,
      borderColor: palette.beige,
    },
    dayToday: {
      backgroundColor: palette.mutedSurface,
      borderWidth: 1,
      borderColor: palette.secondarySoft,
    },
    dayLabel: {
      ...typography.bodyMd,
      color: palette.text,
    },
    dayStatus: {
      ...typography.bodyMd,
    },
  })
