import './App.css';
import { Routes, Route } from 'react-router-dom';
import NavBar from './components/Navbar';
import Userregister from './pages/userregister';
import Ownerregister from './pages/ownerregister';
import Home from './pages/home';

//Render
function App() {
  return (
    <>
      <NavBar></NavBar>
      <Routes>
        <Route path='/siteFalicyCRADemo/' element={<Home />} />
        <Route path='/siteFalicyCRADemo/userregister/' element={<Userregister />} />
        <Route path='/siteFalicyCRADemo/ownerregister/' element={<Ownerregister />} />
      </Routes>
    </>
  )
}

export default App
