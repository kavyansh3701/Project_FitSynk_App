import React from 'react';
import { Box, Stack, Typography } from '@mui/material';

const ExerciseVideos = ({ exerciseVideos = [], name }) => {
  console.log(exerciseVideos); 

  if (!Array.isArray(exerciseVideos) || !exerciseVideos.length) return 'Loading...';

  return (
    <Box sx={{ marginTop: { lg: '200px', xs: '20px' }, p: '20px' }}>
      {/* Main Title */}
      <Typography 
        variant="h4" 
        mb="63px" 
        textAlign="center" 
        sx={{ fontWeight: 'bold', fontSize: { xs: '24px', lg: '32px' }, color: '#333' }}
      >
        Watch{' '}
        <span style={{ color: 'teal', textTransform: 'capitalize', fontSize: '1.2em', fontWeight: 'bold' }}>
          {name}
        </span>{' '}
        exercise videos
      </Typography>

      {/* Subtitle */}
      <Typography
        variant="body1"
        color="textSecondary"
        textAlign="center"
        mb="60px"
        sx={{ 
          transition: 'color 0.3s', 
          '&:hover': { color: 'teal' }, 
          fontSize: { xs: '14px', lg: '18px' } 
        }}
      >
        Find the best ways to perform{' '}
        <span style={{ fontStyle: 'italic', textTransform: 'capitalize' }}>{name}</span> and enhance your workout
        routine.
      </Typography>

      {/* Video Thumbnails */}
      <Stack
        justifyContent="center"
        flexWrap="wrap"
        alignItems="center"
        sx={{
          flexDirection: { lg: 'row', xs: 'column' },
          gap: { lg: '80px', xs: '20px' },
        }}
      >
        {exerciseVideos?.slice(0, 6).map((item, index) => (
          <a
            key={index}
            className="exercise-video"
            href={`https://www.youtube.com/watch?v=${item.video.videoId}`}
            target="_blank"
            rel="noreferrer"
            style={{ textDecoration: 'none' }}
          >
            <Box
              sx={{
                width: { lg: '360px', xs: '300px' },
                mb: '20px',
                borderRadius: '15px',
                overflow: 'hidden',
                boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)',
                transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                '&:hover': {
                  transform: 'scale(1.05)',
                  boxShadow: '0 6px 15px rgba(0, 0, 0, 0.2)',
                },
              }}
            >
              
              <img 
                src={item.video.thumbnails[0].url} 
                alt={item.video.title} 
                style={{ width: '100%', borderRadius: '15px 15px 0 0' }}
              />
              <Box p="10px" sx={{ backgroundColor: '#fafafa' }}>
                <Typography variant="h6" sx={{ fontWeight: '600', color: '#333' }}>
                  {item.video.title}
                </Typography>

                <Typography variant="subtitle1" sx={{ fontWeight: '400', color: '#555' }}>
                  {item.video.channelName}
                </Typography>
              </Box>
            </Box>
          </a>
        ))}
      </Stack>
    </Box>
  );
};

export default ExerciseVideos;
