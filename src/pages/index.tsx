import { useRouter } from "next/router"
import { useEffect } from "react"
import Head from "../components/Layout/Head"
import Login from "../components/Layout/Login"

export default function IndexPage() {

    const router = useRouter()

    useEffect(() => {
        router.push('/login')
    }, [])

    return (
        <div>
            Proibido estar aqui malandro!
        </div>
    )
}