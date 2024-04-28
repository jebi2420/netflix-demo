import React from 'react'
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import './MovieSlider.css'
import MovieCard from '../MovieCard/MovieCard';


const MovieSlider = ({title, movies, responsive}) => {
  return (
    <div>
        <h3>{title}</h3>
        <Carousel
            infinite={true} // 무한반복 여부
            centerMode={true} // 가운데 놓을거냐
            itemClass="movie-slider p-1" // slide item class
            containerClass="carousel-container" 
            responsive={responsive} // responsive 설정을 해야 화면에 따른 크기 설정 가능
            >
            {movies.map((movie,index)=><MovieCard movie={movie} key={index}/>)}
        </Carousel>;     
    </div>
  )
}

export default MovieSlider
