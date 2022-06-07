import React, {useEffect, useState} from 'react';
import '../css/list.css'
import '../css/fonts.css'
import styled from 'styled-components';

const btns = ['carro superior', 'carro inferior', 'cama agujas', 'unidad selectora agujas', 'maletin trasnporte',
    'carro izquierdo', 'carro derecho', 'accesorios'];

const tabs = ['esquema', 'lista']

const schemas = [
    'https://res.cloudinary.com/hdiucqnlj/image/upload/v1653236493/path142_xutqrv.png',
    'https://res.cloudinary.com/hdiucqnlj/image/upload/v1653250137/409504001-f_hzia02.png'
]

const theme = {
    blue: {
        default: '#512da8',
        hover: "#7c4dff"
    }
}

const Button = styled.button`
    background-color: ${props => theme[props.theme].default};
    color: white;
    padding: 5px 15px;
    border-radius: 5px;
    width:110px;
    outline: 0;
    box-shadow: 0px 2px 2px lightgray;
    font-size: xx-small;
    cursor: pointer;
    text-transform: uppercase;
    margin: 1px 1px;
    &:hover {
        background-color: ${props => theme[props.theme].hover}; 
        transition: ease background-color 250ms
    }
    $:disabled{
        cursor: default;
        opacity: 0.6;
    }
`
Button.defaultProps = {
    theme: 'blue'
}

function ToggleButtons() {
    const [active, setActive] = useState(btns[0]);
    const btnClicked = (btn, index) => evt => {
        setActive(btn);
        let id_img = index + 'img';
        const img = document.getElementById(id_img);
        if (img) {
            img.click(index)
        }
        else {

        }
    }
    return (
        <div className='d-flex space-a' id="btns-parts">
            {btns.map((btn, index) => (
                <ButtonToggle
                    active={active === btn}
                    onClick={btnClicked(btn, index)}
                    key={index}>
                    {btn}
                </ButtonToggle>
            ))}
        </div>
    )
};

const ButtonToggle = styled(Button)`
    opacity: 0.6;
    ${({active}) => active && `
    opacity:1;
    `}
`

const Tab = styled.button`
    opacity: 0.6;
    font-size: small;
    text-transform: uppercase;
    padding:10px 60px;
    margin: 10px 0px;
    width:100%;
    cursor:pointer;
    background: white;
    border: 0;
    outline: 0;
    &:hover {
        background-color:lightgray;
    }
    ${({active}) => active && `
    opacity:1;
    border-bottom: 5px solid #282c34;
    `}
`

function TabGroup() {
    const [active, setActive] = useState(tabs[0]);
    const tabActive = tab => {
        setActive(tab)
        const img = document.getElementById('0img');
        const partList = document.getElementById('parts-list');
        console.log(partList)
        img.style.display = "block"
        partList.style.display = "none"
        if (tab === 'lista') {
            img.style.display = "none"
            partList.style.display = "block"
        }
    }
    return (
        <div className="d-flex space-b">
            {tabs.map(tab => (
                <Tab
                    key={tab}
                    active={active === tab}
                    onClick={() => tabActive(tab)}
                >
                    {tab}
                </Tab>
            ))}
        </div>
    )
}

function Schemas() {
    const [active, setActive] = useState(schemas[0]);
    return (
        <div>
            {schemas.map((schema, index) => (
                <img src={index === 0 ? active : null}
                    alt=""
                    className={index === 0 ? 'part-img center' : 'hide'}
                    onClick={() => setActive(schema)}
                    key={index + 'img'}
                    id={index + 'img'} />
            ))}
        </div>
    )
}

function Sectors() {
    return (
        <div className='center btn-bg-options'>
            <ToggleButtons />
            <TabGroup></TabGroup>
            <Schemas></Schemas>
        </div>
    )
}

export default Sectors;
