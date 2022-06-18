import React, { useState} from "react";
import {ButtonSign, InputSign, Selector} from '../../css/btn';
import {Api} from "../api-service";

export const NewMachine = () => {
    const lsOptions = ['knitting', 'swewing']
    const [errorMessage, setErrorMessage] = useState('')
    const [name, setName] = useState('');
    const [kind, setKind] = useState(lsOptions[0]);
    const handleName = () => evt => {
        console.log(evt.target.value)
        setName(evt.target.value)
    }
    function handleError(resp) {
        console.log(resp)
        setErrorMessage(resp.name)
    }
    function createMachine() {
        Api.machine({name: name, kind: kind})
            .then(resp => resp ? handleError(resp) : null)
    }
    return (
        <div>
            <h3 className='mayus gray'>nueva maquina</h3>
            {errorMessage && <div className="alert-danger">{errorMessage}</div>}
            <h5 className='m-0 gray mayus'>tipo</h5>
            <Selector
                onChange={(e) => setKind(e.target.value)}
            >
                {lsOptions.map(elem => (
                    <option value={elem} key={elem}>
                        {elem}
                    </option>
                ))}
            </Selector>
            <br />
            <InputSign type="text" placeholder="Nombre" id="username"
                defaultValue="" onChange={handleName()} />
            <h6></h6>
            <ButtonSign onClick={createMachine}>crear</ButtonSign>
        </div>
    )
}
