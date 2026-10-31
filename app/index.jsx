import { StyleSheet } from 'react-native'
import { Link } from 'expo-router'

//themed components
import ThemedView from '../components/ThemedView'
import ThemedLogo from '../components/ThemedLogo'
import Spacer from '../components/Spacer'
import ThemedText from '../components/ThemedText'
import ThemedButton from '../components/ThemedButton'

const WelcomeScreen = () => {
  return (
    <ThemedView style={styles.container}>
      <ThemedLogo style={styles.logo} />
      <Spacer height={24} />

      <ThemedText style={styles.title} title={true}>
        Hravé reflexy
      </ThemedText>
      <Spacer height={8} />

      <ThemedText style={styles.subtitle}>
        Neurovývojová stimulace s úsměvem
      </ThemedText>
      <Spacer height={32} />

      <Link href="/home" asChild>
        <ThemedButton title="Pokračovat" style={styles.button} />
      </Link>
    </ThemedView>
  )
}

export default WelcomeScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  logo: {
    width: 280,
    height: 280,
    resizeMode: 'contain',
  },
  title: {
    fontFamily: 'NunitoSans_700Bold',
    fontSize: 26,
    textAlign: 'center',
  },
  subtitle: {
    fontFamily: 'NunitoSans_400Regular',
    fontSize: 17,
    textAlign: 'center',
  },
  button: {
    alignSelf: 'stretch',
  },
})
