import React from 'react'
import { Badge } from 'react-bootstrap'
import './MovieCard.css'
import { useMovieGenreQuery } from "../../hooks/useMovieGenre"
import { useNavigate } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faStar, faFire } from '@fortawesome/free-solid-svg-icons';

const MovieCard = ({movie}) => {

  const {data:genreData} = useMovieGenreQuery();
  const navigate = useNavigate();

  const showGenre = (genreIdList) => {
    if(!genreData) return []
    const genreNameList= genreIdList.map((id)=>{
      const genreObj = genreData.find((genre)=>genre.id === id);
      return genreObj.name;
    })
    return genreNameList;
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
          "url("+`https://media.themoviedb.org/t/p/w600_and_h900_bestv2${movie.poster_path}`+")"
      }} 
      className="movie-card"
    >
      <div className="overlay" onClick={() => goToDetail(movie.id)}>
        <h1>{movie.title}</h1>
        {showGenre(movie.genre_ids).map((id) =>
          (<Badge bg="danger">{id}</Badge>
        ))}
        <div className="card-info-box">
          <div><FontAwesomeIcon icon={faFire} style={{color: "#d72e14",}} />{movie.popularity}</div>
          <div>
            <FontAwesomeIcon icon={faStar} style={{color: "#FFD43B"}} />
            {movie.vote_average.toFixed(1)}
          </div>
          <div>{movie.adult?<div className='adult-icon'>19</div>:<div className='adult-icon all-icon'>all</div>}</div>
        </div>
      </div>
    </div>
  )
}

export default MovieCard
