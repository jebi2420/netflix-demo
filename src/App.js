import { Route } from 'react-router-dom';
import './App.css';
import AppLayout from './layout/AppLayout';

// 홈페이지
// 영화 전체 보여주는 페이지 (+ 서치)
// 영화 디테일 페이지
function App() {
  return (
    <Routes>
      <Route path="/" element={<AppLayout />}></Route>
    </Routes>
  );
}

export default App;
