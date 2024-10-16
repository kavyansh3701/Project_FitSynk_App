import React from 'react'
import {Box,Stack,Typography} from '@mui/material';
import Logo from '../assets/images/Logo.png'

const Footer = () => {
  return (
    <Box mt="80px" bgcolor="#fff3f4">
      <Stack gap="40px" alignItems="center" px="40px" pt="24px">
        <img src={Logo} alt="logo" width="70px" height="70px"/>
        <Typography
          variant="h2"
          pb="40px"
          mt="2px"
          id="hashtag"
          sx={{
            fontSize: { xs: '36px', sm: '34px', lg: '45px' }, 
            fontWeight: '600', 
            color: '#00796b', 
            textAlign: 'center',
            textShadow: '2px 2px 5px rgba(0, 0, 0, 0.3)', 
            letterSpacing: '4px', 
            transition: 'transform 0.3s ease, color 0.3s ease',
            '&:hover': {
              color: '#004d40', 
              transform: 'scale(1.05)', 
            },
          }}
        >
          #GrindAndGrow
        </Typography>
      </Stack>
    </Box>
  )
}

export default Footer