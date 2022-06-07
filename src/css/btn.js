import styled from 'styled-components';

const theme = {
    blue: {
        default: '#512da8',
        hover: "#7c4dff"
    },
    bluel: {
        default: '#b388ff',
        hover: "#7c4dff"
    },
    black: {
        default: '#bdbdbd',
        hover: "#eeeeee"
    }
}

export const InputSign = styled.input`
    padding:5px;
    outline: 0;
    margin: 2px 0px;
    border-radius: 5px;
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
    color: white;
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
        opacity: 0.6;
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
    width:50%;
`

export const ButtonMenu = styled.button`
    background-color: ${props => theme[props.theme].default};
    width:100%;
    cursor: pointer;
    margin: 3px 1px;
    box-shadow: 0px 2px 2px lightgray;
    border-radius: 5px;
    font-size: 1rem;
    padding: 5px 15px;
    color: #eeeeee;
    &:hover {
        background-color: ${props => theme[props.theme].hover}; 
        transition: ease background-color 250ms
    }
    $:disabled{
        cursor: default;
    }
    ${({active}) => active && `
    opacity:1;
    background-color:#7c4dff;
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
