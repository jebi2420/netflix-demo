import React from 'react'
import { Col, Container, Row, Button } from 'react-bootstrap';
import { useSearchParams } from 'react-router-dom';
import MovieCard from '../../common/MovieCard/MovieCard';
import { useSearchMovieQuery } from '../../hooks/useSearchMovie'
import { Alert } from 'bootstrap';
import ReactPaginate from 'react-paginate';
import { useState, useEffect } from 'react';
import DropdownList from '../../common/DropdownList/DropdownList';
import { useMovieGenreQuery } from '../../hooks/useMovieGenre';
import './Movies.css'

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

  const [sortedMovies, setSortedMovies] = useState([]);

  // data에 변화가 있을 때마다 sortedmovies를 최신화
  useEffect(() => {
    setSortedMovies(data?.results || []);
  }, [data]);

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

  const handleSort = (sortOption) => {
    const newSortedMovies = [...sortedMovies];
    if(sortOption.text === 'Popular'){
      newSortedMovies.sort((a,b) => b.popularity - a.popularity);
    } else if(sortOption.text === 'Unpopular'){
      newSortedMovies.sort((a,b) => a.popularity - b.popularity);
    } 
    setSortedMovies(newSortedMovies);
  }

  const handleGenreSelect = (selectedGenre) => {
    const filteredMovies = data?.results.filter(movie => 
      movie.genre_ids.includes(selectedGenre.id));
      setSortedMovies(filteredMovies);
  }


  const sortByItems = [
    { text: "Popular"},
    { text: "Unpopular"}
  ];

  const byGenreItems = genreData?.map(genre => ({ 
      text: genre.name,
      id: genre.id
  })) || [];

  return (
    <div className='movies-container'>
        <div className='movies-sorts'>
          <DropdownList title={"Sort by"} items={sortByItems} onsSelectedItem={handleSort}></DropdownList>
          {byGenreItems.map((item, index) => (
              <Button
              key={index}
              onClick={() => handleGenreSelect(item)}
              className="genre-button"
            >
              {item.text}
            </Button>
          ))}
          {/* <DropdownList title={"By genre"} items={byGenreItems} onsSelectedItem={handleGenreSelect}></DropdownList> */}
        </div>
          <div className="movies-content">
            <Row>
              {sortedMovies.map((movie,index)=>
                <Col key={index} lg={3} xs={12}>
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
          </div>
    </div>
  )
}

export default Movies
