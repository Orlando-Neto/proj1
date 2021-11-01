import Head from '../components/Layout/Head'
import Corpo from '../components/Layout/Corpo'
import useAuth from '../data/hook/useAuthData'

// Display list of users (in /pages/index.tsx)
export default function DashBoardPage() {

    const { logout } = useAuth()


    return (
        <>
            <Head />

            <Corpo>
                
            </Corpo>
        </>
    )
}