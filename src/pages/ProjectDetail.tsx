import { Box, Typography, Button } from '@mui/material'
import { useNavigate, useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import ContactOverlay from '../components/ContactOverlay'
import { useImagePreloader } from '../utils/imagePreloader'

interface ProjectData {
  title: string
  description: string
  technologies: string[]
  details: string
  images: string[]
  website: string
}

const ProjectDetail = () => {
  const navigate = useNavigate()
  const { projectId } = useParams<{ projectId: string }>()
  const [headerAnimated, setHeaderAnimated] = useState<boolean>(false)
  const [mainContentAnimated, setMainContentAnimated] = useState<boolean>(false)
  const [contentVisible, setContentVisible] = useState<boolean>(false)
  const [contactOverlayOpen, setContactOverlayOpen] = useState(false)

  // Use comprehensive image preloader
  const { projectImages, animatedBackgroundImages } = useImagePreloader()

  // Project data mapping using preloaded images
  const projectData: Record<string, ProjectData> = {
    'productive-clouds': {
      title: 'PRODUCTIVE CLOUD SOLUTIONS',
      description: 'We specialize in creating practical, scalable solutions that solve real business challenges, helping clients establish their digital presence with modern web applications and mobile experiences.',
      technologies: ['React', 'Django', 'Flutter', 'MUI', 'Bootstrap', 'TypeScript', 'Node.js', 'AWS Serverless'],
      details: 'As Lead Frontend Engineer at this innovative consulting firm, I drive the technical vision for web and mobile applications that transform business ideas into digital reality. I oversee the complete project lifecycle—from initial setup and architecture decisions to task delegation and production deployment.',
      images: [projectImages.blackresearcher || '', projectImages.blackeverything || '', projectImages.productiveclouds || ''],
      website: 'https://productiveclouds.com'
    },
    'note': {
      title: 'NOTE.',
      description: 'A location discovery and sharing platform that solves the universal problem of finding great places to visit in any city. Users can save favorite spots—from hidden restaurants to must-see vacation destinations—and share curated collections with friends and the community.',
      technologies: ['Flutter', 'Dart', 'AWS Serverless', 'Figma', 'MongoDB'],
      details: 'Note. is a social platform that combines personal organization with community-driven discovery, giving users both a private bookmark system and access to curated recommendations from real people.',
      images: [projectImages.note || '', projectImages.note || '', projectImages.note || ''],
      website: 'https://note-app.com'
    },
    'elysian': {
      title: 'ELYSIAN CUSTOM COMPUTERS',
      description: 'A bespoke computer building service platform featuring custom PC configurations, expert consultation, and premium components.',
      technologies: ['Next.js', 'TypeScript', 'Express.js', 'MySQL', 'Figma'],
      details: 'Elysian Custom Computers is a full-stack e-commerce platform that allows customers to configure custom PC builds, view detailed component specifications, and receive expert recommendations. The platform includes inventory management, order tracking, and customer support systems. This site transformed a word-of-mouth business into a professional online presence, enabling the client to showcase their expertise in custom computer building and reach a broader local market.',
      images: [projectImages.elysian1 || '', projectImages.elysian2 || '', projectImages.elysian || ''],
      website: 'https://elysiancustomcomputers.com'
    },
    'superior-advantage': {
      title: 'SUPERIOR ADVANTAGE REALTORS',
      description: 'A modern real estate platform connecting buyers, sellers, and agents with advanced search capabilities and market insights.',
      technologies: ['React', 'TypeScript', 'CSS3', 'Figma'],
      details: 'Enhanced their ability to attract new clients while providing existing customers with easier access to valuable real estate information and services.',
      images: [projectImages.superioradvantage2 || '', projectImages.superioradvantage3 || '', projectImages.superioradvantage || ''],
      website: 'https://superioradvantage-re.co'
    }
  }

  const currentProject = projectId ? projectData[projectId] : null

  // Get project-specific background color
  const getProjectBackgroundColor = (projectId: string): string => {
    switch (projectId) {
      case 'note':
        return '#2f7444'
      case 'elysian':
        return '#00a99d'
      case 'superior-advantage':
        return '#e74c3c' // Keep the original red
      case 'productive-clouds':
        return '#1f1e34'
      default:
        return '#e74c3c' // Default fallback
    }
  }

  const projectBackgroundColor = projectId ? getProjectBackgroundColor(projectId) : '#e74c3c'

  // Trigger animations on page load
  useEffect(() => {
    const headerTimer = setTimeout(() => {
      setHeaderAnimated(true)
    }, 400)

    const contentTimer = setTimeout(() => {
      setMainContentAnimated(true)
    }, 800)

    const visibilityTimer = setTimeout(() => {
      setContentVisible(true)
    }, 1200)

    return () => {
      clearTimeout(headerTimer)
      clearTimeout(contentTimer)
      clearTimeout(visibilityTimer)
    }
  }, [])

  const handleNavigation = (key: string) => {
    switch (key) {
      case 'home':
        navigate('/')
        break
      case 'projects':
        navigate('/projects')
        break
      case 'contact':
        setContactOverlayOpen(true)
        break
      default:
        break
    }
  }

  const handleVisitWebsite = () => {
    if (currentProject?.website) {
      window.open(currentProject.website, '_blank', 'noopener,noreferrer')
    }
  }

  if (!currentProject) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <Typography color="white">Project not found</Typography>
      </Box>
    )
  }

  return (
    <Box
      sx={{
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
        height: '100dvh',
        overflow: 'hidden',
        '&::before': {
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundImage: animatedBackgroundImages.length > 0 ? `url(${animatedBackgroundImages[19]})` : 'none',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          filter: 'blur(2px) brightness(0.9)',
          zIndex: -1,
        },
      }}
    >
      {/* Navigation Header */}
      <Box
        sx={{
          margin: { xs: '10px 10px 0 10px', sm: '15px 15px 0 15px', md: '20px 20px 0 20px' },
          padding: headerAnimated ? { xs: '15px', sm: '18px', md: '20px' } : { xs: '0 15px', sm: '0 18px', md: '0 20px' },
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
            src={projectImages.slogo || ''}
            alt="Logo"
            style={{ 
              height: 'clamp(32px, 5vw, 40px)', 
              width: 'auto', 
              display: 'block' 
            }}
          />
        </Box>
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
                fontSize: { xs: '0.75rem', sm: '0.85rem', md: '0.9rem' },
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
          height: mainContentAnimated ? '100%' : '0px',
          overflow: 'hidden',
          transition: 'height 0.4s ease-out, padding 0.4s ease-out',
          display: 'flex',
          flexDirection: { xs: 'column', lg: 'row' },
          gap: { xs: '15px', sm: '18px', md: '20px' },
          marginTop: { xs: '15px', sm: '18px', md: '20px' },
          paddingBottom: mainContentAnimated ? { xs: '30px', sm: '40px', md: '60px' } : '0px',
          paddingLeft: mainContentAnimated ? { xs: '10px', sm: '15px', md: '20px' } : '0px',
          paddingRight: mainContentAnimated ? { xs: '10px', sm: '15px', md: '20px' } : '0px',
        }}
      >
        {/* Left Side - Project Information */}
        <Box
          sx={{
            width: { xs: '100%', lg: '50%' },
            minHeight: { xs: 'auto', lg: mainContentAnimated ? '100%' : '0px' },
            height: { xs: 'auto', lg: mainContentAnimated ? '100%' : '0px' },
            transition: 'height 0.4s ease-out',
          }}
        >
          <Box
            sx={{
              backgroundColor: projectBackgroundColor,
              width: '100%',
              height: '100%',
              padding: { xs: '20px', sm: '25px', md: '30px', lg: '35px', xl: '40px' },
              boxSizing: 'border-box',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'flex-start',
              gap: { xs: '20px', sm: '25px', md: '30px' },
            }}
          >
            <Box 
              sx={{ 
                opacity: contentVisible ? 1 : 0,
                transform: contentVisible ? 'translateY(0)' : 'translateY(20px)',
                transition: 'opacity 0.8s ease-out 0.3s, transform 0.8s ease-out 0.3s',
              }}
            >
              <Typography
                sx={{
                  color: 'white',
                  fontSize: { xs: '24px', sm: '28px', md: '32px', lg: '38px', xl: '42px' },
                  fontWeight: 400,
                  letterSpacing: { xs: '1px', md: '1.5px', lg: '2px' },
                  textTransform: 'uppercase',
                  lineHeight: 1.2,
                  marginBottom: { xs: '15px', md: '20px' },
                }}
              >
                {currentProject.title}
              </Typography>
              
              <Typography
                sx={{
                  color: 'white',
                  fontSize: { xs: '14px', sm: '15px', md: '16px', lg: '17px', xl: '18px' },
                  fontWeight: 300,
                  lineHeight: 1.6,
                  marginBottom: { xs: '20px', md: '25px', lg: '30px' },
                  opacity: 0.9,
                }}
              >
                {currentProject.description}
              </Typography>

              <Typography
                sx={{
                  color: 'white',
                  fontSize: { xs: '13px', sm: '14px', md: '15px', lg: '16px' },
                  fontWeight: 400,
                  marginBottom: { xs: '10px', md: '15px' },
                  textTransform: 'uppercase',
                  letterSpacing: { xs: '0.5px', md: '1px' },
                }}
              >
                Technologies Used
              </Typography>

              <Box sx={{ 
                display: 'flex', 
                gap: { xs: '10px', md: '12px', lg: '15px' }, 
                marginBottom: { xs: '20px', md: '25px', lg: '30px' }, 
                flexWrap: 'wrap' 
              }}>
                {currentProject.technologies.map((tech, index) => (
                  <Box
                    key={index}
                    sx={{
                      backgroundColor: 'rgba(255, 255, 255, 0.2)',
                      padding: { xs: '6px 12px', md: '7px 14px', lg: '8px 16px' },
                    }}
                  >
                    <Typography
                      sx={{
                        color: 'white',
                        fontSize: { xs: '12px', sm: '13px', md: '14px' },
                        fontWeight: 300,
                      }}
                    >
                      {tech}
                    </Typography>
                  </Box>
                ))}
              </Box>

              <Typography
                sx={{
                  color: 'white',
                  fontSize: { xs: '13px', sm: '14px', md: '15px', lg: '16px' },
                  fontWeight: 300,
                  lineHeight: 1.7,
                  opacity: 0.9,
                  marginBottom: { xs: '25px', md: '30px', lg: '35px' },
                }}
              >
                {currentProject.details}
              </Typography>

              {/* Action Buttons */}
              <Box sx={{ 
                display: 'flex', 
                gap: { xs: '15px', md: '20px' }, 
                flexWrap: 'wrap',
                marginTop: 'auto'
              }}>
                <Button
                  onClick={() => handleNavigation('projects')}
                  sx={{
                    backgroundColor: 'rgba(255, 255, 255, 0.2)',
                    color: 'white',
                    fontSize: { xs: '12px', sm: '13px', md: '14px' },
                    fontWeight: 400,
                    textTransform: 'uppercase',
                    letterSpacing: { xs: '0.5px', md: '1px' },
                    padding: { xs: '10px 20px', md: '12px 24px' },
                    border: '1px solid rgba(255, 255, 255, 0.3)',
                    borderRadius: '0px',
                    transition: 'all 0.3s ease',
                    '&:hover': {
                      backgroundColor: 'rgba(255, 255, 255, 0.3)',
                      borderColor: 'rgba(255, 255, 255, 0.5)',
                      transform: 'translateY(-2px)',
                    },
                  }}
                >
                  ← Back to Projects
                </Button>
                
                {projectId === 'elysian' && (
                  <Button
                    onClick={() => window.open('https://www.behance.net/gallery/155066397/Gaming-PC-Business-%28WIP%29', '_blank', 'noopener,noreferrer')}
                    sx={{
                      backgroundColor: 'rgba(255, 255, 255, 0.2)',
                      color: 'white',
                      fontSize: { xs: '12px', sm: '13px', md: '14px' },
                      fontWeight: 400,
                      textTransform: 'uppercase',
                      letterSpacing: { xs: '0.5px', md: '1px' },
                      padding: { xs: '10px 20px', md: '12px 24px' },
                      border: '1px solid rgba(255, 255, 255, 0.3)',
                      borderRadius: '0px',
                      transition: 'all 0.3s ease',
                      '&:hover': {
                        backgroundColor: 'rgba(255, 255, 255, 0.3)',
                        borderColor: 'rgba(255, 255, 255, 0.5)',
                        transform: 'translateY(-2px)',
                      },
                    }}
                  >
                    View Mockups →
                  </Button>
                )}
                
                {projectId !== 'note' && (
                  <Button
                    onClick={handleVisitWebsite}
                    sx={{
                      backgroundColor: 'rgba(255, 255, 255, 0.9)',
                      color: projectBackgroundColor,
                      fontSize: { xs: '12px', sm: '13px', md: '14px' },
                      fontWeight: 400,
                      textTransform: 'uppercase',
                      letterSpacing: { xs: '0.5px', md: '1px' },
                      padding: { xs: '10px 20px', md: '12px 24px' },
                      border: '1px solid white',
                      borderRadius: '0px',
                      transition: 'all 0.3s ease',
                      '&:hover': {
                        backgroundColor: 'white',
                        transform: 'translateY(-2px)',
                        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.2)',
                      },
                    }}
                  >
                    Visit Website →
                  </Button>
                )}
              </Box>
            </Box>
          </Box>
        </Box>

        {/* Right Side - Images */}
        <Box
          sx={{
            width: { xs: '100%', lg: '50%' },
            minHeight: { xs: '400px', sm: '500px', md: '600px', lg: mainContentAnimated ? '100%' : '0px' },
            height: { xs: 'auto', lg: mainContentAnimated ? '100%' : '0px' },
            boxSizing: 'border-box',
            transition: 'height 0.4s ease-out',
            display: 'flex',
            flexDirection: 'column',
            gap: { xs: '15px', sm: '18px', md: '20px' },
          }}
        >
          {projectId === 'note' ? (
            // Single image for Note project
            <Box
              sx={{
                backgroundColor: '#ffffff',
                height: '100%',
                minHeight: { xs: '400px', sm: '500px', md: '600px' },
                opacity: contentVisible ? 1 : 0,
                transform: contentVisible ? 'translateY(0)' : 'translateY(20px)',
                transition: 'opacity 0.8s ease-out 0.5s, transform 0.8s ease-out 0.5s',
                overflow: 'hidden',
              }}
            >
              <img
                src={currentProject.images[0]}
                alt={currentProject.title}
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                }}
              />
            </Box>
          ) : (
            // Three images for other projects
            <>
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: { xs: 'column', sm: 'row' },
                  gap: { xs: '15px', sm: '18px', md: '20px' },
                  height: { xs: 'auto', sm: '50%' },
                }}
              >
               
                  <Box
                    sx={{
                      flex: 1,
                      minHeight: { xs: '200px', sm: '150px', md: '200px' },
                      height: { xs: '200px', sm: '100%' },
                      backgroundColor: '#ffffff',
                      backgroundImage: `url(${currentProject.images[0]})`,
                      backgroundSize: 'cover',
                      backgroundPosition: projectId === 'note' ? 'center' : 'left',
                      backgroundRepeat: 'no-repeat',
                      opacity: contentVisible ? 1 : 0,
                      transform: contentVisible ? 'translateX(0)' : 'translateX(20px)',
                      transition: `opacity 0.8s ease-out ${0.5 + 0 * 0.2}s, transform 0.8s ease-out ${0.5 + 0 * 0.2}s`,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      overflow: 'hidden',
                    }}
                    />

<Box
                    sx={{
                      flex: 1,
                      minHeight: { xs: '200px', sm: '150px', md: '200px' },
                      height: { xs: '200px', sm: '100%' },
                      backgroundColor: '#ffffff',
                      backgroundImage: `url(${currentProject.images[1]})`,
                      backgroundSize: 'cover',
                      backgroundPosition: projectId === 'superior-advantage' ? 'left' : 'center',
                      backgroundRepeat: 'no-repeat',
                      opacity: contentVisible ? 1 : 0,
                      transform: contentVisible ? 'translateX(0)' : 'translateX(20px)',
                      transition: `opacity 0.8s ease-out ${0.5 + 1 * 0.2}s, transform 0.8s ease-out ${0.5 + 1 * 0.2}s`,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      overflow: 'hidden',
                    }}
                    />
           
              </Box>
              <Box
                sx={{
                  backgroundColor: '#ffffff',
                  backgroundImage: `url(${currentProject.images[2]})`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'top',
                  backgroundRepeat: 'no-repeat',
                  height: { xs: '250px', sm: '50%' },
                  minHeight: { xs: '250px', sm: '200px' },
                  opacity: contentVisible ? 1 : 0,
                  transform: contentVisible ? 'translateY(0)' : 'translateY(20px)',
                  transition: 'opacity 0.8s ease-out 0.9s, transform 0.8s ease-out 0.9s',
                  overflow: 'hidden',
                }}
              />
            </>
          )}
        </Box>
      </Box>

      <ContactOverlay 
        open={contactOverlayOpen}
        onClose={() => setContactOverlayOpen(false)}
      />
    </Box>
  )
}

export default ProjectDetail
