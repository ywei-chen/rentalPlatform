import "../ui/navbar.css";
import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { onAuthStateChanged, getAuth, signOut } from 'firebase/auth';
import { db, firebase } from './firebase';
import { doc, getDoc } from "firebase/firestore";
import { Navbar, Nav, Container, Dropdown } from 'react-bootstrap';

export default function NavBar() {
    const [userName, setUserName] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const auth = getAuth(firebase);
        const unsubscribe = onAuthStateChanged(auth, async (user) => {
            if (user) {
                const userDoc = await getDoc(doc(db, "users", user.uid));
                const ownerDoc = await getDoc(doc(db, "stores", user.uid));
                if (userDoc.exists()) {
                    setUserName({
                        uid: user.uid,
                        name: userDoc.data().userName,
                        role: 'user'
                    });
                } else if (ownerDoc.exists()) {
                    setUserName({
                        uid: user.uid,
                        name: ownerDoc.data().userName,
                        role: 'store'
                    });
                } else {
                    setUserName(null);
                }
            } else {
                setUserName(null);
            }
        });
        return () => unsubscribe();
    }, [userName]);

    const handleLogout = () => {
        const auth = getAuth(firebase);
        signOut(auth).then(() => {
            setUserName(null);
            navigate('/siteFalicyCRADemo/');
        });
    };

    return (
        <Navbar expand="lg" bg="light" variant="light" className="navbar">
            <Container fluid>
                <Navbar.Brand href="#" className="d-flex align-items-center">
                    <img
                        src="https://raw.githubusercontent.com/ywei-chen/siteFalicyCRADemo/refs/heads/main/src/assets/FocusLogo.png"
                        alt="logo"
                        className="img-fluid object-fit-cover"
                        style={{ height: '40px' }}
                    />
                    <span className="ms-2">羽毛球｜擇已所愛</span>
                </Navbar.Brand>

                <div className="ms-auto me-3 d-flex align-items-center">
                    {userName ? (<>
                        <div>
                            {userName.name}
                            <i className="fa-regular fa-circle-user fa-xl ms-2"></i>
                        </div>
                        <Navbar.Toggle aria-controls="navbar-nav" />
                        <Navbar.Collapse id="navbar-nav">
                            <Nav className="my-auto">
                                <Nav.Link as={Link} onClick={handleLogout}>登出</Nav.Link>
                                <Nav.Link as={Link} to="/siteFalicyCRADemo/">首頁</Nav.Link>
                                {userName.role === 'user' && (
                                    <Nav.Link as={Link} to={`/siteFalicyCRADemo/userpage/${userName.uid}`}>個人頁面</Nav.Link>
                                )}
                                {userName.role === 'store' && (
                                    <Nav.Link as={Link} to={`/siteFalicyCRADemo/ownerpage/${userName.uid}`}>商家頁面</Nav.Link>
                                )}
                            </Nav>
                        </Navbar.Collapse>
                    </>
                    ) : (
                            <>
                                <div
                                    style={{ cursor: 'pointer' }}
                                    onClick={() => navigate('/siteFalicyCRADemo/userregister/')}
                                >
                                    未登入 <i className="fa-regular fa-circle-user fa-xl ms-2"></i>
                                </div>
                                <Navbar.Toggle aria-controls="navbar-nav" />
                                <Navbar.Collapse id="navbar-nav">
                                    <Nav className="my-auto">
                                        <Nav.Link as={Link} to="/siteFalicyCRADemo/">首頁</Nav.Link>
                                        <Nav.Link as={Link} to="/siteFalicyCRADemo/userregister/">登入/註冊</Nav.Link>
                                        <Nav.Link as={Link} to="/siteFalicyCRADemo/ownerregister/">商家登入/註冊</Nav.Link>
                                    </Nav>
                                </Navbar.Collapse>
                            </>         
                    )}
                </div>
            </Container>
        </Navbar>
    );
}
