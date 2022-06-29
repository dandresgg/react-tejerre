import React, {useEffect, useState} from 'react';
import '../../css/cart.css';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCircleInfo, faCheck, faXmark, faTrashAlt, faStamp} from "@fortawesome/free-solid-svg-icons";
import {ButtonUpdate} from '../../css/btn';
import {Api} from '../api-service';
import {useCookies} from "react-cookie";
import OrderDetails from './order-details'

function Orders(props) {
    const [token] = useCookies(['token']);
    const [orders, setOrders] = useState(props['orders']);
    const lsOrder = ['info', 'numero orden', 'estado', 'fecha', 'enviado', 'factura', '--'];
    const [order, setOrder] = useState([]);
    const [partActive, setPartActive] = useState(false);
    const [file, setFile] = useState('');
    const [user, setUser] = useState('');

    useEffect(() => {
        setOrders(props['orders']);
        Api.get_user_id(token['token'])
            .then(resp => Api.profile(token['token'], resp['user_id']))
            .then(resp => setUser(resp['id']));
    }, [props, token])

    const deleteOrder = (order) => {
        let orderMsm = document.getElementById(order.created);
        orderMsm.style.display = 'block';
    }

    const notDeleteOrder = (order) => {
        let orderMsm = document.getElementById(order.created);
        let fileUpload = document.getElementById(order.created + order.number);
        orderMsm.style.display = 'none';
        fileUpload.style.display = 'none';
    }
    const confirmDeleteOrder = (order) => {
        Api.deleteOrder(token['token'], order.id).then(resp => window.location.href = '/cart/detalles')
        Api.get_user_id(token['token'])
            .then(resp => Api.profile(token['token'], resp['user_id']))
            .then(resp => Api.getOrders(token['token'], resp['id']))
            .then(resp => resp !== 'false' ? setOrders(resp) : setOrders(null))
    }

    const openDetail = (order) => {
        setOrder(order)
        setPartActive(true)
    }
    const closePopup = () => {
        setPartActive(false)
    }

    const upFile = (order) => evt => {
        setFile(evt.target.files[0]);
        let fileUpload = document.getElementById(order.created + order.number);
        fileUpload.style.display = 'block';

    }
    const confirmOrder = (order) => {
        let fileUpload = document.getElementById(order.created + order.number);
        const formData = new FormData();
        formData.append('user', user);
        formData.append('bill', file);
        formData.append('state', 'revision');
        Api.updateOrder(
            token['token'], order.id, formData)
            .then(resp => Api.getOrders(token['token'], user))
            .then(resp => resp !== 'false' ? setOrders(resp) : setOrders(null))
            .then(resp => fileUpload.style.display = 'none')
    }

    return (
        <div>
            {partActive ?
                <OrderDetails order={order} closePopup={closePopup}></OrderDetails> : null
            }
            <hr className='hr-menu mt-1' />
            <h4 className='mayus gray'>ordenes de compra</h4>
            <h5 className='gray w-50 center mt-1'>El pago lo puedes realizar a través de nequi
                al número <strong>316 567 5153</strong>
            </h5>
            <div>
                <div className='list-parts center bg-lightb'>
                    {lsOrder.map(ls => (
                        <h6 className='white mayus' key={ls} >{ls}</h6>
                    ))}
                </div>
                {orders.map ? orders.map((order, index) => (
                    <div key={index}>
                        <div key={order.number} className='list-parts center d-flex space-a'>
                            <h6><FontAwesomeIcon
                                icon={faCircleInfo}
                                className='center'
                                onClick={() => openDetail(order)} /></h6>
                            <h6 className='center'>{order.number}</h6>
                            <h6 className='center' >{order.state}</h6>
                            <h6 className='center'>{order.created}</h6>
                            <h6>
                                <FontAwesomeIcon icon={order.send ? faCheck : faXmark} className='center' />
                            </h6>                             <h6 className='center'>
                                <label htmlFor="bill">{order.bill ? order.bill : 'Adjuntar factura'}</label>
                                <br />
                                <input type="file" id='bill' onChange={upFile(order)} />
                            </h6>
                            {order.bill === '' ?
                                <h6><FontAwesomeIcon icon={faTrashAlt} className='center' onClick={() => deleteOrder(order)} /></h6> :
                                <h6><FontAwesomeIcon icon={faStamp} /> </h6>
                            }
                        </div>
                        <div id={order.created} className='hide'>
                            <h6 className='m-0'>Quieres borrar la orden de compra {order.number}?</h6>
                            <div className='w-50 center'>
                                <ButtonUpdate onClick={() => confirmDeleteOrder(order)}>si</ButtonUpdate>
                                <ButtonUpdate onClick={() => notDeleteOrder(order)}>no</ButtonUpdate>
                            </div>
                        </div>
                        <div id={order.created + order.number} className='hide'>
                            <h6 className='m-0'>Registra la factura para actualizar la orden de compra</h6>
                            <div className='w-50 center'>
                                <ButtonUpdate onClick={() => confirmOrder(order)}>confirmar</ButtonUpdate>
                                <ButtonUpdate onClick={() => notDeleteOrder(order)}>cerrar</ButtonUpdate>
                            </div>
                        </div>
                    </div>
                )) : null}
            </div>
        </div>

    )
}

export default Orders;
