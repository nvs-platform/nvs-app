import { StyleSheet, Pressable, View } from 'react-native'
import React from 'react'
import { useColors, spacing, radius } from '../constants/theme'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { BlurView } from 'expo-blur'
import { RotateCcw, Play, Pause, SkipForward } from 'lucide-react-native'

// The control capsule of the player: segments and buttons, only the look
const PlayerControls = ({
  blurTarget, // the video behind the glass, so BlurView knows what to blur
  videoCount, // how many exercises today (number of segments)
  index, // which exercise is playing now
  progress, // 0–1, how much of the current video has played
  isPlaying,
  onRestart,
  onTogglePlay,
  onNext,
}) => {
  const colors = useColors()
  const styles = getStyles(colors)
  const insets = useSafeAreaInsets()

  // How full the bar of exercise i is: done = 1, current = progress, next = 0
  const segmentFill = (i) => {
    if (i < index) return 1
    if (i === index) return progress
    return 0
  }

  return (
    <BlurView
      style={[styles.capsule, { bottom: insets.bottom + spacing.lg }]}
      blurTarget={blurTarget}
      blurMethod="none"
      intensity={80}
      blurReductionFactor={1}
      tint="light"
    >
      <View style={styles.segments}>
        {Array.from({ length: videoCount }, (_, i) => (
          <View key={i} style={styles.segment}>
            <View
              style={[
                styles.segmentFill,
                { width: `${segmentFill(i) * 100}%` },
              ]}
            />
          </View>
        ))}
      </View>

      <View style={styles.controlsRow}>
        <Pressable
          style={styles.button}
          onPress={onRestart}
          accessibilityLabel="Znovu od začátku"
        >
          <RotateCcw size={24} color={colors.text} strokeWidth={2} />
        </Pressable>

        <Pressable
          style={[styles.button, styles.playButton]}
          onPress={onTogglePlay}
          accessibilityLabel={isPlaying ? 'Pozastavit' : 'Přehrát'}
        >
          {isPlaying ? (
            <Pause
              size={28}
              color={colors.onPrimary}
              fill={colors.onPrimary}
              strokeWidth={2}
            />
          ) : (
            <Play
              size={28}
              color={colors.onPrimary}
              fill={colors.onPrimary}
              strokeWidth={2}
            />
          )}
        </Pressable>

        <Pressable
          style={styles.button}
          onPress={onNext}
          accessibilityLabel="Další cvik"
        >
          <SkipForward
            size={24}
            color={colors.text}
            fill={colors.text}
            strokeWidth={2}
          />
        </Pressable>
      </View>
    </BlurView>
  )
}

export default PlayerControls

const getStyles = (palette) =>
  StyleSheet.create({
    segments: {
      flexDirection: 'row',
      gap: spacing['2xs'],
    },

    segment: {
      flex: 1,
      height: 4,
      borderRadius: radius.pill,
      backgroundColor: palette.track,
      overflow: 'hidden',
    },

    segmentFill: {
      height: '100%',
      backgroundColor: palette.primary,
    },

    capsule: {
      position: 'absolute',
      alignSelf: 'center',
      width: 300,
      gap: spacing.sm,
      paddingTop: spacing.md,
      paddingHorizontal: spacing.md,
      paddingBottom: spacing.sm,
      borderRadius: radius.card,
      backgroundColor: palette.glass,
      borderWidth: 1,
      borderColor: palette.glassBorder,
      overflow: 'hidden',
    },
    controlsRow: {
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      gap: spacing.xl,
    },

    button: {
      width: 48,
      height: 48,
      borderRadius: radius.pill,
      alignItems: 'center',
      justifyContent: 'center',
    },
    playButton: {
      width: 60,
      height: 60,
      backgroundColor: palette.primary,
    },
  })
