import { useState, useEffect } from 'react'
import { useVideoPlayer } from 'expo-video'
import { useEvent, useEventListener } from 'expo'
import { useKeepAwake } from 'expo-keep-awake'

// The logic of the exercise player: plays the videos one by one,
// pauses, skips, and hides the controls. No look here, only state.
const useExercisePlayer = (videos, onFinish) => {
  // Keep the screen on while the player is open
  useKeepAwake()

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

  // Next exercise, or onFinish after the last one
  const goNext = async () => {
    const nextIndex = index + 1

    if (nextIndex >= videos.length) {
      onFinish()
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

  return {
    // values
    player,
    index,
    progress,
    isPlaying,
    controlsVisible,

    // actions
    showControls: () => setControlsVisible(true),
    restart,
    togglePlay,
    goNext,
  }
}

export default useExercisePlayer
