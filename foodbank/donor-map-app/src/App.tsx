import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MapboxPage from './pages/MapboxPage';
import KakaoPage from './pages/KakaoPage';
import './App.css';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MapboxPage />} />
        <Route path="/kakao" element={<KakaoPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
