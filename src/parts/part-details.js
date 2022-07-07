import React, {useEffect, useState} from 'react';
import '../css/img.css';
import '../css/list.css';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faClose, faTrash, faAdd, faSubtract} from '@fortawesome/free-solid-svg-icons';
import {ButtonAdd} from '../css/btn.js';
import {useCookies} from "react-cookie";
import {useNavigate} from 'react-router-dom';
import {Anchor} from '../css/btn';

function PartDetails(props) {
    const [cartCookie] = useCookies(['cart-items'])
    const [token] = useCookies(['token'])
    const [itemsCart, setItemsCart] = useState([props['itemsCart']]);
    const [addActive, setAddActive] = useState(false);
    const [itemCart, setItemCart] = useState([]);
    const options = {style: 'currency', currency: 'MXN'};
    const numberFormat = new Intl.NumberFormat('es-MX', options);

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
    function earns(price) {
        price = parseFloat(price)
        let earn = price + (price * 0.5)
        return earn
    }
    function earnsCol(price, trm) {
        price = parseFloat(price)
        trm = Number(trm.replace(/[^0-9.-]+/g, ""));
        let earn = price + (price * 0.5)
        return earn * trm
    }

    let navigate = useNavigate();
    const goContact = () => {
        let path = '/contacto';
        navigate(path);
    }
    return (
        <div className='part-details'>
            <FontAwesomeIcon className='icon-popup' icon={faClose} onClick={() => closePopup()} />
            <div className='d-flex center space-a f-wrap'>
                <div className='photo w-50'>
                    <img src={props.part.photo} alt="" />
                </div>
                <div className='mb-3 w-50'>
                    <h1 className='center mt-3'>{props.part.description}</h1>
                    <h2 >US {numberFormat.format(earns(props.part.price))} </h2>
                    <h5>TRM ${props.trm}</h5>
                    <h5 className='green'>COL {numberFormat.format(earnsCol(props.part.price, props.trm))} </h5>
                    <h4 className='gray'>
                        Inventario: <strong className='purple'> {props.part.stock}</strong> disponibles
                    </h4>
                    <h5 className='purple'> Agregar al carrito de compra</h5>
                    <div>
                        {props.part.stock === 0 || !token['token'] ?
                            <div>
                                <h5 className='w-50 center'>
                                    Para poder comprar regístrate o quizás no hay inventario
                                </h5>
                                <h6 className='orange w-50 center'>
                                    Puedes hacer compra internacional en caso de que no halla inventario local,
                                    esta puede tardar entre 30 y 45 días en llegar.
                                    Ve a <Anchor onClick={goContact}> contacto</Anchor> para más información
                                </h6>
                            </div>
                            :
                            <div>
                                {props.part.stock === itemCart.qty ?
                                    <div>
                                        <h3>No puedes agregar mas repuestos, se agoto el inventario</h3>
                                        {!addActive || itemCart.qty < 1 ?
                                            <ButtonAdd onClick={() => setNewItem(props.part)}>agregar</ButtonAdd> :
                                            <div className='d-flex center space-b w-300 add-articles'>
                                                <FontAwesomeIcon icon={faTrash} className='center gray'
                                                    onClick={() => deleteItem(props.part)} />
                                                <h4 className='gray'>Cantidad: </h4>
                                                <h4 className='gray ml-1'>{!itemCart.qty ? 0 : itemCart.qty}</h4>
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
                                                <h4 className='gray'>Cantidad: </h4>
                                                <h4 className='gray ml-1'>{!itemCart.qty ? 0 : itemCart.qty}</h4>
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
                    <h6 className='m-0 mt-1 gray mayus'>referencia</h6>
                    <h6 className='m-0'> {props.part.reference}</h6>
                    <h6 className='m-0 mt-1 gray mayus'>codigo</h6>
                    <h6 className='m-0'>{props.part.code}</h6>
                </div>
            </div>
        </div>
    )
}

export default PartDetails;
