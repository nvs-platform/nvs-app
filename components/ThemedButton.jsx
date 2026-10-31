import { Pressable, StyleSheet, Text } from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import { useColors, typography, spacing, radius } from '../constants/theme'

// Pill button from docs/DESIGN.md.
// variant: 'primary' (default), 'secondary' or 'encouragement'
// icon: optional Ionicons name shown before the title, e.g. 'play'
const ThemedButton = ({
  title,
  icon,
  variant = 'primary',
  disabled = false,
  style,
  ...props
}) => {
  const palette = useColors()

  let backgroundColor = palette.primary
  let textColor = palette.onPrimary
  if (variant === 'secondary') {
    backgroundColor = palette.mutedSurface
    textColor = palette.text
  }
  if (variant === 'encouragement') {
    backgroundColor = palette.tertiary
    textColor = palette.text
  }

  return (
    <Pressable
      disabled={disabled}
      style={({ pressed }) => [
        styles.button,
        { backgroundColor },
        variant === 'primary' && styles.shadow,
        variant === 'secondary' && {
          borderWidth: 1,
          borderColor: palette.hairline,
        },
        pressed && styles.pressed,
        disabled && styles.disabled,
        style,
      ]}
      {...props}
      role="button"
    >
      {icon && <Ionicons name={icon} size={20} color={textColor} />}
      <Text style={[styles.text, { color: textColor }]}>{title}</Text>
    </Pressable>
  )
}

export default ThemedButton

const styles = StyleSheet.create({
  button: {
    minHeight: 56,
    paddingHorizontal: spacing.lg,
    borderRadius: radius.pill,
    flexDirection: 'row',
    gap: spacing.xs,
    alignItems: 'center',
    justifyContent: 'center',
  },
  shadow: {
    boxShadow: '0 6px 16px -4px rgba(30, 127, 150, 0.35)',
  },
  pressed: {
    transform: [{ scale: 0.98 }],
  },
  disabled: {
    opacity: 0.5,
  },
  text: {
    ...typography.labelLg,
  },
})
