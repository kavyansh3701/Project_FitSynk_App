import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Box } from '@mui/material';
import Details from '../Components/Details';
import ExerciseVideos from '../Components/ExerciseVideos'; 
import SimilarExercises from '../Components/SimilarExercises';
import { ExerciseOptions, fetchdata, youtubeoptions } from '../Utils/fetchdata';

const ExerciseDetails = () => {
  const [exerciseDetails, setExerciseDetails] = useState({});
  const [exerciseVideos, setExerciseVideos] = useState([]); 
  const { id } = useParams();
  console.log(id);
  
  useEffect(() => {
    const fetchExercisesData = async () => {
      const exerciseDBUrl = 'https://exercisedb.p.rapidapi.com';
      const youtubeSearchUrl = 'https://youtube-search-and-download.p.rapidapi.com';

      const exerciseDetailData = await fetchdata(`${exerciseDBUrl}/exercises/exercise/${id}`, ExerciseOptions);
      console.log({ exerciseDetailData });
      setExerciseDetails(exerciseDetailData);

      const exerciseVideosData = await fetchdata(
        `${youtubeSearchUrl}/search?query=${exerciseDetailData.name}`,
        youtubeoptions
      );
      setExerciseVideos(exerciseVideosData.contents);
    };

    fetchExercisesData();
  }, [id]);

  return (
    <Box>
      <Details exerciseDetails={exerciseDetails} />
      <ExerciseVideos exerciseVideos={exerciseVideos} name={exerciseDetails.name} />
      <SimilarExercises />
    </Box>
  );
};

export default ExerciseDetails;
