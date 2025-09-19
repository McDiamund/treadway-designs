// Comprehensive image preloader utility
export interface ImagePreloaderConfig {
  onProgress?: (loaded: number, total: number) => void
  onComplete?: () => void
  onError?: (error: Error) => void
}

export class ImagePreloader {
  private loadedCount = 0
  private totalCount = 0
  private config: ImagePreloaderConfig

  constructor(config: ImagePreloaderConfig = {}) {
    this.config = config
  }

  // Preload a single image
  private preloadImage(src: string): Promise<void> {
    return new Promise((resolve, reject) => {
      const img = new Image()
      
      img.onload = () => {
        this.loadedCount++
        this.config.onProgress?.(this.loadedCount, this.totalCount)
        
        if (this.loadedCount === this.totalCount) {
          this.config.onComplete?.()
        }
        
        resolve()
      }
      
      img.onerror = () => {
        const error = new Error(`Failed to load image: ${src}`)
        console.error(error)
        this.config.onError?.(error)
        reject(error)
      }
      
      img.src = src
    })
  }

  // Preload animated background images
  async preloadAnimatedBackground(): Promise<string[]> {
    const imageCount = 20
    const imagePaths: string[] = []
    
    // First, dynamically import all image modules
    for (let i = 0; i < imageCount; i++) {
      const imageNumber = i.toString().padStart(4, '0')
      try {
        const imageModule = await import(`../assets/images/animated-background/${imageNumber}.jpg`)
        imagePaths.push(imageModule.default)
      } catch (error) {
        console.error(`Error importing animated background image ${imageNumber}.jpg:`, error)
      }
    }

    // Then preload all images
    this.totalCount += imagePaths.length
    const loadPromises = imagePaths.map(src => this.preloadImage(src))
    
    try {
      await Promise.all(loadPromises)
      console.log('All animated background images preloaded successfully')
      return imagePaths
    } catch (error) {
      console.error('Error preloading animated background images:', error)
      return imagePaths // Return what we have even if some failed
    }
  }

  // Preload project images
  async preloadProjectImages(): Promise<Record<string, string>> {
    const projectImages: Record<string, string> = {}
    const imageImports = [
      { key: 'slogo', import: () => import('../assets/images/slogo-transparent-white.png') },
      { key: 'elysian', import: () => import('../assets/images/elysian.png') },
      { key: 'elysian1', import: () => import('../assets/images/elysian1.png') },
      { key: 'elysian2', import: () => import('../assets/images/elysian2.png') },
      { key: 'productiveclouds', import: () => import('../assets/images/productiveclouds.png') },
      { key: 'superioradvantage', import: () => import('../assets/images/superioradvantage-re.co_.png') },
      { key: 'superioradvantage2', import: () => import('../assets/images/superioradvantage2.png') },
      { key: 'superioradvantage3', import: () => import('../assets/images/superioradvantage3.png') },
      { key: 'blackresearcher', import: () => import('../assets/images/blackresearcher.com_.png') },
      { key: 'blackeverything', import: () => import('../assets/images/blackeverything.com_.png') },
      { key: 'note', import: () => import('../assets/images/note.jpg') },
    ]

    // Import all image modules
    for (const { key, import: importFn } of imageImports) {
      try {
        const imageModule = await importFn()
        projectImages[key] = imageModule.default
      } catch (error) {
        console.error(`Error importing project image ${key}:`, error)
      }
    }

    // Preload all imported images
    const imageSrcs = Object.values(projectImages)
    this.totalCount += imageSrcs.length
    const loadPromises = imageSrcs.map(src => this.preloadImage(src))
    
    try {
      await Promise.all(loadPromises)
      console.log('All project images preloaded successfully')
      return projectImages
    } catch (error) {
      console.error('Error preloading project images:', error)
      return projectImages // Return what we have even if some failed
    }
  }

  // Preload all images used in the application
  async preloadAllImages(): Promise<{
    animatedBackground: string[]
    projectImages: Record<string, string>
  }> {
    this.loadedCount = 0
    this.totalCount = 0

    try {
      const [animatedBackground, projectImages] = await Promise.all([
        this.preloadAnimatedBackground(),
        this.preloadProjectImages()
      ])

      console.log('All application images preloaded successfully')
      
      return {
        animatedBackground,
        projectImages
      }
    } catch (error) {
      console.error('Error preloading application images:', error)
      this.config.onError?.(error as Error)
      throw error
    }
  }

  // Reset counters
  reset() {
    this.loadedCount = 0
    this.totalCount = 0
  }
}

// Singleton instance for global use
export const imagePreloader = new ImagePreloader()

// Hook for React components
import { useState, useEffect, useCallback } from 'react'

export interface UseImagePreloaderResult {
  isLoading: boolean
  progress: number
  error: Error | null
  animatedBackgroundImages: string[]
  projectImages: Record<string, string>
}

export const useImagePreloader = (): UseImagePreloaderResult => {
  const [isLoading, setIsLoading] = useState(true)
  const [progress, setProgress] = useState(0)
  const [error, setError] = useState<Error | null>(null)
  const [animatedBackgroundImages, setAnimatedBackgroundImages] = useState<string[]>([])
  const [projectImages, setProjectImages] = useState<Record<string, string>>({})

  const handleProgress = useCallback((loaded: number, total: number) => {
    setProgress(total > 0 ? (loaded / total) * 100 : 0)
  }, [])

  const handleComplete = useCallback(() => {
    setIsLoading(false)
  }, [])

  const handleError = useCallback((err: Error) => {
    setError(err)
    setIsLoading(false)
  }, [])

  useEffect(() => {
    const preloader = new ImagePreloader({
      onProgress: handleProgress,
      onComplete: handleComplete,
      onError: handleError
    })

    const loadImages = async () => {
      try {
        const result = await preloader.preloadAllImages()
        setAnimatedBackgroundImages(result.animatedBackground)
        setProjectImages(result.projectImages)
      } catch (err) {
        console.error('Failed to preload images:', err)
      }
    }

    loadImages()
  }, [handleProgress, handleComplete, handleError])

  return {
    isLoading,
    progress,
    error,
    animatedBackgroundImages,
    projectImages
  }
}
