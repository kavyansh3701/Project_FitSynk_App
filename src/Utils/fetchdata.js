export const ExerciseOptions = {
  method: 'GET',
  headers: {
    'x-rapidapi-key': process.env.REACT_APP_RAPID_KEY, 
    'x-rapidapi-host': 'exercisedb.p.rapidapi.com',
  },
};

export const youtubeoptions = {
  method: 'GET',
  headers: {
    'x-rapidapi-key': process.env.REACT_APP_RAPID_KEY,
    'x-rapidapi-host': 'youtube-search-and-download.p.rapidapi.com'
  }
};

export const fetchdata = async (url, options) => {
  try {
    console.log('Fetching URL:', url);

    const response = await fetch(url, options);
    
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    return await response.json(); 
  } catch (error) {
    console.error('Error fetching data:', error);
    throw error;  
  }
};
