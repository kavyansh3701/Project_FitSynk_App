import React, { useState} from 'react';
import { Box } from '@mui/material';
import HeroBanner from '../Components/HeroBanner';  
import SearchExercises from '../Components/SearchExercises';  
import Exercises from '../Components/Exercises';  

const Home = () => {
  const [exercises, setExercises] = useState([]);
  const [bodyPart, setBodyPart] = useState('all');  

  console.log(bodyPart)

  return (
    <Box>
      <HeroBanner/>
      {/* Search bar with props to handle searching */}
      <SearchExercises 
        setExercises={setExercises} 
        bodyPart={bodyPart} 
        setBodyPart={setBodyPart} 
      />
    
      {/* Pass exercises to Exercises component to display */}
      <Exercises 
      setExercises={setExercises} 
      bodyPart={bodyPart} 
      exercises={exercises} 
      />
    </Box>
  );
};

export default Home;
