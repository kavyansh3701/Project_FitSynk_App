import React, { useState, useEffect } from 'react';
import { Box, Stack, Typography, Pagination } from '@mui/material';
import Loader from './Loader'; 
import ExerciseCard from './ExerciseCard'; 

const SimilarExercises = ({ targetMuscleExercises, equipmentExercises }) => {  // Adding both props
  const [currentPageMuscle, setCurrentPageMuscle] = useState(1);
  const [currentPageEquipment, setCurrentPageEquipment] = useState(1);
  const exercisesPerPage = 3; 
  const [loading, setLoading] = useState(true); 

  useEffect(() => {
    if (targetMuscleExercises.length || equipmentExercises.length) {  // Check for both datasets
      setLoading(false); 
    }
  }, [targetMuscleExercises, equipmentExercises]);

  // Calculate indices for both muscle and equipment pagination
  const indexOfLastMuscleExercise = currentPageMuscle * exercisesPerPage;
  const indexOfFirstMuscleExercise = indexOfLastMuscleExercise - exercisesPerPage;
  const currentMuscleExercises = targetMuscleExercises.slice(indexOfFirstMuscleExercise, indexOfLastMuscleExercise);

  const indexOfLastEquipmentExercise = currentPageEquipment * exercisesPerPage;
  const indexOfFirstEquipmentExercise = indexOfLastEquipmentExercise - exercisesPerPage;
  const currentEquipmentExercises = equipmentExercises.slice(indexOfFirstEquipmentExercise, indexOfLastEquipmentExercise);

  // Handle pagination for muscle group
  const paginateMuscle = (event, value) => {
    setCurrentPageMuscle(value);
    if (value === 1) {
      window.scrollTo({ top: 1800, behavior: 'smooth' }); 
    }
  };

  // Handle pagination for equipment
  const paginateEquipment = (event, value) => {
    setCurrentPageEquipment(value);
    if (value === 1) {
      window.scrollTo({ top: 2400, behavior: 'smooth' }); 
    }
  };

  return (
    <Box sx={{ mt: { lg: '100px', xs: '0' } }}>
      {/* Section for Muscle Group */}
      <Typography variant="h4" mb={6} textAlign="center" sx={{ fontWeight: 'bold', fontSize: { xs: '24px', lg: '42px' }, color: '#333' }}>
        Exercises that Target{' '}
        the same <span style={{ color: 'teal', fontSize:'1.2em' }}>Muscle</span>{' '}
        group
      </Typography>

      {loading ? (
        <Loader />
      ) : (
        <>
          <Stack
            direction="row"
            sx={{ gap: { lg: '110px', xs: '50px' } }} 
            flexWrap="wrap" 
            justifyContent="center"
          >
            {currentMuscleExercises.length > 0 ? (
              currentMuscleExercises.map((exercise) => (
                <ExerciseCard key={exercise.id} exercise={exercise} />
              ))
            ) : (
              <Typography variant="h6" sx={{ textAlign: 'left' }}>
                No Exercises Found
              </Typography>
            )}
          </Stack>
          
          {/* Pagination for Muscle Group */}
          <Stack mt="50px" alignItems="center">
            {targetMuscleExercises.length > exercisesPerPage && (
              <Pagination
                color="standard"
                shape="rounded"
                defaultPage={1}
                count={Math.ceil(targetMuscleExercises.length / exercisesPerPage)} 
                page={currentPageMuscle} 
                onChange={paginateMuscle} 
                size="large"
              />
            )}
          </Stack>

          {/* Section for Equipment */}
          <Typography variant="h4" mt={8} mb={6} textAlign="center" sx={{ fontWeight: 'bold', fontSize: { xs: '24px', lg: '42px' }, color: '#333' }}>
            Exercises that Target{' '}
            the same <span style={{ color: 'teal', fontSize:'1.2em' }}>Equipment</span>{' '}
            Type
          </Typography>

          <Stack
            direction="row"
            sx={{ gap: { lg: '110px', xs: '50px' } }} 
            flexWrap="wrap" 
            justifyContent="center"
          >
            {currentEquipmentExercises.length > 0 ? (
              currentEquipmentExercises.map((exercise) => (
                <ExerciseCard key={exercise.id} exercise={exercise} />
              ))
            ) : (
              <Typography variant="h6" sx={{ textAlign: 'left' }}>
                No Exercises Found
              </Typography>
            )}
          </Stack>

          {/* Pagination for Equipment */}
          <Stack mt="50px" alignItems="center">
            {equipmentExercises.length > exercisesPerPage && (
              <Pagination
                color="standard"
                shape="rounded"
                defaultPage={1}
                count={Math.ceil(equipmentExercises.length / exercisesPerPage)} 
                page={currentPageEquipment} 
                onChange={paginateEquipment} 
                size="large"
              />
            )}
          </Stack>
        </>
      )}
    </Box>
  );
};

export default SimilarExercises;
