import { Routes, Route } from 'react-router-dom';
import CountryList from './components/CountryList';
import CountryDetail from './components/CountryDetail';
import Login from './pages/Login';
import FavoriteCountries from './pages/FavoriteCountries';

function App() {
  return (
    <Routes>
      <Route path="/" element={<CountryList />} />
      <Route path="/country/:code" element={<CountryDetail />} />
      <Route path="/login" element={<Login />} />
      <Route path="/favorites" element={<FavoriteCountries />} />
    </Routes>
  );
}

export default App;