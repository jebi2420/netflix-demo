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

  return (
    <div>
      <div 
        className='movie-info'
        style={{
          backgroundImage:
          `linear-gradient(to left, rgba(0 0 0 / 20%), rgba(0, 0, 0, 1)), 
            linear-gradient(to bottom, rgba(0, 0, 0, 0.45)75%, rgba(0, 0, 0, 1)95%),
            url(https://media.themoviedb.org/t/p/w600_and_h900_bestv2${data.backdrop_path})` 
      }} 
      >
        <div className='movie-poster'>
          <img 
            style={{
              width: "100%"
            }}
            src={`https://media.themoviedb.org/t/p/w600_and_h900_bestv2/${data.poster_path}`} 
            alt="" 
          />
        </div>
        <div className="movie-caps">
          <h1>{data.title}</h1>
          {showGenre(data.genres).map((id) =>
            (<Badge bg="danger">{id}</Badge>
          ))}
          <div>{data.adult?'over18':'under18'}</div>
          <div>popularity: {data.popularity}</div>
          <div>{data.vote_average.toFixed(1)}</div>
          <div>runtime: {data.runtime} min</div>
          <div>release date:{data.release_date}</div>
          <div>revenue: {formatNumber(data.revenue)}</div>
          <div>{data.overview}</div>
        </div>
      </div>
    </div>
  )
}

export default MovieDetail
