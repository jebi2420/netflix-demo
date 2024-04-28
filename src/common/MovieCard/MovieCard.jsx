import React from 'react'
import { Badge } from 'react-bootstrap'
import './MovieCard.css'
import { useMovieGenreQuery } from "../../hooks/useMovieGenre"


const MovieCard = ({movie}) => {

  const {data:genreData} = useMovieGenreQuery();

  const showGenre = (genreIdList) => {
    if(!genreData) return []
    const genreNameList= genreIdList.map((id)=>{
      const genreObj = genreData.find((genre)=>genre.id === id);
      return genreObj.name;
    })
    return genreNameList;
  }

  return (
    <div
      style={{
        backgroundImage: 
          "url("+`https://media.themoviedb.org/t/p/w600_and_h900_bestv2${movie.poster_path}`+")"
      }} 
      className="movie-card"
    >
      <div className="overlay">
        <h1>{movie.title}</h1>
        {showGenre(movie.genre_ids).map((id) =>
          (<Badge bg="danger">{id}</Badge>
        ))}
        <div className="card-info-box">
          <div>{movie.vote_average.toFixed(1)}</div>
          <div>{Math.trunc(movie.popularity)}</div>
          <div>{movie.adult?'over18':'under18'}</div>
        </div>
      </div>
    </div>
  )
}

export default MovieCard
