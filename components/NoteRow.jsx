import { useRef, useState } from 'react'
import {
  Modal,
  Pressable,
  StyleSheet,
  View,
  useWindowDimensions,
} from 'react-native'
import {
  Circle,
  CircleCheck,
  EllipsisVertical,
  Pencil,
  Trash2,
} from 'lucide-react-native'
import { useColors, typography, spacing, radius } from '../constants/theme'
import ThemedText from './ThemedText'

// One note: a round checkbox („probráno"), the text and a small caption under it
// (the date in the Poznámky tab, the label in Kalendář).
// The screen decides what happens on a tap:
// onToggle - tap on the checkbox, onPress - tap on the text (opens the note),
// onEdit / onDelete - „Upravit" / „Smazat" in the small menu under the three dots.
// Without onDelete the three dots are hidden.
const NoteRow = ({
  text,
  caption,
  discussed,
  onToggle,
  onPress,
  onEdit,
  onDelete,
}) => {
  const palette = useColors()
  const { width: screenWidth, height: screenHeight } = useWindowDimensions()
  // A ticked note shows a circle with a check mark
  const CheckIcon = discussed ? CircleCheck : Circle

  // The small menu card: where the three dots are, so it opens right under them
  const dotsRef = useRef(null)
  const [menuPosition, setMenuPosition] = useState(null)

  const openMenu = () => {
    dotsRef.current.measureInWindow((x, y, width, height) => {
      const right = screenWidth - (x + width)
      // Near the bottom of the screen (the tab bar) the card opens above the dots,
      // so „Smazat" is never hidden. 110 is about the card's height.
      const fitsBelow = y + height + 110 < screenHeight - spacing['2xl']
      setMenuPosition(
        fitsBelow
          ? { top: y + height, right }
          : { bottom: screenHeight - y, right },
      )
    })
  }

  const closeMenu = () => setMenuPosition(null)

  return (
    <View style={styles.row}>
      <Pressable
        onPress={onToggle}
        hitSlop={12}
        accessibilityRole="checkbox"
        accessibilityState={{ checked: discussed }}
        accessibilityLabel={`Probráno: ${text}`}
        style={({ pressed }) => [styles.tapArea, pressed && styles.pressed]}
      >
        <CheckIcon
          size={24}
          color={discussed ? palette.primary : palette.textAlt}
          strokeWidth={2}
        />
      </Pressable>
      <Pressable
        onPress={onPress}
        style={({ pressed }) => [styles.content, pressed && styles.pressed]}
      >
        <ThemedText
          // A new key when the state changes draws the text again: Android
          // sometimes doesn't redraw the line-through on an existing text
          key={discussed ? 'discussed' : 'open'}
          numberOfLines={2}
          style={[{ color: palette.text }, discussed && styles.discussedText]}
        >
          {text}
        </ThemedText>
        <ThemedText style={typography.bodySm}>{caption}</ThemedText>
      </Pressable>
      {onDelete && (
        <Pressable
          ref={dotsRef}
          onPress={openMenu}
          hitSlop={12}
          accessibilityRole="button"
          accessibilityLabel={`Další možnosti: ${text}`}
          accessibilityState={{ expanded: menuPosition !== null }}
          style={({ pressed }) => [styles.tapArea, pressed && styles.pressed]}
        >
          <EllipsisVertical size={24} color={palette.textAlt} strokeWidth={2} />
        </Pressable>
      )}

      <Modal
        visible={menuPosition !== null}
        transparent
        statusBarTranslucent
        animationType="fade"
        onRequestClose={closeMenu}
      >
        {/* A tap anywhere outside the card closes the menu */}
        <Pressable
          style={styles.backdrop}
          onPress={closeMenu}
          accessibilityRole="button"
          accessibilityLabel="Zavřít nabídku"
        >
          <View
            style={[
              styles.menu,
              {
                backgroundColor: palette.card,
                borderColor: palette.hairline,
                boxShadow: `0 6px 16px -4px ${palette.shadow}`,
              },
              menuPosition,
            ]}
          >
            <Pressable
              onPress={() => {
                closeMenu()
                onEdit()
              }}
              accessibilityRole="button"
              style={({ pressed }) => [
                styles.menuItem,
                pressed && styles.pressed,
              ]}
            >
              <Pencil size={20} color={palette.text} strokeWidth={2} />
              <ThemedText style={[styles.menuText, { color: palette.text }]}>
                Upravit
              </ThemedText>
            </Pressable>
            <Pressable
              onPress={() => {
                closeMenu()
                onDelete()
              }}
              accessibilityRole="button"
              style={({ pressed }) => [
                styles.menuItem,
                pressed && styles.pressed,
              ]}
            >
              <Trash2 size={20} color={palette.error} strokeWidth={2} />
              <ThemedText style={[styles.menuText, { color: palette.error }]}>
                Smazat
              </ThemedText>
            </Pressable>
          </View>
        </Pressable>
      </Modal>
    </View>
  )
}

export default NoteRow

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: spacing.md,
  },
  // The padding is on every tap area (not on the row), so each one is big enough.
  // Used by the checkbox and the three dots.
  tapArea: {
    paddingVertical: spacing.sm,
  },
  pressed: {
    opacity: 0.7,
  },
  content: {
    flex: 1,
    paddingVertical: spacing.sm,
  },

  discussedText: {
    textDecorationLine: 'line-through',
  },
  backdrop: {
    flex: 1,
  },
  menu: {
    position: 'absolute',
    minWidth: 160,
    paddingVertical: spacing['2xs'],
    borderRadius: radius.default,
    borderWidth: 1,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
    minHeight: 48,
    paddingHorizontal: spacing.md,
  },
  menuText: {
    ...typography.labelLg,
  },
})
