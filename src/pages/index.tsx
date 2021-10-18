import Head from '../components/Layout/Head'
import Corpo from '../components/Layout/Corpo'
import useAuth from '../data/hook/useAuthData'

// Display list of users (in /pages/index.tsx)
export default function Usuarios() {
    
    const { login, logout } = useAuth()

    return (
        <>
            <Head />

            <Corpo>
                <button onClick={logout}>Logout</button>
            </Corpo>
        </>
    )
}