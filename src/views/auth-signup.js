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
    const [userEmail, setUserEmail] = useState('');
    const [userPass, setUserPass] = useState('');
    const [userPassConfirm, setUserPassConfirm] = useState('');
    const handleUser = () => evt => {
        setUsername(evt.target.value)
    }
    const handleEmail = () => evt => {
        setUserEmail(evt.target.value)
    }
    const handlePass = () => evt => {
        setUserPass(evt.target.value)
    }
    const handlePassConfirm = () => evt => {
        setUserPassConfirm(evt.target.value)
    }
    function handleError(resp) {
        console.log(resp)
        if (resp.username && resp.password) {
            setErrorMessage('Los campos usuario y contraseña son requeridos')
        }
        if (resp.username) {
            setErrorMessage('Usuario: ' + resp.username[0])
        }
        if (resp.email) {
            setErrorMessage('Correo: ' + resp.email[0])
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
            setErrorMessage('Contraseña no coincide')
        } else if (userPass.length < 6) {
            setErrorMessage('La contraseña debe tener más de 6 caracteres')
        }
        else if (!uppercaseRegExp.test(userPass)) {
            setErrorMessage('Debes poner mayúsculas')
        }
        else if (!lowercaseRegExp.test(userPass)) {
            setErrorMessage('Debes poner minúsculas')
        }
        else if (!digitsRegExp.test(userPass)) {
            setErrorMessage('Debes poner números')
        }
        else if (!specialCharRegExp.test(userPass)) {
            setErrorMessage('Debes poner caracteres especiales, ej. #, $, ^')
        }
        else {
            Api.singUpUser({username: userName, email: userEmail, password: userPass})
                .then(resp => resp.username === userName ?
                    Api.loginUser({email: userEmail, password: userPass})
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
                <InputSign type="email" placeholder="Email" id="email"
                    defaultValue="" onChange={handleEmail()} />
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
                <h4>¿Ya tienes cuenta?,<Anchor onClick={() => setActiveLog(true)}>Ingresar</Anchor> </h4>
            </div>
        </div>
    )
}
