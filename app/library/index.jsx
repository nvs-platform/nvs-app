import { StyleSheet, View, Pressable } from 'react-native'
import React from 'react'
import { router } from 'expo-router'
import {
  useColors,
  fonts,
  spacing,
  radius,
  typography,
} from '../../constants/theme'

//themed components
import ThemedView from '../../components/ThemedView'
import ThemedText from '../../components/ThemedText'

const LibraryScreen = () => {
  const styles = getStyles(useColors())
  return (
    <ThemedView style={styles.container}>
      <ThemedText style={styles.title} title={true}>
        Knihovna cviků
      </ThemedText>

      <View style={styles.grid}>
        <Pressable
          onPress={() => router.push('/library/starfish')}
          style={({ pressed }) => [styles.card, pressed && styles.pressed]}
        >
          <View style={styles.thumbnail} />
          <ThemedText style={styles.cardTitle} title={true}>
            Hvězdice
          </ThemedText>
        </Pressable>

        <View style={styles.card}>
          <View style={styles.thumbnail} />
          <ThemedText style={styles.cardTitle} title={true}>
            Ještěrka
          </ThemedText>
        </View>

        <View style={styles.card}>
          <View style={styles.thumbnail} />
          <ThemedText style={styles.cardTitle} title={true}>
            Kočičí hřbet
          </ThemedText>
        </View>
      </View>
    </ThemedView>
  )
}

export default LibraryScreen

const getStyles = (palette) =>
  StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      paddingHorizontal: spacing.screen,
    },
    title: {
      ...typography.headlineLg,
      alignSelf: 'flex-start',
    },
    grid: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      gap: spacing.sm,
      marginTop: spacing.lg,
    },
    card: {
      width: '30%',
      padding: spacing.xs,
      borderRadius: radius.default,
      backgroundColor: palette.card,
      borderWidth: 1,
      borderColor: palette.hairline,
    },
    thumbnail: {
      aspectRatio: 1,
      borderRadius: radius.sm,
      backgroundColor: palette.mutedSurface,
    },
    cardTitle: {
      fontFamily: fonts.bold,
      fontSize: 13,
      lineHeight: 18,
      textAlign: 'center',
      marginTop: spacing.xs,
    },
    pressed: {
      opacity: 0.7,
    },
  })
