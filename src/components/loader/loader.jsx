import React from 'react';
import './loader.css';

function Loader() {
    return (
        <div className="loader">
            <div className="lds-roller"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>
        </div>
    )
}

export default Loader