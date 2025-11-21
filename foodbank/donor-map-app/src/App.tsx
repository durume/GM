import { BrowserRouter, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import AboutPage from './pages/AboutPage';
import ServicesPage from './pages/ServicesPage';
import HowToUsePage from './pages/HowToUsePage';
import DonationsPage from './pages/DonationsPage';
import ContactPage from './pages/ContactPage';
import MapsPage from './pages/MapsPage';
import MapboxPage from './pages/MapboxPage';
import KakaoPage from './pages/KakaoPage';
import './App.css';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/services" element={<ServicesPage />} />
        <Route path="/how-to-use" element={<HowToUsePage />} />
        <Route path="/donations" element={<DonationsPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/maps" element={<MapsPage />} />
        <Route path="/maps/mapbox" element={<MapboxPage />} />
        <Route path="/maps/kakao" element={<KakaoPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
