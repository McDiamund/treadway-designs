import { Box, Typography, CircularProgress } from '@mui/material'
import { memo } from 'react'

interface LoadingScreenProps {
  isVisible: boolean
}

const LoadingScreen = ({ isVisible }: LoadingScreenProps) => {
  if (!isVisible) return null

  return (
    <Box
      sx={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        backgroundColor: 'white',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 9999,
        opacity: isVisible ? 1 : 0,
        visibility: isVisible ? 'visible' : 'hidden',
        transition: 'opacity 0.5s ease-in-out, visibility 0.5s ease-in-out',
      }}
    >
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '2rem',
        }}
      >
        {/* Loading spinner */}
        <CircularProgress
          size={50}
          thickness={3}
          sx={{
            color: '#a4b649',
          }}
        />
        
        <Typography
          sx={{
            color: '#e0e0e0',
            fontSize: '0.9rem',
            letterSpacing: '0.1em',
            textTransform: 'uppercase',
            fontWeight: 300,
          }}
        >
          Loading...
        </Typography>
      </Box>
    </Box>
  )
}

export default memo(LoadingScreen)
