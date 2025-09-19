import { Box, Button, Typography, IconButton } from '@mui/material'
import { GitHub, LinkedIn, Description } from '@mui/icons-material'
import { useState, useCallback } from 'react'
import AnimatedBackground from '../components/AnimatedBackground'
import ContactOverlay from '../components/ContactOverlay'
import { useNavigate } from 'react-router-dom'

const Home = () => {
  const [isAnimationPlaying, setIsAnimationPlaying] = useState(false)
  const [elementsHidden, setElementsHidden] = useState(false)
  const [contactOverlayOpen, setContactOverlayOpen] = useState(false)
  const navigate = useNavigate()


  const handleAnimationStart = useCallback(() => {
    setIsAnimationPlaying(true)
    setElementsHidden(true) // Hide elements permanently when animation starts
  }, [])

  const handleNavigation = useCallback((key: string) => {
    switch (key) {
      case 'home':
        window.location.reload()
        break;  
      case 'projects':
        handleAnimationStart()
        break;
      case 'contact':
        setContactOverlayOpen(true)
        break;
      default:
        break;
    }
  }, [handleAnimationStart])

  const handleAnimationEnd = useCallback(() => {
    // Animation reached the last frame and stopped
    console.log('Animation completed - reached last frame')
    setIsAnimationPlaying(false)
    // Navigate to projects page after animation completes
    navigate('/projects')
  }, [navigate])

  const handleCloseContactOverlay = useCallback(() => {
    setContactOverlayOpen(false)
  }, [])

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
        {['HOME', 'PROJECTS',  'CONTACT'].map((item) => (
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
            fontSize: { xs: '3rem', sm: '4rem', md: '8rem' },
            padding: 0,
            lineHeight: 0.9,
            color: '#fff',

          }}
        >
          Elias
        </Typography>
        <Typography
          sx={{
            fontSize: { xs: '3rem', sm: '4rem', md: '8rem' },
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

      {/* Social Media Icons - Bottom Left (Desktop Only) */}
      <Box
        sx={{
          position: 'absolute',
          bottom: { xs: '1rem', sm: '2rem' },
          left: { xs: '1rem', sm: '2rem' },
          zIndex: 10,
          opacity: elementsHidden ? 0 : 1,
          transition: 'opacity 1.2s ease-in-out',
          display: { xs: 'none', md: 'block' },
        }}
      >
        <Box
          sx={{
            display: 'flex',
            gap: '1rem',
            justifyContent: { xs: 'center', sm: 'flex-start' },
          }}
        >
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '0.25rem',
            }}
          >
            <IconButton
              component="a"
              href="https://github.com/McDiamund"
              target="_blank"
              rel="noopener noreferrer"
              sx={{
                color: '#e0e0e0',
                transition: 'all 0.2s ease',
                '&:hover': {
                  color: '#a4b649',
                  transform: 'translateY(-2px)',
                },
              }}
            >
              <GitHub fontSize="large" />
            </IconButton>
            <Typography
              sx={{
                fontSize: '0.65rem',
                color: '#e0e0e0',
                letterSpacing: '0.05em',
                textTransform: 'uppercase',
                fontWeight: 500,
              }}
            >
              GitHub
            </Typography>
          </Box>
          
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '0.25rem',
            }}
          >
            <IconButton
              component="a"
              href="https://www.linkedin.com/in/elias-treadway-41293b1b5/"
              target="_blank"
              rel="noopener noreferrer"
              sx={{
                color: '#e0e0e0',
                transition: 'all 0.2s ease',
                '&:hover': {
                  color: '#a4b649',
                  transform: 'translateY(-2px)',
                },
              }}
            >
              <LinkedIn fontSize="large" />
            </IconButton>
            <Typography
              sx={{
                fontSize: '0.65rem',
                color: '#e0e0e0',
                letterSpacing: '0.05em',
                textTransform: 'uppercase',
                fontWeight: 500,
              }}
            >
              LinkedIn
            </Typography>
          </Box>
          
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '0.25rem',
            }}
          >
            <IconButton
              component="a"
              href="/resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              sx={{
                color: '#e0e0e0',
                transition: 'all 0.2s ease',
                '&:hover': {
                  color: '#a4b649',
                  transform: 'translateY(-2px)',
                },
              }}
            >
              <Description fontSize="large" />
            </IconButton>
            <Typography
              sx={{
                fontSize: '0.65rem',
                color: '#e0e0e0',
                letterSpacing: '0.05em',
                textTransform: 'uppercase',
                fontWeight: 500,
              }}
            >
              Resume
            </Typography>
          </Box>
        </Box>
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
        {/* Social Media Icons - Mobile/Tablet Only */}
        <Box
          sx={{
            display: { xs: 'flex', md: 'none' },
            justifyContent: 'center',
            gap: '1rem',
            marginBottom: '1.5rem',
          }}
        >
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '0.25rem',
            }}
          >
            <IconButton
              component="a"
              href="https://github.com/McDiamund"
              target="_blank"
              rel="noopener noreferrer"
              sx={{
                color: '#e0e0e0',
                transition: 'all 0.2s ease',
                '&:hover': {
                  color: '#a4b649',
                  transform: 'translateY(-2px)',
                },
              }}
            >
              <GitHub fontSize="large" />
            </IconButton>
            <Typography
              sx={{
                fontSize: '0.65rem',
                color: '#e0e0e0',
                letterSpacing: '0.05em',
                textTransform: 'uppercase',
                fontWeight: 500,
              }}
            >
              GitHub
            </Typography>
          </Box>
          
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '0.25rem',
            }}
          >
            <IconButton
              component="a"
              href="https://www.linkedin.com/in/elias-treadway-41293b1b5/"
              target="_blank"
              rel="noopener noreferrer"
              sx={{
                color: '#e0e0e0',
                transition: 'all 0.2s ease',
                '&:hover': {
                  color: '#a4b649',
                  transform: 'translateY(-2px)',
                },
              }}
            >
              <LinkedIn fontSize="large" />
            </IconButton>
            <Typography
              sx={{
                fontSize: '0.65rem',
                color: '#e0e0e0',
                letterSpacing: '0.05em',
                textTransform: 'uppercase',
                fontWeight: 500,
              }}
            >
              LinkedIn
            </Typography>
          </Box>
          
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '0.25rem',
            }}
          >
            <IconButton
              component="a"
              href="/resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              sx={{
                color: '#e0e0e0',
                transition: 'all 0.2s ease',
                '&:hover': {
                  color: '#a4b649',
                  transform: 'translateY(-2px)',
                },
              }}
            >
              <Description fontSize="large" />
            </IconButton>
            <Typography
              sx={{
                fontSize: '0.65rem',
                color: '#e0e0e0',
                letterSpacing: '0.05em',
                textTransform: 'uppercase',
                fontWeight: 500,
              }}
            >
              Resume
            </Typography>
          </Box>
        </Box>
        
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
          onClick={() => setContactOverlayOpen(true)}
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


      <ContactOverlay 
        open={contactOverlayOpen}
        onClose={handleCloseContactOverlay}
      />
    </Box>
  )
}

export default Home