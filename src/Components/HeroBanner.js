import React from 'react'
import{Box , Button , Typography} from '@mui/material'
import HeroBannerImage from '../assets/images/banner2.jpg';

const HeroBanner = () => {
  return (
    <Box sx={{
        mt:{lg: '212px' , xs:'70px'},
        ml: {sm:'50px'}
    }} position="relative" padding="20px"
    >
        <Typography color="#8B0000"
        fontWeight="600" fontSize="30px" fontFamily="cursive" ml="2px" 
        >
            Fitness Club
        </Typography>

        <Typography fontWeight={700}
        sx= {{fontSize:{lg:'42px',xs: '40px'},
        textShadow: '3px 3px 4px rgba(0, 0, 0, 0.3)'
        }}
        mb="23px" mt="20px">
            Sweat , Smile 
            <br/>
            and Repeat 
        </Typography>

        <Typography fontSize="22px" lineHeight="35px" mb={4}>
            Check out the most effective exercises
        </Typography> 

        {/* Explore ExerciseButton */}
        <Button variant="contained" color="error"
        href="#exercises" 
        sx={{backgroundColor:'#FF2625' , padding:'12px'}}
        >Explore Exercises</Button>         

        {/* Exercise */}
        <Typography fontWeight={600} color='#000000'
        sx={{
          opacity: 0.4,  
          backgroundImage: 'linear-gradient(to right, rgba(255, 255, 255, 0.2), rgba(255, 255, 255, 0.2))', 
          display: { lg: 'block', xs: 'none' },
          padding: '10px',  
          mt: '70px'  
        }}
        fontSize="120px" 
        >
            #GetfitYourself
        </Typography>

        <img 
          src={HeroBannerImage} 
          alt="Banner" 
          className="hero-banner-img" 
          style={{ width: '758px', height: '775px',
            borderBottomLeftRadius: '50px',    
           }} 
        />
    </Box>
  );
}

export default HeroBanner