import React, { useRef, useEffect, useState } from 'react';
import { Box, Typography } from '@mui/material';
import { ScrollMenu } from 'react-horizontal-scrolling-menu';
import Bodypart from './Bodypart';
import ExerciseCard from './ExerciseCard'
import 'react-horizontal-scrolling-menu/dist/styles.css';

// Left Arrow Component
const Left = ({ onPrev }) => {
  return (
    <Typography onClick={onPrev}>
      <img src={Left} alt="Left Arrow" />
    </Typography>
  );
};

// Right Arrow Component
const Right = ({ onNext }) => {
  return (
    <Typography onClick={onNext}>
      <img src={Right} alt="Right Arrow" />
    </Typography>
  );
};

// SlideTrackSlider with continuous autoplay and left/right scroll
const SlideTrackSlider = ({ data, bodyPart, setBodyPart }) => {
  const scrollContainerRef = useRef(null);
  const intervalRef = useRef(null);
  const scrollSpeed = 2.5; 
  const intervalTime = 20; 
  const [isScrolling, setIsScrolling] = useState(true);
  const [scrollDirection, setScrollDirection] = useState('right'); 
  const [selectedItem, setSelectedItem] = useState(null);

  useEffect(() => {
    if (!scrollContainerRef.current) return;

    const scroll = () => {
      if (!scrollContainerRef.current) return;

      const maxScrollLeft = scrollContainerRef.current.scrollWidth - scrollContainerRef.current.clientWidth;
      if (scrollDirection === 'right') {
        if (scrollContainerRef.current.scrollLeft < maxScrollLeft) {
          scrollContainerRef.current.scrollLeft += scrollSpeed;
        } else {
          setScrollDirection('left'); 
        }
      } else if (scrollDirection === 'left') {
        if (scrollContainerRef.current.scrollLeft > 0) {
          scrollContainerRef.current.scrollLeft -= scrollSpeed;
        } else {
          setScrollDirection('right'); 
        }
      }
    };

    if (isScrolling) {
      intervalRef.current = setInterval(scroll, intervalTime);
    }

    // Cleanup function
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current); 
      }
    };
  }, [isScrolling, scrollDirection]);

  // Stop scrolling when the user clicks anywhere on the page
  useEffect(() => {
    const handleScreenClick = () => {
      setIsScrolling(false); 
    };
    
    document.addEventListener('click', handleScreenClick);

    return () => {
      // Cleanup the event listener when the component unmounts
      document.removeEventListener('click', handleScreenClick);
    };
  }, []);

  // Function to handle stopping the scrolling when a gym icon is clicked
  const handleIconClick = (item) => {
    setIsScrolling(false); 
    setBodyPart(item);
    setSelectedItem(item);
  };

  return (
    <div ref={scrollContainerRef} style={{ overflowX: 'auto', whiteSpace: 'nowrap' }}>
      <ScrollMenu
        Left={<Left onPrev={() => setScrollDirection('left')} />} 
        Right={<Right onNext={() => setScrollDirection('right')} />} 
      >
        {data.map((item) => (
          <Box
            key={item.id || item}
            itemID={item.id || item}
            title={item.id || item}
            m="0 40px"
            sx={{
              display: 'inline-block',
              borderTop: selectedItem === item ? '4px solid red' : 'none',
              transition: 'transform 0.2s ease', 
              '&:hover': {
                transform: 'scale(1.2)', 
              },
            }}
            onClick={() => {
              setIsScrolling(false); 
              setBodyPart(item);
              // console.log(item);
            
              window.scrollTo({ top: 1800, left: 100, behavior: 'smooth' });
            }}
          >
            <Bodypart item={item} bodypart={bodyPart} setBodyPart={setBodyPart} />
          </Box>
        ))}
      </ScrollMenu>
    </div>
  );
};

// Main HorizontalScrollbar component
const HorizontalScrollbar = ({ data, bodyPart, isBodyParts, setBodyPart = () => {} }) => {
  return (
    <Box sx={{ display: 'flex', overflowX: 'auto' }}>
      {isBodyParts ? (
        <SlideTrackSlider data={data} bodyPart={bodyPart} setBodyPart={setBodyPart} />
      ) : (
        data.map((exercise, index) => (
          <ExerciseCard key={index} exercise={exercise} />
        ))
      )}
    </Box>
  );
};


export default HorizontalScrollbar;
