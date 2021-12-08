import { createContext, useEffect, useState } from "react";

interface AppContextProps {
    avisos?: {campo: {}},
    salvarAviso?: (msg: any, className: string, id: string) => void
    resetaAviso?: () => void
}

export function AppProvider(props) {

    const [avisos, setAviso] = useState({campo: {}})

    function salvarAviso(msg: any, className: string, id: string) {
        
        if(typeof msg === 'object' && msg.campo != null) {
            avisos.campo = {}
            avisos.campo[msg.campo] = msg.mensagem
        } else {
            avisos[id] = {msg, className}
            avisos.campo = undefined
        }

        setAviso(avisos)
    }

    function resetaAviso() {
        setAviso({campo: {}})
    }

    useEffect(() => {
        
    }, [])

    return (
        <AppContext.Provider value={{
            avisos,
            salvarAviso,
            resetaAviso
        }}>
            {props.children}
        </AppContext.Provider>
    )
}

const AppContext = createContext<AppContextProps>({})

export default AppContext
