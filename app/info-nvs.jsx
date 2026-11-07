import { StyleSheet } from 'react-native'
import { spacing, typography } from '../constants/theme'
import React from 'react'

//themed components
import ThemedView from '../components/ThemedView'
import ThemedText from '../components/ThemedText'

const InfoNvsScreen = () => {
  return (
    <ThemedView style={styles.container}>
      <ThemedText style={styles.title} title={true}>
        Neurovývojová stimulace
      </ThemedText>

      <ThemedText style={styles.text}>
        Neuro-vývojová stimulace (NVS) je metoda, která pomocí jednoduchého
        pohybu podporuje správný vývoj dítěte. Pohyb miminka v prvních měsících
        života pomáhá v mozku vytvářet propojení, která dítě později potřebuje k
        učení, řeči a soustředění. Pokud tento vývoj neproběhne úplně, například
        kvůli náročnému porodu nebo nemoci, může mít dítě později potíže se
        soustředěním, koordinací, psaním, čtením nebo chováním. NVS tvoří krátké
        cviky, které dítě dělá pravidelně doma s rodičem. Díky opakování si
        mozek vytváří nová propojení a dítě se může lépe soustředit, pohybovat
        jistěji a být klidnější.
      </ThemedText>
    </ThemedView>
  )
}

export default InfoNvsScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: spacing.screen,
  },
  title: {
    ...typography.headlineLg,
    textAlign: 'center',
  },
  text: {
    ...typography.bodyLg,
    marginTop: 8,
    marginBottom: 32,
  },
})
