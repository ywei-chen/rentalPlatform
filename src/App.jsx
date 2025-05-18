import './App.css';
import { Routes, Route } from 'react-router-dom';
import { Link } from 'react-router-dom'
import NavBar from './components/Navbar';
import Userregister from './pages/userregister';
import Home from './pages/home';

//Render
function App() {
  return (
    <>
      <NavBar></NavBar>
      <Routes>
        <Route path='/siteFalicyCRADemo/' element={<Home />} />
        <Route path='/siteFalicyCRADemo/userregister/' element={<Userregister />} />
      </Routes>
    </>
  )
}

export default App
