import React from 'react'
import { useParams } from 'react-router-dom';
import { useDetailMovieQuery } from '../../hooks/useDetailMovie';
import { Alert } from 'bootstrap';
import { Badge } from 'react-bootstrap'
import './MovieDetail.css'
import { useMovieGenreQuery } from '../../hooks/useMovieGenre';


const MovieDetail = () => {
  const {id: movieId} = useParams();
  console.log("movieId:", `${movieId}`)
  const { data, isLoading, isError, error} = useDetailMovieQuery({movieId});
  console.log("detail:", data)


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
  // 영화 포스터
  // 영화 제목
  // 장르
  // 영화 인기도
  // 영화 줄거리
  // 예산
  // 개봉일
  return (
    <div>
      <div className='movie-info'>
        <div>
          <img 
            style={{
              width: "300px"
            }}
            src={`https://media.themoviedb.org/t/p/w600_and_h900_bestv2/${data.poster_path}`} 
            alt="" 
            className='movie-poster'
          />
        </div>
        <h1>{data.title}</h1>
        {showGenre(data.genres).map((id) =>
          (<Badge bg="danger">{id}</Badge>
        ))}
        <div>popularity: {data.popularity}</div> 
        <div>{data.vote_average.toFixed(1)}</div>
        <div>runtime: {data.runtime} min</div>
        <div>release date:{data.release_date}</div>
        <div>revenue: {formatNumber(data.revenue)}</div>  
        <div>{data.overview}</div>
      </div>
    </div>
  )
}

export default MovieDetail
