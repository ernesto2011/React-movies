import React,{useState} from 'react'
import WatchlistItem from '../watchListItem/watchlistItem'
import 'font-awesome/css/font-awesome.min.css';
import './navBar.css'

const NavBar = ({watchList, setWatchList}) => {
  const [height,setHeight] = useState(0);

  function toggleHeight(){
      if(height === 0)
          setHeight(400);
      else
          setHeight(0);
  }

      return(
        <div className="nav">

            <div className="main-nav">
                <div className="nav-logo">
                    <i className="fa fa-film"></i>
                    
                </div>
                <ul>
                    <li className="watch-list">
                        <i onClick={toggleHeight} className="fa fa-tv"></i>
                        {watchList.length === 0 ? 
                            "" 
                            :
                            <span className="watch-list-length">{watchList.length}</span>
                        }
                        <WatchlistItem watchList={watchList} setWatchList={setWatchList} height={height}/>
                    </li>
                </ul>
            </div>

            <div className="sub-nav">
                <p>MOVIE WORLD</p>
            </div>
            
        </div>
    );
}

export default NavBar