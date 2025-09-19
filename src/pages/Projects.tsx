import { Box, Typography } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import { useEffect, useState, useCallback } from 'react'
import ContactOverlay from '../components/ContactOverlay'
// Direct image imports
import slogoImage from '../assets/images/slogo-transparent-white.png'
import productiveCloudsImage from '../assets/images/productiveclouds.png'
import noteImage from '../assets/images/note.jpg'
import elysianImage from '../assets/images/elysian.png'
import superiorAdvantageImage from '../assets/images/superioradvantage-re.co_.png'
import backgroundImage0019 from '../assets/images/animated-background/0019.jpg'

const Projects = () => {
  const navigate = useNavigate()
  const [backgroundImage, setBackgroundImage] = useState<string>('')
  const [defaultBackgroundImage, setDefaultBackgroundImage] = useState<string>('')
  const [headerAnimated, setHeaderAnimated] = useState<boolean>(false)
  const [mainContentAnimated, setMainContentAnimated] = useState<boolean>(false)
  const [contentVisible, setContentVisible] = useState<boolean>(false)
  const [hoveredProject, setHoveredProject] = useState<string | null>(null)
  const [contactOverlayOpen, setContactOverlayOpen] = useState(false)

  // Project image mapping using direct imports
  const projectImageMap = {
    'productive-clouds': productiveCloudsImage,
    'note': noteImage,
    'elysian': elysianImage,
    'superior-advantage': superiorAdvantageImage,
  }

  // Set the final frame image (0019.jpg) as default
  useEffect(() => {
    setDefaultBackgroundImage(backgroundImage0019)
    setBackgroundImage(backgroundImage0019)
  }, [])

  // Handle hover background changes
  useEffect(() => {
    if (hoveredProject && projectImageMap[hoveredProject as keyof typeof projectImageMap]) {
      setBackgroundImage(projectImageMap[hoveredProject as keyof typeof projectImageMap])
    } else {
      setBackgroundImage(defaultBackgroundImage)
    }
  }, [hoveredProject, projectImageMap, defaultBackgroundImage])

  // Trigger header animation on page load
  useEffect(() => {
    const timer = setTimeout(() => {
      setHeaderAnimated(true)
    }, 400) // Small delay to ensure smooth animation

    return () => clearTimeout(timer)
  }, [])

  // Trigger main content animation after header animation completes
  useEffect(() => {
    const timer = setTimeout(() => {
      setMainContentAnimated(true)
    }, 800) // Start after header animation completes (1000ms + 600ms + 100ms buffer)

    return () => clearTimeout(timer)
  }, [])

  // Trigger content visibility after main content animation completes
  useEffect(() => {
    const timer = setTimeout(() => {
      setContentVisible(true)
    }, 1200) // Start after main content animation completes (1700ms + 600ms + 100ms buffer)

    return () => clearTimeout(timer)
  }, [])

  const handleNavigation = useCallback((key: string) => {
    switch (key) {
      case 'home':
        navigate('/')
        break
      case 'projects':
        // Already on projects page
        break
      case 'contact':
        setContactOverlayOpen(true)
        break
      default:
        break
    }
  }, [navigate])

  const handleCloseContactOverlay = useCallback(() => {
    setContactOverlayOpen(false)
  }, [])

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
          margin: { 
            xs: '10px 10px 0 10px', 
            sm: '15px 15px 0 15px', 
            md: '20px 20px 0 20px' 
          },
          padding: headerAnimated ? { 
            xs: '15px', 
            sm: '18px', 
            md: '20px' 
          } : { 
            xs: '0 15px', 
            sm: '0 18px', 
            md: '0 20px' 
          },
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
            opacity: contentVisible ? 1 : 0,
            transform: contentVisible ? 'translateY(0)' : 'translateY(-10px)',
            transition: 'opacity 0.8s ease-out, transform 0.8s ease-out',
          }}
          onClick={() => handleNavigation('home')}
          style={{ cursor: 'pointer' }}
          >
          <Box
            component="img"
            src={slogoImage}
            alt="Logo"
            sx={{ 
              height: { xs: 32, sm: 36, md: 40 }, 
              width: 'auto', 
              display: 'block' 
            }}
          />
        </Box>
        <Box sx={{ flex: 1 }} />
        <Box 
          sx={{ 
            display: 'flex', 
            gap: { xs: '20px', sm: '30px', md: '40px' },
            opacity: contentVisible ? 1 : 0,
            transform: contentVisible ? 'translateY(0)' : 'translateY(-10px)',
            transition: 'opacity 0.8s ease-out 0.2s, transform 0.8s ease-out 0.2s',
          }}
        >
          {['HOME', 'PROJECTS', 'CONTACT'].map((item) => (
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
          width: { 
            xs: '95vw', // Almost full width on mobile
            sm: '80vw', // 80% width on small tablets
            md: '60vw', // 60% width on medium screens
            lg: '50vw', // 50% width on large screens
            xl: '40vw'  // Original 40% width on extra large screens
          },
          height: mainContentAnimated ? '100%' : '0px',
          overflow: 'hidden',
          transition: 'height 0.4s ease-out, padding 0.4s ease-out',
          display: 'flex',
          marginTop: { xs: '10px', sm: '15px', md: '20px' },
          paddingBottom: mainContentAnimated ? { xs: '40px', sm: '50px', md: '60px' } : '0px',
          paddingLeft: mainContentAnimated ? { xs: '10px', sm: '15px', md: '20px' } : '0px'
        }}
      >
        <Box
          sx={{
            backgroundColor: '#e04f28',
            width: '100%',
            height: '100%',
            padding: { xs: '15px', sm: '18px', md: '20px' },
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'flex-start',
            gap: { xs: '15px', sm: '18px', md: '20px' },
          }}
        >
          {/* Project Items */}
          <Box 
            sx={{ 
              display: 'flex', 
              flexDirection: 'column', 
              opacity: contentVisible ? 1 : 0,
              transform: contentVisible ? 'translateY(0)' : 'translateY(20px)',
              transition: 'opacity 0.8s ease-out 0.3s, transform 0.8s ease-out 0.3s',
            }}
          >
            <Typography
              onMouseEnter={() => setHoveredProject('productive-clouds')}
              onMouseLeave={() => setHoveredProject(null)}
              onClick={() => navigate('/projects/productive-clouds')}
              sx={{
                color: 'white',
                fontSize: { 
                  xs: '24px',
                  sm: '28px', 
                  md: '32px',
                  lg: '36px'
                },
                fontWeight: 400,
                letterSpacing: { xs: '1px', sm: '1.5px', md: '2px' },
                textTransform: 'uppercase',
                lineHeight: 1.2,
                cursor: 'pointer',
                transition: 'opacity 0.3s ease',
                '&:hover': {
                  opacity: 0.7,
                },
              }}
            >
              PRODUCTIVE CLOUD SOLUTIONS
            </Typography>
            <Typography
              sx={{
                color: 'white',
                fontSize: { xs: '12px', sm: '13px', md: '14px' },
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
              opacity: contentVisible ? 1 : 0,
              transform: contentVisible ? 'translateY(0)' : 'translateY(20px)',
              transition: 'opacity 0.8s ease-out 0.5s, transform 0.8s ease-out 0.5s',
            }}
          >
            <Typography
              onMouseEnter={() => setHoveredProject('note')}
              onMouseLeave={() => setHoveredProject(null)}
              onClick={() => navigate('/projects/note')}
              sx={{
                color: 'white',
                fontSize: { 
                  xs: '24px',
                  sm: '28px', 
                  md: '32px',
                  lg: '36px'
                },
                fontWeight: 400,
                letterSpacing: { xs: '1px', sm: '1.5px', md: '2px' },
                textTransform: 'uppercase',
                lineHeight: 1.2,
                cursor: 'pointer',
                transition: 'opacity 0.3s ease',
                '&:hover': {
                  opacity: 0.7,
                },
              }}
            >
              NOTE.
            </Typography>
            <Typography
              sx={{
                color: 'white',
                fontSize: { xs: '12px', sm: '13px', md: '14px' },
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
              opacity: contentVisible ? 1 : 0,
              transform: contentVisible ? 'translateY(0)' : 'translateY(20px)',
              transition: 'opacity 0.8s ease-out 0.7s, transform 0.8s ease-out 0.7s',
            }}
          >
            <Typography
              onMouseEnter={() => setHoveredProject('elysian')}
              onMouseLeave={() => setHoveredProject(null)}
              onClick={() => navigate('/projects/elysian')}
              sx={{
                color: 'white',
                fontSize: { 
                  xs: '24px',
                  sm: '28px', 
                  md: '32px',
                  lg: '36px'
                },
                fontWeight: 400,
                letterSpacing: { xs: '1px', sm: '1.5px', md: '2px' },
                textTransform: 'uppercase',
                lineHeight: 1.2,
                cursor: 'pointer',
                transition: 'opacity 0.3s ease',
                '&:hover': {
                  opacity: 0.7,
                },
              }}
            >
              ELYSIAN CUSTOM COMPUTERS
            </Typography>
            <Typography
              sx={{
                color: 'white',
                fontSize: { xs: '12px', sm: '13px', md: '14px' },
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
              opacity: contentVisible ? 1 : 0,
              transform: contentVisible ? 'translateY(0)' : 'translateY(20px)',
              transition: 'opacity 0.8s ease-out 0.9s, transform 0.8s ease-out 0.9s',
            }}
          >
            <Typography
              onMouseEnter={() => setHoveredProject('superior-advantage')}
              onMouseLeave={() => setHoveredProject(null)}
              onClick={() => navigate('/projects/superior-advantage')}
              sx={{
                color: 'white',
                fontSize: { 
                  xs: '24px',
                  sm: '28px', 
                  md: '32px',
                  lg: '36px'
                },
                fontWeight: 400,
                letterSpacing: { xs: '1px', sm: '1.5px', md: '2px' },
                textTransform: 'uppercase',
                lineHeight: 1.2,
                cursor: 'pointer',
                transition: 'opacity 0.3s ease',
                '&:hover': {
                  opacity: 0.7,
                },
              }}
            >
              SUPERIOR ADVANTAGE REALTORS
            </Typography>
            <Typography
              sx={{
                color: 'white',
                fontSize: { xs: '12px', sm: '13px', md: '14px' },
                fontWeight: 300,
                opacity: 0.9,
              }}
            >
              Front End Development | UI/UX Design
            </Typography>
          </Box>
        </Box>
      </Box>

      <ContactOverlay 
        open={contactOverlayOpen}
        onClose={handleCloseContactOverlay}
      />
    </Box>
  )
}

export default Projects
