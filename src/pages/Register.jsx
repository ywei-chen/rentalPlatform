import { useState } from "react";
import "./regicss.css";

const Button = ({handler}) => {
    return(<>
        <button type="submit" className="btn btn-lg btn-dark w-100">
            {handler ? "登入" : "註冊"}
        </button>
    </>)
}



export default function Register() {
    const [handler , setHandler] =useState(true);
    
    const onClick1 = () => {
        var signin = document.querySelector("#signin");
        var signup = document.querySelector("#signup");
        signin.style.backgroundColor = "#cbcdd0";
        signup.style.backgroundColor = "white";
        setHandler(true);
    }
    const onClick2 = () => {
        var signin = document.querySelector("#signin");
        var signup = document.querySelector("#signup");
        signin.style.backgroundColor = "white";
        signup.style.backgroundColor = "#cbcdd0";
        setHandler(false);
    }

    return (<>
        <div className="container d-flex flex-column align-items-center justify-content-center vh-100">
            <div className="signBox">
                <div className="logoFocus text-center my-5 pb-3 w-100">
                    <img src='https://raw.githubusercontent.com/ywei-chen/siteFalicyCRADemo/refs/heads/main/src/assets/FocusLogo.png' className="img-fluid" alt='' />
                </div>
                <div className='chosedBox'>
                    <div className="inBlock" id="signin" onClick={onClick1}>
                        <h5>登入</h5>
                    </div>
                    <div className="inBlock" id="signup" onClick={onClick2}>
                        <h5>註冊</h5>
                    </div>
                </div>
                <form className="mb-5">
                    <div className='form-floating mb-2'>
                        <input type='username' className="form-control" id="floatingUsername" placeholder="david" />
                        <label htmlFor="floatingUsername">David</label>
                    </div>
                    <div className='form-floating mb-2'>
                        <input type='email' className="form-control" id="floatingEmail" placeholder="name@example.com" />
                        <label htmlFor="floatingEmail">Email address</label>
                    </div>
                    <div className="form-floating mb-2">
                        <input type="password" className="form-control" id="floatingPassword" placeholder="Password" />
                        <label htmlFor="floatingPassword">Password</label>
                    </div>
                </form>
                <Button handler={handler}></Button>
            </div>
        </div>
    </>)
}