import { StyleSheet, View, ScrollView, useWindowDimensions } from 'react-native'
import React from 'react'
import { useColors, fonts, spacing, typography } from '../../constants/theme'

//themed components
import ThemedText from '../../components/ThemedText'

const StarfishScreen = () => {
  const styles = getStyles(useColors())
  // Screen height, so the video placeholder can take one third of it
  const { height } = useWindowDimensions()

  return (
    <ScrollView style={styles.screen}>
      {/* Grey placeholder, later replaced by the preview video */}
      <View style={[styles.video, { height: height / 3 }]} />

      <View style={styles.content}>
        <ThemedText style={styles.title} title={true}>
          Hvězdice
        </ThemedText>
        <ThemedText style={styles.text}>
          Dítě sedí na židli nebo na zemi. Na začátku je schoulené do klubíčka:
          ruce zkřížené na hrudi, nohy u sebe a pokrčené, hlava skloněná. S
          nádechem se roztáhne do hvězdy, ruce i nohy daleko od těla a hlava
          mírně zakloněná. S výdechem se vrátí do klubíčka. Opakovat 5–10krát
          pomalu a plynule.
        </ThemedText>

        <ThemedText style={styles.subtitle} title={true}>
          Dechová cvičení
        </ThemedText>
        <ThemedText style={styles.text}>
          Pomalý nádech nosem do břicha (břicho se zvedá) a ještě pomalejší
          výdech pusou. Asi 5–10 nádechů.
        </ThemedText>

        <ThemedText style={styles.subtitle} title={true}>
          Zklidňující cvičení a pomalé houpání
        </ThemedText>
        <ThemedText style={styles.text}>
          Dítě leží nebo sedí a dospělý ho pomalu a rytmicky houpe, například v
          dece, na velkém míči nebo v náruči. Cílem je, aby se dítě uvolnilo.
        </ThemedText>
      </View>
    </ScrollView>
  )
}

export default StarfishScreen

const getStyles = (palette) =>
  StyleSheet.create({
    screen: {
      flex: 1,
    },
    video: {
      backgroundColor: palette.mutedSurface,
    },
    content: {
      paddingHorizontal: spacing.screen,
      paddingVertical: spacing.lg,
    },
    title: {
      ...typography.headlineLg,
    },
    subtitle: {
      fontFamily: fonts.bold,
      fontSize: 19,
      lineHeight: 26,
      marginTop: spacing.xs,
    },
    text: {
      ...typography.bodyLg,
      marginTop: spacing.xs,
      marginBottom: spacing.md,
    },
  })
