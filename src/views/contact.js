import React from "react";
import {InputSign, TextareaSign, ButtonSign} from '../css/btn.js';

function Contact() {
    return (
        <div className="mt-menu">
            <h1>Contacta Con Nosotros</h1>
            <form action="">
                <div>
                    <InputSign type="text" placeholder="Nombre" />
                </div>
                <div>
                    <InputSign type="text" placeholder="Correo" />
                </div>
                <div>
                    <TextareaSign placeholder="Mensaje" />
                </div>
                <ButtonSign>Enviar Mensaje</ButtonSign>
            </form>
        </div>
    )
}
export default Contact;
