import { useEffect, useRef } from 'react'
import { Animated, Easing, StyleSheet } from 'react-native'
import Svg, { Defs, Path, RadialGradient, Stop } from 'react-native-svg'

// Soft rays behind the celebration: they appear, then turn slowly.
const SIZE = 300
const CENTER = SIZE / 2
const RAY_COUNT = 15 // each ray 12°, with a 12° gap

// One ray: a slice of the circle from the center to the edge
const rayPath = (index) => {
  const start = ((index * 24 - 90) * Math.PI) / 180
  const end = ((index * 24 + 12 - 90) * Math.PI) / 180
  const x1 = CENTER + CENTER * Math.cos(start)
  const y1 = CENTER + CENTER * Math.sin(start)
  const x2 = CENTER + CENTER * Math.cos(end)
  const y2 = CENTER + CENTER * Math.sin(end)
  return `M${CENTER} ${CENTER} L${x1} ${y1} A${CENTER} ${CENTER} 0 0 1 ${x2} ${y2} Z`
}

const Rays = ({ color }) => {
  // 0 → 1 over 8 seconds
  const progress = useRef(new Animated.Value(0)).current

  useEffect(() => {
    Animated.timing(progress, {
      toValue: 1,
      duration: 8000,
      delay: 300,
      easing: Easing.linear,
      useNativeDriver: true,
    }).start()
  }, [])

  return (
    <Animated.View
      style={[
        styles.rays,
        {
          opacity: progress.interpolate({
            inputRange: [0, 0.08, 1],
            outputRange: [0, 1, 1],
          }),
          transform: [
            {
              scale: progress.interpolate({
                inputRange: [0, 0.08, 1],
                outputRange: [0.5, 1, 1],
              }),
            },
            {
              rotate: progress.interpolate({
                inputRange: [0, 1],
                outputRange: ['0deg', '110deg'],
              }),
            },
          ],
        },
      ]}
    >
      <Svg width={SIZE} height={SIZE}>
        <Defs>
          {/* The rays fade out towards the edge */}
          <RadialGradient
            id="fade"
            cx={CENTER}
            cy={CENTER}
            r={CENTER}
            gradientUnits="userSpaceOnUse"
          >
            <Stop offset="0.45" stopColor={color} stopOpacity="1" />
            <Stop offset="1" stopColor={color} stopOpacity="0" />
          </RadialGradient>
        </Defs>
        {Array.from({ length: RAY_COUNT }, (_, index) => (
          <Path key={index} d={rayPath(index)} fill="url(#fade)" />
        ))}
      </Svg>
    </Animated.View>
  )
}

export default Rays

const styles = StyleSheet.create({
  rays: {
    position: 'absolute',
    width: SIZE,
    height: SIZE,
  },
})
