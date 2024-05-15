import React from 'react'
import { usePopularMoviesQuery } from '../../../../hooks/usePopularMovies'
import { Alert } from 'bootstrap';
import MovieSlider from '../../../../common/MovieSlider/MovieSlider';
import { responsive } from '../../../../constants/responsive';

const PopularMovieSlide = () => {

    const { data, isLoading, isError, error} = usePopularMoviesQuery();  

    if(isLoading){
        return <h1></h1>
    }
    
    if(isError){
        return <Alert varient="danger">{error.message}</Alert>
    }

  return (
    <div>
      <MovieSlider title='POPULAR MOVIES' movies={data.results} responsive={responsive}/>
    </div>
  )
}

export default PopularMovieSlide
