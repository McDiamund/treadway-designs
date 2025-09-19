import { useState, useEffect } from 'react'
import { Box } from '@mui/material'

interface AnimatedBackgroundProps {
  isPlaying?: boolean
  onAnimationStart?: () => void
  onAnimationEnd?: () => void
}

const AnimatedBackground = ({ 
  isPlaying = false, 
  onAnimationStart, 
  onAnimationEnd 
}: AnimatedBackgroundProps) => {
  const [currentFrame, setCurrentFrame] = useState(0)
  const [isLoaded, setIsLoaded] = useState(false)
  const [images, setImages] = useState<string[]>([])
  const [hasCompleted, setHasCompleted] = useState(false)

  // Generate image paths
  const imageCount = 20 // 0000.jpg to 0019.jpg
  const frameDuration = 1000 / 18 // 24fps = ~41.67ms per frame

  // Preload all images
  useEffect(() => {
    const loadImages = async () => {
      const imagePaths: string[] = []
      const loadPromises: Promise<void>[] = []

      for (let i = 0; i < imageCount; i++) {
        const imageNumber = i.toString().padStart(4, '0')
        try {
          // Use dynamic import for Vite
          const imageModule = await import(`../assets/images/animated-background/${imageNumber}.jpg`)
          const imagePath = imageModule.default
          imagePaths.push(imagePath)

          // Preload each image
          const loadPromise = new Promise<void>((resolve) => {
            const img = new Image()
            img.onload = () => resolve()
            img.onerror = () => resolve() // Continue even if image fails to load
            img.src = imagePath
          })
          loadPromises.push(loadPromise)
        } catch (error) {
          console.error(`Error loading image ${imageNumber}.jpg:`, error)
        }
      }

      try {
        await Promise.all(loadPromises)
        setImages(imagePaths)
        setIsLoaded(true)
      } catch (error) {
        console.error('Error loading images:', error)
      }
    }

    loadImages()
  }, [imageCount])

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
          if (nextFrame >= imageCount) {
            if (intervalId) {
              clearInterval(intervalId)
            }
            setHasCompleted(true) // Mark as completed
            onAnimationEnd?.()
            return imageCount - 1 // Stay on last frame
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
  }, [isPlaying, isLoaded, imageCount, frameDuration, onAnimationStart, onAnimationEnd])

  // Only reset to first frame when manually stopped (not when animation completes naturally)
  useEffect(() => {
    if (!isPlaying && !hasCompleted) {
      setCurrentFrame(0)
    }
  }, [isPlaying, hasCompleted])

  const currentImagePath = images[currentFrame] || images[0]

  return (
    <Box
      sx={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        backgroundImage: isLoaded && currentImagePath ? `url("${currentImagePath}")` : 'none',
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
