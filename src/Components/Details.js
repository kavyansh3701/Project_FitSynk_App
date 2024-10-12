import React from 'react';
import { Typography, Stack, Button } from '@mui/material';
import BodypartImage from '../assets/icons/body-part.png';
import TargetImage from '../assets/icons/target.png';
import EquipmentImage from '../assets/icons/equipment.png';

const Details = ({ exerciseDetails }) => {
  const { bodyPart, gifUrl, name, target, equipment } = exerciseDetails;

  const extraDetail = [
    {
      id: 'bodyPart', // Add a unique ID
      icon: BodypartImage,
      name: bodyPart,
    },
    {
      id: 'target', // Add a unique ID
      icon: TargetImage,
      name: target,
    },
    {
      id: 'equipment', // Add a unique ID
      icon: EquipmentImage,
      name: equipment,
    }
  ];
  
  return (
    <Stack
      gap="60px"
      sx={{
        flexDirection: { lg: 'row' },
        p: '20px',
        alignItems: 'center',
        justifyContent: 'space-between', 
      }}
    >
      <img
        src={gifUrl}
        alt={name}
        loading="lazy"
        className="detail-image"
        style={{ maxWidth: '550px', height: 'auto' }} 
      />

      {/* Exercise Details */}
      <Stack spacing={2}>
        <Typography variant="h4" fontWeight="bold" textTransform="capitalize">
          {name}
        </Typography>
        <Typography variant="body1">
          Exercises keep you strong. <strong>{name}</strong> is one of the best exercises to target your <strong>{target}</strong>. 
          It will help you improve your mood and gain energy.
        </Typography>

        {extraDetail.map((item) => (
          <Stack key={item.id} direction="row" gap="24px" alignItems="center">
            <Button sx={{ background: '#fff2db', borderRadius: '50%', width: '100px', height: '100px' }}>
              <img src={item.icon} alt={item.name} />
            </Button>
            <Typography variant="h5" textTransform="capitalize">
              {item.name}
            </Typography>
          </Stack>
        ))}
      </Stack>
    </Stack>
  );
};

export default Details;
