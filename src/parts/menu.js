import React, {useState} from "react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faShoppingCart, faUser, faToolbox, faBlog, faAddressBook} from "@fortawesome/free-solid-svg-icons";
import {
    Link
} from "react-router-dom";
import {ButtonMenu} from "../css/btn";

export const MenuOptions = () => {
    const lsMenu = ['perfil', 'repuestos', 'blog', 'contacto', 'carro']
    const icons = [faUser, faToolbox, faBlog, faAddressBook, faShoppingCart]
    const [active, setActive] = useState(lsMenu[0])
    return (
        <div className="mt-menu">
            {lsMenu.map((menu, index) => (
                <Link to={menu} key={index + menu}>
                    <ButtonMenu className="mayus bold"
                        key={menu + index}
                        active={active === menu}
                        onClick={() => setActive(menu)}>
                        <div className='d-flex space-b'>
                            {menu} <FontAwesomeIcon icon={icons[index]} />
                        </div>
                    </ButtonMenu>
                </Link>
            ))}
        </div>
    )
}
