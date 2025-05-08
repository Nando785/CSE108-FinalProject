import { Routes, Route } from 'react-router-dom';
import Login from './pages/login/login';
import SignUp from './pages/signUp/signUp';
import Spotlight from './pages/spotlight/spotlight';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/signup" element={<SignUp />} />
      <Route path="/spotlight" element={<Spotlight />} />
    </Routes>
  );
}

export default App;
