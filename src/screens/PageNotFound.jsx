import React, { useState, useEffect } from 'react';
import errorPhoto from '../components/Universal/Error.png';
import './PageNotFound.css'; 

const PageNotFound = () => {
  const [isBouncing, setIsBouncing] = useState(false);
  const [isFadingIn, setIsFadingIn] = useState(false);

  const handleClick = () => {
    setIsBouncing(true);
    setTimeout(() => {
      setIsFadingIn(true);
      setTimeout(() => {
        setIsBouncing(false);
        setIsFadingIn(false);
      }, 2000); 
    }, 9000); 
  };

  return (
    <div className='row'>
      <div className='col-3'></div>
      <div className='col-6'>
        <h1 className='mx-auto text-center mt-100'>404 - Page Not Found</h1>
        <img
          src={errorPhoto}
          alt='404 Error'
          className={`error-photo ${isBouncing ? 'bounce' : ''} ${isFadingIn ? 'fade-in' : ''}`}
          onClick={handleClick}
        />
      </div>
    </div>
  );
};

export default PageNotFound;
