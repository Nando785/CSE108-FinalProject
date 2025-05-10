import { Routes, Route } from 'react-router-dom';
import Login from './pages/login/login';
import SignUp from './pages/signUp/signUp';
import Spotlight from './pages/spotlight/spotlight';
import Camera from './pages/camera/camera';
import Profile from './pages/profile/profile';
import Search from './pages/search/search';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/signup" element={<SignUp />} />
      <Route path="/spotlight" element={<Spotlight />} />

      <Route path="/camera" element={<Camera />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="/search" element={<Search />} />
    </Routes>
  );
}

export default App;
