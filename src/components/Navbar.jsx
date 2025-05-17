import { Link } from 'react-router-dom';

export default function NavBar() {
    return (<>
        <nav className="navbar navbar-expand-lg bg-body-tertiary" id="navbar">
            <div className="container-fluid">
                <div className="logoFocus">
                    <img src='https://raw.githubusercontent.com/ywei-chen/siteFalicyCRADemo/refs/heads/main/src/assets/FocusLogo.png' className="img-fluid object-fit-cover" alt="#" />
                </div>
                <a className="navbar-brand" href="#">羽毛球｜擇已所愛</a>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup"
                    aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
                    <div className="navbar-nav">
                        <Link className='nav-link' to='/siteFalicyCRADemo/'>首頁</Link>
                        <Link className='nav-link' to='/siteFalicyCRADemo/register/'>登入註冊</Link>
                        <a className="nav-link" href="#">運動場地</a>
                    </div>
                </div>
            </div>
        </nav>

    </>)
}