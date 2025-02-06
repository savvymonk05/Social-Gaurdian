import React from 'react';
import bannerImage from '../assets/banner.png';

function Banner() {
  return (
    <div 
      className='h-[20vh] md:h-[80vh] bg-cover bg-center flex items-end'
      style={{ backgroundImage: `url(${bannerImage})` }}
    >
      
      </div>
    
  );
}

export default Banner;
