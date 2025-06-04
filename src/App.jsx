import './App.css';
import { Routes, Route } from 'react-router-dom';
import NavBar from './components/Navbar';
import Userregister from './pages/userregister';
import Ownerregister from './pages/ownerregister';
import Home from './pages/home';
import Ownerpage from './pages/ownerpage';
import Userpage from './pages/userpage';
//Render
function App() {
  return (
    <>
      <NavBar></NavBar>
      <Routes>
        <Route path='/siteFalicyCRADemo/' element={<Home />} />
        <Route path='/siteFalicyCRADemo/userregister/' element={<Userregister />} />
        <Route path='/siteFalicyCRADemo/ownerregister/' element={<Ownerregister />} />
        <Route path='/siteFalicyCRADemo/ownerpage/' element={<Ownerpage />} />
        <Route path='/siteFalicyCRADemo/userpage/:uid' element={<Userpage />} />
      </Routes>
    </>
  )
}

export default App
