import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { onAuthStateChanged, getAuth } from 'firebase/auth';
import { db, firebase } from './firebase';
import { doc, getDoc } from "firebase/firestore";


export default function NavBar() {
    const [userName, setUserName] = useState('');

    useEffect(() => {
        const auth = getAuth(firebase);
         const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        const docSnap = await getDoc(doc(db, "users", user.uid));
        if (docSnap.exists()) {
          setUserName(docSnap.data().userName);
        }
      } else {
        setUserName("");
      }
    });

    return () => unsubscribe();
  }, []);


    return (<>
        <nav className="navbar navbar-light">
            <div className="container-fluid">
                <a className="logoFocus" href="#">
                    <img src='https://raw.githubusercontent.com/ywei-chen/siteFalicyCRADemo/refs/heads/main/src/assets/FocusLogo.png' className="img-fluid object-fit-cover" alt="#" />
                </a>
                <div className="navbar-brand">羽毛球｜擇已所愛</div>
                <div>
                    {userName ? userName : "未登入"}
                    <i className="fa-regular fa-circle-user fa-xl ms-2"></i>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                </div>
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