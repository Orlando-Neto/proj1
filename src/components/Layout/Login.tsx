import { useState } from "react";
import useAuth from "../../data/hook/useAuthData";
import Scripts from "./Scripts";
import Link from 'next/link'
import InputLogin from "../InputLogin";
import Button from '../Botao'
import Alerta from "../Alerta";

export default function Login() {
    
    const { login } = useAuth()
    const [ form, setForm ] = useState({email: '', senha: ''})

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
                                <Alerta id='login' />
                                <div className="login-form">
                                    <form onSubmit={(e) => login(e, form)} method="post">
                                        <InputLogin 
                                            label="Email"
                                            name="email"
                                            type="email"
                                            placeholder="Digite seu email"
                                            onchange={(e) => setForm({...form, email: e.target.value})}
                                        />
                                        
                                        <InputLogin 
                                            label="Senha"
                                            name="senha"
                                            type="password"
                                            placeholder="Digite sua senha"
                                            onchange={(e) => setForm({...form, senha: e.target.value})}
                                        />
                                        
                                        <Button 
                                            className="au-btn au-btn--block au-btn--green m-b-20"
                                            type="submit"
                                        >Logar</Button>
                                        
                                    </form>
                                    <div className="register-link">
                                        <p>
                                            Não tem uma conta? <Link href="/register">Cadastre-se</Link>
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