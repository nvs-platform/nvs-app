import { Text } from 'react-native'
import { useColors, typography, fonts } from '../constants/theme'

const ThemedText = ({ style, title = false, ...props }) => {
  const palette = useColors()

  // Titles use the darker text color, normal text the softer one
  const textColor = title ? palette.text : palette.textAlt
  // Titles are bold, normal text regular
  const fontFamily = title ? fonts.bold : fonts.regular

  return (
    <Text
      style={[typography.bodyMd, { color: textColor, fontFamily }, style]}
      {...props}
    />
  )
}

export default ThemedText
