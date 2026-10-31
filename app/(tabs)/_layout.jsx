import { Tabs } from 'expo-router'
import {
  House,
  CalendarDays,
  NotebookPen,
  Compass,
  CircleUser,
} from 'lucide-react-native'
import { useColors } from '../../constants/theme'

// Lucide has no filled icons, so the active tab gets a slightly thicker line
// (its color comes from tabBarActiveTintColor)
const tabIcon =
  (Icon) =>
  ({ focused, color, size }) => (
    <Icon size={size} color={color} strokeWidth={focused ? 2.5 : 2} />
  )

const TabsLayout = () => {
  const palette = useColors()
  return (
    <Tabs
      screenOptions={{
        // The header comes from the Stack in app/_layout.jsx
        headerShown: false,
        sceneStyle: { backgroundColor: palette.background },
        tabBarStyle: { backgroundColor: palette.background },
        tabBarActiveTintColor: palette.primary,
        tabBarInactiveTintColor: palette.textAlt,
        // Small text under the icon
        tabBarLabelStyle: { fontFamily: 'NunitoSans_400Regular', fontSize: 11 },
      }}
    >
      <Tabs.Screen
        name="home"
        options={{
          title: 'Domů',
          tabBarIcon: tabIcon(House),
        }}
      />

      <Tabs.Screen
        name="calendar"
        options={{
          title: 'Kalendář',
          tabBarIcon: tabIcon(CalendarDays),
        }}
      />

      <Tabs.Screen
        name="notes"
        options={{
          title: 'Poznámky',
          tabBarIcon: tabIcon(NotebookPen),
        }}
      />

      <Tabs.Screen
        name="guide"
        options={{
          title: 'Průvodce',
          tabBarIcon: tabIcon(Compass),
        }}
      />

      <Tabs.Screen
        name="profile"
        options={{
          title: 'Profil',
          tabBarIcon: tabIcon(CircleUser),
        }}
      />
    </Tabs>
  )
}

export default TabsLayout
