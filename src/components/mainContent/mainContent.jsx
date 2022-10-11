import React, {useState, useEffect} from 'react';
import MovieSlider from '../movieSlider/movieSlider';
import MovieCover from '../movieCover/movieCover';
import MovieCatalogue from '../movieCatalogue/movieCatalogue';

function MainContent ({watchList, setWatchList}){
    const [movies, setMovies] = useState([]);
    const API_KEY = 'b4aeb6a70689e5caaf1a4ec1428f7ac0';
  
  
    useEffect(() => {
      fetchMovies();
    }, []);
  
    const fetchMovies = async () => {
      const response = await fetch(`https://api.themoviedb.org/3/movie/top_rated?api_key=${API_KEY}`);
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
