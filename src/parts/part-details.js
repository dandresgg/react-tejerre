import React, {useState} from 'react';
import '../css/img.css';
import '../css/list.css';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faClose, faTrash, faAdd, faSubtract} from '@fortawesome/free-solid-svg-icons';
import {ButtonAdd} from '../css/btn.js';

function PartDetails(props) {
    const closePopup = () => {
        props.closePopup();
    }
    const [itemsCart, setItemsCart] = useState(props.itemsCart);
    const [addActive, setAddActive] = useState(false);
    const [itemCart, setItemCart] = useState([]);
    const setNewItem = (item) => {
        setItemsCart(props.itemsCart)
        setAddActive(true)
        const exist = itemsCart.find((x) => x.id === item.id);
        if (exist) {
            setItemCart(exist);
        } else {
            setItemCart(item);
        }
        props.setNewItem(item);
    }
    return (
        <div className='part-details'>
            <FontAwesomeIcon className='icon-popup' icon={faClose} onClick={() => closePopup()} />
            <h1 className='white'>{props.part.description}</h1>
            <div className='photo center'>
                <img src={props.part.photo} alt="" />
            </div>
            <div className='d-flex center space-a'>
                <h2 className='white mayus'>precio</h2>
                <h2 className='white'>${props.part.price}</h2>
            </div>
            <div>
                <h3 className='white'>Inventario: {props.part.stock} disponibles</h3>
                {!addActive || itemCart.qty < 1 ?
                    <ButtonAdd onClick={() => setNewItem(props.part)}>agregar</ButtonAdd> :
                    <div className='d-flex center space-b w-300 add-articles'>
                        <FontAwesomeIcon icon={faTrash} className='center gray' onClick={() => setAddActive(false)} />
                        <h4 className='white'>Cantidad: </h4>
                        <h4 className='white ml-1'>{!itemCart.qty ? 0 : itemCart.qty}</h4>
                        <FontAwesomeIcon icon={faSubtract} className='center gray' />
                        <FontAwesomeIcon icon={faAdd} onClick={() => setNewItem(props.part)}
                            className='center gray' />
                    </div>
                }
            </div>
            <hr className='menu-hr' />
            <div className='center d-flex'>
                <div className='w-300'>
                    <h5 className='white mayus'>referencia</h5>
                    <h5 className='white'>{props.part.reference}</h5>
                </div>
                <div className='w-300'>
                    <h5 className='white mayus'>Codigo</h5>
                    <h5 className='white'>{props.part.code}</h5>
                </div>
            </div>
        </div>
    )
}

export default PartDetails;
