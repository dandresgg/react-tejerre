import React, {useState} from 'react';
import '../css/list.css'
import '../css/fonts.css'
import {ButtonToggle, Tab} from '../css/btn'

function Sectors(props) {
    const tabs = ['esquema', 'lista']
    const [active, setActive] = useState('')
    const [activeTab, setActiveTab] = useState(tabs[0])

    const clickedSector = sector => {
        setActive(sector)
        props.clickedSector(sector)
    }
    const clickedTab = tab => {
        setActiveTab(tab)
        props.clickedTab(tab)
    }
    return (
        <div className='center btn-bg-options m-0'>
            <div className='nmt-1'>
                {props.sectors && props.sectors.map(sector => (
                    <ButtonToggle key={sector.id}
                        active={active === sector}
                        onClick={() => clickedSector(sector)}
                    >
                        {sector.kind}
                    </ButtonToggle>
                ))}
            </div>
            <div className='d-flex'>
                {tabs.map(tab => (
                    <Tab key={tab}
                        active={activeTab === tab}
                        onClick={() => clickedTab(tab)}
                    >
                        {tab}
                    </Tab>
                ))}
            </div>
        </div>
    )
}

export default Sectors;
