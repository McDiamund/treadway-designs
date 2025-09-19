import { Box, Typography } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
import slogo from '../assets/images/slogo-transparent-white.png'

const Projects = () => {
  const navigate = useNavigate()
  const [backgroundImage, setBackgroundImage] = useState<string>('')
  const [headerAnimated, setHeaderAnimated] = useState<boolean>(false)
  const [mainContentAnimated, setMainContentAnimated] = useState<boolean>(false)
  const [contentVisible, setContentVisible] = useState<boolean>(false)

  // Load the final frame image (0019.jpg)
  useEffect(() => {
    const loadBackgroundImage = async () => {
      try {
        const imageModule = await import('../assets/images/animated-background/0019.jpg')
        setBackgroundImage(imageModule.default)
      } catch (error) {
        console.error('Error loading background image:', error)
      }
    }

    loadBackgroundImage()
  }, [])

  // Trigger header animation on page load
  useEffect(() => {
    const timer = setTimeout(() => {
      setHeaderAnimated(true)
    }, 500) // Small delay to ensure smooth animation

    return () => clearTimeout(timer)
  }, [])

  // Trigger main content animation after header animation completes
  useEffect(() => {
    const timer = setTimeout(() => {
      setMainContentAnimated(true)
    }, 1200) // Start after header animation completes (1000ms + 600ms + 100ms buffer)

    return () => clearTimeout(timer)
  }, [])

  // Trigger content visibility after main content animation completes
  useEffect(() => {
    const timer = setTimeout(() => {
      setContentVisible(true)
    }, 1200) // Start after main content animation completes (1700ms + 600ms + 100ms buffer)

    return () => clearTimeout(timer)
  }, [])

  const handleNavigation = (key: string) => {
    switch (key) {
      case 'home':
        navigate('/')
        break
      case 'projects':
        // Already on projects page
        break
      case 'info':
        navigate('/info')
        break
      case 'contact':
        navigate('/contact')
        break
      default:
        break
    }
  }

  return (
    <Box
      sx={{
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
        height: '100dvh',
        overflow: 'hidden',
      }}
    >
      {/* Background Image */}
      <Box
        sx={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          backgroundImage: backgroundImage ? `url("${backgroundImage}")` : 'none',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          zIndex: -1,
          opacity: backgroundImage ? 1 : 0,
          transition: 'opacity 0.3s ease-in-out',
        }}
      />


      {/* Navigation Header */}
      <Box
        sx={{
          margin: '20px 20px 0 20px',
          padding: headerAnimated ? '20px' : '0 20px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'flex-end',
          backgroundColor: '#272727',
          height: headerAnimated ? 'fit-content' : '0px',
          overflow: 'hidden',
          transition: 'height 0.3s ease-out, padding 0.3s ease-out',
        }}
      >
        <Box 
          sx={{ 
            flex: 1,
            opacity: contentVisible ? 1 : 0,
            transform: contentVisible ? 'translateY(0)' : 'translateY(-10px)',
            transition: 'opacity 0.8s ease-out, transform 0.8s ease-out',
          }}
          onClick={() => handleNavigation('home')}
          style={{ cursor: 'pointer' }}
          >
          <img
            src={slogo}
            alt="Logo"
            style={{ height: 40, width: 'auto', display: 'block' }}
          />
        </Box>
        <Box 
          sx={{ 
            display: 'flex', 
            gap: '40px',
            opacity: contentVisible ? 1 : 0,
            transform: contentVisible ? 'translateY(0)' : 'translateY(-10px)',
            transition: 'opacity 0.8s ease-out 0.2s, transform 0.8s ease-out 0.2s',
          }}
        >
          {['HOME', 'PROJECTS', 'INFO', 'CONTACT'].map((item) => (
            <Typography
              key={item}
              onClick={() => handleNavigation(item.toLowerCase())}
              sx={{
                color: 'white',
                fontSize: { xs: '0.8rem', sm: '0.9rem' },
                fontWeight: 400,
                cursor: 'pointer',
                transition: 'opacity 0.3s ease',
                '&:hover': {
                  opacity: 0.7,
                },
                opacity: item === 'PROJECTS' ? 1 : 0.8,
              }}
            >
              {item}
            </Typography>
          ))}
        </Box>
      </Box>

      {/* Main Content Area */}
      <Box
        sx={{
          width: '40vw',
          height: mainContentAnimated ? '100%' : '0px',
          overflow: 'hidden',
          transition: 'height 0.4s ease-out, padding 0.4s ease-out',
          display: 'flex',
          marginTop: '20px',
          paddingBottom: mainContentAnimated ? '60px' : '0px',
          paddingLeft: mainContentAnimated ? '20px' : '0px'
        }}
      >
        <Box
          sx={{
            backgroundColor: '#e74c3c',
            width: '100%',
            height: '100%',
            padding: '20px',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'flex-start',
            gap: '20px',
          }}
        >
          {/* Project Items */}
          <Box 
            sx={{ 
              display: 'flex', 
              flexDirection: 'column', 
              gap: '8px',
              opacity: contentVisible ? 1 : 0,
              transform: contentVisible ? 'translateY(0)' : 'translateY(20px)',
              transition: 'opacity 0.8s ease-out 0.3s, transform 0.8s ease-out 0.3s',
            }}
          >
            <Typography
              sx={{
                color: 'white',
                fontSize: '36px',
                fontWeight: 400,
                letterSpacing: '2px',
                textTransform: 'uppercase',
                lineHeight: 1.2,
              }}
            >
              PRODUCTIVE CLOUD SOLUTIONS
            </Typography>
            <Typography
              sx={{
                color: 'white',
                fontSize: '14px',
                fontWeight: 300,
                opacity: 0.9,
              }}
            >
              Front End Development
            </Typography>
          </Box>

          <Box 
            sx={{ 
              display: 'flex', 
              flexDirection: 'column', 
              gap: '8px',
              opacity: contentVisible ? 1 : 0,
              transform: contentVisible ? 'translateY(0)' : 'translateY(20px)',
              transition: 'opacity 0.8s ease-out 0.5s, transform 0.8s ease-out 0.5s',
            }}
          >
            <Typography
              sx={{
                color: 'white',
                fontSize: '36px',
                fontWeight: 400,
                letterSpacing: '2px',
                textTransform: 'uppercase',
                lineHeight: 1.2,
              }}
            >
              NOTE
            </Typography>
            <Typography
              sx={{
                color: 'white',
                fontSize: '14px',
                fontWeight: 300,
                opacity: 0.9,
              }}
            >
              Full Stack Engineering | UI/UX Design
            </Typography>
          </Box>

          <Box 
            sx={{ 
              display: 'flex', 
              flexDirection: 'column', 
              gap: '8px',
              opacity: contentVisible ? 1 : 0,
              transform: contentVisible ? 'translateY(0)' : 'translateY(20px)',
              transition: 'opacity 0.8s ease-out 0.7s, transform 0.8s ease-out 0.7s',
            }}
          >
            <Typography
              sx={{
                color: 'white',
                fontSize: '36px',
                fontWeight: 400,
                letterSpacing: '2px',
                textTransform: 'uppercase',
                lineHeight: 1.2,
              }}
            >
              ELYSIAN CUSTOM COMPUTERS
            </Typography>
            <Typography
              sx={{
                color: 'white',
                fontSize: '14px',
                fontWeight: 300,
                opacity: 0.9,
              }}
            >
              Full Stack Engineering | UI/UX Design
            </Typography>
          </Box>

          <Box 
            sx={{ 
              display: 'flex', 
              flexDirection: 'column', 
              gap: '8px',
              opacity: contentVisible ? 1 : 0,
              transform: contentVisible ? 'translateY(0)' : 'translateY(20px)',
              transition: 'opacity 0.8s ease-out 0.9s, transform 0.8s ease-out 0.9s',
            }}
          >
            <Typography
              sx={{
                color: 'white',
                fontSize: '36px',
                fontWeight: 400,
                letterSpacing: '2px',
                textTransform: 'uppercase',
                lineHeight: 1.2,
              }}
            >
              SUPERIOR ADVANTAGE REALTORS
            </Typography>
            <Typography
              sx={{
                color: 'white',
                fontSize: '14px',
                fontWeight: 300,
                opacity: 0.9,
              }}
            >
              Front End Development | UI/UX Design
            </Typography>
          </Box>
        </Box>
      </Box>
    </Box>
  )
}

export default Projects
