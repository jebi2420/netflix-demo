import React from 'react'
import { usePopularMoviesQuery } from '../../../../hooks/usePopularMovies'
import Alert from 'react-bootstrap/Alert';
import './Banner.css'
import MovieModal from '../../../../common/Modal/MovieModal';
import { useMovieVideosQuery } from '../../../../hooks/useMovieVideos';
import { useNavigate } from 'react-router-dom'

const Banner = () => {
  const navigate = useNavigate();
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

  const goToDetail = (id) => {
    // 현재 경로 확인
    const currentPath = window.location.pathname;
    //목표 경로 생성
    const targetPath = `/movies/${id}`;

    // 현재 경로와 목표 경로가 다를 경우에만 navigate 실행
    if(currentPath !== targetPath){
      navigate(targetPath);
    }
  }

  return (
    <div 
      style={{
        backgroundImage: 
          "url(" +
          `https://media.themoviedb.org/t/p/w1920_and_h800_bestv2${data?.results[0].backdrop_path}` + ")"
      }}
      className='banner'  
      onClick={() => goToDetail(movieId)}
    >
      <div className="text-white banner-text-area">
        <div className="banner-title">
          <h1>{data?.results[0].title}</h1>
          <MovieModal video={videoData}></MovieModal>
        </div>
        <p>{data?.results[0].overview}</p>
      </div>
    </div>
  )
}

export default Banner
