import { StyleSheet } from 'react-native'
import { spacing, typography } from '../constants/theme'
import React from 'react'

//themed components
import ThemedView from '../components/ThemedView'
import ThemedText from '../components/ThemedText'

const SettingsScreen = () => {
  return (
    <ThemedView style={styles.container}>
      <ThemedText style={styles.title} title={true}>
        Nastavení
      </ThemedText>
    </ThemedView>
  )
}

export default SettingsScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: spacing.screen,
  },
  title: {
    ...typography.headlineLg,
    alignSelf: 'flex-start',
  },
})
