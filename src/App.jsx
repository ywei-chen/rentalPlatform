import './App.css';
import { Routes, Route } from 'react-router-dom';
import { Link } from 'react-router-dom'
import NavBar from './components/Navbar';
import Register from './pages/register';
import Home from './pages/home';

//Render
function App() {
  return (
    <>
      <NavBar></NavBar>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/register' element={<Register />} />
      </Routes>
    </>
  )
}

export default App
