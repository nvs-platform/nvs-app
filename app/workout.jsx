import { StyleSheet, Pressable, View } from 'react-native'
import React, { useState, useEffect } from 'react'
import { router } from 'expo-router'
import {
  ChevronLeft,
  RotateCcw,
  Play,
  Pause,
  SkipForward,
} from 'lucide-react-native'
import { useVideoPlayer, VideoView } from 'expo-video'
import { useEvent, useEventListener } from 'expo'
import { useColors, spacing, radius } from '../constants/theme'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

//themed components
import ThemedView from '../components/ThemedView'

// Today's exercise videos, played in this order
const videos = [
  require('../assets/videos/greeting-01.mp4'),
  require('../assets/videos/rocking-ball-01-wip.mp4'),
]

const WorkoutScreen = () => {
  const colors = useColors()
  const styles = getStyles(colors)
  const insets = useSafeAreaInsets()

  // Which exercise is playing now (0 = first)
  const [index, setIndex] = useState(0)

  // Are the controls shown? They hide while playing and show again on tap
  const [controlsVisible, setControlsVisible] = useState(true)

  // Video player
  const player = useVideoPlayer(videos[0], (player) => {
    player.loop = false
    player.timeUpdateEventInterval = 0.25
    player.play()
  })

  // true while the video is playing, false when paused or ended
  const { isPlaying } = useEvent(player, 'playingChange', {
    isPlaying: player.playing,
  })

  // Current time of the video in seconds, updated 4 times per second
  const { currentTime } = useEvent(player, 'timeUpdate', {
    currentTime: player.currentTime,
  })

  // How much of the video has played: 0 = start, 1 = end
  const progress = player.duration > 0 ? currentTime / player.duration : 0

  // How full the bar of exercise i is: done = 1, current = progress, next = 0
  const segmentFill = (i) => {
    if (i < index) return 1
    if (i === index) return progress
    return 0
  }

  // Play the current exercise again from the start
  const restart = () => {
    player.replay()
    player.play()
  }

  // Pause when playing, play when paused
  const togglePlay = () => {
    if (isPlaying) {
      player.pause()
    } else {
      player.play()
    }
  }

  // Next exercise, or the done screen after the last one
  const goNext = async () => {
    const nextIndex = index + 1

    if (nextIndex >= videos.length) {
      router.push('/done')
      return
    }

    setIndex(nextIndex)
    await player.replaceAsync(videos[nextIndex])
    player.play()
  }

  // When a video ends, play the next one
  useEventListener(player, 'playToEnd', () => {
    goNext()
  })

  // While the video plays, hide the controls after 2 seconds
  useEffect(() => {
    if (!isPlaying || !controlsVisible) return

    const timer = setTimeout(() => setControlsVisible(false), 2000)
    return () => clearTimeout(timer)
  }, [isPlaying, controlsVisible])

  return (
    <ThemedView style={styles.container}>
      <VideoView
        style={styles.video}
        player={player}
        nativeControls={false}
        contentFit="cover"
      />

      <Pressable
        style={styles.video}
        onPress={() => setControlsVisible(true)}
        accessibilityLabel="Zobrazit ovládání"
      />

      <View style={[styles.topBar, { paddingTop: insets.top + spacing.md }]}>
        <View style={styles.segments}>
          {videos.map((video, i) => (
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

        {controlsVisible && (
          <Pressable
            style={styles.backButton}
            onPress={() => router.back()}
            accessibilityLabel="Zpět"
          >
            <ChevronLeft size={24} color={colors.text} strokeWidth={2} />
          </Pressable>
        )}
      </View>

      {controlsVisible && (
        <View
          style={[
            styles.controls,
            { paddingBottom: insets.bottom + spacing.md },
          ]}
        >
          <Pressable
            style={styles.button}
            onPress={restart}
            accessibilityLabel="Znovu od začátku"
          >
            <RotateCcw size={24} color={colors.text} strokeWidth={2} />
          </Pressable>

          <Pressable
            style={[styles.button, styles.playButton]}
            onPress={togglePlay}
            accessibilityLabel={isPlaying ? 'Pozastavit' : 'Přehrát'}
          >
            {isPlaying ? (
              <Pause
                size={36}
                color={colors.onPrimary}
                fill={colors.onPrimary}
                strokeWidth={2}
              />
            ) : (
              <Play
                size={36}
                color={colors.onPrimary}
                fill={colors.onPrimary}
                strokeWidth={2}
              />
            )}
          </Pressable>

          <Pressable
            style={styles.button}
            onPress={goNext}
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
      )}
    </ThemedView>
  )
}

export default WorkoutScreen

const getStyles = (palette) =>
  StyleSheet.create({
    container: {
      flex: 1,
      paddingHorizontal: 20,
    },

    topBar: {
      gap: spacing.md,
    },
    segments: {
      flexDirection: 'row',
      gap: spacing['2xs'],
    },
    segment: {
      flex: 1,
      height: 4,
      borderRadius: radius.pill,
      backgroundColor: palette.overlay,
      overflow: 'hidden',
    },
    segmentFill: {
      height: '100%',
      backgroundColor: palette.primary,
    },

    backButton: {
      width: 48,
      height: 48,
      borderRadius: radius.pill,
      backgroundColor: palette.overlay,
      alignItems: 'center',
      justifyContent: 'center',
    },

    video: {
      position: 'absolute',
      top: 0,
      bottom: 0,
      left: 0,
      right: 0,
    },

    controls: {
      position: 'absolute',
      left: 0,
      right: 0,
      bottom: 0,
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      gap: spacing.lg,
      paddingTop: spacing.md,
    },

    button: {
      width: 48,
      height: 48,
      borderRadius: radius.pill,
      backgroundColor: palette.overlay,
      alignItems: 'center',
      justifyContent: 'center',
    },
    playButton: {
      width: 72,
      height: 72,
      backgroundColor: palette.primary,
    },
  })
