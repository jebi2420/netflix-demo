import { Route } from 'react-router-dom';
import './App.css';
import AppLayout from './layout/AppLayout';
import Homepage from './pages/Homepage/Homepage';
import MovieDetail from './pages/MovieDetail/MovieDetail';
import Movies from './pages/Movies/Movies';

// 홈페이지 / 
// 영화 전체 보여주는 페이지 (+ 서치) /movies
// 영화 디테일 페이지 /movies/:id
function App() {
  return (
    <Routes>
      <Route path="/" element={<AppLayout />}>
        <Route index element={<Homepage />} />
        <Route path="movies">
          <Route index element={<Movies />} />
          <Route path=":id" element={<MovieDetail />}/>
        </Route>
      </Route>
    </Routes>
  );
}

export default App;
