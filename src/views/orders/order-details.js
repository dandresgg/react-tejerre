import React, {useEffect, useState} from 'react';
import '../../css/cart.css';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faClose} from "@fortawesome/free-solid-svg-icons";

function OrderDetails(props) {
    const lsDetails = ['artículo', 'Código', 'foto', 'precio', 'subtotal']
    const closePopup = () => {
        props.closePopup(false);
    }
    const [totalPrice, setTotalPrice] = useState(0)
    const [itemsPrice, setItemsPrice] = useState(0)
    const delivery = 12000
    useEffect(() => {
        setItemsPrice(props.order.data_json.reduce((a, c) => a + c.price * c.qty, 0));
        setTotalPrice(itemsPrice + delivery); // by now
    }, [itemsPrice, totalPrice, props.order.data_json])
    return (
        <div className='part-details'>
            <FontAwesomeIcon className='icon-popup' icon={faClose} onClick={() => closePopup()} />
            <h1>Orden de compra # {props.order.number}</h1>
            <div className='list-parts center bg-lightb mayus'>
                {lsDetails.map((ls, index) => (
                    <h6 className='white' key={ls + index}>{ls}</h6>
                ))}
            </div> :
            {props.order && props.order.data_json.map(order => (
                <div key={order.code + order.qty}>
                    {order.qty > 0 ?
                        <div className='list-parts center'>
                            <h6>{order.description}</h6>
                            <h6>{order.code}</h6>
                            <img src={order.photo} alt="" />
                            <h6>{order.qty} x ${order.price}</h6>
                            <h6>${order.qty * order.price}</h6>
                        </div> : null
                    }
                </div>
            ))}
            <div>
                <h2 className='white'>Envió = ${delivery}</h2>
                <h2>Total = ${totalPrice}</h2>
            </div>
        </div>
    )
}
export default OrderDetails;
