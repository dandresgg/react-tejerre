import React, {useContext, useState} from "react";
import {ButtonSign, InputSign, Anchor} from '../css/btn';
import {Api} from './api-service';
import {useCookies} from "react-cookie";
import {ActiveLogin} from "./auth";

export const SingUp = () => {
    const {activeLog, setActiveLog} = useContext(ActiveLogin);
    const [errorMessage, setErrorMessage] = useState('')
    const [token, setToken] = useCookies(['token']);
    const [userName, setUsername] = useState('');
    const [userPass, setUserPass] = useState('');
    const [userPassConfirm, setUserPassConfirm] = useState('');
    const handleUser = () => evt => {
        setUsername(evt.target.value)
    }
    const handlePass = () => evt => {
        setUserPass(evt.target.value)
    }
    const handlePassConfirm = () => evt => {
        setUserPassConfirm(evt.target.value)
    }
    function handleError(resp) {
        if (resp.username && resp.password) {
            setErrorMessage('Los campos usuario y contrasena son requeridos')
        }
        if (resp.username) {
            setErrorMessage('Usuario: ' + resp.username[0])
        }
        if (resp.password) {
            setErrorMessage('Contrasena: ' + resp.password[0])
        }
        if (resp.non_field_errors) {
            setErrorMessage('Usuario y contrasena invalidos')
        }
    }

    const registerClicked = () => {
        const uppercaseRegExp = /(?=.*?[A-Z])/;
        const lowercaseRegExp = /(?=.*?[a-z])/;
        const digitsRegExp = /(?=.*?[0-9])/;
        const specialCharRegExp = /(?=.*?[#?!@$%^&*-])/;
        if (userPass !== userPassConfirm) {
            setErrorMessage('Contrasena no coincide')
        } else if (userPass.length < 6) {
            setErrorMessage('La contrasena debe tener mas de 6 caracteres')
        }
        else if (!uppercaseRegExp.test(userPass)) {
            setErrorMessage('Debes poner mayusculas')
        }
        else if (!lowercaseRegExp.test(userPass)) {
            setErrorMessage('Debes poner minusculas')
        }
        else if (!digitsRegExp.test(userPass)) {
            setErrorMessage('Debes poner numeros')
        }
        else if (!specialCharRegExp.test(userPass)) {
            setErrorMessage('Debes poner caracteres especiales')
        }
        else {
            Api.singUpUser({username: userName, password: userPass})
                .then(resp => resp.username === userName ?
                    Api.loginUser({username: userName, password: userPass})
                        .then(resp => setToken('token', resp.token))
                    : handleError(resp))
                .catch(error => console.log(error))
        }
    }

    return (
        <div className="mt-menu">
            <h1>Bienvenido</h1>
            <h4 className="gray">Completa tu registro para realizar compras</h4>
            {errorMessage && <div className="alert-danger">{errorMessage}</div>}
            <div>
                <InputSign type="text" placeholder="Nombre" id="username"
                    defaultValue="" onChange={handleUser()} />
            </div>
            <div>
                <InputSign type="password" placeholder="Contrasena" id="password"
                    defaultValue="" onChange={handlePass()} />
            </div>
            <div>
                <InputSign type="password" placeholder="Contrasena" id="password"
                    defaultValue="" onChange={handlePassConfirm()} />
            </div>
            <div className="mt-btn"></div>
            <ButtonSign onClick={registerClicked}>Registrar</ButtonSign>
            <div>
                <h4>Ya tienes cuenta?, <Anchor onClick={() => setActiveLog(true)}>Ingresar</Anchor> </h4>
            </div>
        </div>
    )
}
