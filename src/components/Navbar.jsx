import { Link } from 'react-router-dom';

export default function NavBar() {
    return (<>
        <nav className="navbar navbar-light">
            <div className="container-fluid">
                <a className="logoFocus" href="#">
                    <img src='https://raw.githubusercontent.com/ywei-chen/siteFalicyCRADemo/refs/heads/main/src/assets/FocusLogo.png' className="img-fluid object-fit-cover" alt="#" />
                </a>
                <div className="navbar-brand">羽毛球｜擇已所愛</div>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNavDropdown">
                    <div className="navbar-nav">
                        <Link className='nav-link' to='/siteFalicyCRADemo/'>首頁</Link>
                        <Link className='nav-link' to='/siteFalicyCRADemo/userregister/'>登入/註冊</Link>
                        <Link className='nav-link' to='/siteFalicyCRADemo/ownerregister/'>商家 登入/註冊</Link>
                        <Link className='nav-link' to='/siteFalicyCRADemo/ownerpage/'>test松上</Link>
                    </div>
                </div>
            </div>
        </nav>
    </>)
}