import React, {useEffect} from 'react';
import '../css/cart.css';
import {useNavigate} from 'react-router-dom';
import {ButtonSign, Anchor} from '../css/btn.js';
import {useCookies} from 'react-cookie';

function Cart() {
    const [token] = useCookies(['token'])
    useEffect(() => {
        if (token['token']) {
            window.location.href = '/cart/detalles/'
        }
    }, [token])
    let navigate = useNavigate();
    const goRegister = () => {
        let path = '/perfil';
        navigate(path);
    }
    return (
        <div>
            <div className='mt-menu center'>
                <h1>Carrito de compra</h1>
                <h4 className='w-50 center gray'>Para agregar al carrito, ingresa a tu cuenta</h4>
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
