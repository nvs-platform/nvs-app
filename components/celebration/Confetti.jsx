import { useEffect, useRef } from 'react'
import { Animated, Easing, StyleSheet, View } from 'react-native'

// Where each piece flies to (px from the center), and its shape.
// After that it falls 260 px down and fades out.
const PIECES = [
  { x: -126, y: -84, shape: 'square' },
  { x: 119, y: -105, shape: 'strip' },
  { x: -154, y: 14, shape: 'strip' },
  { x: 147, y: 0, shape: 'square' },
  { x: -42, y: -147, shape: 'square' },
  { x: 49, y: -154, shape: 'strip' },
  { x: -91, y: 70, shape: 'square' },
  { x: 98, y: 77, shape: 'strip' },
  { x: 0, y: -168, shape: 'square' },
  { x: -161, y: -56, shape: 'square' },
  { x: 161, y: -63, shape: 'strip' },
]

// A handful of confetti bursts from the center once, then falls.
const Confetti = ({ colors }) => {
  // 0 → 1: all pieces move together
  const progress = useRef(new Animated.Value(0)).current

  useEffect(() => {
    Animated.timing(progress, {
      toValue: 1,
      duration: 2100,
      delay: 500,
      easing: Easing.bezier(0.2, 0.8, 0.4, 1),
      useNativeDriver: true,
    }).start()
  }, [])

  return (
    <View style={styles.center}>
      {PIECES.map((piece, index) => (
        <Animated.View
          key={index}
          style={[
            piece.shape === 'square' ? styles.square : styles.strip,
            {
              backgroundColor: colors[index % colors.length],
              opacity: progress.interpolate({
                inputRange: [0, 0.05, 0.75, 1],
                outputRange: [0, 1, 1, 0],
              }),
              transform: [
                {
                  translateX: progress.interpolate({
                    inputRange: [0, 0.4, 1],
                    outputRange: [0, piece.x, piece.x],
                  }),
                },
                {
                  translateY: progress.interpolate({
                    inputRange: [0, 0.4, 1],
                    outputRange: [0, piece.y, piece.y + 260],
                  }),
                },
                {
                  rotate: progress.interpolate({
                    inputRange: [0, 0.4, 1],
                    outputRange: ['0deg', '160deg', '360deg'],
                  }),
                },
              ],
            },
          ]}
        />
      ))}
    </View>
  )
}

export default Confetti

const styles = StyleSheet.create({
  // A zero-size point in the middle; the pieces start here
  center: {
    position: 'absolute',
    width: 0,
    height: 0,
    alignItems: 'center',
    justifyContent: 'center',
  },
  square: {
    position: 'absolute',
    width: 10,
    height: 10,
    borderRadius: 2,
  },
  strip: {
    position: 'absolute',
    width: 7,
    height: 13,
    borderRadius: 3,
  },
})
