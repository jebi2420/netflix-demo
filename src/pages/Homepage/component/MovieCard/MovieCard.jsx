import React from 'react'

const MovieCard = ({movie}) => {
  return (
    <div
      style={{
        backgroundImage: 
          "url("+`https://media.themoviedb.org/t/p/w600_and_h900_bestv2${movie.poster_path}`+")"
      }}  
    >
      MovieCard
    </div>
  )
}

export default MovieCard
