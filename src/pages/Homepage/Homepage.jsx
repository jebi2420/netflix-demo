import React from 'react'
import Banner from './component/Banner/Banner'
import PopularMovieSlide from './component/PopularMovieslide/PopularMovieSlide'

// 1. 배너 => popular 영화를 들고와서 첫번째 아이템을 보여주자
// 2. popular movie
// 3. top rated movie
// 4. upcoming movie

const Homepage = () => {
  return (
    <div>
      <Banner />
      <PopularMovieSlide />
    </div>
  )
}

export default Homepage
