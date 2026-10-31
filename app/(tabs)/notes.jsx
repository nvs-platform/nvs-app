import { FlatList, StyleSheet } from 'react-native'
import { useCallback, useState } from 'react'
import { useFocusEffect, Link } from 'expo-router'
import { format, parseISO } from 'date-fns'
import { cs } from 'date-fns/locale'

//themed components
import ThemedView from '../../components/ThemedView'
import ThemedText from '../../components/ThemedText'
import Spacer from '../../components/Spacer'
import ThemedButton from '../../components/ThemedButton'
import NoteCard from '../../components/NoteCard'

//storage
import { getNotes } from '../../storage/records'
import { Plus } from 'lucide-react-native'

const NotesScreen = () => {
  const [notes, setNotes] = useState([])
  const today = format(new Date(), 'yyyy-MM-dd')

  useFocusEffect(
    useCallback(() => {
      const loadNotes = async () => {
        const savedNotes = await getNotes()
        // Newest first
        savedNotes.sort((a, b) => b.date.localeCompare(a.date))
        setNotes(savedNotes)
      }
      loadNotes()
    }, []),
  )

  return (
    <ThemedView style={styles.container}>
      <ThemedText style={styles.title} title={true}>
        Poznámky
      </ThemedText>
      <ThemedText>
        Jak se dnes cvičilo? Zapište si, co se povedlo, co bylo těžší nebo co
        vás potěšilo.
      </ThemedText>
      <Spacer height={24} />
      <Link href={`/notes/${today}`} asChild>
        <ThemedButton title="Přidat poznámku" icon={Plus} />
      </Link>
      <Spacer height={24} />

      {notes.length === 0 && (
        <ThemedText>
          Zatím tu nemáte žádné poznámky. Po cvičení si sem můžete zapsat, jak
          to šlo.
        </ThemedText>
      )}
      <FlatList
        data={notes}
        keyExtractor={(note) => note.date}
        renderItem={({ item }) => (
          <NoteCard
            note={item}
            title={format(parseISO(item.date), 'd. MMMM yyyy', { locale: cs })}
            style={styles.card}
          />
        )}
      />
    </ThemedView>
  )
}

export default NotesScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
  },
  title: {
    fontFamily: 'NunitoSans_700Bold',
    fontSize: 26,
    alignSelf: 'flex-start',
  },
  card: {
    marginBottom: 12,
  },
})
