import { useState } from "react";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, AuthErrorCodes } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import "./regicss.css";
import firebase from "../components/firebase";

export default function Register() {
    const navigate = useNavigate();
    const [handler, setHandler] = useState(1);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

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
            console.log("帳號密碼錯誤");
        }
        else if(e.code == AuthErrorCodes.EMAIL_EXISTS){
            console.log("帳號已註冊");
        }
        else{
            console.log("登入錯誤");
        }
    }

    const onSubmit = () => {
        if (handler == 1){
            const auth = getAuth(firebase);
            signInWithEmailAndPassword(auth, email, password)
            .then(() => {
                console.log("登入成功");
            })
            .catch((e) => {
                showLoginError(e);
            })
        }
        else if(handler == 0){
            const auth = getAuth(firebase);
            createUserWithEmailAndPassword(auth, email, password)
                .then(() => {
                    console.log("註冊成功");
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
        </div>
    </>)
}