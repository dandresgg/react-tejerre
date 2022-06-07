import React, {useEffect, useState} from "react";
import {useCookies} from "react-cookie";
import {Api} from './api-service';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faAdd, faClose, faEdit, faIdCard, faMailBulk, faMapLocation, faPhone, faUser} from "@fortawesome/free-solid-svg-icons";
import '../css/colors.css'
import {ButtonUpdate, InputSign} from '../css/btn';


function ProfileDetails(props) {
    const [token] = useCookies(['token']);
    const [user, setUser] = useState([]);
    const [iteamActive, setItemActive] = useState('no nulo');
    useEffect(() => {
        if (!token['token']) {
            window.location.href = '/perfil/';
        }
        Api.profile(token['token']).then((resp => setUser(resp)))
    }, [token])
    const data_profile = ['name', 'email', 'address', 'phone', 'document'];
    const ls_profile = ['Nombre', 'Email', 'Direccion', 'Telefono', 'Documento'];
    const ls_icons = [faUser, faMailBulk, faMapLocation, faPhone, faIdCard]
    const updateItem = (item) => {
        console.log(item)
        setItemActive(item)
    }
    return (
        <div>
            <h1 >Datos de tu cuenta</h1>
            <div className="center w-50 mb-1">
                {data_profile.map((item, index) => (
                    <div className="space-a profile-data w-50 center" key={item}>
                        <h4>
                            <div className="d-flex space-b">
                                <FontAwesomeIcon icon={ls_icons[index]} /> {ls_profile[index]}
                                {iteamActive !== ls_profile[index] ?
                                    <div>
                                        {user[item] ? <FontAwesomeIcon icon={faEdit} className="purple"
                                            onClick={() => updateItem(ls_profile[index])} /> :
                                            <FontAwesomeIcon icon={faAdd} className="purple"
                                                onClick={() => updateItem(ls_profile[index])}
                                            />}

                                    </div> :
                                    <FontAwesomeIcon icon={faClose} className='purple'
                                        onClick={() => setItemActive("no nulo")} />
                                }
                            </div>
                            <div>
                                {iteamActive !== ls_profile[index]
                                    ? <div className="gray">{user[item]}</div> :
                                    <div>
                                        {ls_profile[index] !== 'Direccion' ?
                                            <InputSign type="text"
                                                placeholder={user[item] ?
                                                    user[item] : 'Digita' + "__" + ls_profile[index]}
                                            /> :
                                            <textarea id="area" name="" cols="30" rows="5"
                                                placeholder={user[item] ?
                                                    user[item] : 'Digita' + "__" + ls_profile[index]}
                                            />
                                        }
                                        <div>
                                            <ButtonUpdate>Actualizar</ButtonUpdate>
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
