import { 
  Box, 
  TextField, 
  Button, 
  Typography, 
  Modal, 
  FormControl, 
  InputLabel, 
  Select, 
  MenuItem, 
  IconButton,
  Backdrop,
  Alert,
  Snackbar,
  CircularProgress
} from '@mui/material'
import { Close } from '@mui/icons-material'
import { useState, useCallback, memo } from 'react'
import emailjs from '@emailjs/browser'

interface ContactOverlayProps {
  open: boolean
  onClose: () => void
}

interface FormData {
  name: string
  email: string
  timeFrame: string
  budget: string
  projectDetails: string
}

// Create a stable backdrop component to prevent re-rendering
const StableBackdrop = (props: any) => (
  <Backdrop
    {...props}
    sx={{
      backgroundColor: 'rgba(0, 0, 0, 0.7)',
      backdropFilter: 'blur(8px)',
    }}
  />
)

const ContactOverlay = ({ open, onClose }: ContactOverlayProps) => {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    timeFrame: '',
    budget: '',
    projectDetails: ''
  })

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<'success' | 'error' | null>(null)
  const [statusMessage, setStatusMessage] = useState('')

  // EmailJS configuration - replace these with your actual values
  const EMAILJS_SERVICE_ID = 'service_wn7mi9j'
  const EMAILJS_TEMPLATE_ID = 'template_usew4h5' // Replace with your template ID
  const EMAILJS_PUBLIC_KEY = 'L_9NoBSNWpF2zyfTM'   // Replace with your public key

  const handleInputChange = useCallback((field: keyof FormData) => (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement> | any
  ) => {
    setFormData(prev => ({
      ...prev,
      [field]: event.target.value
    }))
  }, [])

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault()
    setIsSubmitting(true)
    setSubmitStatus(null)

    try {
      // Prepare template parameters for EmailJS
      const templateParams = {
        from_name: formData.name,
        from_email: formData.email,
        time_frame: formData.timeFrame,
        budget: formData.budget,
        project_details: formData.projectDetails,
        to_email: 'treadwaydesignsofficial@gmail.com'
      }

      // Send email using EmailJS
      await emailjs.send(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        templateParams,
        EMAILJS_PUBLIC_KEY
      )

      // Success
      setSubmitStatus('success')
      setStatusMessage('Thank you! Your message has been sent successfully. I\'ll get back to you soon!')
      
      // Reset form
      setFormData({
        name: '',
        email: '',
        timeFrame: '',
        budget: '',
        projectDetails: ''
      })

      // Close modal after a short delay
      setTimeout(() => {
        onClose()
        setSubmitStatus(null)
      }, 3000)

    } catch (error) {
      console.error('EmailJS error:', error)
      setSubmitStatus('error')
      setStatusMessage('Sorry, there was an error sending your message. Please try again or contact me directly.')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <>
      <Modal
        open={open}
        onClose={onClose}
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
        BackdropComponent={StableBackdrop}
      >
        <Box
        sx={{
          position: 'relative',
          background: 'rgba(0, 0, 0, 0.3)',
          borderRadius: '8px',
          padding: '2rem',
          width: { xs: '90vw', sm: '600px' },
          maxHeight: '90vh',
          overflow: 'auto',
          outline: 'none',
          border: '1px solid rgba(255, 255, 255, 0.1)',
        }}
      >
        {/* Close Button */}
        <IconButton
          onClick={onClose}
          sx={{
            position: 'absolute',
            top: '1rem',
            right: '1rem',
            color: 'white',
            '&:hover': {
              backgroundColor: 'rgba(255, 255, 255, 0.1)',
            },
          }}
        >
          <Close />
        </IconButton>

        {/* Form Title */}
        <Typography
          variant="h4"
          sx={{
            color: 'white',
            marginBottom: '2rem',
            textAlign: 'center',
            fontWeight: 300,
          }}
        >
          Let's Work Together
        </Typography>

        {/* Contact Form */}
        <Box component="form" onSubmit={handleSubmit} sx={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          {/* Name Field */}
          <TextField
            label="Name"
            variant="standard"
            fullWidth
            value={formData.name}
            onChange={handleInputChange('name')}
            required
            sx={{
              '& .MuiInput-root': {
                backgroundColor: 'transparent',
                '&:before': {
                  borderBottomColor: 'white',
                },
                '&:hover:not(.Mui-disabled):before': {
                  borderBottomColor: 'white',
                },
                '&:after': {
                  borderBottomColor: '#a4b649',
                },
              },
              '& .MuiInputLabel-root': {
                color: 'white',
                '&.Mui-focused': {
                  color: '#a4b649',
                },
              },
              '& .MuiInput-input': {
                color: 'white',
                backgroundColor: 'transparent',
              },
            }}
          />

          {/* Email Field */}
          <TextField
            label="Email"
            type="email"
            variant="standard"
            fullWidth
            value={formData.email}
            onChange={handleInputChange('email')}
            required
            sx={{
              '& .MuiInput-root': {
                backgroundColor: 'transparent',
                '&:before': {
                  borderBottomColor: 'white',
                },
                '&:hover:not(.Mui-disabled):before': {
                  borderBottomColor: 'white',
                },
                '&:after': {
                  borderBottomColor: '#a4b649',
                },
              },
              '& .MuiInputLabel-root': {
                color: 'white',
                '&.Mui-focused': {
                  color: '#a4b649',
                },
              },
              '& .MuiInput-input': {
                color: 'white',
                backgroundColor: 'transparent',
              },
            }}
          />

          {/* Time Frame Field */}
          <TextField
            label="Time Frame"
            variant="standard"
            fullWidth
            value={formData.timeFrame}
            onChange={handleInputChange('timeFrame')}
            required
            sx={{
              '& .MuiInput-root': {
                backgroundColor: 'transparent',
                '&:before': {
                  borderBottomColor: 'white',
                },
                '&:hover:not(.Mui-disabled):before': {
                  borderBottomColor: 'white',
                },
                '&:after': {
                  borderBottomColor: '#a4b649',
                },
              },
              '& .MuiInputLabel-root': {
                color: 'white',
                '&.Mui-focused': {
                  color: '#a4b649',
                },
              },
              '& .MuiInput-input': {
                color: 'white',
                backgroundColor: 'transparent',
              },
            }}
          />

          {/* Budget Dropdown */}
          <FormControl variant="standard" fullWidth required>
            <InputLabel 
              sx={{ 
                color: 'white', 
                '&.Mui-focused': { 
                  color: '#a4b649' 
                } 
              }}
            >
              Budget
            </InputLabel>
            <Select
              value={formData.budget}
              onChange={handleInputChange('budget')}
              sx={{
                color: 'white',
                backgroundColor: 'transparent',
                '&:before': {
                  borderBottomColor: 'white',
                },
                '&:hover:not(.Mui-disabled):before': {
                  borderBottomColor: 'white',
                },
                '&:after': {
                  borderBottomColor: '#a4b649',
                },
                '& .MuiSvgIcon-root': {
                  color: 'white',
                },
              }}
              MenuProps={{
                PaperProps: {
                  sx: {
                    backgroundColor: 'rgba(0, 0, 0, 0.9)',
                    backdropFilter: 'blur(8px)',
                    border: '1px solid rgba(255, 255, 255, 0.1)',
                  },
                },
              }}
            >
              <MenuItem value="$500-$2000" sx={{ color: 'white' }}>$500-$2000</MenuItem>
              <MenuItem value="$2000-$6000" sx={{ color: 'white' }}>$2000-$6000</MenuItem>
              <MenuItem value="$6000+" sx={{ color: 'white' }}>$6000+</MenuItem>
            </Select>
          </FormControl>

          {/* Project Details Text Area */}
          <TextField
            label="Project Details"
            variant="standard"
            fullWidth
            multiline
            minRows={4}
            value={formData.projectDetails}
            onChange={handleInputChange('projectDetails')}
            required
            sx={{
              '& .MuiInput-root': {
                backgroundColor: 'transparent',
                '&:before': {
                  borderBottomColor: 'white',
                },
                '&:hover:not(.Mui-disabled):before': {
                  borderBottomColor: 'white',
                },
                '&:after': {
                  borderBottomColor: '#a4b649',
                },
              },
              '& .MuiInputLabel-root': {
                color: 'white',
                '&.Mui-focused': {
                  color: '#a4b649',
                },
              },
              '& .MuiInput-input': {
                color: 'white',
                backgroundColor: 'transparent',
              },
            }}
          />

          {/* Submit Button */}
          <Button
            type="submit"
            variant="contained"
            disabled={isSubmitting}
            sx={{
              backgroundColor: '#a4b649',
              color: '#000',
              padding: '0.75rem 2rem',
              fontSize: '0.9rem',
              fontWeight: 600,
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
              borderRadius: '0px',
              marginTop: '1rem',
              transition: 'all 0.2s ease',
              '&:hover': {
                backgroundColor: '#8fa03d',
                transform: 'translateY(-2px)',
              },
              '&:disabled': {
                backgroundColor: '#666',
                color: '#999',
              },
            }}
            startIcon={isSubmitting ? <CircularProgress size={20} color="inherit" /> : null}
          >
            {isSubmitting ? 'Sending...' : 'Send Message'}
          </Button>
        </Box>
        </Box>
      </Modal>

      {/* Success/Error Snackbar */}
      <Snackbar
        open={submitStatus !== null}
        autoHideDuration={6000}
        onClose={() => setSubmitStatus(null)}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert 
          onClose={() => setSubmitStatus(null)} 
          severity={submitStatus === 'success' ? 'success' : 'error'}
          sx={{ 
            backgroundColor: submitStatus === 'success' ? '#4caf50' : '#f44336',
            color: 'white',
            '& .MuiAlert-icon': {
              color: 'white',
            },
            '& .MuiAlert-action': {
              color: 'white',
            },
          }}
        >
          {statusMessage}
        </Alert>
      </Snackbar>
    </>
  )
}

export default memo(ContactOverlay)
