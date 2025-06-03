import { useEffect, useRef, useState } from "react";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, AuthErrorCodes } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import "../ui/ownerregister.css";
import { firebase } from "../components/firebase";
import * as bootstrap from 'bootstrap';


let myModal;
export default function Ownerregister() {
    const navigate = useNavigate();
    const modalRef = useRef(null);
    const [handler, setHandler] = useState(1);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [modalContent, setModalContent] = useState('');

    useEffect(() => {
        myModal = new bootstrap.Modal(modalRef.current);
    },[])

    const onClickSignIn = () => {
        var signin = document.querySelector("#signin");
        var signup = document.querySelector("#signup");
        signin.style.backgroundColor = "#cbcdd0";
        signup.style.backgroundColor = "white";
        setHandler(1);
    }
    const onClickSignUp = () => {
        var signin = document.querySelector("#signin");
        var signup = document.querySelector("#signup");
        signin.style.backgroundColor = "white";
        signup.style.backgroundColor = "#cbcdd0";
        setHandler(0);
    }

    const showLoginError = (e) => {
        if(e.code == AuthErrorCodes.INVALID_LOGIN_CREDENTIALS){
            setModalContent("帳號密碼錯誤，請重新輸入");
            myModal.show();
        }
        else if(e.code == AuthErrorCodes.EMAIL_EXISTS){
            setModalContent("帳號已註冊，請重新輸入");
            myModal.show();
        }
        else{
            setModalContent("登入錯誤，請重新輸入");
            myModal.show();
        }
    }

    const onSubmit = () => {
        if (handler == 1){
            const auth = getAuth(firebase);
            signInWithEmailAndPassword(auth, email, password)
            .then(() => {
                setModalContent("登入成功，即將跳轉至首頁");
                myModal.show();
                setTimeout(() => {
                    myModal.hide();
                    navigate('/siteFalicyCRADemo/');
                }, 3000)
            })
            .catch((e) => {
                showLoginError(e);
            })
        }
        else if(handler == 0){
            const auth = getAuth(firebase);
            createUserWithEmailAndPassword(auth, email, password)
                .then(() => {
                    setModalContent("註冊成功，，即將跳轉至首頁");
                    myModal.show();
                    setTimeout(() => {
                    myModal.hide();
                    navigate('/siteFalicyCRADemo/');
                }, 3000)
                })
                .catch((e) => {
                    showLoginError(e);
                })
        }
    }

    return (<>
        <div className="container d-flex flex-column align-items-center justify-content-center vh-100">
            <div className="signBox">
                <div className="logoFocus text-center my-5 pb-3 w-100">
                    <img src='https://raw.githubusercontent.com/ywei-chen/siteFalicyCRADemo/refs/heads/main/src/assets/FocusLogo.png' className="img-fluid" alt='' />
                </div>
                <div className='chosedBox'>
                    <div className="inBlock" id="signin" onClick={onClickSignIn} style={{backgroundColor: "#cbcdd0"}}>
                        <h5>登入</h5>
                    </div>
                    <div className="inBlock" id="signup" onClick={onClickSignUp}>
                        <h5>註冊</h5>
                    </div>
                </div>
                <form method="post" target="_self" onSubmit={onSubmit}>
                    <div className='form-floating mb-2'>
                        <input type='email' className="form-control" id="floatingEmail" placeholder="name@example.com" onMouseOutCapture={
                            (e) => {
                                setEmail(e.target.value);
                                console.log(email);
                            }
                        }    />
                        <label htmlFor="floatingEmail">Email address</label>
                    </div>
                    <div className="form-floating mb-2">
                        <input type="password" className="form-control" id="floatingPassword" placeholder="Password" onMouseOutCapture={
                            (e) => {
                                setPassword(e.target.value); 
                                console.log(password);                             
                            }
                        }/>
                        <label htmlFor="floatingPassword">Password</label>
                    </div>
                    <button type="button" className="btn btn-lg btn-dark w-100 mt-5" onClick={onSubmit}>{handler ? "登入": "註冊"}</button>
                </form>
            </div>
            <div className="modal fade" id="exampleModal" tabIndex="-1" ref={modalRef}>
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <h1 className="modal-title fs-5" id="exampleModalLabel">登入提示</h1>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                        <div className="modal-body">
                            {modalContent}
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">關閉</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </>)
}