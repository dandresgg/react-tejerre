import React, {useEffect, useState} from 'react';
import '../css/img.css';
import '../css/list.css';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faClose, faTrash, faAdd, faSubtract} from '@fortawesome/free-solid-svg-icons';
import {ButtonAdd} from '../css/btn.js';
import {useCookies} from "react-cookie";

function PartDetails(props) {
    const [cartCookie] = useCookies(['cart-items'])
    const [itemsCart, setItemsCart] = useState([props['itemsCart']]);
    const [addActive, setAddActive] = useState(false);
    const [itemCart, setItemCart] = useState([]);

    useEffect(() => {
        setAddActive(false)
        if (cartCookie['cart-items']) {
            setItemsCart(cartCookie['cart-items']);
            const exist = itemsCart.find((x) => x.id === props.part.id);
            if (exist) {
                setAddActive(true)
                setItemCart(exist)
            }
        } else {
            setAddActive(false)
        }
    }, [cartCookie, itemsCart, props.part.id, props.itemsCart, itemCart, props])

    const closePopup = () => {
        props.closePopup();
    }

    const setNewItem = (item) => {
        setAddActive(true)
        props.setNewItem(item);
    }

    const removeItem = (item) => {
        setAddActive(true)
        props.removeItem(item);
    }
    const deleteItem = (item) => {
        setAddActive(false)
        props.deleteItem(item);
    }


    return (
        <div className='part-details'>
            <FontAwesomeIcon className='icon-popup' icon={faClose} onClick={() => closePopup()} />
            <h1 >{props.part.description}</h1>
            <div className='photo center'>
                <img src={props.part.photo} alt="" />
            </div>
            <div className='d-flex center space-a'>
                <h2 className='white mayus'>precio</h2>
                <h2 className='white'>${props.part.price}</h2>
            </div>
            <div>
                <h3 className='white'>Inventario: {props.part.stock} disponibles</h3>
                <div>
                    {props.part.stock === 0 ? null :
                        <div>
                            {props.part.stock === itemCart.qty ?
                                <div>
                                    <h3>No puedes agregar mas repuestos, se agoto el inventario</h3>
                                    {!addActive || itemCart.qty < 1 ?
                                        <ButtonAdd onClick={() => setNewItem(props.part)}>agregar</ButtonAdd> :
                                        <div className='d-flex center space-b w-300 add-articles'>
                                            <FontAwesomeIcon icon={faTrash} className='center gray'
                                                onClick={() => deleteItem(props.part)} />
                                            <h4 className='white'>Cantidad: </h4>
                                            <h4 className='white ml-1'>{!itemCart.qty ? 0 : itemCart.qty}</h4>
                                            <FontAwesomeIcon icon={faSubtract}
                                                className='center gray'
                                                onClick={() => removeItem(props.part)} />
                                        </div>
                                    }
                                </div>
                                :
                                <div>
                                    {!addActive || itemCart.qty < 1 ?
                                        <ButtonAdd onClick={() => setNewItem(props.part)}>agregar</ButtonAdd> :
                                        <div className='d-flex center space-b w-300 add-articles'>
                                            <FontAwesomeIcon icon={faTrash} className='center gray'
                                                onClick={() => deleteItem(props.part)} />
                                            <h4 className='white'>Cantidad: </h4>
                                            <h4 className='white ml-1'>{!itemCart.qty ? 0 : itemCart.qty}</h4>
                                            <FontAwesomeIcon icon={faSubtract}
                                                className='center gray'
                                                onClick={() => removeItem(props.part)} />
                                            <FontAwesomeIcon icon={faAdd}
                                                onClick={() => setNewItem(props.part)}
                                                className='center gray' />
                                        </div>
                                    }
                                </div>
                            }
                        </div>
                    }
                </div>
            </div>
            <hr className='menu-hr' />
            <div className='center d-flex'>
                <div className='w-300'>
                    <h5 className='white mayus'>referencia</h5>
                    <h5 className='white'>{props.part.reference}</h5>
                </div>
                <div className='w-300'>
                    <h5 className='white mayus'>Codigo</h5>
                    <h5 className='white'>{props.part.code}</h5>
                </div>
            </div>
        </div>
    )
}

export default PartDetails;
