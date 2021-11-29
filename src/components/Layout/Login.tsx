import { useState } from "react";
import useAuth from "../../data/hook/useAuthData";
import Scripts from "./Scripts";

export default function Login() {
    
    const { login } = useAuth()
    const [ form, setForm ] = useState({})

    return (
        <div className="">
            <div className="page-wrapper">
                <div className="page-content--bge5">
                    <div className="container">
                        <div className="login-wrap">
                            <div className="login-content">
                                <div className="login-logo">
                                    <a href="#">
                                        <img src="images/icon/logo.png" alt="CoolAdmin" />
                                    </a>
                                </div>
                                <div className="login-form">
                                    <form onSubmit={(e) => login(e, form)} method="post">
                                        <div className="form-group">
                                            <label>Email Address</label>
                                            <input className="au-input au-input--full" onChange={(e) => setForm({...form, email: e.target.value})} type="email" name="email" placeholder="Email" />
                                        </div>
                                        <div className="form-group">
                                            <label>Password</label>
                                            <input className="au-input au-input--full" onChange={(e) => setForm({...form, senha: e.target.value})} type="password" name="password" placeholder="Password" />
                                        </div>
                                        <div className="login-checkbox">
                                            <label>
                                                <input type="checkbox" name="remember" />Remember Me
                                            </label>
                                            <label>
                                                <a href="#">Forgotten Password?</a>
                                            </label>
                                        </div>
                                        <button className="au-btn au-btn--block au-btn--green m-b-20" type="submit">sign in</button>
                                        {/* <div className="social-login-content">
                                            <div className="social-button">
                                                <button className="au-btn au-btn--block au-btn--blue m-b-20">sign in with facebook</button>
                                                <button className="au-btn au-btn--block au-btn--blue2">sign in with twitter</button>
                                            </div>
                                        </div> */}
                                    </form>
                                    <div className="register-link">
                                        <p>
                                            Don't you have account?
                                            <a href="#">Sign Up Here</a>
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <Scripts />

        </div>
    )
}