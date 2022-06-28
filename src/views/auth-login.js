import React, {useContext, useState} from "react";
import {ButtonSign, InputSign, Anchor} from '../css/btn';
import {Api} from './api-service';
import {useCookies} from "react-cookie";
import {ActiveLogin} from "./auth";
import '../css/alerts.css'


export const Login = () => {
    const {activeLog, setActiveLog} = useContext(ActiveLogin);
    const [errorMessage, setErrorMessage] = useState('')
    const [token, setToken] = useCookies(['token']);
    const [userName, setUserName] = useState('');
    const [userPass, setUserPass] = useState('');
    const handleUser = () => evt => {
        setUserName(evt.target.value)
    }
    const handlePass = () => evt => {
        setUserPass(evt.target.value)
    }

    function handleError(resp) {
        if (resp.email) {
            setErrorMessage('Email: ' + resp.email)
        }
        if (resp.password) {
            setErrorMessage('Contraseña: ' + resp.password)
        }
        if (resp.non_field_errors) {
            setErrorMessage('Usuario y contraseña invalidos')
        }
    }

    const loginClicked = () => {
        Api.loginUser({email: userName, password: userPass})
            .then(resp => resp.token ?
                setToken('token', resp.token, {sameSite: 'none', secure: true, path: '/'}) : handleError(resp))
            .catch(error => console.log(error))
    }

    return (
        <div className="mt-menu">
            <h1>Bienvenido</h1>
            <h4 className="gray">Por favor ingresa para continuar</h4>
            {errorMessage && <div className="alert-danger">{errorMessage}</div>}
            <InputSign type="text" placeholder="Correo" id="username"
                defaultValue="" onChange={handleUser()} />
            <br />
            <InputSign type="password" placeholder="Contraseña" id="password"
                defaultValue="" onChange={handlePass()} />
            <Anchor>
                <h4>¿Olvidaste tu contraseña?</h4>
            </Anchor>
            <ButtonSign onClick={loginClicked}>Ingresar</ButtonSign>
            <div>
                <h4>¿Ya tienes cuenta?, <Anchor onClick={() => setActiveLog(false)}>registrate</Anchor> </h4>
            </div>
        </div>
    );
}
