import React, {useState, useEffect} from 'react';
import HeadContent from '../parts/head-content';
import PartList from '../parts/parts-list.js'
import Sectors from '../parts/sector';
import PartDetails from '../parts/part-details';
import {Api} from './api-service';
import {Anchor} from '../css/btn';
import {useNavigate} from 'react-router-dom';

function Replacements(props) {
    const {itemsCart, setNewItem, removeItem, deleteItem} = props;
    const [machines, setMachines] = useState([]);
    const [sectors, setSectors] = useState([]);
    const [sector, setSector] = useState([]);
    const [parts, setParts] = useState([]);
    const [part, setPart] = useState([]);
    const [partDetail, setPartDetail] = useState(false);
    const [activeTab, setActiveTab] = useState('esquema');
    const [trm, setTrm] = useState(0)

    useEffect(() => {
        Api.machineList().then(resp => setComponents(resp))
        Api.get_trm().then(resp => setTrm(resp))
    }, [])

    const setComponents = resp => {
        setMachines(resp);
        Api.sectorDetail(resp[0]['id']).then(resp => setSecondComponents(resp))
    }

    const setSecondComponents = resp => {
        if (resp !== 'false') {
            setSectors(resp)
            setSector(resp[0])
            Api.partDetail(resp[0]['id']).then(resp => setParts(resp))
        } else {
            setSectors(null)
            setParts(null)
        }
    }

    const clickedMachine = (itemM) => {
        Api.sectorDetail(itemM['id']).then(resp => setSecondComponents(resp))
    }

    const clickedSector = sector => {
        setSector(sector)
        Api.partDetail(sector['id']).then(resp => resp === 'false' ?
            setParts(null) : setParts(resp))
    }
    const clickedTab = tab => {
        setActiveTab(tab)
    }
    const clickedPart = part_id => {
        setPartDetail(true)
        Api.partDetailPopup(part_id).then(resp => setPart(resp))
    }
    const closePopup = () => {
        setPartDetail(false);
    }
    const getPart = (valToFind) => {
        Api.getPartFromReference(valToFind, sector['id'])
            .then(resp => resp === 'Elemento no encontrado' ? alert(resp) : clickedPart(resp))
    }

    let navigate = useNavigate();
    const goContact = () => {
        let path = '/contacto';
        navigate(path);
    }
    return (
        <div className='mb-3'>
            {partDetail ?
                <PartDetails part={part} closePopup={closePopup}
                    itemsCart={itemsCart}
                    setNewItem={setNewItem}
                    deleteItem={deleteItem}
                    trm={trm}
                    removeItem={removeItem}>
                </PartDetails> : null
            }
            <HeadContent machines={machines} clickedMachine={clickedMachine} getPart={getPart}></HeadContent>
            <Sectors sectors={sectors}
                clickedSector={clickedSector}
                clickedTab={clickedTab}>
            </Sectors>
            <div>
                <h3 className='m-0 gray'>Si tienes alguna duda de algún repuesto, ve a
                    <Anchor onClick={goContact}> contacto</Anchor>
                </h3>
            </div>
            {activeTab === 'esquema' ?
                <div >
                    <img src={sector.img} alt={sector.id} className="part-img" />
                </div> :
                <PartList parts={parts} clickedPart={clickedPart} />
            }
        </div>
    )
}
export default Replacements;
