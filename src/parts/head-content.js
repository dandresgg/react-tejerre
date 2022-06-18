import React, {useEffect, useState} from "react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faMagnifyingGlass} from "@fortawesome/free-solid-svg-icons";
import {faClose} from "@fortawesome/free-solid-svg-icons";
import {Api} from '../views/api-service';
import {ButtonMachine} from '../css/btn';

function HeadContent(props) {
    let searchBar = document.getElementById('search-bar');
    let closeSearch = document.getElementById('close-s');
    let iconSearch = document.getElementById('search-icon');
    const [machine, setMachine] = useState(props.machines[0])
    const [active, setActive] = useState('');
    useEffect(() => {
        setMachine(props.machines[0])
    }, [])


    const activeSearchBar = evt => {
        searchBar.style.display = "block"
        closeSearch.style.display = "block"
        iconSearch.style.display = "none"
    }
    const closeSearchBar = evt => {
        searchBar.style.display = "none"
        closeSearch.style.display = "none"
        iconSearch.style.display = "block"
    }
    const clickedMachine = itemM => evt => {
        setActive(itemM);
        setMachine(itemM)
        props.clickedMachine(itemM)
    }
    return (
        <div className='mayus p-btn'>
            <div className='title'>
                <div className="d-flex">
                    <div className="fix w-100 d-flex">
                        <input type="textarea" className='search hide'
                            placeholder='Buscar repuesto' id="search-bar" />
                        <div className="close-search">
                            <FontAwesomeIcon icon={faClose} className="hide" id="close-s"
                                onClick={closeSearchBar} />
                        </div>
                    </div>
                    <FontAwesomeIcon icon={faMagnifyingGlass} className="fix fix-icon-search"
                        onClick={activeSearchBar} id="search-icon" />
                </div>
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
