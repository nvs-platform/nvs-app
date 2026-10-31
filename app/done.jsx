import { StyleSheet } from 'react-native'
import { useEffect } from 'react'
import { format } from 'date-fns'
import { Link } from 'expo-router'
import { fonts, spacing } from '../constants/theme'

//themed components
import ThemedView from '../components/ThemedView'
import ThemedText from '../components/ThemedText'
import ThemedButton from '../components/ThemedButton'

//storage
import { addExercisedDate } from '../storage/records'

const DoneScreen = () => {
  useEffect(() => {
    addExercisedDate(format(new Date(), 'yyyy-MM-dd'))
  }, [])

  return (
    <ThemedView style={styles.container}>
      <ThemedText style={styles.title} title={true}>
        Hotovo
      </ThemedText>

      <Link href="/calendar" asChild>
        <ThemedButton title="Dále" style={styles.button} />
      </Link>
    </ThemedView>
  )
}

export default DoneScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  title: {
    fontFamily: fonts.bold,
    fontSize: 34,
    textAlign: 'center',
  },
  button: {
    marginTop: spacing.lg,
  },
})
