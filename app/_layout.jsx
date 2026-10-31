import { Link, Stack } from 'expo-router'
import { StatusBar } from 'expo-status-bar'
import { Pressable, StyleSheet, View } from 'react-native'
import Ionicons from '@expo/vector-icons/Ionicons'
import { useColors } from '../constants/theme'
import {
  useFonts,
  NunitoSans_400Regular,
  NunitoSans_700Bold,
} from '@expo-google-fonts/nunito-sans'

const RootLayout = () => {
  const palette = useColors()
  const styles = getStyles(palette)
  const [loaded, error] = useFonts({
    NunitoSans_400Regular,
    NunitoSans_700Bold,
  })

  // Wait until the fonts are loaded, so the text doesn't start in the system font
  if (!loaded && !error) {
    return null
  }

  return (
    <>
      {/* Status bar icons follow the light/dark mode */}
      <StatusBar style="auto" />
      <Stack
        screenOptions={{
          contentStyle: { backgroundColor: palette.background },
          headerStyle: { backgroundColor: palette.background },
          // Soft system shadow under the header, so it stands out from the white page
          headerShadowVisible: true,
          headerTintColor: palette.text,
          headerTitleStyle: { fontFamily: 'NunitoSans_700Bold' },
        }}
      >
        {/* The welcome screen has no header */}
        <Stack.Screen name="index" options={{ headerShown: false }} />
        {/* One header shared by all tabs (Domů, Kalendář, Poznámky, Průvodce, Profil) */}
        <Stack.Screen
          name="(tabs)"
          options={{
            title: 'uživatel 1',
            // Heart in the left corner of the header
            headerLeft: () => (
              <View style={styles.avatar}>
                <Ionicons name="heart-outline" size={20} color={palette.text} />
              </View>
            ),
            // Icon in the right corner opens the settings
            headerRight: () => (
              <Link href="/settings" asChild>
                <Pressable accessibilityLabel="Nastavení">
                  <Ionicons
                    name="ellipsis-horizontal-outline"
                    size={24}
                    color={palette.text}
                  />
                </Pressable>
              </Link>
            ),
          }}
        />
        <Stack.Screen name="notes/[date]" options={{ title: 'Poznámka' }} />

        <Stack.Screen name="workout" options={{ title: 'Cvičení' }} />
        {/* The big „Hotovo" on the page is enough; the way on is the „Dále" button */}
        <Stack.Screen name="done" options={{ headerShown: false }} />
        <Stack.Screen
          name="library/index"
          options={{ title: 'Knihovna cviků' }}
        />
        <Stack.Screen name="library/starfish" options={{ title: 'Hvězdice' }} />
        <Stack.Screen name="reflexes" options={{ title: 'Primární reflexy' }} />
        <Stack.Screen
          name="info-nvs"
          options={{ title: 'Neurovývojová stimulace' }}
        />
        <Stack.Screen name="settings" options={{ title: 'Nastavení' }} />
      </Stack>
    </>
  )
}

export default RootLayout

const getStyles = (palette) =>
  StyleSheet.create({
    avatar: {
      width: 36,
      height: 36,
      borderRadius: 18,
      backgroundColor: palette.greySurface,
      alignItems: 'center',
      justifyContent: 'center',
      marginRight: 12,
    },
  })
