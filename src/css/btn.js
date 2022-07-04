import styled from 'styled-components';

const theme = {
    blue: {
        default: '#212121',
        hover: "gray"
    },
    bluel: {
        default: '#282c34',
        hover: "black"
    },
    black: {
        default: '#fafafa',
        hover: "#616161"
    },
    machine: {
        default: '#607d8b',
        hover: "#b0bec5"
    },
    add: {
        default: 'purple',
        hover: "#ea80fc"
    }
}



export const Tab = styled.button`
    opacity: 0.6;
    font-size: small;
    text-transform: capitalize;
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
const Button = styled.button`
    background-color: ${props => theme[props.theme].default};
    color: lightgray;
    padding: 5px 15px;
    font-weight: bolder;
    border-radius: 5px;
    border:1px solid;
    width:110px;
    outline: 0;
    box-shadow: 0px 1px 1px lightgray;
    font-size: xx-small;
    cursor: pointer;
    text-transform: uppercase;
    margin: 1px 1px;
    &:hover {
        color: gray;
        background-color: ${props => theme[props.theme].hover}; 
        transition: ease background-color 250ms
    }
    $:disabled{
        cursor: default;
        opacity: 0.6;
    }
`
Button.defaultProps = {
    theme: 'bluel'
}


export const ButtonToggle = styled(Button)`
    opacity: 0.6;
    ${({active}) => active && `
    opacity:1;
    `}
`

export const ButtonSector = styled.button`
    background-color: ${props => theme[props.theme].default};
    color: lightgray;
    padding: 5px 15px;
    font-weight: bolder;
    border-radius: 5px;
    border:1px solid;
    width:110px;
    outline: 0;
    box-shadow: 0px 1px 1px lightgray;
    font-size: xx-small;
    cursor: pointer;
    text-transform: uppercase;
    margin: 1px 1px;
    &:hover {
        color: gray;
        background-color: ${props => theme[props.theme].hover}; 
        transition: ease background-color 250ms
    }
    $:disabled{
        cursor: default;
        opacity: 0.6;
    }
`
ButtonSector.defaultProps = {
    theme: 'blue'
}

export const InputSign = styled.input`
    padding:5px;
    outline: 0;
    margin: 2px 0px;
    border-radius: 5px;
    box-shadow: 0px 2px 2px lightgray;
    border: 1px solid gray;
`

export const Selector = styled.select`
    padding:5px;
    outline: 0;
    margin: 2px 0px;
    border-radius: 5px;
    width:15%;
    box-shadow: 0px 2px 2px lightgray;
    border: 1px solid gray;
`

export const Anchor = styled.a`
    color: #512da8;
    cursor: pointer;
    &:hover {
        color: purple;
        }
`

export const ButtonSign = styled.button`
    background-color: ${props => theme[props.theme].default};
    color: #d1c4e9;
    padding: 5px 15px;
    border-radius: 10px;
    outline: 0;
    box-shadow: 0px 2px 2px lightgray;
    font-size: 10sp;
    cursor: pointer;
    text-transform: uppercase;
    margin: 1px 1px;
    &:hover {
        background-color: ${props => theme[props.theme].hover}; 
        transition: ease background-color 250ms
    }
    $:disabled{
        cursor: default;
        opacity: 0.9;
    }
`
ButtonSign.defaultProps = {
    theme: 'blue'
}

export const TextareaSign = styled.textarea`
    padding:5px;
    outline: 0;
    margin: 2px 0px;
    border-radius: 5px;
    box-shadow: 0px 2px 2px lightgray;
    border: 1px solid gray;
    height:15vh;
`

export const ButtonMenu = styled.button`
    background-color: ${props => theme[props.theme].default};
    width:100%;
    cursor: pointer;
    margin: 3px 1px;
    box-shadow: 0px 2px 2px lightgray;
    text-transform: uppercase;
    border-radius: 5px;
    font-size: 1rem;
    padding: 5px 15px;
    color: #d1c4e9;
    opacity:0.7;
    &:hover {
        background-color: ${props => theme[props.theme].hover}; 
        transition: ease background-color 250ms
    }
    $:disabled{
        cursor: default;
    }
    ${({active}) => active && `
    opacity:1;
    border-bottom: 1px solid white;
    `}`

ButtonMenu.defaultProps = {
    theme: 'bluel'
}

export const ButtonUpdate = styled.button`
    background-color: ${props => theme[props.theme].default};
    width:30%;
    cursor: pointer;
    margin: 3px 1px;
    box-shadow: 0px 2px 2px lightgray;
    border-radius: 5px;
    text-transform: uppercase;
    font-size: 10px;
    padding: 5px 5px;
    &:hover {
        background-color: ${props => theme[props.theme].hover}; 
        transition: ease background-color 250ms;
    }
    $:disabled{
        cursor: default;
    }
    ${({active}) => active && `
    opacity:1;
    border-bottom: 1px solid white;
    `}`

ButtonUpdate.defaultProps = {
    theme: 'black'
}

export const ButtonMachine = styled.button`
    background-color: ${props => theme[props.theme].default};
    width:30%;
    cursor: pointer;
    margin: 3px 1px;
    box-shadow: 0px 2px 2px lightgray;
    border-radius: 5px;
    text-transform: uppercase;
    font-size: 10px;
    opacity:0.8;
    padding: 5px 5px;
    &:hover {
        background-color: ${props => theme[props.theme].hover}; 
        transition: ease background-color 250ms;
    }
    $:disabled{
        cursor: default;
    }
    ${({active}) => active && `
    opacity:1;
    border-bottom: 1px solid white;
    `}`

ButtonMachine.defaultProps = {
    theme: 'machine'
}


export const ButtonAdd = styled.button`
    background-color: ${props => theme[props.theme].default};
    width:30%;
    cursor: pointer;
    margin: 3px 1px;
    box-shadow: 0px 1px 1px lightgray;
    border: none;
    border-radius: 5px;
    text-transform: capitalize;
    font-size: 15px;
    color:white;
    padding: 5px 5px;
    &:hover {
        background-color: ${props => theme[props.theme].hover}; 
        transition: ease background-color 250ms;
    }
    $:disabled{
        opacity:0.7;
        cursor: default;
    }
    ${({active}) => active && `
    border-bottom: 1px solid white;
    `}`

ButtonAdd.defaultProps = {
    theme: 'add'
}
