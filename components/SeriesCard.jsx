import { StyleSheet, View } from 'react-native'
import React from 'react'
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
    <View>
      <View style={styles.header}>
        <ThemedText style={styles.title} title={true}>
          Série {series}
        </ThemedText>
        <ThemedText style={styles.journeyLink}>Vaše cesta ›</ThemedText>
      </View>

      <ThemedCard style={styles.card}>
        <View style={styles.dayList}>
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
        </View>
      </ThemedCard>
    </View>
  )
}

export default SeriesCard

const getStyles = (palette) =>
  StyleSheet.create({
    card: {
      backgroundColor: palette.background,
      borderWidth: 1,
      borderColor: palette.hairline,
    },
    header: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: spacing.sm,
    },
    title: {
      ...typography.headlineSm,
    },
    journeyLink: {
      ...typography.labelLg,
      color: palette.primary,
    },

    dayList: {
      gap: spacing['2xs'],
    },
    dayRow: {
      minHeight: 32,
      paddingHorizontal: spacing.md,
      borderRadius: radius.default,
      backgroundColor: palette.pinkSurface,
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    dayDone: {
      backgroundColor: palette.greySurface,
    },
    dayToday: {
      backgroundColor: palette.mutedSurface,
      borderWidth: 1.5,
      borderColor: palette.secondary,
    },
    dayLabel: {
      ...typography.labelMd,
      color: palette.text,
    },
    dayStatus: {
      ...typography.bodySm,
    },
  })
