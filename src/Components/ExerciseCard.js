import React from 'react'; 
import { Link } from 'react-router-dom';
import { Button, Stack, Typography } from '@mui/material';

const ExerciseCard = ({ exercise }) => {
  return (
    <Link 
      className="exercise-card" 
      to={`/exercise/${exercise.id}`} 
      style={{ 
        width: '100%',  // Change width to 100% for responsiveness
        maxWidth: '400px', // Maximum width for larger screens
        textDecoration: 'none', 
        margin: '10px',  // Add margin for spacing
        display: 'block',
        boxShadow: '0px 5px 10px rgba(0, 0, 0, 0.2)', 
        borderRadius: '10px', 
        backgroundColor: '#fff'
      }}
    > 
      <img 
        src={exercise.gifUrl} 
        alt={exercise.name} 
        loading="lazy"
        style={{ 
          width: '100%',   // Set width to 100% for responsiveness
          height: 'auto',   // Maintain aspect ratio
          borderTopLeftRadius: '10px', // Round corners
          borderTopRightRadius: '10px', // Round corners
          display: 'block' 
        }} 
      />

      <Stack direction="row" spacing={2} sx={{ mt: '10px', justifyContent: 'center' }}>
        <Button 
          sx={{ 
            ml: '21px',
            color: '#fff', 
            fontWeight: '600', 
            background: '#ffa9a9', 
            fontSize: '14px', 
            borderRadius: '20px', 
            textTransform: 'capitalize',
            '&:hover': { 
              background: '#ff7f7f', 
              transform: 'scale(1.05)' 
            }
          }}>
          {exercise.bodyPart}
        </Button>

        <Button 
          sx={{ 
            ml: '21px',
            color: '#fff', 
            fontWeight: '600', 
            background: '#fcc757', 
            fontSize: '14px', 
            borderRadius: '20px', 
            textTransform: 'capitalize',
            '&:hover': { 
              background: '#e6b54a', 
              transform: 'scale(1.05)' 
            }
          }}
        >
          {exercise.target}
        </Button>
      </Stack>

      <Typography 
        color='#000' 
        fontWeight="bold" 
        mt="11px" 
        pb="10px" 
        textTransform='capitalize' 
        textAlign="center" 
        fontSize="18px"
      >
        {exercise.name}
      </Typography>
    </Link>
  );
}

export default ExerciseCard;
