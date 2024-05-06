import React from 'react'
import { Col, Container, Row } from 'react-bootstrap';
import { useSearchParams } from 'react-router-dom';
import MovieCard from '../../common/MovieCard/MovieCard';
import { useSearchMovieQuery } from '../../hooks/useSearchMovie'
import { Alert } from 'bootstrap';
import ReactPaginate from 'react-paginate';
import { useState } from 'react';
import DropdownList from '../../common/DropdownList/DropdownList';
import { useMovieGenreQuery } from '../../hooks/useMovieGenre';

// Movies 페이지로 올 수 있는 2가지 경로
// 1. navbar에서 클릭해서 온 경우 => popularMovie 보여주기
// 2. keyword를 입력해서 온 경우 => keyword와 관련된 영화들을 보여줌

// 페이지네이션 설치
// page state 만들기
// 페이지네이션 클릭할때마다 page 바꿔주기
// page 값이 바뀔때마다 useSearchMovie에 page까지 넣어서 fetch

const Movies = () => {
  const [query, setQuery] = useSearchParams();
  const [page,setPage] = useState(1);
  const keyword = query.get("q") // url에서 q값을 읽어옴

  const { data, isLoading, isError, error} = useSearchMovieQuery({keyword, page});
  const {
    data:genreData,
    isLoading: isGenreLoading,
    isError: isGenreError,
    error: genreError
  }= useMovieGenreQuery();

  const genreNameList = genreData?.map(genre => genre.name);

  console.log('genre:', genreNameList)

  const handlePageClick = ({selected}) => {
    setPage(selected + 1)
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

  const sortBy = () => {
    
  }

  const sortByItems = [
    { href: sortBy, text: "Popular"},
    { href: "#", text: "Unpopular"}
  ];

  const byGenreItems = genreNameList?.map(genre => ({
      href: "#", 
      text: genre
  }));

  return (
    <Container>
      <Row>
        <Col lg={4} xs={12}>
          <DropdownList title={"Sort by"} items={sortByItems}></DropdownList>
          <DropdownList title={"By genre"} items={byGenreItems}></DropdownList>
        </Col>
        <Col lg={8} xs={12}>
          <Row>
            {data?.results.map((movie,index)=>
              <Col key={index} lg={4} xs={12}>
                <MovieCard movie={movie}/>
              </Col>)}
          </Row>
          <ReactPaginate
            nextLabel="next >"
            onPageChange={handlePageClick}
            pageRangeDisplayed={3}
            marginPagesDisplayed={2}
            pageCount={data?.total_pages}//전체 페이지가 몇개인지
            previousLabel="< previous"
            pageClassName="page-item"
            pageLinkClassName="page-link"
            previousClassName="page-item"
            previousLinkClassName="page-link"
            nextClassName="page-item"
            nextLinkClassName="page-link"
            breakLabel="..."
            breakClassName="page-item"
            breakLinkClassName="page-link"
            containerClassName="pagination"
            activeClassName="active"
            renderOnZeroPageCount={null}
            forcePage={page-1} // 현재 페이지(내가 선택한 페이지)
          />
        </Col>
      </Row>
    </Container>
  )
}

export default Movies
