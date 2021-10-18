import { createContext, useEffect, useState } from "react"
import Usuario from "../../model/Usuario"
import Cookies from 'js-cookie'
import router from "next/router"

interface AuthContextProps {
    user?: Usuario,
    login?: (e, form) => Promise<void>
    logout?: () => void
}

const AuthContext = createContext<AuthContextProps>({})

export default AuthContext

function gerenciarCookie(logado: boolean) {
    if(logado) {
        Cookies.set('cool-admin', logado, {
            expires: 1
        })
        
    } else {
        Cookies.remove('cool-admin')
        router.push('/login')
    }
}

export function AuthProvider(props) {
    
    const [user, setUser] = useState(null)
    
    async function login(e, form) {

        e.preventDefault()
        
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
                id: user.id
            }))
            router.push('/')
        } else {
            gerenciarCookie(false)
            router.push('/login')
        }
    }

    function logout() {
        setUser(null)
        gerenciarCookie(false)
        localStorage.removeItem('usuario')

        router.push('/login')
    }

    useEffect(() => {
        if(Cookies.get('cool-admin')) {
            const user = JSON.parse(localStorage.getItem('usuario'))
            setUser(user)
            router.push('/')
        } else {
            router.push('/login')
        }
    }, [])

    return (
        <AuthContext.Provider value={{
            user,
            login,
            logout
        }}>
            {props.children}
        </AuthContext.Provider>
    )

}