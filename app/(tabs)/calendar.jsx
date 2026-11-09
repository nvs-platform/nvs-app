import { ScrollView, StyleSheet } from 'react-native'
import { useCallback, useState } from 'react'
import { Calendar } from 'react-native-calendars'
import { format, parseISO } from 'date-fns'
import { cs } from 'date-fns/locale'
import { useFocusEffect } from 'expo-router'

//themed components
import ThemedView from '../../components/ThemedView'
import Spacer from '../../components/Spacer'
import { useColors, fonts, spacing, typography } from '../../constants/theme'
import ThemedText from '../../components/ThemedText'
import ThemedCard from '../../components/ThemedCard'
import ThemedButton from '../../components/ThemedButton'

//storage
import { getExercisedDates } from '../../storage/records'
import { Pencil } from 'lucide-react-native'

const CalendarScreen = () => {
  const palette = useColors()
  const today = format(new Date(), 'yyyy-MM-dd')
  // Today is selected from the start, so after „Hotovo" the parent sees today's card
  const [selectedDate, setSelectedDate] = useState(today)

  const [exercisedDates, setExercisedDates] = useState([])

  const loadRecords = async () => {
    const dates = await getExercisedDates()
    setExercisedDates(dates)
  }

  useFocusEffect(
    useCallback(() => {
      loadRecords()
      // The tab stays mounted, so select today again every time it opens
      setSelectedDate(format(new Date(), 'yyyy-MM-dd'))
    }, []),
  )

  const selectedLabel =
    selectedDate !== ''
      ? format(parseISO(selectedDate), 'd. MMMM', { locale: cs })
      : ''

  const isExercised = exercisedDates.includes(selectedDate)

  const markedDates = {}
  exercisedDates.forEach((date) => {
    markedDates[date] = {
      customStyles: {
        container: { backgroundColor: palette.mutedSurface },
      },
    }
  })
  markedDates[selectedDate] = { selected: true }

  return (
    <ThemedView style={styles.screen}>
      <ScrollView contentContainerStyle={styles.container}>
        <Spacer height={24} />
        <Calendar
          firstDay={1}
          markingType="custom"
          onDayPress={(day) => setSelectedDate(day.dateString)}
          markedDates={markedDates}
          theme={{
            calendarBackground: palette.card,
            monthTextColor: palette.text,
            textSectionTitleColor: palette.textAlt,
            dayTextColor: palette.text,
            todayTextColor: palette.primary,
            arrowColor: palette.primary,
            selectedDayBackgroundColor: palette.primary,
            selectedDayTextColor: palette.onPrimary,
          }}
        />
        <Spacer height={24} />
        {selectedDate !== '' && (
          <>
            {/* Card 1: the date and whether there was an exercise.
                Exercised days get the same soft green as their circle in the calendar. */}
            <ThemedCard
              style={isExercised && { backgroundColor: palette.mutedSurface }}
            >
              <ThemedText style={styles.dayDate}>{selectedLabel}</ThemedText>
              <ThemedText style={styles.dayStatus} title={true}>
                {isExercised ? 'Odcvičeno' : 'Zatím bez záznamu'}
              </ThemedText>
            </ThemedCard>
            <Spacer height={12} />

            {/* Notes are written right after exercising, so only exercised days get the button */}
            {isExercised && (
              <ThemedButton
                title="Zapsat poznámky"
                icon={Pencil}
                variant="secondary"
                // Will open the notes panel (bottom sheet), for now does nothing
                onPress={() => {}}
              />
            )}
          </>
        )}
      </ScrollView>
    </ThemedView>
  )
}

export default CalendarScreen

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
  container: {
    paddingHorizontal: spacing.screen,
    paddingBottom: 24,
  },
  dayDate: {
    fontSize: 15,
  },
  dayStatus: {
    fontFamily: fonts.bold,
    fontSize: 19,
    lineHeight: 26,
  },
  title: {
    ...typography.headlineLg,
    alignSelf: 'flex-start',
  },
})
