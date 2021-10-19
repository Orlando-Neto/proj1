import { createContext, useEffect, useState } from "react";

interface AppContextProps {
    
}

const AppContext = createContext<AppContextProps>({})

export default AppContext

export function AppProvider(props) {

    
    useEffect(() => {
        
    })

    return (
        <AppContext.Provider value={{
            
        }}>
            {props.children}
        </AppContext.Provider>
    )
}