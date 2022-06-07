import React, {useState, useEffect, createContext} from "react";
import {useCookies} from "react-cookie";
import {Login} from "./auth-login";
import {SingUp} from "./auth-signup";

export const ActiveLogin = createContext(null);

function Auth() {
    const [token, setToken] = useCookies(['token']);

    useEffect(() => {
        if (token['token']) {
            window.location.href = '/perfil/detalles';
        }
    }, [token])

    const [activeLog, setActiveLog] = useState(true);

    return (
        <ActiveLogin.Provider value={{activeLog, setActiveLog}}>
            <div>
                {activeLog ? <Login /> : <SingUp />}
            </div>
        </ActiveLogin.Provider>
    )
}
export default Auth;
