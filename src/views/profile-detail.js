import React, {useEffect, useState} from "react";
import {useCookies} from "react-cookie";
import {Api} from './api-service';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faAdd, faClose, faEdit, faIdCard, faMailBulk, faMapLocation, faPhone, faUser, faSignOutAlt} from "@fortawesome/free-solid-svg-icons";
import '../css/colors.css'
import {ButtonUpdate, InputSign, TextareaSign} from '../css/btn';


function ProfileDetails(props) {
    const [token, setToken, deleteToken] = useCookies(['token']);
    const [user, setUser] = useState([]);
    const [iteamActive, setItemActive] = useState('no nulo');
    const [inputData, setInputData] = useState('');
    const [errorMessage, setErrorMessage] = useState('')
    const data_profile = ['username', 'email', 'address', 'phone'];
    const ls_profile = ['Nombre', 'Email', 'Direccion', 'Telefono'];
    const ls_icons = [faUser, faMailBulk, faMapLocation, faPhone, faIdCard]

    useEffect(() => {
        if (!token['token']) {
            window.location.href = '/perfil/';
        }
        Api.get_user_id(token['token'])
            .then((resp => Api.profile(token['token'], resp.user_id)
                .then((resp => setUser(resp)))))
    }, [token])

    const updateItem = (item) => {
        setItemActive(item)
    }

    const setDataUser = () => evt => {
        setInputData(evt.target.value)
    }

    const setUpdate = (item) => {
        const digitsRegExp = /(?=.*?[0-9])/;
        const specialCharRegExp = /(?=.*?[@.])/;
        if (item === 'email' && !specialCharRegExp.test(inputData)) {
            setErrorMessage('Correo invalido')
        }
        else if (item === 'address' && !digitsRegExp.test(inputData)) {
            setErrorMessage('Direccion invalida')
        }
        else {
            Api.update_profile(token['token'], {body: [item, inputData]})
                .then((resp => setUser(resp)))
                .then(() => setErrorMessage(''))
        }
    }
    const logOut = () => {
        deleteToken('token', {path: '/'});
    }

    return (
        <div>
            <div className='out-icon' onClick={logOut}>
                <FontAwesomeIcon icon={faSignOutAlt}></FontAwesomeIcon>
                <h6 className='m-0 mayus'>salir</h6>
            </div>
            <h1 >Datos de tu Cuenta</h1>
            {errorMessage && <div className="alert-danger">{errorMessage}</div>}
            <div className="center w-50 mb-1">
                {data_profile.map((item, index) => (
                    <div className="space-a profile-data w-50 center" key={item}>
                        <h4>
                            <div className="d-flex space-b">
                                <FontAwesomeIcon icon={ls_icons[index]} /> {ls_profile[index]}
                                {iteamActive !== ls_profile[index] ?
                                    <div>
                                        {user[item] ? <FontAwesomeIcon icon={faEdit}
                                            className="purple profile-icon"
                                            onClick={() => updateItem(ls_profile[index])} /> :
                                            <FontAwesomeIcon icon={faAdd} className="purple profile-icon"
                                                onClick={() => updateItem(ls_profile[index])}
                                            />}

                                    </div> :
                                    <FontAwesomeIcon icon={faClose} className='purple profile-icon'
                                        onClick={() => setItemActive("no nulo")} />
                                }
                            </div>
                            <div>
                                {iteamActive !== ls_profile[index]
                                    ? <div className="gray">{user[item]}</div> :
                                    <div>
                                        <div className="gray">{user[item]}</div>
                                        {ls_profile[index] !== 'Direccion' ?
                                            <InputSign type={
                                                data_profile[index] === 'phone' ?
                                                    'number' : 'text'
                                            }
                                                defaultValue=""
                                                onChange={setDataUser()}
                                                placeholder={user[item] ?
                                                    user[item] : 'Digita' + "__" + ls_profile[index]}
                                            /> :
                                            <div>
                                                <h6 className="m-0 mt-1">No olvides incluir departamento - ciudad - barrio</h6>
                                                <h6 className="m-0">para facilitar el envio</h6>
                                                <TextareaSign id="area" name=""
                                                    onChange={setDataUser()}
                                                    placeholder={user[item] ?
                                                        user[item] : 'Digita' + "__" + ls_profile[index]}
                                                />
                                            </div>
                                        }
                                        <div>
                                            <ButtonUpdate onClick={() => setUpdate(data_profile[index])}>
                                                {user[item] ?
                                                    "Actualizar" : "Registrar"
                                                }
                                            </ButtonUpdate>
                                        </div>
                                    </div>
                                }
                            </div>
                        </h4>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default ProfileDetails;
