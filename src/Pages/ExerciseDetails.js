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
  const [targetMuscleExercises , setTargetMuscleExercises] = useState([]);
  const [equipmentExercises , setEquipmentExercises] = useState([]);

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

      const targetMuscleExercisesData = await fetchdata(`${exerciseDBUrl}/exercises/target/${exerciseDetailData.target}` , ExerciseOptions);
      setTargetMuscleExercises(targetMuscleExercisesData);

      const equipmentExercisesData = await fetchdata(`${exerciseDBUrl}/exercises/equipment/${exerciseDetailData.equipment}` , ExerciseOptions);
      setEquipmentExercises(equipmentExercisesData);
    };
    fetchExercisesData();
  }, [id]);

  return (
    <Box>
      <Details exerciseDetails={exerciseDetails} />
      <ExerciseVideos exerciseVideos={exerciseVideos} name={exerciseDetails.name} />
      <SimilarExercises targetMuscleExercises = {targetMuscleExercises} 
        equipmentExercises = {equipmentExercises}
      />
    </Box>
  );
};

export default ExerciseDetails;
