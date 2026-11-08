import AsyncStorage from '@react-native-async-storage/async-storage'

// The name of the "drawer" where the exercise records are saved
const EXERCISE_RECORDS_KEY = 'exerciseRecords'
// Until the parent can switch series („Vaše cesta"), everybody is in series 1
const CURRENT_SERIES = 1
// Mock records so Home and the calendar aren't empty while testing. Delete later.
// They are never saved, so the reset doesn't delete them.
const MOCK_EXERCISE_RECORDS = [
  { date: '2026-11-05', series: 1 },
  { date: '2026-11-06', series: 1 },
]

// Only the records really saved on the device
const getSavedRecords = async () => {
  const json = await AsyncStorage.getItem(EXERCISE_RECORDS_KEY)
  if (json === null) {
    return []
  }
  return JSON.parse(json)
}

// Saved records plus mock records,
// for example [{ date: '2026-11-08', series: 1 }]
export const getExerciseRecords = async () => {
  const savedRecords = await getSavedRecords()
  return [...MOCK_EXERCISE_RECORDS, ...savedRecords]
}

// Only the records of the series the family does now (for Home)
export const getCurrentSeriesRecords = async () => {
  const records = await getExerciseRecords()
  return records.filter((record) => record.series === CURRENT_SERIES)
}

// Only the dates, for the calendar
export const getExercisedDates = async () => {
  const records = await getExerciseRecords()
  return records.map((record) => record.date)
}

// Saves one exercised day in the current series (only once per day)
export const addExerciseRecord = async (date) => {
  // Checks the mock records too, so a mock day can't be recorded twice
  const allRecords = await getExerciseRecords()
  const alreadySaved = allRecords.some((record) => record.date === date)
  if (!alreadySaved) {
    // Saves only the real records, the mock ones stay out of the drawer
    const savedRecords = await getSavedRecords()
    savedRecords.push({ date: date, series: CURRENT_SERIES })
    await AsyncStorage.setItem(
      EXERCISE_RECORDS_KEY,
      JSON.stringify(savedRecords),
    )
  }
}

// Development only: deletes the saved exercise records (not the mock ones),
// so the cycle can be tested again
export const clearExerciseRecords = async () => {
  await AsyncStorage.removeItem(EXERCISE_RECORDS_KEY)
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
