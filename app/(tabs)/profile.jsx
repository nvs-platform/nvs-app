import { StyleSheet } from 'react-native'
import { spacing, typography } from '../../constants/theme'
import React from 'react'

//themed components
import ThemedView from '../../components/ThemedView'
import ThemedText from '../../components/ThemedText'

const ProfileScreen = () => {
  return (
    <ThemedView style={styles.container}>
      <ThemedText style={styles.title} title={true}>
        Profil
      </ThemedText>
    </ThemedView>
  )
}

export default ProfileScreen

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
})
