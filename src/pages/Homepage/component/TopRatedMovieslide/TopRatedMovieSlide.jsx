import React from 'react'
import { Alert } from 'bootstrap';
import { useTopRatedMoviesQuery } from '../../../../hooks/topRatedMovies';
import MovieSlider from '../../../../common/MovieSlider/MovieSlider';
import { responsive } from '../../../../constants/responsive';



const TopRatedMovieSlide = () => {

    const { data, isLoading, isError, error} = useTopRatedMoviesQuery();  

    if(isLoading){
        return <h1></h1>
    }
    if(isError){
        return <Alert varient="danger">{error.message}</Alert>
    }

  return (
    <div>
      <MovieSlider title='TOP RATED MOVIES' movies={data.results} responsive={responsive}/>
    </div>
  )
}

export default TopRatedMovieSlide
