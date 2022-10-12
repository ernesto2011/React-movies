import { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import React from "react";
import NavBar from "./components/navBar/navBar";
import MainContent from "./components/mainContent/mainContent";
import MovieDetail from "./components/movieDetail/movieDetail";
import './App.css';

function App() {
  const [watchList, setWatchList] = useState([]);

  useEffect(() => {
    function getWatchListLocal(){
      if (localStorage.getItem('watchList') !== null) {
          setWatchList(JSON.parse(localStorage.getItem('watchList')));
      }
    }
    
    //getWatchListLocal();
    
}, []);


  
  return (
    <div className="App">
      <Router>
      <NavBar watchList={watchList} setWatchList={setWatchList} />
        <Routes>
          
          <Route path="/movie/:id" element={<MovieDetail />} />
          <Route path="/" element={<MainContent watchList={watchList} setWatchList={setWatchList} />} />      
        </Routes>
        
        
      </Router>
    </div>
  );
}

export default App;
