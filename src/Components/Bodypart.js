import React from 'react';
import { Stack, Typography } from '@mui/material';
import Icon from '../assets/icons/gym.png';

const Bodypart = ({ item, setBodyPart, bodyPart }) => {
  return (
    <Stack
      type="button"
      alignItems="center"
      justifyContent="center"
      className="bodyPart-card"
      sx={{
        borderTop: bodyPart === item ? '4px solid #ff2625' : 'none',  // Fixed the condition for border
        backgroundColor: '#fff',
        borderBottomLeftRadius: '20px',  // Fixed the typo from 'Raidus' to 'Radius'
        width: '150px',
        height: '150px',
        cursor: 'pointer',
        gap: '20px'
      }}
      onClick={() =>{ setBodyPart(item)
          setBodyPart(item);
          window.scrollTo({top:1800, left:100 , behavior: 'smooth'})
      }}  
    >
      <img src={Icon} alt="dumbbell" style={{ width: '35px', height: '35px' }} />
      <Typography fontSize="15px" fontWeight="bold" textTransform="capitalize" >
        {item}
      </Typography>
    </Stack>
  );
};

export default Bodypart;
