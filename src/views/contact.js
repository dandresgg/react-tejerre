import React from "react";
import {InputSign, TextareaSign, ButtonSign} from '../css/btn.js';

function Contact() {
    return (
        <div className="mt-menu">
            <h1>Hola</h1>
            <h4 className="gray">Envianos un correo</h4>
            <form action="">
                <div>
                    <InputSign type="text" placeholder="Nombre" className='input-out' />
                </div>
                <div>
                    <InputSign type="text" placeholder="Correo" className='input-out' />
                </div>
                <div>
                    <TextareaSign placeholder="Mensaje" className='input-out' />
                </div>
                <ButtonSign>Enviar Mensaje</ButtonSign>
            </form>
        </div>
    )
}
export default Contact;
