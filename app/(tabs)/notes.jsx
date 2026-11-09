import { SectionList, StyleSheet } from 'react-native'
import { useColors, spacing, typography } from '../../constants/theme'
import { useCallback, useState } from 'react'
import { useFocusEffect } from 'expo-router'
import { format, parseISO } from 'date-fns'
import { cs } from 'date-fns/locale'

//themed components
import ThemedView from '../../components/ThemedView'
import ThemedText from '../../components/ThemedText'
import Spacer from '../../components/Spacer'
import ThemedButton from '../../components/ThemedButton'
import NoteRow from '../../components/NoteRow'

//storage
import { getNotes, toggleNoteDiscussed } from '../../storage/records'
import { seriesExercises } from '../../data/seriesExercises'
import { Plus } from 'lucide-react-native'

const NotesScreen = () => {
  const palette = useColors()
  const [notes, setNotes] = useState([])

  const loadNotes = async () => {
    const savedNotes = await getNotes()
    // Newest first
    savedNotes.sort((a, b) => b.date.localeCompare(a.date))
    setNotes(savedNotes)
  }

  useFocusEffect(
    useCallback(() => {
      loadNotes()
    }, []),
  )

  // Ticks the note off as discussed (or unticks it). The screen shows the change
  // right away and saves it after, so the tap feels instant; the reload keeps the
  // screen the same as what is really saved.
  const handleToggle = async (id) => {
    setNotes((oldNotes) =>
      oldNotes.map((note) =>
        note.id === id ? { ...note, discussed: !note.discussed } : note,
      ),
    )
    await toggleNoteDiscussed(id)
    await loadNotes()
  }

  // Groups for the list: „Obecně" first, then the exercises in program order.
  // Groups without notes are left out.
  const sections = [
    { title: 'Obecně', data: notes.filter((note) => !note.label) },
    ...seriesExercises.map((exercise) => ({
      title: exercise,
      data: notes.filter((note) => note.label === exercise),
    })),
  ].filter((section) => section.data.length > 0)

  return (
    <ThemedView style={styles.container}>
      <ThemedText style={styles.title} title={true}>
        Na konzultaci
      </ThemedText>
      <ThemedText>Vidíte je jen vy.</ThemedText>

      {sections.length === 0 && (
        <>
          <Spacer height={24} />
          <ThemedText>
            Zatím nic k probrání. Když vás při cvičení něco napadne, zapište si
            to. Na konzultaci pak na nic nezapomenete.
          </ThemedText>
        </>
      )}
      <SectionList
        style={styles.list}
        sections={sections}
        keyExtractor={(note) => note.id}
        stickySectionHeadersEnabled={false}
        renderSectionHeader={({ section }) => (
          <ThemedText
            title={true}
            style={[
              styles.sectionTitle,
              // A thin line above every group except the first one
              section !== sections[0] && {
                ...styles.sectionDivider,
                borderTopColor: palette.secondarySoft,
              },
            ]}
          >
            {section.title}
          </ThemedText>
        )}
        renderItem={({ item }) => (
          <NoteRow
            text={item.text}
            caption={format(parseISO(item.date), 'd. MMMM', { locale: cs })}
            discussed={item.discussed}
            onToggle={() => handleToggle(item.id)}
            // Will open the note in the notes panel, for now does nothing
            onPress={() => {}}
            // The menu under the three dots is only the look for now:
            // „Upravit" and „Smazat" just close it
            onEdit={() => {}}
            onDelete={() => {}}
          />
        )}
      />
      <Spacer height={16} />
      <ThemedButton
        title="Přidat poznámky"
        icon={Plus}
        // Will open the notes panel (bottom sheet), for now does nothing
        onPress={() => {}}
      />
      <Spacer height={16} />
    </ThemedView>
  )
}

export default NotesScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: spacing.screen,
    paddingTop: spacing.xl,
  },
  title: {
    ...typography.headlineLg,
    alignSelf: 'flex-start',
  },
  list: {
    flex: 1,
  },
  sectionTitle: {
    ...typography.headlineSm,
    marginTop: spacing.lg,
  },
  sectionDivider: {
    borderTopWidth: 1,
    paddingTop: spacing.lg,
  },
})
