import React, { useState, useEffect } from 'react';
import Pagination from '@mui/material/Pagination';
import { Box, dividerClasses, Stack, Typography } from '@mui/material';

import ExerciseCard from './ExerciseCard';
import { fetchdata, ExerciseOptions } from '../Utils/fetchdata';  // Import ExerciseOptions

const Exercises = ({ exercises, setExercises, bodyPart }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const exercisesPerPage = 3;

  const indexOfLastExercise = currentPage * exercisesPerPage;
  const indexOfFirstExercise = indexOfLastExercise - exercisesPerPage;

  const currentExercises = exercises.slice(indexOfFirstExercise, indexOfLastExercise);
  console.log(currentExercises);
  

  // Paginate function
  const paginate = (event, value) => {
    setCurrentPage(value);
    window.scrollTo({ top: 1800, behavior: 'smooth' });
  };
  if (!currentExercises.length) return <div>Loading..</div>
  return (
    <Box
      id="exercises"
      sx={{ mt: { lg: '110px', xs: '50px' }, p: '20px' }}
    >
      <Typography variant="h3" mb="56px" sx={{ textAlign: 'left' }}>
        Showing Results
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

      {/* Pagination */}
      <Stack mt="100px" alignItems="center">
        {exercises.length > exercisesPerPage && (
          <Pagination
            color="standard"
            shape="rounded"
            defaultPage={1}
            count={Math.ceil(exercises.length / exercisesPerPage)}
            page={currentPage}
            onChange={paginate}
            size="large"
          />
        )}
      </Stack>
    </Box>
  );
};

export default Exercises;
