import { View } from 'react-native'

// height: a fixed space in px (default 40)
// flex: a flexible space that shares the free room with other flexible spaces,
//   e.g. flex={2}; minHeight keeps it from shrinking too much on small phones
const Spacer = ({ width = '100%', height = 40, flex, minHeight }) => {
  if (flex) {
    return <View style={{ width, flex, minHeight }} />
  }
  return <View style={{ width, height }} />
}

export default Spacer
