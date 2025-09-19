import { Box, Button, Typography } from '@mui/material'
import { useState } from 'react'
import AnimatedBackground from '../components/AnimatedBackground'
import { useNavigate } from 'react-router-dom'

const Home = () => {
  const [isAnimationPlaying, setIsAnimationPlaying] = useState(false)
  const [elementsHidden, setElementsHidden] = useState(false)
  const navigate = useNavigate();

  const handleAnimationStart = () => {
    setIsAnimationPlaying(true)
    setElementsHidden(true) // Hide elements permanently when animation starts
  }

  const handleNavigation = (key: string) => {
    switch (key) {
      case 'home':
        window.location.reload()
        break;  
      case 'projects':
        handleAnimationStart()
        break;
      case 'info':
        navigate('/info')
        break;
      case 'contact':
        navigate('/contact')
        break;
      default:
        break;
    }
  }


  const handleAnimationEnd = () => {
    // Animation reached the last frame and stopped
    console.log('Animation completed - reached last frame')
    setIsAnimationPlaying(false)
    // Navigate to projects page after animation completes
    navigate('/projects')
  }

  return (
    <Box
      sx={{
        position: 'relative',
        display: 'flex',
        height: '100dvh',
        overflow: 'hidden',
        background: 'linear-gradient(to top, rgba(0, 0, 0, 0.8), rgba(0, 0, 0, 0.0), rgba(0, 0, 0, 0.0), rgba(0, 0, 0, 0))',
      }}
    >
      {/* Navigation Bar */}
      <Box
        sx={{
          position: 'absolute',
          padding: { sm: '0.5rem' },
          top: { xs: '1rem', sm: '2rem' },
          right: { xs: '1rem', sm: '2rem' },
          display: 'flex',
          gap: { xs: '1rem', sm: '1.5rem', md: '2rem' },
          zIndex: 10,
          flexWrap: 'wrap',
          justifyContent: 'flex-end',
          opacity: elementsHidden ? 0 : 1,
          transition: 'opacity 1.2s ease-in-out',
        }}
      >
        {['HOME', 'PROJECTS', 'INFO', 'CONTACT'].map((item) => (
          <Typography
            key={item}
            onClick={() => handleNavigation(item.toLowerCase())}
            sx={{
              color: '#fff',
              fontSize: { xs: '0.8rem', sm: '0.9rem' },
              fontWeight: 500,
              letterSpacing: '0.1em',
              cursor: 'pointer',
              transition: 'all 0.2s ease',
              '&:hover': {
                opacity: 0.7,
                transform: 'translateY(-1px)',
              },
            }}
          >
            {item}
          </Typography>
        ))}
      </Box>

      {/* Main Title and Subtitle */}
      <Box
        sx={{
          position: 'absolute',
          left: { xs: '1rem', sm: '2rem' },
          top: { xs: '4rem', sm: '2rem' },
          zIndex: 10,
          opacity: elementsHidden ? 0 : 1,
          transition: 'opacity 1.2s ease-in-out',
        }}
      >
        <Typography
          sx={{
            fontSize: { xs: '3rem', sm: '4rem', md: '6.5rem' },
            padding: 0,
            lineHeight: 0.9,
            color: '#fff',

          }}
        >
          Elias
        </Typography>
        <Typography
          sx={{
            fontSize: { xs: '3rem', sm: '4rem', md: '6.5rem' },
            lineHeight: 0.9,
            color: '#fff',
           
          }}
        >
          Treadway
        </Typography>
        <Typography
          sx={{
            fontSize: '1.5rem',
            color: '#e0e0e0',
            marginTop: '0.5rem',
            marginLeft: '0.5rem',
            letterSpacing: '0.05em',
          }}
        >
          Designer & Developer
        </Typography>
      </Box>

      {/* Bottom Right Content */}
      <Box
        sx={{
          position: 'absolute',
          bottom: { xs: '1rem', sm: '2rem' },
          right: { xs: '1rem', sm: '2rem' },
          left: { xs: '1rem', sm: 'auto' },
          maxWidth: { xs: 'none', sm: '900px' },
          textAlign: { xs: 'center', sm: 'right' },
          zIndex: 10,
          opacity: elementsHidden ? 0 : 1,
          transition: 'opacity 1.2s ease-in-out',
        }}
      >
        <Typography
          sx={{
            fontSize: { sm: '1.2rem' },
            lineHeight: 1.6,
            color: '#e0e0e0',
            marginBottom: '2rem',
          }}
        >
          I'm a Frontend Developer based in Atlanta, Georgia.<br />
          With 5+ years of experience across digital design, front-end development, marketing, and UI/UX,<br />
          I specialize in bringing ideas to life through clean, modern web experiences.
        </Typography>
        
        <Button
          variant="contained"
          sx={{
            backgroundColor: '#a4b649',
            color: '#000',
            padding: { xs: '0.6rem 1.5rem', sm: '0.75rem 2rem' },
            fontSize: { xs: '0.75rem', sm: '0.8rem' },
            fontWeight: 600,
            letterSpacing: '0.1em',
            textTransform: 'uppercase',
            borderRadius: 0,
            boxShadow: 'none',
            transition: 'all 0.2s ease',
            '&:hover': {
              backgroundColor: '#8fa03d',
              boxShadow: 'none',
              transform: 'translateY(-2px)',
            },
          }}
        >
          Let's Work Together
        </Button>
      </Box>

      <AnimatedBackground 
        isPlaying={isAnimationPlaying}
        onAnimationStart={() => console.log('Animation started')}
        onAnimationEnd={handleAnimationEnd}
      />
    </Box>
  )
}

export default Home