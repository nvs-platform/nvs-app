import {
  Alert,
  KeyboardAvoidingView,
  ScrollView,
  StyleSheet,
  TextInput,
} from 'react-native'
import { useEffect, useState } from 'react'
import { router, useLocalSearchParams } from 'expo-router'
import { format, parseISO } from 'date-fns'
import { cs } from 'date-fns/locale'
import { useColors, typography, radius, spacing } from '../../constants/theme'

//themed components
import ThemedView from '../../components/ThemedView'
import ThemedText from '../../components/ThemedText'
import ThemedButton from '../../components/ThemedButton'
import Spacer from '../../components/Spacer'

//storage
import { getNotes, saveNote, deleteNote } from '../../storage/records'
import { Trash2 } from 'lucide-react-native'

const NoteScreen = () => {
  const palette = useColors()
  const styles = getStyles(palette)
  const { date } = useLocalSearchParams()
  const [text, setText] = useState('')
  const [hasNote, setHasNote] = useState(false)

  // If this day already has a note, show its text so it can be edited
  useEffect(() => {
    const loadNote = async () => {
      const notes = await getNotes()
      const existingNote = notes.find((note) => note.date === date)
      if (existingNote) {
        setText(existingNote.text)
        setHasNote(true)
      }
    }
    loadNote()
  }, [date])

  const handleSave = async () => {
    await saveNote(date, text)
    router.back()
  }

  const handleDelete = () => {
    Alert.alert('Smazat poznámku?', 'Tuto akci nelze vrátit zpět.', [
      { text: 'Zrušit', style: 'cancel' },
      {
        text: 'Smazat',
        style: 'destructive',
        onPress: async () => {
          await deleteNote(date)
          router.back()
        },
      },
    ])
  }

  return (
    <ThemedView style={styles.screen}>
      {/* Keeps „Uložit" above the keyboard and lets a long note scroll */}
      <KeyboardAvoidingView style={styles.screen} behavior="padding">
        <ScrollView
          contentContainerStyle={styles.container}
          keyboardShouldPersistTaps="handled"
        >
          <Spacer height={24} />
          <ThemedText style={styles.title} title={true}>
            {format(parseISO(date), 'd. MMMM yyyy', { locale: cs })}
          </ThemedText>
          <Spacer height={16} />
          <TextInput
            style={styles.input}
            value={text}
            onChangeText={setText}
            placeholder="Jak to dnes šlo?"
            placeholderTextColor={palette.textAlt}
            multiline={true}
          />
          <Spacer height={24} />
          <ThemedButton
            title="Uložit"
            onPress={handleSave}
            disabled={text.trim() === ''}
          />

          {hasNote && (
            <>
              <Spacer height={12} />
              <ThemedButton
                title="Smazat poznámku"
                icon={Trash2}
                variant="secondary"
                onPress={handleDelete}
              />
            </>
          )}
        </ScrollView>
      </KeyboardAvoidingView>
    </ThemedView>
  )
}

export default NoteScreen

const getStyles = (palette) =>
  StyleSheet.create({
    screen: {
      flex: 1,
    },
    container: {
      paddingHorizontal: 20,
      paddingBottom: 24,
    },
    title: {
      fontFamily: 'NunitoSans_700Bold',
      fontSize: 26,
      alignSelf: 'flex-start',
    },
    input: {
      ...typography.bodyLg,
      minHeight: 200,
      padding: spacing.md,
      borderWidth: 1,
      borderColor: palette.textAlt,
      borderRadius: radius.default,
      backgroundColor: palette.card,
      color: palette.text,
      textAlignVertical: 'top',
    },
  })
