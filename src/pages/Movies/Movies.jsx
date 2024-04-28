import React from 'react'
import { Col, Container, Row } from 'react-bootstrap';
import { useSearchParams } from 'react-router-dom';
import MovieCard from '../../common/MovieCard/MovieCard';
import { useSearchMovieQuery } from '../../hooks/useSearchMovie'
import { Alert } from 'bootstrap';

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
    <Container>
      <Row>
        <Col lg={4} xs={12}>필터</Col>
        <Col lg={8} xs={12}>
          {data?.results.map((movie,index)=>
            <Col>
              <MovieCard movie={movie}/>
            </Col>)}
        </Col>
      </Row>
    </Container>
  )
}

export default Movies
