import { Routes, Route } from 'react-router-dom';
import { Login, SignUp, Spotlight, Camera, Profile, Search } from './pages/index.js';

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
