import { StyleSheet, Pressable, View } from 'react-native'
import React, { useRef } from 'react'
import { router } from 'expo-router'
import { ChevronLeft } from 'lucide-react-native'
import { VideoView } from 'expo-video'
import { BlurView, BlurTargetView } from 'expo-blur'
import { useColors, spacing, radius } from '../constants/theme'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

//themed components
import ThemedView from '../components/ThemedView'
import PlayerControls from '../components/PlayerControls'
import useExercisePlayer from '../hooks/useExercisePlayer'

import { workoutVideos } from '../data/workoutVideos'

const WorkoutScreen = () => {
  const colors = useColors()
  const styles = getStyles(colors)
  const insets = useSafeAreaInsets()

  // The video behind the glass, so BlurView knows what to blur (Android)
  const blurTarget = useRef(null)

  // The player logic: plays the videos, pauses, skips, hides the controls
  const {
    player,
    index,
    progress,
    isPlaying,
    controlsVisible,
    showControls,
    restart,
    togglePlay,
    goNext,
  } = useExercisePlayer(workoutVideos, () => router.replace('/done'))

  return (
    <ThemedView style={styles.container}>
      <BlurTargetView ref={blurTarget} style={styles.video}>
        <VideoView
          style={styles.video}
          player={player}
          nativeControls={false}
          contentFit="cover"
          surfaceType="textureView"
        />
      </BlurTargetView>

      <Pressable
        style={styles.video}
        onPress={showControls}
        accessibilityLabel="Zobrazit ovládání"
      />

      <View style={[styles.topBar, { paddingTop: insets.top + spacing.md }]}>
        {controlsVisible && (
          <BlurView
            style={styles.backButton}
            blurTarget={blurTarget}
            blurMethod="none"
            intensity={80}
            blurReductionFactor={1}
            tint="light"
          >
            <Pressable
              style={({ pressed }) => [
                styles.backPress,
                pressed && styles.pressed,
              ]}
              onPress={() => router.back()}
              accessibilityLabel="Zpět"
            >
              <ChevronLeft size={24} color={colors.text} strokeWidth={2} />
            </Pressable>
          </BlurView>
        )}
      </View>

      {controlsVisible && (
        <PlayerControls
          blurTarget={blurTarget}
          videoCount={workoutVideos.length}
          index={index}
          progress={progress}
          isPlaying={isPlaying}
          onRestart={restart}
          onTogglePlay={togglePlay}
          onNext={goNext}
        />
      )}
    </ThemedView>
  )
}

export default WorkoutScreen

const getStyles = (palette) =>
  StyleSheet.create({
    container: {
      flex: 1,
      paddingHorizontal: spacing.screen,
    },

    topBar: {
      gap: spacing.md,
    },

    backButton: {
      width: 44,
      height: 44,
      borderRadius: radius.pill,
      backgroundColor: palette.glass,
      borderWidth: 1,
      borderColor: palette.glassBorder,
      overflow: 'hidden',
    },
    backPress: {
      flex: 1,
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
    pressed: {
      opacity: 0.7,
    },
  })
