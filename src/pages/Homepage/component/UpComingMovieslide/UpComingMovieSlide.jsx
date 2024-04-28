import React from 'react'
import { Alert } from 'bootstrap';
import { useUpComingMoviesQuery } from '../../../../hooks/upComingMovies';
import { responsive } from '../../../../constants/responsive';
import MovieSlider from '../../../../common/MovieSlider/MovieSlider';


const UpComingMovieSlide = () => {

    const { data, isLoading, isError, error} = useUpComingMoviesQuery();  

    if(isLoading){
        return <h1>Loading...</h1>
    }
    if(isError){
        return <Alert varient="danger">{error.message}</Alert>
    }

  return (
    <div>
      <MovieSlider title='UPCOMING MOVIES' movies={data.results} responsive={responsive}/>
    </div>
  )
}

export default UpComingMovieSlide
