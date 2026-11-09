import { useState } from 'react'
import { Pressable, StyleSheet, View } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { Calendar } from 'react-native-calendars'
import BottomSheet, { BottomSheetView } from '@expo/ui/community/bottom-sheet'
import { format, subDays } from 'date-fns'
import { useColors, spacing, typography } from '../constants/theme'
import ThemedText from './ThemedText'
import ThemedButton from './ThemedButton'

// The window „Zaznamenat cvičení": a sheet that slides up over Home, where the
// parent picks the day they exercised. Home opens it with ref.current.present().
// Only the look: Home gives it the recorded dates and saves the record.
const RecordSheet = ({ ref, recordedDates, onSave }) => {
  const palette = useColors()
  const styles = getStyles(palette)
  const insets = useSafeAreaInsets()
  // The day the parent tapped; null = nothing tapped yet, so the default day is used
  const [selectedDate, setSelectedDate] = useState(null)

  const today = format(new Date(), 'yyyy-MM-dd')
  // The oldest day that can still be recorded
  const oldestDate = format(subDays(new Date(), 14), 'yyyy-MM-dd')

  // Today and the 14 days before it, newest first, without the recorded ones
  const freeDates = []
  for (let i = 0; i <= 14; i++) {
    const date = format(subDays(new Date(), i), 'yyyy-MM-dd')
    if (!recordedDates.includes(date)) {
      freeDates.push(date)
    }
  }
  // Preselected: today when it is free, otherwise the latest free day
  const chosenDate = selectedDate ?? freeDates[0]

  const markedDates = {}
  // Free days are always enabled. Without this the calendar greys out and locks
  // the days of the previous month (e.g. 26–31 Oct seen in November)
  freeDates.forEach((date) => {
    markedDates[date] = { disabled: false }
  })
  // Recorded days: the soft green of „Kalendář", with a dark readable number,
  // and they can't be tapped
  recordedDates.forEach((date) => {
    markedDates[date] = {
      disabled: true,
      disableTouchEvent: true,
      customStyles: {
        container: { backgroundColor: palette.mutedSurface },
        text: { color: palette.text },
      },
    }
  })
  if (chosenDate) {
    markedDates[chosenDate] = { selected: true }
  }

  return (
    <BottomSheet
      ref={ref}
      // -1 = closed, the sheet waits until Home calls present()
      index={-1}
      // The parent can pull it down, tap the dimmed area or use the back button
      enablePanDownToClose
      // Next time the sheet opens, it starts again from the default day
      onClose={() => setSelectedDate(null)}
      backgroundStyle={styles.sheet}
    >
      {/* The bottom inset keeps „Zrušit" clear of the phone's navigation bar */}
      <BottomSheetView
        style={[styles.content, { paddingBottom: insets.bottom + spacing.lg }]}
      >
        {/* The title and the hint stay together, the gap below separates the calendar */}
        <View>
          <ThemedText style={styles.title} title={true}>
            Zaznamenat cvičení
          </ThemedText>
          <ThemedText style={styles.hint}>
            Vyberte den, kdy jste cvičili mimo aplikaci.
          </ThemedText>
        </View>

        <Calendar
          firstDay={1}
          markingType="custom"
          initialDate={chosenDate}
          // Only today and the 14 days before it; the rest is grey and can't be tapped
          minDate={oldestDate}
          maxDate={today}
          disableAllTouchEventsForDisabledDays={true}
          onDayPress={(day) => setSelectedDate(day.dateString)}
          markedDates={markedDates}
          // The same colors as in „Kalendář", only on the white of the sheet
          theme={{
            calendarBackground: palette.background,
            monthTextColor: palette.text,
            textSectionTitleColor: palette.textAlt,
            dayTextColor: palette.text,
            todayTextColor: palette.primary,
            arrowColor: palette.primary,
            selectedDayBackgroundColor: palette.primary,
            selectedDayTextColor: palette.onPrimary,
            // Days that can't be picked: a faint number from the palette (works in dark mode)
            textDisabledColor: palette.track,
            // Less space between the weeks (default 7), so the sheet fits small phones
            weekVerticalMargin: 2,
          }}
        />

        <ThemedButton
          title="Uložit záznam"
          onPress={() => onSave(chosenDate)}
          // No free day left (all 15 recorded): nothing to save
          disabled={!chosenDate}
        />

        <Pressable
          onPress={() => ref.current?.dismiss()}
          accessibilityRole="button"
          style={({ pressed }) => [
            styles.cancelButton,
            pressed && styles.pressed,
          ]}
        >
          <ThemedText style={styles.cancelText}>Zrušit</ThemedText>
        </Pressable>
      </BottomSheetView>
    </BottomSheet>
  )
}

export default RecordSheet

const getStyles = (palette) =>
  StyleSheet.create({
    // The white of the page, otherwise Android paints the sheet light purple
    sheet: {
      backgroundColor: palette.background,
    },
    content: {
      paddingHorizontal: spacing.screen,
      gap: spacing.md,
    },
    title: {
      ...typography.headlineMd,
    },
    // The optional one-line hint of a sheet (DESIGN.md, „Sheets")
    hint: {
      ...typography.bodySm,
      marginTop: spacing['2xs'],
    },
    // A plain text button, at least 48 tall so it's easy to hit
    cancelButton: {
      minHeight: 48,
      alignItems: 'center',
      justifyContent: 'center',
    },
    cancelText: {
      ...typography.labelLg,
      color: palette.text,
    },
    pressed: {
      opacity: 0.7,
    },
  })
