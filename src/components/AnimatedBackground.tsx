import { useState, useEffect, memo } from 'react'
import { Box } from '@mui/material'

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
  const [isLoaded, setIsLoaded] = useState(false)
  const [images, setImages] = useState<string[]>([])
  const [hasCompleted, setHasCompleted] = useState(false)

  // Generate image paths
  const imageCount = 20 // 0000.jpg to 0019.jpg
  const frameDuration = 1000 / 18 // 24fps = ~41.67ms per frame

  // Preload all images more robustly
  useEffect(() => {
    const loadImages = async () => {
      const imagePaths: string[] = []
      
      try {
        // First, get all image paths
        for (let i = 0; i < imageCount; i++) {
          const imageNumber = i.toString().padStart(4, '0')
          try {
            const imageModule = await import(`../assets/images/animated-background/${imageNumber}.jpg`)
            imagePaths.push(imageModule.default)
          } catch (error) {
            console.error(`Error importing image ${imageNumber}.jpg:`, error)
          }
        }

        // Then preload all images and ensure they're in browser cache
        const loadPromises = imagePaths.map((imagePath, index) => {
          return new Promise<void>((resolve, reject) => {
            const img = new Image()
            
            img.onload = () => {
              console.log(`Image ${index} loaded successfully`)
              resolve()
            }
            
            img.onerror = (error) => {
              console.error(`Error loading image ${index}:`, error)
              reject(error)
            }
            
            // Important: Set src after setting up event listeners
            img.src = imagePath
          })
        })

        await Promise.all(loadPromises)
        
        setImages(imagePaths)
        setIsLoaded(true)
        
        console.log('All images successfully preloaded')
        onImagesLoaded?.()
        
      } catch (error) {
        console.error('Error in image loading process:', error)
        // Even if some images fail, we'll try to proceed
        setImages(imagePaths)
        setIsLoaded(true)
        onImagesLoaded?.()
      }
    }

    loadImages()
  }, [imageCount, onImagesLoaded])

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

export default memo(AnimatedBackground)
