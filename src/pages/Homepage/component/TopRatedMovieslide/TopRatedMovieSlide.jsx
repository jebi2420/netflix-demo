import React from 'react'
import { Alert } from 'bootstrap';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import MovieCard from '../MovieCard/MovieCard';
import { useTopRatedMoviesQuery } from '../../../../hooks/topRatedMovies';
import './TopRatedMovieSlide.css';

const responsive = {
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 6
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 2
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1
    }
  };

const TopRatedMovieSlide = () => {

    const { data, isLoading, isError, error} = useTopRatedMoviesQuery();  
    console.log("topdata : ", data)

    if(isLoading){
        return <h1>Loading...</h1>
    }
    if(isError){
        return <Alert varient="danger">{error.message}</Alert>
    }

  return (
    <div>
      <h3>Top Rated Movies</h3>
      <Carousel
        infinite={true} // 무한반복 여부
        centerMode={true} // 가운데 놓을거냐
        itemClass="movie-slider p-1" // slide item class
        containerClass="carousel-container" 
        responsive={responsive} // responsive 설정을 해야 화면에 따른 크기 설정 가능
        >
        {data.results.map((movie,index)=><MovieCard movie={movie} key={index}/>)}
    </Carousel>;
    </div>
  )
}

export default TopRatedMovieSlide
