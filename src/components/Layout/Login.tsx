import { useState } from "react";
import useAppData from "../../data/hook/useAppData";
import useAuth from "../../data/hook/useAuthData";
import Scripts from "./Scripts";

export default function Login() {
    
    const { login } = useAuth()
    const [ form, setForm ] = useState({})

    const { errors } = useAppData()

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
                                {(errors != '') ? (
                                    <div className="alert alert-danger" role="alert">
                                        {errors}
                                    </div>
                                ):''}
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
                                        <button className="au-btn au-btn--block au-btn--green m-b-20" type="submit">sign in</button>
                                        
                                    </form>
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