import React, {useContext, useEffect, useState} from 'react';
import '../css/cart.css';
import {useNavigate} from 'react-router-dom';
import {ButtonSign, Anchor} from '../css/btn.js';

function CartDetails(props) {
    const [items, setItems] = useState(props.cartCookie['cart-items'])
    return (
        <div>
            <h1 className='center mt-1'>Carrito de compra</h1>
            {items.map(item => (
                <div className='list-parts-cart center'>
                    <h6>{item.description}</h6>
                    <h6>{item.code}</h6>
                    <img src={item.photo} alt="" />
                    <h6>{item.qty} x ${item.price}</h6>
                </div>
            ))}
        </div>
    )
}

export default CartDetails;
