import React from 'react'
import { usePopularMoviesQuery } from '../../../../hooks/usePopularMovies'
import Alert from 'react-bootstrap/Alert';
import './Banner.css'
import MovieVideo from '../../../../common/MovieVideo/MovieVideo';
import MovieModal from '../../../../common/Modal/MovieModal';
import { useMovieVideosQuery } from '../../../../hooks/useMovieVideos';

const Banner = () => {
  const { data, isLoading, isError, error } = usePopularMoviesQuery();
  const movieId = data?.results[0]?.id;
  console.log("movie", movieId)
  const {
    data:videoData,
    isLoading: isVideoLoading,
    isError: isVideoError,
    error: videoError
  } = useMovieVideosQuery({movieId});

  if(isLoading){
    return (
      <h1>Loading...</h1>
    )
  }
  if(isError){
    return(
      <Alert variant='danger'>{error.message}</Alert>
    )
  }

  return (
    <div 
      style={{
        backgroundImage: 
          "url(" +
          `https://media.themoviedb.org/t/p/w1920_and_h800_bestv2${data?.results[0].backdrop_path}` + ")"
      }}
      className='banner'  
    >
      <div className="text-white banner-text-area">
        <div className="banner-title">
          <h1>{data?.results[0].title}</h1>
          <MovieModal className='movie-video-btn' video={videoData}></MovieModal>
        </div>
        <p>{data?.results[0].overview}</p>
      </div>
    </div>
  )
}

export default Banner
