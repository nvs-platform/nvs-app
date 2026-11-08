import { Pressable, StyleSheet, View } from 'react-native'
import React from 'react'
import { router } from 'expo-router'
import { CalendarPlus } from 'lucide-react-native'
import { useColors, typography, spacing, radius } from '../constants/theme'
import ThemedCard from './ThemedCard'
import ThemedText from './ThemedText'

// The series card on Home: heading, „Vaše cesta" and the exercises of one week,
// only the look
const SeriesCard = ({
  series, // which series it is, e.g. 1
  doneCount, // how many exercises of the series are done
  todayDone, // has today already been exercised?
  onRecord, // what happens when the row with the calendar-plus icon is tapped
}) => {
  const colors = useColors()
  const styles = getStyles(colors)

  // The next free exercise of the series
  const nextNumber = doneCount + 1
  // Which week to show: the week of the next free exercise (0 = first week)
  const week = Math.floor(doneCount / 7)
  // The 7 exercise numbers of that week, e.g. week 1 → 8, 9, … 14
  const numbers = [1, 2, 3, 4, 5, 6, 7].map((n) => week * 7 + n)

  // State of a row: done, today, record (a past day can be added) or upcoming
  const rowStatus = (number) => {
    if (number <= doneCount) return 'done'
    if (number === nextNumber && !todayDone) return 'today'
    if (number === nextNumber && todayDone) return 'record'
    return 'upcoming'
  }

  return (
    <View style={styles.container}>
      <ThemedCard style={styles.dayList}>
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

        {numbers.map((number) => {
          const status = rowStatus(number)

          return (
            <Pressable
              key={number}
              // Only the row with the calendar-plus icon can be tapped
              disabled={status !== 'record'}
              onPress={onRecord}
              accessibilityRole={status === 'record' ? 'button' : undefined}
              accessibilityLabel={
                status === 'record' ? 'Zaznamenat cvičení' : undefined
              }
              style={[
                styles.dayRow,
                status === 'done' && styles.dayDone,
                status === 'today' && styles.dayToday,
              ]}
            >
              <ThemedText style={styles.dayLabel}>{number}. cvičení</ThemedText>
              {status === 'done' && (
                <ThemedText style={styles.dayStatus}>odcvičeno</ThemedText>
              )}
              {status === 'today' && (
                <ThemedText style={styles.dayStatus}>dnes</ThemedText>
              )}
              {status === 'record' && (
                <View style={styles.recordIcon}>
                  <CalendarPlus size={16} color={colors.text} strokeWidth={2} />
                </View>
              )}
            </Pressable>
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
    // The heading sits inside the card, above the rows, like „Dnes" in its card.
    // Its side padding matches the rows, so „Série 1" starts where the row text starts.
    header: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      paddingHorizontal: spacing.md,
      // 8 (card) + 16 = 24 from the top, the same as „Dnes" in the card above
      paddingTop: spacing.md,
      paddingBottom: spacing.xs,
    },
    // A step under „Dnes" (22), but clearly bigger than the row text (15)
    title: {
      ...typography.headlineSm,
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

    recordIcon: {
      width: 28,
      height: 28,
      borderRadius: radius.pill,
      // The same pink as the row, only a soft apricot border shows the button
      backgroundColor: palette.pinkSurface,
      borderWidth: 1,
      borderColor: palette.tertiary,
      alignItems: 'center',
      justifyContent: 'center',
    },
  })
