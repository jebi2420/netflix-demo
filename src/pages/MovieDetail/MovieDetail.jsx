import React from 'react'
import { useParams } from 'react-router-dom';
import { useDetailMovieQuery } from '../../hooks/useDetailMovie';
import { Alert } from 'bootstrap';
import { Badge } from 'react-bootstrap'
import './MovieDetail.css'
import { useMovieGenreQuery } from '../../hooks/useMovieGenre';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faStar, faFire } from '@fortawesome/free-solid-svg-icons';
import { useReviewsQuery } from '../../hooks/useReviews';
import { Row, Col } from 'react-bootstrap';
import MovieReviews from './MovieReviews/MovieReviews';
import { useMovieRecommendationQuery } from '../../hooks/useMovieRecommendation';
import MovieCard from '../../common/MovieCard/MovieCard';
import { useState } from 'react';
import MovieModal from '../../common/Modal/MovieModal';
import { useMovieVideosQuery } from '../../hooks/useMovieVideos';
import LoadingSpinner from '../../common/Spinner/Spinner';

const MovieDetail = () => {
  const {id: movieId} = useParams();
  const { data, isLoading, isError, error } = useDetailMovieQuery({movieId});
  const { 
    data:reviewData, 
    isLoading: isReviewsLoading, 
    isError:isReviewsError, 
    error:reviewError 
  } = useReviewsQuery({movieId});
  const {
    data:recoData,
    isLoading: isRecoLoading,
    isError: isRecoError,
    error: recoError
  } = useMovieRecommendationQuery({movieId});
  const {
    data:videoData,
    isLoading: isVideoLoading,
    isError: isVideoError,
    error: videoError
  } = useMovieVideosQuery({movieId});


  const {data:genreData} = useMovieGenreQuery();
  const showGenre = (genres) => {
    const genreIdList = genres.map(genre => genre.id);

    if(!genreIdList) return []
    const genreNameList= genreIdList.map((id)=>{
      const genreObj = genreData.find((genre)=>genre.id === id);
      return genreObj.name;
    })
    return genreNameList;
  }

  function formatNumber(num) {
    return num.toLocaleString('ko-KR');
  }

  const [visibleItems, setVisibleItems] = useState(12);

  const [isExpanded, setIsExpanded] = useState(false);
  const toggleExpand = () => {
    if(isExpanded){
      setIsExpanded(false);
      setVisibleItems(12)
    }else {
      setIsExpanded(true);
      setVisibleItems(recoData.results.length)
    }

  };
  
  if(isLoading){
    return (
      <LoadingSpinner loading={true}></LoadingSpinner>
    )
  }
  if(isError){
    return(
      <Alert variant='danger'>{error.message}</Alert>
    )
  }

  return (
    <div className='movie-detail-container'>
      <div 
        className='movie-info'
        style={{
          backgroundImage:
          `linear-gradient(to left, rgba(0 0 0 / 20%), rgba(0, 0, 0, 1)), 
            linear-gradient(to bottom, rgba(0, 0, 0, 0.45)75%, rgba(0, 0, 0, 1)95%),
            url(https://media.themoviedb.org/t/p/w1920_and_h800_bestv2${data.backdrop_path})` 
      }} 
      >
        <div className='movie-poster'>
          <div className="poster-overlay"></div>
          <img 
            style={{
              width: "100%",
            }}
            src={`https://media.themoviedb.org/t/p/w600_and_h900_bestv2/${data.poster_path}`} 
            alt="" 
          />
        </div>
        <div className="movie-caps">
          <div className="top-facts cap-section">
            <h1>{data.title}</h1>
            <div className="main-facts">
              <div className="main-fact-left">
                <div>{data.adult?<div className='adult-icon'>19</div>:<div className='adult-icon all-icon'>all</div>}</div>
                <div className="dot"></div>
                <div>{data.release_date}</div>
                <div className="dot"></div>
                <div>{data.runtime} min</div>
              </div>
              <MovieModal video={videoData}></MovieModal>
            </div>
          </div>
          <div className="genres cap-section">
            <h4>Genre</h4>
            {showGenre(data.genres).map((id) =>
              (<Badge bg="danger">{id}</Badge>
            ))}
          </div>
          <div className='cap-section'>
            <h4>Overview</h4>
            <div className="overview-pc">{data.overview}</div>
          </div>
          <div className="score ">
            <h4>Score</h4>
            <div className="sub-facts">
              <div className='sub-fact'>
                <h6>rating</h6>
                <FontAwesomeIcon icon={faStar} style={{color: "#FFD43B"}} />
                &nbsp;{data.vote_average.toFixed(1)}
              </div>
              <div className='sub-fact'>
                <h6>Popularity</h6>
                <FontAwesomeIcon icon={faFire} style={{color: "#d72e14",}} />&nbsp;{data.popularity}</div>
              <div className='sub-fact'>
                <h6>revenue</h6>
                ${formatNumber(data.revenue)}
              </div>
            </div>
          </div>
          <div className="overview-mobile">{data.overview}</div>
        </div>
      </div>

      <div className='reviews-area sub-area'>
      {reviewData?.results?.length > 0 && (
        <>
          <h3 className='section-title'>REVIEWS</h3>
          <Row>
            {reviewData.results.map((result, index) => (
              <Col lg={3} xs={12} key={index}>
                <MovieReviews result={result} />
              </Col>
            ))}
          </Row>
        </>
      )}
      </div>

      <div className='reco-area sub-area'>
          {recoData?.results?.length > 0 && (
        <>
          <h3 className='section-title reco-title'>RECOMMENDATION</h3>
          <div className="reco-movie-group">
            <div className="gradient-overlay"></div>
            <div className="reco-movie-scroller">
              {recoData.results.map((movie, index) => (
                <div className='reco-movie-card' key={index}>
                  <MovieCard movie={movie} />
                </div>
              ))}
            </div>
          </div>
        </>
      )}
      </div>
    </div>
  )
}

export default MovieDetail
