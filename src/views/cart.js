import React from 'react';
import '../css/cart.css';
import {useNavigate} from 'react-router-dom';
import {ButtonSign, Anchor} from '../css/btn.js';

function Cart() {
    let navigate = useNavigate();
    const goRegister = () => {
        let path = '/perfil';
        navigate(path);
    }
    return (
        <div>
            <div className='mt-menu cart-board center'>
                <h1 className='w-50 center'>Para agregar al carrito, ingresa a tu cuenta</h1>
                <div className='mt-cart'>
                    <ButtonSign onClick={goRegister}>Crear Cuenta</ButtonSign>
                </div>
                <div>
                    <Anchor onClick={goRegister}>Ingresar</Anchor>
                </div>
            </div>
        </div>
    )
}

export default Cart;
