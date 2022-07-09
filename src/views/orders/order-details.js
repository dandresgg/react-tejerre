import React, {useEffect, useState} from 'react';
import '../../css/cart.css';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faClose} from "@fortawesome/free-solid-svg-icons";
import {Api} from '../api-service';

function OrderDetails(props) {
    const lsDetails = ['artículo', 'Código', 'foto', 'precio', 'subtotal']
    const closePopup = () => {
        props.closePopup(false);
    }
    const [totalPrice, setTotalPrice] = useState(0)
    const [itemsPrice, setItemsPrice] = useState(0)
    const [subTotalPrice, setSubTotalPrice] = useState(0);
    const [trm, setTrm] = useState(0)
    const delivery = 12000
    const options = {style: 'currency', currency: 'MXN'};
    const numberFormat = new Intl.NumberFormat('es-MX', options);
    useEffect(() => {
        Api.get_trm().then(resp => setTrm(Number(resp.replace(/[^0-9.-]+/g, ""))))
        setItemsPrice(props.order.data_json.reduce((a, c) => a + c.price * c.qty, 0));
        setSubTotalPrice(itemsPrice * trm); // by now
        setTotalPrice(subTotalPrice + delivery); // by now
    }, [itemsPrice, totalPrice, props.order.data_json, subTotalPrice, trm])
    return (
        <div className='part-details'>
            <FontAwesomeIcon className='icon-popup' icon={faClose} onClick={() => closePopup()} />
            <h1>Orden de compra # {props.order.number}</h1>
            <div className='list-parts center bg-lightb mayus ls-cart'>
                {lsDetails.map((ls, index) => (
                    <h6 className='white' key={ls + index}>{ls}</h6>
                ))}
            </div> :
            {props.order && props.order.data_json.map(order => (
                <div key={order.code + order.qty}>
                    {order.qty > 0 ?
                        <div className='list-parts center ls-cart'>
                            <h6>{order.description}</h6>
                            <h6>{order.code}</h6>
                            <img src={order.photo} alt="" />
                            <h6>{order.qty} x US ${order.price}</h6>
                            <h6>${order.qty * order.price}</h6>
                        </div> : null
                    }
                </div>
            ))}
            <div>
                <h4 className='gray'>SubTotal: COL {numberFormat.format(subTotalPrice)}</h4>
                <h4 className='gray'>Envió: COL {numberFormat.format(delivery)}</h4>
                <h4 className=''>Total: COL {numberFormat.format(totalPrice)}</h4>
            </div>
        </div>
    )
}
export default OrderDetails;
