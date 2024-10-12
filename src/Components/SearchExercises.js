import React, { useEffect, useState } from 'react';
import { Box, Button, Stack, TextField, Typography } from '@mui/material';
import { ExerciseOptions, fetchdata } from '../Utils/fetchdata';
import HorizontalScrollbar from './HorizontalScrollbar';

const SearchExercises = ({ setExercises, bodyPart, setBodyPart }) => {
  const [search, setSearch] = useState('');
  const [bodyParts, setBodyParts] = useState([]);
  const [debounceTimeout, setDebounceTimeout] = useState(null);

  // Fetch the categories when the Home page loads
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

  // Search for exercises based on query (name, target, equipment, or body part)
  const handleSearch = async (query) => {
    try {
      if (!query) {
        const allExercisesData = await fetchdata(
          'https://exercisedb.p.rapidapi.com/exercises',
          ExerciseOptions
        );
        setExercises(allExercisesData);
      } else if (query) {
        // Search for specific exercises by name or other criteria
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
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  // Fetch exercises by body part when a gym icon is selected
  const handleBodyPartClick = async (selectedBodyPart) => {
    try {
      const bodyPartData = await fetchdata(
        `https://exercisedb.p.rapidapi.com/exercises/bodyPart/${selectedBodyPart}`,
        ExerciseOptions
      );
      setExercises(bodyPartData);
    } catch (error) {
      console.error('Error fetching body part data:', error);
    }
  };

  // Debounce search function to reduce API calls
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

  // Fetch exercises based on the selected body part whenever `bodyPart` changes
  useEffect(() => {
    if (bodyPart && bodyPart !== 'all') {
      handleBodyPartClick(bodyPart.toLowerCase());
    }
  }, [bodyPart]);

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
          onChange={handleInputChange} // Only change search state, no automatic search
          placeholder="Search Exercises"
          type="text"
        />
        <Button
          className="search-btn"
          sx={{
            bgcolor: '#FF2625',
            color: 'white',
            textTransform: 'none',
            width: { lg: '175px', xs: '80px' },
            fontSize: { lg: '20px', xs: '14px' },
            height: '59px',
            position: 'absolute',
            right: '0',
            '&:hover': {
              bgcolor: 'white',
              color: '#FF2625',
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
        />
      </Box>
    </Stack>
  );
};

export default SearchExercises;
