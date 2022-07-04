import React, {useEffect, useState} from "react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faMagnifyingGlass} from "@fortawesome/free-solid-svg-icons";
import {faClose, faBinoculars} from "@fortawesome/free-solid-svg-icons";
import {ButtonMachine} from '../css/btn';

function HeadContent(props) {
    const [machine, setMachine] = useState(props.machines[0])
    const [active, setActive] = useState('');
    const [valToFind, setValToFind] = useState('');
    const [activeSearch, setActiveSearch] = useState(false);
    useEffect(() => {
        setMachine(props.machines[0]);
    }, [props.machines])

    const clickedMachine = itemM => evt => {
        setActive(itemM);
        setMachine(itemM);
        props.clickedMachine(itemM);
    }
    const hadleValToFind = (evt) => {
        setValToFind(evt.target.value);
    }
    const findPart = () => {
        props.getPart(valToFind);
    }
    return (
        <div className='mayus p-btn'>
            <div className='title'>
                {activeSearch ?
                    <div className="d-flex">
                        <div className="absolute w-100 d-flex">
                            <div className="close-search">
                                <div onClick={findPart}>
                                    <FontAwesomeIcon icon={faBinoculars} />
                                    <h6 className='s-size'>buscar</h6>
                                </div>
                            </div>
                            <input type="number" className='search' onChange={hadleValToFind} value={valToFind}
                                placeholder='número de referencia de repuesto' id="search-bar" />
                            <div className="close-search">
                                <div onClick={() => setActiveSearch(false)}>
                                    <FontAwesomeIcon icon={faClose} id="close-s" />
                                    <h6 className='s-size'>cerrar</h6>
                                </div>
                            </div>
                        </div>
                    </div> :
                    <FontAwesomeIcon icon={faMagnifyingGlass} className="fix fix-icon-search"
                        onClick={() => setActiveSearch(true)} id="search-icon" />
                }
                <div className="d-flex">
                    {props.machines && props.machines.map(itemM => (
                        <ButtonMachine
                            key={itemM.name}
                            active={active === itemM}
                            onClick={clickedMachine(itemM)}
                        >
                            {itemM.name}
                        </ButtonMachine>
                    ))}
                </div>
                <h1 className='center ll-size'>
                    {!machine ? 'kh-860' : machine.name}
                </h1>
                <hr className="hr-menu" />
            </div>
        </div>
    )
}
export default HeadContent;
