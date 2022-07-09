import React, {useEffect, useState} from 'react';
import '../css/cart.css';
import {ButtonSign} from '../css/btn.js';
import {useCookies} from "react-cookie";
import {Api} from '../views/api-service';
import Orders from './orders/orders';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faTrash, faAdd, faSubtract} from '@fortawesome/free-solid-svg-icons';

function CartDetails(props) {
    const [token, setToken, deleteItems] = useCookies(['token']);
    const [items, setItems] = useState(props.cartCookie['cart-items']);
    const [activeBuyOptions, setActiveBuyOptions] = useState(true);
    const [orders, setOrders] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [totalPrice, setTotalPrice] = useState(0);
    const [subTotalPrice, setSubTotalPrice] = useState(0);
    const [itemsPrice, setItemsPrice] = useState(0);
    const [activePay, setActivePay] = useState(false);
    const lsDetails = ['artículo', 'Código', 'foto', 'precio', 'subtotal', '--'];
    const options = {style: 'currency', currency: 'MXN'};
    const numberFormat = new Intl.NumberFormat('es-MX', options);
    const delivery = 12000;
    const [trm, setTrm] = useState(0)

    useEffect(() => {
        if (items) {
            Api.get_trm().then(resp => setTrm(Number(resp.replace(/[^0-9.-]+/g, ""))))
            setItemsPrice(items.reduce((a, c) => a + c.price * c.qty, 0));
            setSubTotalPrice(itemsPrice * trm); // by now
            setTotalPrice(subTotalPrice + delivery); // by now
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
    }, [itemsPrice, items, props.counter, token, trm, subTotalPrice, totalPrice])

    const createOrder = () => {
        Api.get_user_id(token['token'])
            .then(resp => Api.profile(token['token'], resp['user_id']))
            .then(resp => resp['address'] === '' || resp['phone'] === 0 ?
                setErrorMessage(
                    'No hay una dirección y/o teléfono registrado para hacer el envío, ve a tu perfil para completar')
                : finishOrder())
    }

    function finishOrder() {
        var ranNumber = Math.floor(Math.random() * 100000);
        Api.get_user_id(token['token'])
            .then(resp => Api.profile(token['token'], resp['user_id']))
            .then(resp => Api.createOrder(token['token'],
                {user: resp['id'], number: ranNumber, data_json: items}))
            .then(resp => Api.getOrders(token['token'], resp['user']))
            .then(resp => setOrders(resp))
            .then(resp => deleteItems('cart-items', {path: '/'}));
        setItems(null);
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
            {props.counter === 0 ? <h2 className='gray'>Carro vacío</h2> :
                <div className='list-parts center bg-lightb mayus ls-cart'>
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
                                    <h6>{item.qty} x US ${item.price}</h6>
                                    <h6>${item.qty * item.price}</h6>
                                    <FontAwesomeIcon icon={faSubtract}
                                        className='purple not-border'
                                        onClick={() => removeItem(item)} />
                                    <FontAwesomeIcon icon={faAdd}
                                        onClick={() => setNewItem(item)}
                                        className='purple not-border' />
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
                            <h4 className='gray'>SubTotal: COL {numberFormat.format(subTotalPrice)}</h4>
                            <h4 className='gray'>Envió: COL {numberFormat.format(delivery)}</h4>
                            <h4 className=''>Total: COL {numberFormat.format(totalPrice)}</h4>
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
                                            Al crear la orden de compra, esta quedará en proceso de verificación
                                            y será confirmada cuando hallas realizado el pago de tu orden.
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
