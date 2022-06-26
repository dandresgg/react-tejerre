import React, {useEffect, useState} from 'react';
import '../css/cart.css';
import {ButtonSign} from '../css/btn.js';
import {useCookies} from "react-cookie";
import {Api} from '../views/api-service';
import Orders from './orders/orders';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faTrash, faAdd, faSubtract, faT} from '@fortawesome/free-solid-svg-icons';

function CartDetails(props) {
    const [token, setToken, deleteItems] = useCookies(['token']);
    const [items, setItems] = useState(props.cartCookie['cart-items'])
    const [user, setUser] = useState([]);
    const [activeBuyOptions, setActiveBuyOptions] = useState(true);
    const [orders, setOrders] = useState('');
    const [errorMessage, setErrorMessage] = useState('')
    const [totalPrice, setTotalPrice] = useState(0)
    const [itemsPrice, setItemsPrice] = useState(0)
    const [activePay, setActivePay] = useState(false)
    const lsDetails = ['articulo', 'Codigo', 'foto', 'precio', 'subtotal', '--']

    useEffect(() => {
        if (items) {
            setItemsPrice(items.reduce((a, c) => a + c.price * c.qty, 0));
            setTotalPrice(itemsPrice); // by now
            if (itemsPrice === 0 && props.counter === 0) {
                setActiveBuyOptions(false)
            } else {
                setActiveBuyOptions(true)
            }
        }
        Api.get_user_id(token['token'])
            .then(resp => Api.profile(token['token'], resp['user_id']))
            .then(resp => Api.getOrders(token['token'], resp['id'])
                .then(resp => resp !== 'false' ? setOrders(resp) : console.log(resp))
            )
    }, [itemsPrice, items, props.counter, token])

    const createOrder = () => {
        Api.get_user_id(token['token'])
            .then(resp => Api.profile(token['token'], resp['user_id']))
            .then(resp => setUser(resp));
        if (user['address'] === '') {
            setErrorMessage(
                'No hay una direccion registrada para hacer el envio, ve a tu perfil para completar');
        }
        else if (user['phone'] === 0) {
            setErrorMessage(
                'No hay un telefono registrado, ve a tu perfil para completar');
        }
        else {
            var ranNumber = Math.floor(Math.random() * 1000)
            Api.get_user_id(token['token'])
                .then(resp => Api.profile(token['token'], resp['user_id']))
                .then(resp => Api.createOrder(token['token'], {user: resp['id'], number: ranNumber, data_json: items}))
                .then(resp => Api.getOrders(token['token'], resp['user']))
                .then(resp => setOrders(resp))
                .then(resp => deleteItems('cart-items', {path: '/'}))
                ;
            setItems(null)
        }
    }
    const setNewItem = (item) => {
        props.setNewItem(item);
        setItems(props.itemsCart)
    }
    const removeItem = (item) => {
        props.removeItem(item);
        setItems(props.itemsCart)
    }
    const deleteItem = (item) => {
        props.deleteItem(item);
        setItems(props.itemsCart)
    }
    return (
        <div className='mb-3'>
            <h1 className='center mt-1'>Carrito de compra</h1>
            {props.counter === 0 ? <h2 className='gray'>Carro vacio</h2> :
                <div className='list-parts center bg-lightb mayus'>
                    {lsDetails.map(ls => (
                        <h6 className='white' key={ls}>{ls}</h6>
                    ))}
                </div>
            }
            {items ?
                <div>
                    {items.map(item => (
                        <div key={item.id}>
                            {item.qty > 0 ?
                                <div className='list-parts-cart center' key={item}>
                                    <h6>{item.description}</h6>
                                    <h6>{item.code}</h6>
                                    <img src={item.photo} alt="" />
                                    <h6>{item.qty} x ${item.price}</h6>
                                    <h6>${item.qty * item.price}</h6>
                                    <FontAwesomeIcon icon={faSubtract}
                                        className='purple'
                                        onClick={() => removeItem(item)} />
                                    <FontAwesomeIcon icon={faAdd}
                                        onClick={() => setNewItem(item)}
                                        className='purple' />
                                    <FontAwesomeIcon icon={faTrash}
                                        onClick={() => deleteItem(item)}
                                        className='purple' />
                                </div>
                                : null
                            }
                        </div>
                    ))}
                    {activeBuyOptions ?
                        <div>
                            <h4 className=''>Total: ${totalPrice}</h4>
                            <div>
                                {errorMessage && <div className="alert-danger">{errorMessage}</div>}
                                {!activePay ?
                                    <div>
                                        <h5>
                                            Crea una orden de compra para continuar con tu pedido
                                        </h5>
                                        <ButtonSign onClick={() => setActivePay(true)}>continuar</ButtonSign>
                                    </div> :
                                    <div>
                                        <h5 className='w-50 center'>
                                            Al crear la orden de compra, esta quedara en proceso de verificacion,
                                            y sera confirmada cuando hallas realizado el pago de tu orden.
                                        </h5>
                                        <ButtonSign className='mt-1' onClick={() => createOrder()}>
                                            crear orden de compra
                                        </ButtonSign>
                                    </div>
                                }
                            </div>
                        </div> : null
                    }
                </div>
                : null}
            <div>
                <Orders orders={orders}></Orders>
            </div>
        </div >
    )
}

export default CartDetails;
