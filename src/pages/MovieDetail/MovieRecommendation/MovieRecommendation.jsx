import React from 'react'
import MovieCard from '../../../common/MovieCard/MovieCard'

const MovieRecommendation = ({result}) => {
  return (
    <div>
      {result.map((result,index)=><MovieCard movie={result} key={index}/>)}
    </div>
  )
}

export default MovieRecommendation
