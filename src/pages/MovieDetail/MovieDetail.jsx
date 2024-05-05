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
import MovieRecommendation from './MovieRecommendation/MovieRecommendation';
import MovieCard from '../../common/MovieCard/MovieCard';

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

  console.log('reco: ', recoData)

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
    <div>
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
          <img 
            style={{
              width: "100%",
            }}
            src={`https://media.themoviedb.org/t/p/w600_and_h900_bestv2/${data.poster_path}`} 
            alt="" 
          />
        </div>
        <div className="movie-caps">
          <div className="top-facts">
            <h1>{data.title}</h1>
            <div className="main-facts">
              <div>{data.adult?<div className='adult-icon'>19</div>:<div className='adult-icon all-icon'>all</div>}</div>
              <div className="dot"></div>
              <div>{data.release_date}</div>
              <div className="dot"></div>
              <div>{data.runtime} min</div>
            </div>
          </div>
          <div className="genres">
            <h3>Genre</h3>
            {showGenre(data.genres).map((id) =>
              (<Badge bg="danger">{id}</Badge>
            ))}
          </div>
          <div>
            <h3>Overview</h3>
            {data.overview}
          </div>
          <div className="score">
            <h3>Score</h3>
            <div className="sub-facts">
              <div className='sub-fact'>
                <h5>rating</h5>
                <FontAwesomeIcon icon={faStar} style={{color: "#FFD43B"}} />
                &nbsp;{data.vote_average.toFixed(1)}
              </div>
              <div className='sub-fact'>
                <h5>Popularity</h5>
                <FontAwesomeIcon icon={faFire} style={{color: "#d72e14",}} />&nbsp;{data.popularity}</div>
              <div className='sub-fact'>
                <h5>revenue</h5>
                ${formatNumber(data.revenue)}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className='reviews-area sub-area'>
        <h1 className='section-title'>Reviews</h1>
        <Row>
          {reviewData?.results?.map((result, index)=> (
              <Col className='movie-card' lg={2} xs={12}>
                <MovieReviews result={result} key={index}></MovieReviews>
              </Col>
          ))}
        </Row>
      </div>

      <div className='sub-area'>
        <h1 className='section-title'>Recommendation</h1>
          <Row>
            {recoData?.results.map((movie, index)=> (
                <Col lg={2} xs={12}>
                  <MovieCard movie={movie} key={index}></MovieCard>
                </Col>
            ))}
          </Row> 
      </div>
    </div>
  )
}

export default MovieDetail
