import React, { useState } from 'react';
import { Box, Stack, Typography, Pagination } from '@mui/material';
import HorizontalScrollbar from '../Components/HorizontalScrollbar';
import Loader from './Loader';
import ExerciseCard from './ExerciseCard'; 

const SimilarExercises = ({ targetMuscleExercises }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const exercisesPerPage = 3; 
  const indexOfLastExercise = currentPage * exercisesPerPage;
  const indexOfFirstExercise = indexOfLastExercise - exercisesPerPage;

  const currentExercises = targetMuscleExercises.slice(indexOfFirstExercise, indexOfLastExercise);

  // Handle pagination change
  const paginate = (event, value) => {
    setCurrentPage(value);

    if (value === 1) {
      window.scrollTo({ top: 1800, behavior: 'smooth' }); 
    }
  };

  return (
    <Box sx={{ mt: { lg: '100px', xs: '0' } }}>
      <Typography variant="h3" mb="56px" sx={{ textAlign: 'left' }}>
        Exercises that target the same muscle group
      </Typography>
      <Stack
        direction="row"
        sx={{ gap: { lg: '110px', xs: '50px' } }} 
        flexWrap="wrap" 
        justifyContent="center"
      >
        {currentExercises.length > 0 ? (
          currentExercises.map((exercise) => (
            <ExerciseCard key={exercise.id} exercise={exercise} />
          ))
        ) : (
          <Typography variant="h6" sx={{ textAlign: 'left' }}>
            No Exercises Found
          </Typography>
        )}
      </Stack>
      <Stack mt="100px" alignItems="center">
        {targetMuscleExercises.length > exercisesPerPage && (
          <Pagination
            color="standard"
            shape="rounded"
            defaultPage={1}
            count={Math.ceil(targetMuscleExercises.length / exercisesPerPage)} 
            page={currentPage} 
            onChange={paginate} 
            size="large"
          />
        )}
      </Stack>
    </Box>
  );
};

export default SimilarExercises;
