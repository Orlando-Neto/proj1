import { createContext, useEffect, useState } from "react";

interface AppContextProps {
    errors?: string,
    salvarError?: (msg: object) => void
}

export function AppProvider(props) {

    const [errors, setErrors] = useState('')

    function salvarError(msg = {success: null, error: null}) {
        if(msg.error != null) {
            setErrors(msg.error)
        }
    }

    useEffect(() => {
        
    })

    return (
        <AppContext.Provider value={{
            errors,
            salvarError
        }}>
            {props.children}
        </AppContext.Provider>
    )
}

const AppContext = createContext<AppContextProps>({})

export default AppContext
