import React, {useEffect, useState} from "react";
import {InputSign, TextareaSign, ButtonSign} from '../css/btn.js';
import {useCookies} from "react-cookie";
import {Api} from './api-service';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faWhatsapp} from '@fortawesome/free-brands-svg-icons';

function Contact() {
    const [token] = useCookies(['token']);
    const [user, setUser] = useState('')
    const [name, setInputName] = useState('')
    const [email, setInputMail] = useState('')
    const [msm, setInputMsm] = useState('')
    const [errorMessage, setErrorMessage] = useState('')
    const [successMessage, setSuccessMessage] = useState('')

    useEffect(() => {
        if (token['token']) {
            Api.get_user_id(token['token'])
                .then((resp => Api.profile(token['token'], resp.user_id)
                    .then((resp => setUser(resp)))))
            setInputName(user['username'])
            setInputMail(user['email'])
        }
    }, [])

    const setUsername = () => evt => {
        setInputName(evt.target.value)
    }
    const setEmail = () => evt => {
        setInputMail(evt.target.value)
    }
    const setMsm = () => evt => {
        setInputMsm(evt.target.value)
    }
    const setErrorMsm = (resp) => {
        setErrorMessage(resp)
        setSuccessMessage(null)
    }
    const setSuccessMsm = (resp) => {
        setErrorMessage(null)
        setSuccessMessage(resp)
    }
    const sendMsm = () => {
        Api.sendMsm({username: name, email: email, msm: msm})
            .then(resp =>
                resp !== 'done' ? setErrorMsm(resp) : setSuccessMsm('Mensaje enviado'))
    }

    return (
        <div className="mt-menu">
            <h1>Hola</h1>
            <h2 className="gray">Envíanos un correo</h2>
            {errorMessage && <div className="alert-danger">{errorMessage}</div>}
            {successMessage && <div className="alert-success">{successMessage}</div>}
            <div>
                <InputSign type="text"
                    placeholder='Nombre'
                    value={token ? user['username'] : null}
                    onChange={setUsername()}
                    className='input-out' />
            </div>
            <div>
                <InputSign type="text"
                    placeholder="Correo"
                    value={token ? user['email'] : null}
                    onChange={setEmail()}
                    className='input-out' />
            </div>
            <div>
                <TextareaSign
                    placeholder="Mensaje"
                    onChange={setMsm()}
                    className='input-out' />
            </div>
            <ButtonSign onClick={() => sendMsm()}>
                Enviar Mensaje
            </ButtonSign>
            <div>
                <h2 className="gray">O escríbenos al WhatsApp</h2>
                <FontAwesomeIcon icon={faWhatsapp} />
                <h3>316 567 5153</h3>
            </div>
        </div>
    )
}
export default Contact;
