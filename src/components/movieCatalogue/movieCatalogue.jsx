import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import Form from "../form/form";
import Paginate from "react-paginate";
import WatchListBtn from "../watchListBtn/watchListBtn";
import 'font-awesome/css/font-awesome.min.css';
import './movieCatalogue.css';
import { baseUrl, API_KEY } from '../../api/config';

function MovieCatalogue({ watchList, setWatchList }) {
  const [movies, setMovies] = useState([]);
  const [page, setPage] = useState(1);
  const [year, setYear] = useState(null);
  const [allPages, setAllPAges] = useState(20);
  const [category, setCategory] = useState("");
  const isMounted = useRef(false);


  useEffect(() => {
    fetchMovies();
  }, [page, year]);

  

  useEffect(() => {
    
    if (isMounted.current) {
      //fetchMoviesByCategory();
      const fetchMoviesByCategory = async () =>{
        const response = await fetch(
          `${baseUrl}movie/${category}?api_key=${API_KEY}&page=${page}`
        );
        const data = await response.json();
    
        setMovies(data.results);
        setAllPAges(data.total_pages);
      };
      
    } else {
      isMounted.current = true;
    }
  }, [category]);

  const fetchMovies= async () =>{
    const response = await fetch(
      `${baseUrl}discover/movie?api_key=${API_KEY}&page=${page}&primary_release_year=${year}`
    );
    const data = await response.json();
    setMovies(data.results);
    setAllPAges(data.total_pages);
  }

  

  

  const handlePageChange = (page) =>{
    setPage(page.selected + 1);
  }

  return (
    <div className="catalogue">
      <Form setYear={setYear} setCategory={setCategory} />
      <div className="catalogue-list">
        {movies.map(movie => (
          <div key={movie.id} className="catalogue-item">
            <img
              src={`http://image.tmdb.org/t/p/w200/${movie.poster_path}`}
              alt={movie.title}
            />
            <div className="catalogue-item-detail">
              <span className="title">{movie.title}</span>
              <span className="overview">
                {movie.overview.substring(0, 100)}
              </span>
              <Link to={`/movie/${movie.id}`}>
                <button>Watch now</button>
              </Link>
            </div>
            <div className="heart">
              <WatchListBtn
                watchList={watchList}
                setWatchList={setWatchList}
                movie={movie}
              />
            </div>
          </div>
        ))}
      </div>

      <Paginate
        pageCount={allPages}
        initialPage={0}
        marginPagesDisplayed={1}
        pageRangeDisplayed={3}
        previousLabel={<i className="fa fa-angle-left"></i>}
        nextLabel={<i className="fa fa-angle-right"></i>}
        containerClassName={"paginate-container"}
        pageClassName={"paginate-item"}
        activeClassName={"paginate-active-item"}
        previousClassName={"paginate-previous"}
        nextClassName={"paginate-next"}
        disabledClassName={"paginate-disabled"}
        breakClassName={"paginate-break"}
        onPageChange={handlePageChange}
      />
    </div>
  );
}

export default MovieCatalogue;
