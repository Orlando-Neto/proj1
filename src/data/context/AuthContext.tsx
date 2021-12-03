import { createContext, useEffect, useState } from "react"
import Usuario from "../../model/Usuario"
import Cookies from 'js-cookie'
import { useRouter } from "next/router"
import useAppData from "../hook/useAppData"

const crypto = require('crypto')

interface AuthContextProps {
    user?: Usuario,
    login?: (e, form) => Promise<void>
    regUser?: (e, form) => Promise<void>
    logout?: () => void
    criptografar?: (palavra) => string
}

const AuthContext = createContext<AuthContextProps>({})

export default AuthContext

export function AuthProvider(props) {

    const router = useRouter()
    const { salvarAviso } = useAppData()

    const [user, setUser] = useState(null)
    
    function gerenciarCookie(logado: boolean) {

        if(logado) {
            Cookies.set('cool-admin', logado, {
                expires: 1
            })
            
        } else {
            Cookies.remove('cool-admin')
        }
    }

    function criptografar(palavra) {

        if(!palavra) return ''

        let sha1 = crypto.createHash('sha1')
        sha1.update(palavra)
        return sha1.digest('hex')
        
    }

    async function login(e, form) {

        e.preventDefault()
        
        form.senha = criptografar(form.senha)

        const res = await fetch('/api/login', {
            method: "POST",
            body: JSON.stringify(form)
        })

        if(res.ok) {
            gerenciarCookie(true)
            const user = await res.json()
            setUser(user)
            localStorage.setItem('usuario', JSON.stringify({
                nome: user.nome,
                email: user.email,
                cargo: user.cargo,
                id: user.id
            }))

            router.push('/dashboard')
        } else {
            gerenciarCookie(false)
            let msg = await res.json();
            salvarAviso(msg.error, 'danger', 'login')

            router.push('/login')
        }
    }

    function logout() {
        setUser(null)
        gerenciarCookie(false)
        localStorage.removeItem('usuario')

        router.push('/login')
    }

    async function regUser(e, form) {
        
        e.preventDefault()

        if(form.senha == '') {
            
            salvarAviso('Senha vazia', 'danger', 'register')
            router.push('/register')
            return;
        }

        if(form.senha2 != form.senha) {
            
            salvarAviso({'mensagem': 'Senhas não batem', 'campo': 'senha'}, 'warning', 'register')
            router.push('/register')
            return;
        }
        
        const res = await fetch('/api/users', {
            method: "POST",
            body: JSON.stringify({
                nome: form.nome,
                email: form.email,
                cargo: 'normal',
                senha: criptografar(form.senha),
                senha2: criptografar(form.senha2)
            })
        })

        if(res.ok) {
            gerenciarCookie(true)
            const user = await res.json()
            setUser(user)
            localStorage.setItem('usuario', JSON.stringify({
                nome: user.nome,
                email: user.email,
                cargo: user.cargo,
                id: user.id
            }))

            router.push('/dashboard')
        } else {

            gerenciarCookie(false)
            let msg = await res.json()
            salvarAviso(msg, 'danger', 'register')
            router.push('/register')
        }
    }

    useEffect(() => {
        
        if(router.route != '/register') {

            if(Cookies.get('cool-admin')) {
                const user = JSON.parse(localStorage.getItem('usuario'))
                setUser(user)
                if(router.route == '/' || router.route == '/login') {
                    router.push('/dashboard')
                }
            } else {
                router.push('/login')
            }
        }
    }, [])

    return (
        <AuthContext.Provider value={{
            user,
            login,
            logout,
            regUser,
            criptografar,
        }}>
            {props.children}
        </AuthContext.Provider>
    )

}