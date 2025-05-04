import "./regicss.css";

export default function Register() {
    return (<>
        <div className="container d-flex flex-column align-items-center justify-content-center vh-100">
            <div className="signBox">
                <div className="logoFocus text-center my-5 pb-3 w-100">
                    <img src='./siteFalicyCRADemo/src/assets/FocusLogo.png' className="img-fluid" alt='' />
            </div>
            <div className='h4 mb-4 text-center'>請輸入帳號密碼</div>
                <div className='form-floating mb-2'>
                    <input type='email' className="form-control" id="floatingInput" placeholder="name@example.com" />
                    <label htmlFor="floatingInput">Email address</label>
                </div>
                <div className="form-floating mb-2">
                    <input type="password" className="form-control" id="floatingPassword" placeholder="Password" />
                    <label htmlFor="floatingPassword">Password</label>
                </div>
                <div className="container-fluid d-flex flex-row mb-4 pb-4">
                    <a href="#" role="button" className="me-auto text-decoration-none">忘記密碼</a>
                    <a href="#" role="button" className="ms-auto text-decoration-none">註冊</a>
                </div>

                <button type="submit" className="btn btn-lg btn-dark">登入</button>
            </div>
        </div> 
    </>)
}