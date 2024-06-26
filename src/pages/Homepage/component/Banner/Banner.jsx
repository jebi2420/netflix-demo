import React from 'react'
import { usePopularMoviesQuery } from '../../../../hooks/usePopularMovies'
import Alert from 'react-bootstrap/Alert';
import './Banner.css'
import MovieModal from '../../../../common/Modal/MovieModal';
import { useMovieVideosQuery } from '../../../../hooks/useMovieVideos';
import { useNavigate } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFire } from '@fortawesome/free-solid-svg-icons';
import { useEffect, useState } from 'react';
import LoadingSpinner from '../../../../common/Spinner/Spinner';

const Banner = () => {
  const navigate = useNavigate();
  const { data, isLoading, isError, error } = usePopularMoviesQuery();
  const movieId = data?.results[0]?.id;
  const [backgroundImage, setBackgroundImage] = useState('');

  useEffect(() => {
    const mediaQuery = window.matchMedia('(max-width: 48rem)');

    const handleMediaChange = (e) => {
      if (e.matches) {
        setBackgroundImage(`https://media.themoviedb.org/t/p/w600_and_h900_bestv2${data?.results[0].backdrop_path}`);
      } else {
        setBackgroundImage(`https://media.themoviedb.org/t/p/w1920_and_h800_bestv2${data?.results[0].backdrop_path}`);
      }
    };

    // 처음 로드 시 미디어 쿼리 상태를 확인
    handleMediaChange(mediaQuery);

    // 미디어 쿼리 상태가 변경될 때마다 호출
    mediaQuery.addEventListener('change', handleMediaChange);

    return () => {
      mediaQuery.removeEventListener('change', handleMediaChange);
    };
  }, [data]);

  const {
    data:videoData,
    isLoading: isVideoLoading,
    isError: isVideoError,
    error: videoError
  } = useMovieVideosQuery({movieId});

  if(isLoading || isVideoLoading){
      return (
        <LoadingSpinner loading={true}></LoadingSpinner>

      )
  }
  if(isError){
    return(
      <Alert variant='danger'>{error.message}</Alert>
    )
  }if (isVideoError) {
    return(
      <Alert variant='danger'>{videoError.message}</Alert>
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

  // https://media.themoviedb.org/t/p/w1920_and_h800_bestv2${data?.results[0].backdrop_path}

  return (
    <div 
      style={{
        backgroundImage: 
          "url(" +
          `${backgroundImage}` + ")"
      }}
      className='banner'  
    >
      <div className="text-white banner-text-area">
        <div className="banner-title">
          <h6><FontAwesomeIcon icon={faFire} style={{color: "#d72e14",}} />&nbsp;Most Popular now!</h6>
          <h1>{data?.results[0].title}</h1>
        </div>
        <p className='banner-overview'>{data?.results[0].overview}</p>
        <div className="banner-btns">
          <div className="banner-btn"  onClick={() => goToDetail(movieId)}>More info</div>
          <div className="banner-btn">
            <MovieModal video={videoData}></MovieModal>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Banner
