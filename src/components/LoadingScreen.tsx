import { Box, Typography } from '@mui/material'
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
        {/* Loading dots animation */}
        <Box
          sx={{
            width: '220px',
            height: '5px',
            backgroundColor: '#e0e0e0',
            borderRadius: '5px',
            overflow: 'hidden',
            position: 'relative',
          }}
        >
         <Box
           sx={{
             height: '100%',
             backgroundColor: '#a4b649',
             borderRadius: '5px',
             position: 'absolute',
             left: 0,
             top: 0,
             animation: 'loadingBarFill 0.7s ease-in-out infinite',
             '@keyframes loadingBarFill': {
               '0%': {
                 width: '0%',
               },
               '100%': {
                 width: '100%',
               },
             },
           }}
         />
        </Box>
        
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
