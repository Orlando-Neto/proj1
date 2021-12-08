import Scripts from "./Scripts"
import Link from 'next/link'
import InputLogin from "../InputLogin"
import Button from '../Button'
import useAuth from "../../data/hook/useAuthData"
import { useState } from "react"
import Alerta from "../Alert"

interface formProps {
    nome: string
    email: string
    senha: string
    senha2: string
}

export default function Register() {

    const { regUser } = useAuth()
    const [form, setForm] = useState<formProps>({
        nome: '', senha: '', senha2: '', email: ''
    })

    return (
        <div>
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
                                <Alerta id="register" />
                                <div className="login-form">
                                    <form onSubmit={(e) => regUser(e, form)} method="post">
                                        <InputLogin 
                                            label="Nome"
                                            className="au-input au-input--full"
                                            type="text"
                                            name="nome"
                                            id="nome"
                                            required
                                            placeholder="Digite seu nome"
                                            value={form.nome}
                                            onchange={(e) => setForm({...form, nome: e.target.value})}
                                        />

                                        <InputLogin 
                                            label="Email"
                                            className="au-input au-input--full"
                                            type="email"
                                            name="email"
                                            id="email"
                                            required
                                            placeholder="Digite seu email"
                                            value={form.email}
                                            onchange={(e) => setForm({...form, email: e.target.value})}
                                        />

                                        <InputLogin 
                                            label="Senha"
                                            name="senha"
                                            type="password"
                                            id="senha"
                                            required
                                            placeholder="Digite sua senha"
                                            value={form.senha}
                                            onchange={(e) => setForm({...form, senha: e.target.value})}
                                        />

                                        <InputLogin 
                                            label="Confirme a Senha"
                                            name="senha2"
                                            type="password"
                                            required
                                            placeholder="Confirme sua senha"
                                            value={form.senha2}
                                            onchange={(e) => setForm({...form, senha2: e.target.value})}
                                        />
                                        
                                        <Button 
                                            className="au-btn au-btn--block au-btn--green m-b-20"
                                            type="submit"
                                        >Registrar</Button>
                                    </form>
                                    <div className="register-link">
                                        <p>
                                            Já tem uma conta? <Link href="/login">Logar</Link>
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