import React, { useEffect, useState, useRef, useCallback } from 'react';
import { Box, Button, Stack, TextField, Typography } from '@mui/material';
import { ExerciseOptions, fetchdata } from '../Utils/fetchdata';
import HorizontalScrollbar from './HorizontalScrollbar';

const SearchExercises = ({ setExercises, bodyPart, setBodyPart }) => {
  const [search, setSearch] = useState('');
  const [bodyParts, setBodyParts] = useState([]);
  const [debounceTimeout, setDebounceTimeout] = useState(null);
  const resultsRef = useRef(null);

  useEffect(() => {
    const fetchExercisesData = async () => {
      const bodyPartsData = await fetchdata(
        'https://exercisedb.p.rapidapi.com/exercises/bodyPartList',
        ExerciseOptions
      );
      setBodyParts(bodyPartsData);
    };

    fetchExercisesData();
  }, []);

  const handleSearch = async (query) => {
    try {
      if (!query) {
        const allExercisesData = await fetchdata(
          'https://exercisedb.p.rapidapi.com/exercises',
          ExerciseOptions
        );
        setExercises(allExercisesData);
      } else {
        const exercisesData = await fetchdata(
          `https://exercisedb.p.rapidapi.com/exercises/name/${query}`,
          ExerciseOptions
        );

        const searchedExercises = exercisesData.filter(
          (exercise) =>
            exercise.name.toLowerCase().includes(query) ||
            exercise.target.toLowerCase().includes(query) ||
            exercise.equipment.toLowerCase().includes(query) ||
            exercise.bodyPart.toLowerCase().includes(query)
        );

        setExercises(searchedExercises);

        if (resultsRef.current) {
          resultsRef.current.scrollIntoView({ behavior: 'smooth' });
        }
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const debounceSearch = (query) => {
    clearTimeout(debounceTimeout);
    const timeout = setTimeout(() => {
      handleSearch(query);
    }, 500);
    setDebounceTimeout(timeout);
  };

  const handleInputChange = (e) => {
    const query = e.target.value.toLowerCase();
    setSearch(query);
  };

  const handleSearchClick = () => {
    debounceSearch(search);
  };

  const handleBodyPartClick = useCallback(async (selectedBodyPart) => {
    try {
      const bodyPartData = await fetchdata(
        `https://exercisedb.p.rapidapi.com/exercises/bodyPart/${selectedBodyPart}`,
        ExerciseOptions
      );
      setExercises(bodyPartData);

      if (resultsRef.current) {
        resultsRef.current.scrollIntoView({ behavior: 'smooth' });
      }
    } catch (error) {
      console.error('Error fetching body part data:', error);
    }
  }, [setExercises]);
  
  useEffect(() => {
    if (bodyPart && bodyPart !== 'all') {
      handleBodyPartClick(bodyPart.toLowerCase());
    }
  }, [bodyPart, handleBodyPartClick]);

  return (
    <Stack alignItems="center" mt="37px" justifyContent="center" padding="20px">
      <Typography fontSize="35px" fontWeight={700} sx={{ fontSize: { lg: '44px', xs: '30px' } }} mb="50px" textAlign="center">
        Awesome Exercises You <br /> Should Know
      </Typography>

      <Box position={'relative'} mb="72px">
        <TextField
          sx={{
            input: {
              fontWeight: '700',
              border: 'none',
              borderRadius: '4px',
            },
            width: { lg: '800px', xs: '350px' },
            backgroundColor: '#fff',
            borderRadius: '40px',
          }}
          height="76px"
          value={search}
          onChange={handleInputChange}
          placeholder="Search Exercises"
          type="text"
        />
        <Button
          className="search-btn"
          sx={{
            bgcolor: '#008080',
            color: 'white',
            textTransform: 'none',
            width: { lg: '175px', xs: '80px' },
            fontSize: { lg: '20px', xs: '14px' },
            height: '59px',
            position: 'absolute',
            right: '0',
            '&:hover': {
              bgcolor: 'white !important',
              color: '#008080 !important',
              border: '2px solid #008080 !important',
            },
          }}
          onClick={handleSearchClick}
        >
          Search
        </Button>
      </Box>

      <Box sx={{ position: 'relative', width: '100%', p: '20px' }}>
        <HorizontalScrollbar
          data={bodyParts}
          bodyPart={bodyPart}
          setBodyPart={setBodyPart}
          isBodyParts
        />
      </Box>

      <Box ref={resultsRef} sx={{ width: '100%', mt: '20px' }}></Box>
    </Stack>
  );
};

export default SearchExercises;
