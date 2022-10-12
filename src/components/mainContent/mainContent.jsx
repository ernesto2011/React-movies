import React, {useState, useEffect} from 'react';
import MovieSlider from '../movieSlider/movieSlider';
import MovieCover from '../movieCover/movieCover';
import MovieCatalogue from '../movieCatalogue/movieCatalogue';

import { baseUrl, API_KEY } from '../../api/config';

function MainContent ({watchList, setWatchList}){
    const [movies, setMovies] = useState([]);
  
  
    useEffect(() => {
      fetchMovies();
    }, []);
  
    const fetchMovies = async () => {
      const response = await fetch(`${baseUrl}movie/top_rated?api_key=${API_KEY}`);
      const data = await response.json();
      setMovies(data.results);
    }
  
    return (
      <div>
        <MovieCover watchList={watchList} setWatchList={setWatchList} />
        <MovieSlider movies={movies} title="top rated" />
        <MovieCatalogue watchList={watchList} setWatchList={setWatchList} />

      </div>
    );
}

export default MainContent
