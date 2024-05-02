import React from 'react'
import { useParams } from 'react-router-dom';
import { useDetailMovieQuery } from '../../hooks/useDetailMovie';

const MovieDetail = () => {
  const {id: movieId} = useParams();
  console.log("movieId:", `${movieId}`)
  const { data, isLoading, isError, error} = useDetailMovieQuery({movieId});
  console.log("detail:", data)
  return (
    <div>
      MovieDetail
    </div>
  )
}

export default MovieDetail
