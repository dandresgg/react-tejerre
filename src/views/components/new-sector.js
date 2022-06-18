import React, {useEffect, useState} from "react";
import {ButtonSign, InputSign, Selector} from '../../css/btn';
import {Api} from "../api-service";

export const NewSector = () => {
    const lsOptions = ['upper_car', 'lower_car',
        'needle_bed', 'needle_selector', 'transpor_bag', 'left_car', 'right_car', 'accesories']

    const [machines, setMachines] = useState([]);
    const [machine, setMachine] = useState('');
    const [kind, setKind] = useState(lsOptions[0]);

    useEffect(() => {
        Api.machineList().then(resp => setMachines(resp))
        Api.machineList().then(resp => setMachine(resp[0]['id']))
    }, [])


    const [errorMessage, setErrorMessage] = useState('')
    const [img, setImg] = useState('');

    const handleDescription = () => evt => {
        console.log(evt.target.value)
        setImg(evt.target.value)
    }
    function handleError(resp) {
        console.log(resp)
        setErrorMessage(resp.img)
    }
    function createSector() {
        Api.sector({machine: machine, kind: kind, img: img}).then(resp => handleError(resp))
    }
    return (
        <div>
            <h3 className='mayus gray'>nuevo sector</h3>
            {errorMessage && <div className="alert-danger">{errorMessage}</div>}
            <h5 className='m-0 gray mayus'>tipo</h5>
            <Selector
                onChange={(e) => setMachine(e.target.value)}
            >
                {machines.map(elem => (
                    <option key={elem.name} value={elem.id}>
                        {elem.name}
                    </option>
                ))}
            </Selector>
            <br />
            <Selector
                onChange={(e) => setKind(e.target.value)}
            >
                {lsOptions.map(elem => (
                    <option key={elem} value={elem}>
                        {elem}
                    </option>
                ))}
            </Selector>
            <br />
            <InputSign type="text" placeholder="Imagen" id="img"
                defaultValue="" onChange={handleDescription()} />
            <br />
            <ButtonSign onClick={createSector}>crear</ButtonSign>
        </div>
    )
}
