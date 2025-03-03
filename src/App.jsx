import focus from './assets/FocusLogo.png';
import './App.css';

function App() {

  return (
    <>
    {/* NavBar start */}
      <nav className="navbar navbar-expand-lg bg-body-tertiary">
        <div className="container-fluid">
            <div className="logoFocus">
                <img src={focus} className="img-fluid object-fit-cover" alt="#" />
            </div>
            <a className="navbar-brand" href="#">羽毛球｜擇已所愛</a>
            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup"
                aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
                <div className="navbar-nav">
                    <a className="nav-link" href="https://ywei-chen.github.io/sitefacility.github.io/register.html">登入註冊</a>
                    <a className="nav-link" href="#">運動場地</a>
                    <a className="nav-link" href="#">關於我們</a>
                    <a className="nav-link" href="#">聯絡我們</a>
                </div>
            </div>
        </div>
    </nav>
    {/* NavBar end */}

    </>
  )
}

export default App
