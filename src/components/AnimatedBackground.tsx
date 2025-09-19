import { useState, useEffect } from 'react'
import { Box } from '@mui/material'

// Direct imports for all animated background frames
import frame0000 from '../assets/images/animated-background/0000.jpg'
import frame0001 from '../assets/images/animated-background/0001.jpg'
import frame0002 from '../assets/images/animated-background/0002.jpg'
import frame0003 from '../assets/images/animated-background/0003.jpg'
import frame0004 from '../assets/images/animated-background/0004.jpg'
import frame0005 from '../assets/images/animated-background/0005.jpg'
import frame0006 from '../assets/images/animated-background/0006.jpg'
import frame0007 from '../assets/images/animated-background/0007.jpg'
import frame0008 from '../assets/images/animated-background/0008.jpg'
import frame0009 from '../assets/images/animated-background/0009.jpg'
import frame0010 from '../assets/images/animated-background/0010.jpg'
import frame0011 from '../assets/images/animated-background/0011.jpg'
import frame0012 from '../assets/images/animated-background/0012.jpg'
import frame0013 from '../assets/images/animated-background/0013.jpg'
import frame0014 from '../assets/images/animated-background/0014.jpg'
import frame0015 from '../assets/images/animated-background/0015.jpg'
import frame0016 from '../assets/images/animated-background/0016.jpg'
import frame0017 from '../assets/images/animated-background/0017.jpg'
import frame0018 from '../assets/images/animated-background/0018.jpg'
import frame0019 from '../assets/images/animated-background/0019.jpg'

interface AnimatedBackgroundProps {
  isPlaying?: boolean
  onAnimationStart?: () => void
  onAnimationEnd?: () => void
  onImagesLoaded?: () => void
}

const AnimatedBackground = ({ 
  isPlaying = false, 
  onAnimationStart, 
  onAnimationEnd,
  onImagesLoaded
}: AnimatedBackgroundProps) => {
  const [currentFrame, setCurrentFrame] = useState(0)
  const [hasCompleted, setHasCompleted] = useState(false)
  const [isLoaded, setIsLoaded] = useState(false)

  // All animation frames in order
  const frames = [
    frame0000, frame0001, frame0002, frame0003, frame0004,
    frame0005, frame0006, frame0007, frame0008, frame0009,
    frame0010, frame0011, frame0012, frame0013, frame0014,
    frame0015, frame0016, frame0017, frame0018, frame0019
  ]
  
  const frameCount = frames.length
  const frameDuration = 1000 / 18 // 18fps = ~55.56ms per frame

  // Preload all frames to prevent flickering
  useEffect(() => {
    const preloadImages = async () => {
      const loadPromises = frames.map((frameSrc, index) => {
        return new Promise<void>((resolve) => {
          const img = new Image()
          
          img.onload = () => {
            console.log(`Frame ${index} loaded successfully`)
            resolve()
          }
          
          img.onerror = (error) => {
            console.error(`Error loading frame ${index}:`, error)
            // Still resolve to prevent blocking
            resolve()
          }
          
          img.src = frameSrc
        })
      })

      try {
        await Promise.all(loadPromises)
        setIsLoaded(true)
        console.log('All animation frames preloaded successfully')
        onImagesLoaded?.()
      } catch (error) {
        console.error('Error preloading frames:', error)
        // Still set loaded to true to prevent blocking
        setIsLoaded(true)
        onImagesLoaded?.()
      }
    }

    preloadImages()
  }, [frames, onImagesLoaded])

  // Animation logic
  useEffect(() => {
    if (!isPlaying || !isLoaded) return

    onAnimationStart?.()
    
    let intervalId: ReturnType<typeof setInterval> | null = null
    
    const startAnimation = () => {
      setCurrentFrame(0) // Always start from frame 0
      setHasCompleted(false) // Reset completion state
      
      intervalId = setInterval(() => {
        setCurrentFrame((prevFrame) => {
          const nextFrame = prevFrame + 1
          
          // Stop animation when we reach the last frame
          if (nextFrame >= frameCount) {
            if (intervalId) {
              clearInterval(intervalId)
            }
            setHasCompleted(true) // Mark as completed
            onAnimationEnd?.()
            return frameCount - 1 // Stay on last frame
          }
          
          return nextFrame
        })
      }, frameDuration)
    }

    startAnimation()

    return () => {
      if (intervalId) {
        clearInterval(intervalId)
      }
    }
  }, [isPlaying, isLoaded, frameCount, frameDuration, onAnimationStart, onAnimationEnd])

  // Only reset to first frame when manually stopped (not when animation completes naturally)
  useEffect(() => {
    if (!isPlaying && !hasCompleted) {
      setCurrentFrame(0)
    }
  }, [isPlaying, hasCompleted])

  const currentImage = frames[currentFrame] || frames[0]

  return (
    <Box
      sx={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        backgroundImage: `url("${currentImage}")`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        zIndex: -1,
        opacity: isLoaded ? 1 : 0,
        transition: 'opacity 0.3s ease-in-out',
      }}
    />
  )
}

export default AnimatedBackground
