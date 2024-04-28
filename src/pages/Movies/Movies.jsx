import React from 'react'
import { useSearchParams } from 'react-router-dom';
import { useSearchMovieQuery } from '../../hooks/useSearchMovie'

// Movies 페이지로 올 수 있는 2가지 경로
// 1. navbar에서 클릭해서 온 경우 => popularMovie 보여주기
// 2. keyword를 입력해서 온 경우 => keyword와 관련된 영화들을 보여줌


const Movies = () => {
  const [query, setQuery] = useSearchParams();
  const keyword = query.get("q") // url에서 q값을 읽어옴

  const { data, isLoading, isError, error} = useSearchMovieQuery({keyword});
  console.log("searchdata:", data)

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
      Movies
    </div>
  )
}

export default Movies
