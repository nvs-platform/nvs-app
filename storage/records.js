import AsyncStorage from '@react-native-async-storage/async-storage'

// The name of the "drawer" where the dates are saved
const EXERCISED_DATES_KEY = 'exercisedDates'
// Mock data so the calendar isn't empty while testing. Delete later.
const MOCK_EXERCISED_DATES = ['2026-10-20', '2026-10-21', '2026-10-22']

// Only the dates really saved on the device
const getSavedDates = async () => {
  const json = await AsyncStorage.getItem(EXERCISED_DATES_KEY)
  if (json === null) {
    return []
  }
  return JSON.parse(json)
}

// Saved dates plus mock data, for showing in the calendar
export const getExercisedDates = async () => {
  const savedDates = await getSavedDates()
  return [...MOCK_EXERCISED_DATES, ...savedDates]
}

// Saves one more date (only once, even if called twice)
export const addExercisedDate = async (date) => {
  const dates = await getSavedDates()
  if (!dates.includes(date)) {
    dates.push(date)
  }
  await AsyncStorage.setItem(EXERCISED_DATES_KEY, JSON.stringify(dates))
}

// The name of the "drawer" where the notes are saved
const NOTES_KEY = 'notes'

// All notes saved on the device
export const getNotes = async () => {
  const json = await AsyncStorage.getItem(NOTES_KEY)
  if (json === null) {
    return []
  }
  return JSON.parse(json)
}

// Saves the note for one day. If the day already has a note, its text is replaced
export const saveNote = async (date, text) => {
  const notes = await getNotes()
  const existingNote = notes.find((note) => note.date === date)
  if (existingNote) {
    existingNote.text = text
  } else {
    notes.push({ date: date, text: text })
  }
  await AsyncStorage.setItem(NOTES_KEY, JSON.stringify(notes))
}

// Deletes the note for one day
export const deleteNote = async (date) => {
  const notes = await getNotes()
  const remainingNotes = notes.filter((note) => note.date !== date)
  await AsyncStorage.setItem(NOTES_KEY, JSON.stringify(remainingNotes))
}
