import { Pressable, StyleSheet, View } from 'react-native'
import { Link } from 'expo-router'
import { Pencil } from 'lucide-react-native'
import { useColors } from '../constants/theme'
import ThemedCard from './ThemedCard'
import ThemedText from './ThemedText'

// Note card used in Poznámky and Kalendář. Tapping it opens the note for editing.
// title: the text in the top row, e.g. the date or „Poznámka"
// showFullText: show the whole note instead of a two-line preview
const NoteCard = ({ note, title, style, showFullText = false }) => {
  const palette = useColors()

  return (
    <Link href={`/notes/${note.date}`} asChild>
      <Pressable>
        <ThemedCard
          style={[styles.card, { borderColor: palette.textAlt }, style]}
        >
          <View style={styles.header}>
            <ThemedText title={true}>{title}</ThemedText>
            <Pencil size={20} color={palette.textAlt} strokeWidth={2} />
          </View>
          <ThemedText numberOfLines={showFullText ? undefined : 2}>
            {note.text}
          </ThemedText>
        </ThemedCard>
      </Pressable>
    </Link>
  )
}

export default NoteCard

const styles = StyleSheet.create({
  card: {
    borderWidth: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
})
