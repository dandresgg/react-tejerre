import React, {useEffect, useState} from "react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faShoppingCart, faUser, faToolbox, faBlog, faAddressBook, faTools} from "@fortawesome/free-solid-svg-icons";
import {useCookies} from "react-cookie";
import {
    Link
} from "react-router-dom";
import {Api} from '../views/api-service';
import {ButtonMenu} from "../css/btn";

export const MenuOptions = (props) => {
    const [token] = useCookies(['token']);
    const [items] = useCookies(['cart-items']);
    useEffect(() => {
        Api.ask_superuser(token['token'])
            .then(resp => {
                resp.detail === 'Invalid token.' || resp === 'no admin' ?
                    setIsSuperUser(false) : setIsSuperUser(true)
            })
    }, [items, token])
    const [isSuperUser, setIsSuperUser] = useState(false)
    var lsMenu = []
    var icons = []
    if (isSuperUser) {
        lsMenu = ['perfil', 'repuestos', 'blog', 'contacto', 'carro', 'crear']
        icons = [faUser, faToolbox, faBlog, faAddressBook, faShoppingCart, faTools]
    } else {
        lsMenu = ['perfil', 'repuestos', 'blog', 'contacto', 'carro']
        icons = [faUser, faToolbox, faBlog, faAddressBook, faShoppingCart]
    }
    const [active, setActive] = useState(lsMenu[0])
    return (
        <div className="mt-menu">
            <img src="https://res.cloudinary.com/hdiucqnlj/image/upload/v1654916305/TR4_nam9kw.png" alt=""
                className="nav-img-icon" />
            <h4 className="mayus font-icon">tejerepuestos</h4>
            <hr className="hr-menul mt-1" />
            <hr className="hr-menu" />
            <hr className="hr-menul" />
            <div className="menu-l">
                {lsMenu.map((menu, index) => (
                    <Link to={menu} key={index + menu}>
                        <ButtonMenu className="mayus bold"
                            key={menu + index}
                            active={active === menu}
                            onClick={() => setActive(menu)}>
                            <div className='d-flex space-b'>
                                {menu}
                                {menu === 'carro' && props.counter ? <div className="purple bg-w">{props.counter}</div> : null}
                                <FontAwesomeIcon icon={icons[index]} />
                            </div>
                        </ButtonMenu>
                    </Link>
                ))}
            </div>
        </div>
    )
}
