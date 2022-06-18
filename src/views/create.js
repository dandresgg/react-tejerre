import React, {useContext, useState} from "react";
import {ButtonMenu} from '../css/btn';
import {NewMachine} from './components/new-machine'
import {NewSector} from './components/new-sector'
import {NewPart} from './components/new-part'


function Create() {
    const lsButtons = ['maquina', 'sector', 'repuesto']
    const [active, setActive] = useState(lsButtons[0])
    return (
        <div>
            <h1>Crea componetes</h1>
            <div className='d-flex w-50 center profile-data'>
                {lsButtons.map(btn => (
                    <ButtonMenu
                        key={btn}
                        onClick={() => setActive(btn)}
                        active={active === btn}>
                        {btn}
                    </ButtonMenu>
                ))}
            </div>
            <div>
                {active === lsButtons[0] ?
                    <NewMachine></NewMachine> : null}
                {active === lsButtons[1] ?
                    <NewSector></NewSector> : null}
                {active === lsButtons[2] ?
                    <NewPart></NewPart> : null}
            </div>
        </div >
    )
}

export default Create;
