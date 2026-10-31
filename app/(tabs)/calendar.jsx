import { ScrollView, StyleSheet } from 'react-native'
import { useCallback, useState } from 'react'
import { Calendar, LocaleConfig } from 'react-native-calendars'
import { format, parseISO } from 'date-fns'
import { cs } from 'date-fns/locale'
import { Link, useFocusEffect } from 'expo-router'

//themed components
import ThemedView from '../../components/ThemedView'
import Spacer from '../../components/Spacer'
import { useColors } from '../../constants/theme'
import ThemedText from '../../components/ThemedText'
import ThemedCard from '../../components/ThemedCard'
import ThemedButton from '../../components/ThemedButton'
import NoteCard from '../../components/NoteCard'

//storage
import { getExercisedDates, getNotes } from '../../storage/records'
import { Plus } from 'lucide-react-native'

LocaleConfig.locales.cs = {
  monthNames: [
    'Leden',
    'Únor',
    'Březen',
    'Duben',
    'Květen',
    'Červen',
    'Červenec',
    'Srpen',
    'Září',
    'Říjen',
    'Listopad',
    'Prosinec',
  ],
  monthNamesShort: [
    'led',
    'úno',
    'bře',
    'dub',
    'kvě',
    'čvn',
    'čvc',
    'srp',
    'zář',
    'říj',
    'lis',
    'pro',
  ],
  dayNames: [
    'neděle',
    'pondělí',
    'úterý',
    'středa',
    'čtvrtek',
    'pátek',
    'sobota',
  ],
  dayNamesShort: ['Ne', 'Po', 'Út', 'St', 'Čt', 'Pá', 'So'],
  today: 'Dnes',
}
LocaleConfig.defaultLocale = 'cs'

const CalendarScreen = () => {
  const palette = useColors()
  const [selectedDate, setSelectedDate] = useState('')

  const [exercisedDates, setExercisedDates] = useState([])
  const [notes, setNotes] = useState([])

  useFocusEffect(
    useCallback(() => {
      const loadRecords = async () => {
        const dates = await getExercisedDates()
        setExercisedDates(dates)
        const savedNotes = await getNotes()
        setNotes(savedNotes)
      }
      loadRecords()
    }, []),
  )

  const selectedLabel =
    selectedDate !== ''
      ? format(parseISO(selectedDate), 'd. MMMM', { locale: cs })
      : ''

  const isExercised = exercisedDates.includes(selectedDate)
  const selectedNote = notes.find((note) => note.date === selectedDate)

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

            {/* Card 2: the note, if there is one */}
            {selectedNote && (
              <NoteCard
                note={selectedNote}
                title="Poznámka"
                showFullText={true}
              />
            )}

            {/* A note belongs to an exercise, so it can be added only on exercised days */}
            {isExercised && !selectedNote && (
              <Link href={`/notes/${selectedDate}`} asChild>
                <ThemedButton title="Přidat poznámku" icon={Plus} />
              </Link>
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
    paddingHorizontal: 20,
    paddingBottom: 24,
  },
  dayDate: {
    fontSize: 15,
  },
  dayStatus: {
    fontFamily: 'NunitoSans_700Bold',
    fontSize: 19,
  },
  title: {
    fontFamily: 'NunitoSans_700Bold',
    fontSize: 26,
    alignSelf: 'flex-start',
  },
})
