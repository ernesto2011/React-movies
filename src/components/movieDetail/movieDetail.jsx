import React, {useState,useEffect} from 'react'
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar'
import { Link, useParams } from 'react-router-dom'
import MovieSlider from '../movieSlider/movieSlider'
import Loader from '../loader/loader'
import 'font-awesome/css/font-awesome.min.css';
import './movieDetail.css';


const MovieDetail= () =>{
    
    
    
    const [movie, setMovie] = useState({
        genres: [],
    });
    const [movieTrailer, setMovieTrailer] = useState({});
    const [movieVideos, setMovieVideos] = useState([]);
    const [actors, setActors] = useState([]);
    const [similarMovies, setSimilarMovies] = useState([]);
    const [url, setUrl] = useState("");
    const [loader, setLoader] = useState(false);

    const API_KEY = 'b4aeb6a70689e5caaf1a4ec1428f7ac0';
    const { id } = useParams();


    useEffect(() => {
        
        fetchMovies();
        fetchMovieTrailer();
        fetchActors();
        fetchSimilarMovies();

    
        setLoader(true);
        setTimeout( () => {
            setLoader(false);
        }, 1000);

    }, []);

    
    const fetchMovies= async () => {
        const response = await fetch(`https://api.themoviedb.org/3/movie/${id}?api_key=${API_KEY}`);
        const data = await response.json();

        setMovie(data);
    }

    const fetchMovieTrailer = async() =>{
        const response = await fetch(`https://api.themoviedb.org/3/movie/${id}/videos?api_key=${API_KEY}`);
        const data = await response.json();

        const trailer = data.results.filter((video) => {
            return video.type === "Trailer"
        });

        setMovieVideos(data.results);
        setUrl(data.results[0].key);
        setMovieTrailer(trailer[0]);
    }

    const fetchActors = async () => {
        const response = await fetch(`https://api.themoviedb.org/3/movie/${id}/credits?api_key=${API_KEY}`);
        const data = await response.json();


        setActors(data.cast.slice(0, 6));
    }

    const fetchSimilarMovies = async () => {
        const response = await fetch(`https://api.themoviedb.org/3/movie/${id}/similar?api_key=${API_KEY}`);
        const data = await response.json();

        setSimilarMovies(data.results);
    }

    
    return (
        <>
            {
                loader ?
                    <Loader/>
                    :
                    <div className="movie-detail">
                        <div className="movie-detail-cover" style={{ backgroundImage: `linear-gradient(to right, #29323c 0%, #4855638c 100%), url(http://image.tmdb.org/t/p/original/${movie.backdrop_path})` }}>
                            <Link to="/" className="goback">
                                <div >
                                    <i className="fa fa-arrow-left"></i>
                                </div>
                            </Link>
                            <div className="detail">

                                <span className="title">{movie.title}</span>
                                <span className="original-title">{movie.title === movie.original_title ? "" : movie.original_title}</span>
                                <div className="line"></div>
                                <span className="budget">
                                    <i className="fa fa-dollar icon"></i>
                                    {movie.budget === 0 ? "Unknown" : movie.budget}
                                </span>
                                <span className="genres">
                                    <i className="fa fa-heart icon"></i>
                                    {
                                        movie.genres.map(genre => (
                                            <span key={genre.id} className="genre">{genre.name}</span>
                                        ))
                                    }
                                </span>
                                <span className="release_date">{movie.release_date}</span>
                                <span className="overview">{movie.overview}</span>
                            </div>

                            <CircularProgressbar
                                className="circuralBar"
                                minValue="0"
                                maxValue="10"
                                value={movie.vote_average}
                                text={movie.vote_average === 0 ? "0" : movie.vote_average}
                                styles={buildStyles({
                                    strokeLinecap: 'round',
                                    textSize: '30px',
                                    pathColor: 'white',
                                    textColor: 'white',
                                    trailColor: '#485563',
                                })}
                            />


                            <svg className="triangle" width='100%' height="150px" viewBox="0 0 100 100" preserveAspectRatio="none" fill="#485563" >
                                <polygon points="100,0 0,100 100,100" />
                            </svg>

                            <iframe className="teaser" width="720" height="400" src={`https://www.youtube.com/embed/${movieTrailer.key}`} title={movieTrailer.title} frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen="allowfullscreen"></iframe>

                        </div>

                        <div className="actors-container">
                            <h1>Actors</h1>
                            <div className="actors">
                                {
                                    actors.map(actor => (
                                        <div key={actor.id} className="actor">
                                            <img src={`http://image.tmdb.org/t/p/w185/${actor.profile_path}`} alt={movie.title} />
                                            <div>
                                                <div className="actor-detail">
                                                    <span>Original Name</span>
                                                    <p>{actor.original_name}</p>
                                                </div>
                                                <div className="actor-detail">
                                                    <span>Character Name</span>
                                                    <p>{actor.character}</p>
                                                </div>
                                                <div className="actor-detail">
                                                    <span>Popularity</span>
                                                    <p>{actor.popularity}</p>
                                                </div>
                                            </div>
                                        </div>
                                    ))
                                }
                            </div>
                        </div>

                        <MovieSlider movies={similarMovies} title="Similar Movies" />
                    </div >       
            }
        </>
    );
}

export default MovieDetail